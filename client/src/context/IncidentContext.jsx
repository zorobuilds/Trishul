import React, { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const IncidentContext = createContext();

const API_BASE = 'https://tr-0946e6036e9a417eadb3b8b3b0a3b88d.ecs.eu-north-1.on.aws/api';
const SOCKET_BASE = 'https://tr-0946e6036e9a417eadb3b8b3b0a3b88d.ecs.eu-north-1.on.aws';

export const IncidentProvider = ({ children }) => {
  const [incidents, setIncidents] = useState([]);
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const queue = localStorage.getItem('trishul_offline_queue');
    return queue ? JSON.parse(queue) : [];
  });
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Sync network state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Fetch initial incidents and set up WebSockets
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const res = await fetch(`${API_BASE}/incidents`);
        const data = await res.json();
        if (data.success) {
          setIncidents(data.incidents);
        }
      } catch (err) {
        console.error('Error fetching incidents from backend:', err);
      }
    };

    fetchIncidents();

    // Establish WebSocket Connection
    const socket = io(SOCKET_BASE);

    socket.on('connect', () => {
      console.log('Connected to Trishul WebSocket');
    });

    socket.on('incidentCreated', (newInc) => {
      setIncidents((prev) => {
        // Avoid duplicate entry if this client created it
        if (prev.some((item) => item.id === newInc.id)) {
          return prev;
        }
        return [newInc, ...prev];
      });
    });

    socket.on('incidentStatusUpdated', (updated) => {
      setIncidents((prev) =>
        prev.map((item) => (item.id === updated.id ? { ...item, status: updated.status } : item))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Sync offline queued items when connection restores
  useEffect(() => {
    localStorage.setItem('trishul_offline_queue', JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  // Submit incident
  const submitIncident = async (newReport) => {
    const tempId = `rep-${Date.now()}`;
    const reportItem = {
      ...newReport,
      id: tempId,
      timestamp: new Date().toISOString(),
      status: 'PENDING_REVIEW',
      synced: isOnline
    };

    if (isOnline) {
      try {
        const res = await fetch(`${API_BASE}/incidents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: newReport.title,
            category: newReport.category,
            severity: newReport.severity,
            state: newReport.state,
            locationName: newReport.locationName,
            lat: Number(newReport.lat),
            lng: Number(newReport.lng),
            description: newReport.description,
            reporterName: newReport.reporterName,
            reporterContact: newReport.reporterContact,
            clientCreatedAt: reportItem.timestamp,
            isOfflineDraft: false
          })
        });

        const data = await res.json();
        if (data.success) {
          // Prepend formatted incident from backend response
          const savedInc = {
            id: data.incident._id,
            title: data.incident.title,
            category: data.incident.category,
            severity: data.incident.severity,
            state: data.incident.state,
            locationName: data.incident.locationName,
            lat: data.incident.location.coordinates[1],
            lng: data.incident.location.coordinates[0],
            description: data.incident.description,
            reporterName: data.incident.reporterName,
            reporterContact: data.incident.reporterContact,
            status: data.incident.status,
            timestamp: data.incident.clientCreatedAt || data.incident.createdAt,
            synced: true
          };
          setIncidents((prev) => [savedInc, ...prev]);
          return { success: true, mode: 'ONLINE', data: savedInc };
        }
      } catch (err) {
        console.error('Failed to post incident online, fallback to queue:', err);
      }
    }

    // Save in offline queue if offline or API failed
    const offlineReport = { ...reportItem, synced: false };
    setOfflineQueue((prev) => [offlineReport, ...prev]);
    setIncidents((prev) => [offlineReport, ...prev]);
    return { success: true, mode: 'OFFLINE_QUEUED', data: offlineReport };
  };

  // Sync offline queued items
  const syncOfflineReports = async () => {
    if (offlineQueue.length === 0) return 0;
    let syncedCount = 0;

    for (const report of offlineQueue) {
      try {
        const res = await fetch(`${API_BASE}/incidents`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: report.title,
            category: report.category,
            severity: report.severity,
            state: report.state,
            locationName: report.locationName,
            lat: Number(report.lat),
            lng: Number(report.lng),
            description: report.description,
            reporterName: report.reporterName,
            reporterContact: report.reporterContact,
            clientCreatedAt: report.timestamp,
            isOfflineDraft: true
          })
        });

        const data = await res.json();
        if (data.success) {
          syncedCount++;
        }
      } catch (err) {
        console.error('Failed to sync offline report:', err);
      }
    }

    // Refresh incidents list from backend to get verified state
    try {
      const res = await fetch(`${API_BASE}/incidents`);
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents);
      }
    } catch (err) {
      console.error(err);
    }

    setOfflineQueue([]);
    return syncedCount;
  };

  // Update status (for Admin)
  const updateIncidentStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_BASE}/incidents/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setIncidents((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <IncidentContext.Provider
      value={{
        incidents,
        offlineQueue,
        isOnline,
        setIsOnline,
        submitIncident,
        syncOfflineReports,
        updateIncidentStatus
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => useContext(IncidentContext);
