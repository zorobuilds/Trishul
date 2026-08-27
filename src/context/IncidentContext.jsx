import React, { createContext, useContext, useState, useEffect } from 'react';

const IncidentContext = createContext();

export const IncidentProvider = ({ children }) => {
  // Saved reports in state (hydrated from localStorage for persistence across reloads)
  const [incidents, setIncidents] = useState(() => {
    const local = localStorage.getItem('trishul_incidents');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (e) {
        console.error('Error parsing stored incidents', e);
      }
    }
    return [
      {
        id: 'rep-001',
        title: 'Road Subsidence & Mudflow',
        category: 'ROAD_BLOCKAGE',
        severity: 'CRITICAL',
        state: 'Sikkim',
        locationName: 'NH-10, Near Singtam Bridge',
        lat: 27.235,
        lng: 88.498,
        description: 'Large boulder collapse with active mud slip. Two vehicles stuck. BRO notified.',
        reporterName: 'Tashi Bhutia (Field Officer)',
        reporterContact: '+91-98765-43210',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        status: 'VERIFIED',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        synced: true
      },
      {
        id: 'rep-002',
        title: 'Retaining Wall Crack & Soil Creep',
        category: 'SLOPE_MOVEMENT',
        severity: 'HIGH',
        state: 'Mizoram',
        locationName: 'Hunthar Veng Slope, Aizawl',
        lat: 23.736,
        lng: 92.717,
        description: 'Fissures growing along residential slope retaining wall after 6-hour continuous rain.',
        reporterName: 'Lalrinawma (Local Resident)',
        reporterContact: '+91-94361-12345',
        imageUrl: null,
        status: 'PENDING_REVIEW',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        synced: true
      }
    ];
  });

  // Offline queue
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const queue = localStorage.getItem('trishul_offline_queue');
    return queue ? JSON.parse(queue) : [];
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

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

  // Save to localStorage whenever incidents or queue changes
  useEffect(() => {
    localStorage.setItem('trishul_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('trishul_offline_queue', JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  // Submit incident
  const submitIncident = (newReport) => {
    const reportItem = {
      ...newReport,
      id: `rep-${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'PENDING_REVIEW',
      synced: isOnline
    };

    if (isOnline) {
      setIncidents((prev) => [reportItem, ...prev]);
      return { success: true, mode: 'ONLINE', data: reportItem };
    } else {
      // Save in offline queue
      setOfflineQueue((prev) => [reportItem, ...prev]);
      setIncidents((prev) => [reportItem, ...prev]);
      return { success: true, mode: 'OFFLINE_QUEUED', data: reportItem };
    }
  };

  // Sync offline queued items when connection restores
  const syncOfflineReports = () => {
    if (offlineQueue.length === 0) return 0;
    const syncedCount = offlineQueue.length;
    
    setIncidents((prev) =>
      prev.map((item) => ({ ...item, synced: true }))
    );
    setOfflineQueue([]);
    return syncedCount;
  };

  // Update status (for Admin)
  const updateIncidentStatus = (id, newStatus) => {
    setIncidents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
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
