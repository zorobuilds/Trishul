const Corridor = require("../models/corridor");

const defaultGraph = {
  // Sikkim / West Bengal Network (NH-10 and bypasses)
  "Siliguri Junction": {
    "Sevoke": { distance: 20, corridors: ["nh-10"] }
  },
  "Sevoke": {
    "Siliguri Junction": { distance: 20, corridors: ["nh-10"] },
    "Melli": { distance: 30, corridors: ["nh-10"] },
    "Lava": { distance: 50, corridors: ["lava-bypass"] }
  },
  "Melli": {
    "Sevoke": { distance: 30, corridors: ["nh-10"] },
    "Rangpo": { distance: 25, corridors: ["nh-10"] },
    "Jorethang": { distance: 25, corridors: ["melli-namchi-bypass"] }
  },
  "Rangpo": {
    "Melli": { distance: 25, corridors: ["nh-10"] },
    "Singtam": { distance: 15, corridors: ["nh-10"] }
  },
  "Singtam": {
    "Rangpo": { distance: 15, corridors: ["nh-10"] },
    "Gangtok, Sikkim": { distance: 30, corridors: ["nh-10"] }
  },
  "Gangtok, Sikkim": {
    "Singtam": { distance: 30, corridors: ["nh-10"] },
    "Namchi": { distance: 45, corridors: ["melli-namchi-bypass"] },
    "Rhenock": { distance: 40, corridors: ["lava-bypass"] }
  },
  // Bypasses
  "Jorethang": {
    "Melli": { distance: 25, corridors: ["melli-namchi-bypass"] },
    "Namchi": { distance: 20, corridors: ["melli-namchi-bypass"] }
  },
  "Namchi": {
    "Jorethang": { distance: 20, corridors: ["melli-namchi-bypass"] },
    "Gangtok, Sikkim": { distance: 45, corridors: ["melli-namchi-bypass"] }
  },
  "Lava": {
    "Sevoke": { distance: 50, corridors: ["lava-bypass"] },
    "Algarah": { distance: 15, corridors: ["lava-bypass"] }
  },
  "Algarah": {
    "Lava": { distance: 15, corridors: ["lava-bypass"] },
    "Reshi": { distance: 25, corridors: ["lava-bypass"] }
  },
  "Reshi": {
    "Algarah": { distance: 25, corridors: ["lava-bypass"] },
    "Rhenock": { distance: 10, corridors: ["lava-bypass"] }
  },
  "Rhenock": {
    "Reshi": { distance: 10, corridors: ["lava-bypass"] },
    "Gangtok, Sikkim": { distance: 40, corridors: ["lava-bypass"] }
  },

  // Nagaland Network (NH-29)
  "Dimapur": {
    "Chumukedima": { distance: 15, corridors: ["nh-29"] },
    "Kohima": { distance: 85, corridors: ["niuland-bypass"] }
  },
  "Chumukedima": {
    "Dimapur": { distance: 15, corridors: ["nh-29"] },
    "Kohima": { distance: 60, corridors: ["nh-29"] }
  },
  "Kohima": {
    "Chumukedima": { distance: 60, corridors: ["nh-29"] },
    "Dimapur": { distance: 85, corridors: ["niuland-bypass"] }
  },

  // Arunachal Network (BCT Road vs OKSR)
  "Balipara": {
    "Bhalukpong": { distance: 50, corridors: ["bct-road"] },
    "Orang": { distance: 60, corridors: ["oksr-bypass"] }
  },
  "Bhalukpong": {
    "Balipara": { distance: 50, corridors: ["bct-road"] },
    "Sela Pass": { distance: 180, corridors: ["bct-road"] }
  },
  "Sela Pass": {
    "Bhalukpong": { distance: 180, corridors: ["bct-road"] },
    "Tawang": { distance: 80, corridors: ["bct-road"] }
  },
  "Tawang": {
    "Sela Pass": { distance: 80, corridors: ["bct-road"] },
    "Rupa": { distance: 100, corridors: ["oksr-bypass"] }
  },
  "Orang": {
    "Balipara": { distance: 60, corridors: ["oksr-bypass"] },
    "Kalaktang": { distance: 90, corridors: ["oksr-bypass"] }
  },
  "Kalaktang": {
    "Orang": { distance: 90, corridors: ["oksr-bypass"] },
    "Shergaon": { distance: 40, corridors: ["oksr-bypass"] }
  },
  "Shergaon": {
    "Kalaktang": { distance: 40, corridors: ["oksr-bypass"] },
    "Rupa": { distance: 30, corridors: ["oksr-bypass"] }
  },
  "Rupa": {
    "Shergaon": { distance: 30, corridors: ["oksr-bypass"] },
    "Tawang": { distance: 100, corridors: ["oksr-bypass"] }
  }
};

/**
 * Calculates shortest safe bypass path using Dijkstra
 */
