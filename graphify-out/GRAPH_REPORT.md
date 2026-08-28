# Graph Report - client  (2026-08-28)

## Corpus Check
- 22 files · ~11,393 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 131 nodes · 160 edges · 15 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `baad023f`
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
- Project Trishul: AI-Powered Real-Time Landslide Early Warning & Disaster Management System (NER)
- 🌟 What Has Been Built & Verified
- React + Vite

## God Nodes (most connected - your core abstractions)
1. `react` - 12 edges
2. `Project Trishul: AI-Powered Real-Time Landslide Early Warning & Disaster Management System (NER)` - 6 edges
3. `scripts` - 5 edges
4. `useIncidents()` - 5 edges
5. `🌟 What Has Been Built & Verified` - 5 edges
6. `NER_STATES_DATA` - 4 edges
7. `2. Technology Stack` - 4 edges
8. `3. Page-by-Page Feature Specifications` - 4 edges
9. `Project Trishul - Frontend Completion Walkthrough` - 4 edges
10. `plugins` - 3 edges

## Surprising Connections (you probably didn't know these)
- `AdminDashboard()` --calls--> `useIncidents()`  [EXTRACTED]
  src/pages/AdminDashboard.jsx → src/context/IncidentContext.jsx
- `ReportIncident()` --calls--> `useIncidents()`  [EXTRACTED]
  src/pages/ReportIncident.jsx → src/context/IncidentContext.jsx

## Import Cycles
- None detected.

## Communities (15 total, 0 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.09
Nodes (23): clsx, framer-motion, leaflet, leaflet.heat, lucide-react, dependencies, clsx, framer-motion (+15 more)

### Community 1 - "devDependencies"
Cohesion: 0.11
Nodes (19): autoprefixer, oxlint, devDependencies, autoprefixer, oxlint, postcss, tailwindcss, @tailwindcss/postcss (+11 more)

### Community 2 - "App.jsx"
Cohesion: 0.22
Nodes (10): react, App(), Footer(), Navbar(), ThemeToggle(), IncidentContext, IncidentProvider(), useIncidents() (+2 more)

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

### Community 11 - "Project Trishul: AI-Powered Real-Time Landslide Early Warning & Disaster Management System (NER)"
Cohesion: 0.15
Nodes (12): 1. System Architecture Overview, 2. Technology Stack, 3. Page-by-Page Feature Specifications, 4. Innovative Value-Adds for SIH (Smart India Hackathon), 5. Phased Implementation Plan, 🏠 A. Front / Public Landing Page (`/`), AI / Data Feeds (Future Integration), 📱 B. Citizen & Field Officer Portal (`/report` & `/citizen`) (+4 more)

### Community 12 - "🌟 What Has Been Built & Verified"
Cohesion: 0.22
Nodes (8): 1. 🏠 Public Landing Page (`/` - `Home.jsx`), 2. 📱 Citizen & Field Officer Incident Reporting Portal (`/report` - `ReportIncident.jsx`), 3. 🛣️ Mountain Road Passes & Safe Evacuation Navigator (`/safe-routes` - `SafeRoutes.jsx`), 4. 🛡️ Authority Command Center Dashboard (`/admin` - `AdminDashboard.jsx`), 🧭 Navigation Summary, 🚀 Next Steps (When You Return from Your Break), Project Trishul - Frontend Completion Walkthrough, 🌟 What Has Been Built & Verified

### Community 13 - "React + Vite"
Cohesion: 0.50
Nodes (3): Expanding the Oxlint configuration, React Compiler, React + Vite

## Knowledge Gaps
- **54 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `warn`, `name` (+49 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `react` connect `App.jsx` to `AdminDashboard.jsx`, `.oxlintrc.json`, `Home.jsx`, `SafeRoutes.jsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _54 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._