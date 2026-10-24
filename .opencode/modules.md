# Modules

## Developed
- Home page (`src/pages/index.tsx`)
- Login (`src/pages/login.tsx`) — JWT stored in localStorage
- Register (`src/pages/register.tsx`)
- Reset password (`src/pages/reset-password.tsx`)
- Dashboard (`src/pages/dashboard.tsx`) — lists devices
- Sites list (`src/pages/sites.tsx`) — table with API call including timestamp
- Site detail (`src/pages/sites/[id].tsx`) — dedicated `/api/v1/sites/{id}` call
- Boxes (`src/pages/boxes.tsx`)
- Devices list (`src/pages/devices/index.tsx`)
- Device detail (`src/pages/devices/[id].tsx`) — info + LightningChart line chart with time ranges
- JWT profiler component (`src/components/JwtProfiler.tsx`)
- Auth context (`src/contexts/AuthContext.tsx`) — token + user_id in localStorage
- API client (`src/lib/api.ts`) — headers vnd.api+json, Cache-Control, Bearer token

## Not yet developed
- Real-time/live data (Mercure/WebSocket)
- Alerts and alert notifications
- Box detail page
- User management / groups
- Charts for valeur2/valeur3 and advanced filters
- Tests (unit/integration)