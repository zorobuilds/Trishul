# Graph Report - client  (2026-08-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 102 nodes · 132 edges · 12 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3792430a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- devDependencies
- App.jsx
- AdminDashboard.jsx
- package.json
- .oxlintrc.json
- Home.jsx
- SafeRoutes.jsx

## God Nodes (most connected - your core abstractions)
1. `react` - 11 edges
2. `useIncidents()` - 5 edges
3. `scripts` - 5 edges
4. `NER_STATES_DATA` - 4 edges
5. `AdminDashboard()` - 3 edges
6. `ReportIncident()` - 3 edges
7. `plugins` - 3 edges
8. `rules` - 3 edges
9. `App()` - 2 edges
10. `Footer()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `AdminDashboard()` --calls--> `useIncidents()`  [EXTRACTED]
  src/pages/AdminDashboard.jsx → src/context/IncidentContext.jsx
- `ReportIncident()` --calls--> `useIncidents()`  [EXTRACTED]
  src/pages/ReportIncident.jsx → src/context/IncidentContext.jsx

## Import Cycles
- None detected.

## Communities (12 total, 0 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.09
Nodes (23): clsx, framer-motion, leaflet, leaflet.heat, lucide-react, dependencies, clsx, framer-motion (+15 more)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (19): autoprefixer, oxlint, devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 2 - "App.jsx"
Cohesion: 0.27
Nodes (9): react, App(), Footer(), Navbar(), IncidentContext, IncidentProvider(), useIncidents(), AdminDashboard() (+1 more)

### Community 3 - "AdminDashboard.jsx"
Cohesion: 0.23
Nodes (8): assetIcon, incidentIconCritical, incidentIconWarning, sensorIcon, TacticalGisMap(), HOURLY_RAINFALL_TREND, IOT_SENSOR_STATIONS, RESPONSE_ASSETS

### Community 4 - "package.json"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 5 - ".oxlintrc.json"
Cohesion: 0.25
Nodes (7): plugins, rules, react/only-export-components, react/rules-of-hooks, $schema, oxc, warn

### Community 6 - "Home.jsx"
Cohesion: 0.53
Nodes (4): AI_METRICS_SUMMARY, LIVE_BULLETINS, NER_STATES_DATA, Home()

### Community 7 - "SafeRoutes.jsx"
Cohesion: 0.60
Nodes (3): ISOLATED_VILLAGES_RESILIENCE, NER_HIGHWAY_CORRIDORS, SafeRoutes()

## Knowledge Gaps
- **37 isolated node(s):** `clsx`, `framer-motion`, `leaflet`, `leaflet.heat`, `lucide-react` (+32 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `react` connect `App.jsx` to `AdminDashboard.jsx`, `.oxlintrc.json`, `Home.jsx`, `SafeRoutes.jsx`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **What connects `clsx`, `framer-motion`, `leaflet` to the rest of the system?**
  _37 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._