const calculateSafeRoute = async (origin, destination) => {
  // 1. Fetch dynamic status of all highway corridors from database
  const dbCorridors = await Corridor.find();
  const corridorStatusMap = {};
  dbCorridors.forEach((c) => {
    corridorStatusMap[c.corridorId] = c.status;
  });

  // 2. Clone the graph to avoid mutating static structures
  const graph = JSON.parse(JSON.stringify(defaultGraph));

  if (!graph[origin] || !graph[destination]) {
    throw new Error("Origin or destination not supported in mountain detour engine map.");
  }

  // 3. Adjust weights based on corridor status
  for (const node in graph) {
    for (const neighbor in graph[node]) {
      const edge = graph[node][neighbor];
      let multiplier = 1;
      let penalty = 0;

      edge.corridors.forEach((cId) => {
        const status = corridorStatusMap[cId] || "OPEN_CLEAR";
        if (status === "BLOCKED") {
          multiplier = 10000; // Impassable
        } else if (status === "RESTRICTED") {
          penalty += 50; // High friction/delay
        } else if (status === "OPEN_CAUTION") {
          penalty += 20; // Precautionary delay
        }
      });

      edge.weight = edge.distance * multiplier + penalty;
    }
  }

  // 4. Run Dijkstra
  const distances = {};
  const previous = {};
  const visited = new Set();
  const nodes = Object.keys(graph);

  nodes.forEach((node) => {
    distances[node] = Infinity;
    previous[node] = null;
  });
  distances[origin] = 0;

  while (visited.size < nodes.length) {
    // Find unvisited node with minimum distance
    let minNode = null;
    let minDistance = Infinity;

    nodes.forEach((node) => {
      if (!visited.has(node) && distances[node] < minDistance) {
        minNode = node;
        minDistance = distances[node];
      }
    });

    if (minNode === null || minDistance === Infinity) {
      break;
    }

    visited.add(minNode);

    // Stop if we reached destination
    if (minNode === destination) {
      break;
    }

    // Update distances of neighbors
    const neighbors = graph[minNode];
    for (const neighbor in neighbors) {
      if (!visited.has(neighbor)) {
        const alt = distances[minNode] + neighbors[neighbor].weight;
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = minNode;
        }
      }
    }
  }

  // If destination is unreachable
  if (distances[destination] === Infinity) {
    return {
      success: false,
      message: "No safe bypass routes available. Heavy landslide blocks have isolated this sector."
    };
  }

  // 5. Reconstruct Path
  const path = [];
  let curr = destination;
  while (curr !== null) {
    path.unshift(curr);
    curr = previous[curr];
  }

  // Calculate stats
  let totalDistance = 0;
  let maxRisk = "LOW-RISK";
  let traversedCorridors = new Set();

  for (let i = 0; i < path.length - 1; i++) {
    const u = path[i];
    const v = path[i + 1];
    const edge = graph[u][v];
    totalDistance += edge.distance;

    edge.corridors.forEach((cId) => {
      traversedCorridors.add(cId);
      const status = corridorStatusMap[cId] || "OPEN_CLEAR";
      if (status === "BLOCKED" || status === "RESTRICTED") {
        maxRisk = "HIGH-RISK";
      } else if (status === "OPEN_CAUTION" && maxRisk !== "HIGH-RISK") {
        maxRisk = "MODERATE-RISK";
      }
    });
  }

  // Build readable bypass name
  let bypassName = "Direct Corridor";
  if (path.length > 2) {
    bypassName = `Bypass via ${path.slice(1, -1).join(" -> ")}`;
  }

  // Compute estimated time (rough hill speed assumptions)
  let speedKmh = 40; // baseline speed
  if (maxRisk === "HIGH-RISK") speedKmh = 20;
  else if (maxRisk === "MODERATE-RISK") speedKmh = 30;

  const hours = totalDistance / speedKmh;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  const timeString = `${h} hrs ${m} mins`;

  // Dynamic advisories
  let advisory = "Paved, stable gradient. Light motor vehicle movement permitted.";
  if (maxRisk === "HIGH-RISK") {
    advisory = "CRITICAL: Bypass contains active caution sections. Heavy vehicles prohibited. Expect delays.";
  } else if (maxRisk === "MODERATE-RISK") {
    advisory = "Caution: Minor debris warning. Avoid nighttime movement. Drive with caution.";
  }

  // Primary highway reference
  const firstEdgeCorridors = graph[origin][Object.keys(graph[origin])[0]]?.corridors || [];
  const primaryId = firstEdgeCorridors[0] || "nh-10";
  const primaryCorridor = dbCorridors.find((c) => c.corridorId === primaryId);

  return {
    success: true,
    origin,
    destination,
    primaryHighway: primaryCorridor ? primaryCorridor.name : "Direct route",
    primaryStatus: primaryCorridor ? `${primaryCorridor.status} (${primaryCorridor.estimatedClearance || "Clearance time unknown"})` : "Blocked",
    recommendedSafeRoute: bypassName,
    distance: `${totalDistance} km`,
    estimatedTime: timeString,
    riskGrade: maxRisk,
    advisory
  };
};

module.exports = {
  calculateSafeRoute
};
