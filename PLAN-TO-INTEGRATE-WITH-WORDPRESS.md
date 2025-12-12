# Plan: Integration with WordPress as a Gutenberg Block

## 📋 Executive Summary

### ✅ FEASIBILITY: COMPLETELY FEASIBLE

**Complexity:** Medium-High
**Estimated time:** 4 weeks (20 development days)
**Final bundle size:** ~105KB (gzipped) - Excellent
**Code reuse:** 80% of the current frontend remains unchanged

---

## 🎯 Objective

Create a **Gutenberg block** for WordPress that allows displaying the VandVoyage transit map on any WordPress page or post, consuming data from an independent **Node.js backend**.

### Final Result for the WordPress User

The WordPress admin will be able to:
1. ➕ Add the "VandVoyage Transit Map" block to any page/post
2. ⚙️ Configure visually (no code required):
   - 🔗 Backend API URL
   - 🗺️ Which layers to show (9 available layers)
   - 🔍 Enable/disable station search
   - 📍 Initial map zoom and center
   - 📏 Map height (px, vh, %)
3. ✨ All from the Gutenberg editor - 100% visual

---

## 🏗️ Current Frontend Architecture

### Current State
- **React 17.0.2** + **Redux Toolkit**
- **17 Redux slices:**
  - 13 transit lines (TTC, GO Transit, VIA Rail, Waterloo ION)
  - 2 markers (stations, stationForm)
  - 1 bike lanes
  - 1 via rail lines
- **React-Leaflet v3.2.5** + **Leaflet v1.7.1**
- **9 independent overlay layers:**
  - All Stations, GO Stations, TTC Stations, VIA Rail Stations, Amtrak Stations
  - TTC Lines, Toronto Bike Lanes, GO Lines, Waterloo Ion
- **SearchBar** integrated allowing station search and pan/zoom
- **Modal** loading that watches 16 Redux states
- **Tightly coupled to Redux** - All components use useDispatch/useSelector

### Main Dependencies
- `react` + `react-dom`: 17.0.2
- `@reduxjs/toolkit`: 1.8.1
- `react-redux`: 7.2.8
- `leaflet`: 1.7.1
- `react-leaflet`: 3.2.5
- `@mui/material`: 5.4.0 (only for SearchBar TextField)
- `axios`: 0.25.0

---

## 🚀 Selected Approach

### WordPress Gutenberg Block + Git Submodule

**Features:**
1. ✅ Renders React inside WordPress (dynamic block)
2. ✅ Backend URL configurable per block instance
3. ✅ 9 layers can be enabled/disabled by the WordPress admin
4. ✅ Optional/configurable SearchBar
5. ✅ Frontend imported as a **git submodule**
6. ✅ **Read-only** (no station editing)

---

## 🔧 Key Technical Decisions

### 1. State: Keep Redux Bundled (Simplified)

**Reason:** The frontend is deeply integrated with Redux. Refactoring to Context API would require rewriting every component.

**Simplifications for read-only mode:**
- ✅ Remove `stationFormSlice` (handles PUT/DELETE edits)
- ✅ Remove the complex `Modal` component (watches 16 states)
- ✅ Create a simple unified `LoadingOverlay`
- ✅ Keep 14 slices: 13 lines + 1 stations (for SearchBar)
- ✅ New `configSlice` for WordPress block configuration

### 2. React: Bundle Our Own React (Do Not Use WordPress React)

**Reason:** Avoid version conflicts with other plugins. WordPress uses React 18+, we use React 17.

**Bundle will include:**
- React + ReactDOM (17.0.2): ~40KB
- Redux Toolkit + React-Redux: ~25KB
- Leaflet + React-Leaflet: ~55KB
- Axios: ~15KB
- App code: ~50KB
- **Estimated total: ~185KB** (gzipped)

### 3. Optimization: Replace Material-UI

Material-UI is only used for the SearchBar TextField
- Current weight: ~80KB
- **Solution:** Replace with HTML `<input>` + custom CSS
- **Savings:** ~80KB → **Final bundle: ~105KB**

### 4. Distribution: Git Submodule

**Advantages:**
- Full source control
- Controlled updates (not automatic)
- No need to publish to npm
- Development in the same repo

---

## 🌐 Node.js Backend and CORS

### ⚠️ CRITICAL REQUIREMENT: Backend Must Be Running

The WordPress block **requires** the Node.js backend to be:
1. ✅ **Running on an accessible URL** (localhost, remote server, or cloud)
2. ✅ **Configured with CORS** to accept requests from WordPress

### Required CORS Configuration

The Node.js backend must allow requests from the WordPress domain:

```javascript
// backend/index.js
import cors from "cors";

app.use(cors({
  origin: [
    // Local development
    'http://localhost:3000',
    'http://localhost:3001',

    // Production WordPress
    'https://vandvoyage.com',
    'https://www.vandvoyage.com',

    // Add other domains as needed
  ],
  credentials: true
}));
```

### Backend Deployment Scenarios

#### Option A: Backend in the Cloud (Recommended)
```
WordPress (vandvoyage.com)
    ↓ fetch()
Backend API (api.vandvoyage.com:5001)
    ↓ MongoDB queries
MongoDB Atlas
```

**Advantages:**
- Backend always available
- Multiple WordPress sites can consume the same API
- Scalable

**CORS configuration:**
```javascript
origin: [
  'https://vandvoyage.com',
  'https://www.vandvoyage.com'
]
```

#### Option B: Backend on the Same Server as WordPress
```
Server
├── WordPress (port 80/443)
├── Node.js Backend (port 5001)
└── MongoDB (port 27017 or Atlas)
```

**Advantages:**
- Everything on one server
- No CORS issues if using localhost

**CORS configuration:**
```javascript
origin: [
  'http://localhost',
  'http://yourserver.com',
  'https://yourserver.com'
]
```

#### Option C: Local Backend (Development Only)
```
Local Machine
├── WordPress (localhost:8080)
└── Backend (localhost:5001)
```

**Only for local testing:**
```javascript
origin: 'http://localhost:8080'
```

### Backend Endpoints Used by the Frontend

The WordPress block will perform GET requests to these endpoints:

**Stations:**
- `GET /stations` - All stations

**TTC Lines:**
- `GET /ttclineone`
- `GET /ttclinetwo`
- `GET /ttclinethree`
- `GET /ttclinefour`

**GO Transit Lines (8 lines):**
- `GET /goLineBarrie`
- `GET /goLineKitchener`
- `GET /goLineLakeshoreEast`
- `GET /goLineLakeshoreWest`
- `GET /goLineMilton`
- `GET /goLineRichmondHill`
- `GET /goLineStouffville`
- `GET /goLineUnionPearson`

**Other Transit:**
- `GET /viaRail` - VIA Rail lines
- `GET /waterlooIonCurrent` - Waterloo ION current
- `GET /waterlooIonStage2` - Waterloo ION stage 2
- `GET /bikeRoutes` - Toronto bike routes

**Amtrak** (requires verifying exact endpoints in the backend)

### Handling CORS Errors

If CORS is not configured correctly you'll see errors like:

```
Access to fetch at 'http://api.example.com/stations' from origin
'https://wordpress.com' has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header is present on the requested resource.
```

**Solution:**
1. Verify `cors` middleware is installed in the backend
2. Add the WordPress domain to the `origin` array
3. Restart the Node.js backend

---

## 📦 Plugin Structure for WordPress

```
wp-content/plugins/vandvoyage-transit-map/
├── vandvoyage-transit-map.php          # Main plugin file
├── readme.txt                           # WordPress.org readme
├── package.json                         # Build dependencies
├── webpack.config.js                    # Custom build config
├── .gitmodules                          # Git submodule definition
│
├── includes/                            # PHP backend
│   ├── class-block-registration.php    # Register Gutenberg block
│   ├── class-assets-loader.php         # Enqueue scripts/styles
│   └── class-rest-proxy.php            # Optional: REST API proxy
│
├── src/                                 # WordPress block source
│   ├── index.js                        # Block registration (editor)
│   ├── edit.js                         # Block editor component
│   ├── save.js                         # Block save (returns null)
│   ├── block.json                      # Block metadata
│   └── editor.scss                     # Editor-only styles
│
├── vandvoyage-react-app/               # GIT SUBMODULE ← Frontend here
│   └── frontend/                       # Current React code
│       ├── src/
│       ├── public/
│       └── package.json
│
├── build/                              # Compiled output (gitignored)
│   ├── index.js                        # Block editor bundle
│   ├── view.js                         # Frontend React app bundle
│   ├── view.css                        # Compiled styles
│   └── leaflet/                        # Leaflet assets
│
└── assets/
    └── icon.svg                        # Block icon
```

---

## ⚙️ Block Attributes (Configuration)

### block.json

```json
{
  "apiVersion": 2,
  "name": "vandvoyage/transit-map",
  "title": "VandVoyage Transit Map",
  "category": "widgets",
  "icon": "location-alt",
  "description": "Interactive transit map showing TTC, GO Transit, VIA Rail and more",
  "supports": {
    "html": false
  },
  "attributes": {
    "apiEndpoint": {
      "type": "string",
      "default": "http://localhost:5001"
    },
    "enabledLayers": {
      "type": "array",
      "default": [
        "allStations",
        "goStations",
        "ttcStations",
        "viaRailStations",
        "amtrakStations",
        "ttcLines",
        "bikeLanes",
        "goLines",
        "waterlooIon"
      ]
    },
    "showSearchBar": {
      "type": "boolean",
      "default": true
    },
    "mapCenter": {
      "type": "object",
      "default": { "lat": 49.095, "lng": -89.78 }
    },
    "mapZoom": {
      "type": "number",
      "default": 5
    },
    "mapHeight": {
      "type": "string",
      "default": "600px"
    }
  }
}
```

### Configuration Interface (WordPress Editor)

The WordPress admin will see in the block's Inspector Panel:

**📡 Panel 1: API Configuration**
- Text input: Backend API URL
- Example: `http://localhost:5001` or `https://api.vandvoyage.com`

**🗺️ Panel 2: Map Settings**
- Slider: Default Zoom Level (3-15)
- Input: Map Height (600px, 80vh, etc.)

**📍 Panel 3: Enabled Layers** (9 checkboxes)
- ☑ All Stations
- ☑ GO Stations
- ☑ TTC Stations
- ☑ VIA Rail Stations
- ☑ Amtrak Stations
- ☑ TTC Lines
- ☑ Toronto Bike Lanes
- ☑ GO Lines
- ☑ Waterloo Ion

**✨ Panel 4: Features**
- Toggle: Show Search Bar

---

## 📝 Critical Files to Modify

### Frontend (Git Submodule - vandvoyage-server/frontend/)

#### 1. App.js → TransitMapApp.js
**Location:** `frontend/src/App.js`

**Changes:**
- Conditional rendering of layers based on `enabledLayers` config
- Remove `Modal` component
- Add a simple `LoadingOverlay`
- Wrap in `ConfigProvider`

**Before:**
```javascript
<MapContainer>
  <LayersControl>
    <LayersControl.Overlay checked name="All Stations">
      <LoadAllStations />
    </LayersControl.Overlay>
    {/* All layers always rendered */}
  </LayersControl>
  <SearchBar />
  <Modal /> {/* Complex modal watching 16 states */}
</MapContainer>
```

**After:**
```javascript
const { enabledLayers, showSearchBar } = useConfig();

<MapContainer>
  <LayersControl>
    {enabledLayers.includes('allStations') && (
      <LayersControl.Overlay checked name="All Stations">
        <LoadAllStations />
      </LayersControl.Overlay>
    )}
    {/* Conditional rendering for each layer */}
  </LayersControl>
  {showSearchBar && <SearchBar />}
  <LoadingOverlay /> {/* Simple unified overlay */}
</MapContainer>
```

#### 2. store.js
**Location:** `frontend/src/app/store.js`

**Changes:**
- Add `configSlice`
- Remove `stationFormSlice` (no editing)

**Before:**
```javascript
export default configureStore({
  reducer: {
    stations: stationsReducer,
    stationForm: stationFormReducer, // ← REMOVE
    ttcLineOne: ttcLineOneReducer,
    // ... other slices
  },
});
```

**After:**
```javascript
export default configureStore({
  reducer: {
    config: configReducer, // ← NEW
    stations: stationsReducer,
    // stationForm removed
    ttcLineOne: ttcLineOneReducer,
    // ... other slices
  },
});
```

#### 3. New: configSlice.js
**Location:** `frontend/src/features/config/configSlice.js` (NEW)

```javascript
import { createSlice } from '@reduxjs/toolkit';

const configSlice = createSlice({
  name: 'config',
  initialState: {
    apiEndpoint: 'http://localhost:5001',
    enabledLayers: [],
    showSearchBar: true,
    mapCenter: { lat: 49.095, lng: -89.78 },
    mapZoom: 5,
  },
  reducers: {
    setConfig: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setConfig } = configSlice.actions;
export const getApiEndpoint = (state) => state.config.apiEndpoint;
export const getEnabledLayers = (state) => state.config.enabledLayers;
export const getShowSearchBar = (state) => state.config.showSearchBar;

export default configSlice.reducer;
```

#### 4. stationsSlice.js (Pattern for all slices)
**Location:** `frontend/src/features/markers/stationsSlice.js`

**Changes:** Use dynamic endpoint from Redux config

**Before:**
```javascript
import { endpoint } from "../../app/constants";

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async () => {
    const { data, status } = await axios.get(`${endpoint}/stations`);
    return data;
  }
);
```

**After:**
```javascript
import { getApiEndpoint } from "../config/configSlice";

export const fetchStations = createAsyncThunk(
  "stations/fetchStations",
  async (_, { getState }) => {
    const endpoint = getApiEndpoint(getState());
    const { data, status } = await axios.get(`${endpoint}/stations`);
    return data;
  }
);
```

**⚠️ APPLY THIS PATTERN TO ALL 17 SLICES**

#### 5. Popups.js → ReadOnlyPopup.js
**Location:** `frontend/src/components/Popups.js`

**Changes:** Remove edit form

**Before:**
```javascript
import Form from "../features/markers/Form";

<Popup>
  <Form station={station} /> {/* Full editing */}
</Popup>
```

**After:**
```javascript
// DO NOT import Form

<Popup>
  <div className="station-info">
    <h3>{station.stationName}</h3>
    <p>Line: {station.line}</p>
    <p>Coordinates: [{station.lat}, {station.lng}]</p>
  </div>
</Popup>
```

#### 6. SearchBar.js
**Location:** `frontend/src/components/SearchBar.js`

**Changes:**
- Replace MUI `TextField` with HTML `<input>`
- Already read-only (no functional changes)

**Before:**
```javascript
import { TextField } from "@mui/material";

<TextField
  label="Search stations"
  variant="outlined"
  value={searchTerm}
  onChange={handleSearch}
/>
```

**After:**
```javascript
<div className="search-bar">
  <input
    type="text"
    placeholder="Search stations"
    value={searchTerm}
    onChange={handleSearch}
    className="search-input"
  />
</div>
```

#### 7. constants.js
**Location:** `frontend/src/app/constants.js`

**Changes:** Remove export of endpoint (now comes from Redux)

**Before:**
```javascript
export const endpoint = process.env.REACT_APP_API_URL || "http://localhost:5001";
export const HTTP_STATUS = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});
```

**After:**
```javascript
// endpoint removed - now obtained from configSlice
export const HTTP_STATUS = Object.freeze({
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
});
```

### WordPress Plugin (NEW)

#### 8. vandvoyage-transit-map.php
**Location:** `wp-content/plugins/vandvoyage-transit-map/vandvoyage-transit-map.php`

```php
<?php
/**
 * Plugin Name: VandVoyage Transit Map
 * Description: Interactive transit map block for Gutenberg
 * Version: 1.0.0
 * Author: VandVoyage
 */

if (!defined('ABSPATH')) exit;

// Autoload classes
require_once plugin_dir_path(__FILE__) . 'includes/class-block-registration.php';
require_once plugin_dir_path(__FILE__) . 'includes/class-assets-loader.php';

// Initialize
function vandvoyage_init() {
    VandVoyage_Block_Registration::init();
    VandVoyage_Assets_Loader::init();
}
add_action('init', 'vandvoyage_init');
```

#### 9. includes/class-block-registration.php

```php
<?php
class VandVoyage_Block_Registration {
    public static function init() {
        add_action('init', [__CLASS__, 'register_block']);
    }

    public static function register_block() {
        register_block_type(
            plugin_dir_path(dirname(__FILE__)) . 'build',
            [
                'render_callback' => [__CLASS__, 'render_block'],
            ]
        );
    }

    public static function render_block($attributes) {
        $data_attrs = [
            'data-api-endpoint' => esc_attr($attributes['apiEndpoint']),
            'data-enabled-layers' => esc_attr(json_encode($attributes['enabledLayers'])),
            'data-show-search-bar' => esc_attr($attributes['showSearchBar'] ? 'true' : 'false'),
            'data-map-center' => esc_attr(json_encode($attributes['mapCenter'])),
            'data-map-zoom' => esc_attr($attributes['mapZoom']),
            'data-map-height' => esc_attr($attributes['mapHeight']),
        ];

        ob_start();
        ?>
        <div class="vandvoyage-transit-map" <?php echo implode(' ', array_map(
            fn($k, $v) => "$k=\"$v\"",
            array_keys($data_attrs),
            $data_attrs
        )); ?>></div>
        <?php
        return ob_get_clean();
    }
}
```

#### 10. src/edit.js

```javascript
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, ToggleControl, CheckboxControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { apiEndpoint, enabledLayers, showSearchBar, mapZoom, mapHeight } = attributes;

    return (
        <>
            <InspectorControls>
                <PanelBody title="API Configuration">
                    <TextControl
                        label="Backend API URL"
                        value={apiEndpoint}
                        onChange={(value) => setAttributes({ apiEndpoint: value })}
                        help="URL where your Node.js backend is running"
                    />
                </PanelBody>

                <PanelBody title="Map Settings">
                    <RangeControl
                        label="Default Zoom Level"
                        value={mapZoom}
                        min={3}
                        max={15}
                        onChange={(value) => setAttributes({ mapZoom: value })}
                    />
                    <TextControl
                        label="Map Height"
                        value={mapHeight}
                        onChange={(value) => setAttributes({ mapHeight: value })}
                        help="e.g., 600px, 80vh, 100%"
                    />
                </PanelBody>

                <PanelBody title="Enabled Layers">
                    {/* 9 checkboxes for each layer */}
                    <CheckboxControl
                        label="All Stations"
                        checked={enabledLayers.includes('allStations')}
                        onChange={(checked) => {/* toggle logic */}}
                    />
                    {/* ... other 8 checkboxes */}
                </PanelBody>

                <PanelBody title="Features">
                    <ToggleControl
                        label="Show Search Bar"
                        checked={showSearchBar}
                        onChange={(value) => setAttributes({ showSearchBar: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="vandvoyage-transit-map-preview">
                <p>Map will be displayed here (preview in editor coming soon)</p>
            </div>
        </>
    );
}
```

#### 11. src/view.js (Frontend Entry Point)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { setConfig } from './features/config/configSlice';
import TransitMapApp from './TransitMapApp';

// Find all instances of the block on the page
document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.vandvoyage-transit-map');

    blocks.forEach((block) => {
        // Get configuration from data attributes
        const config = {
            apiEndpoint: block.dataset.apiEndpoint,
            enabledLayers: JSON.parse(block.dataset.enabledLayers),
            showSearchBar: block.dataset.showSearchBar === 'true',
            mapCenter: JSON.parse(block.dataset.mapCenter),
            mapZoom: parseInt(block.dataset.mapZoom),
        };

        // Set config in Redux
        store.dispatch(setConfig(config));

        // Render React app
        ReactDOM.render(
            <Provider store={store}>
                <TransitMapApp config={config} />
            </Provider>,
            block
        );
    });
});
```

---

## 📅 Implementation Plan (4 Weeks)

### Week 1: Plugin Setup + Submodule

**Days 1-2: Plugin structure**
- [ ] Create `wp-content/plugins/vandvoyage-transit-map/`
- [ ] `vandvoyage-transit-map.php` with WordPress headers
- [ ] `package.json` with `@wordpress/scripts`
- [ ] Git: Initialize repository

**Days 3-4: Git Submodule**
- [ ] Add `vandvoyage-server` as a submodule
- [ ] Configure sparse-checkout (only `frontend/`)
- [ ] Script to copy `src/` into the build process

**Day 5: Block Registration**
- [ ] `block.json` with 7 attributes
- [ ] `includes/class-block-registration.php`
- [ ] First build test with `npm run build`

### Week 2: Refactor Frontend

**Days 1-2: Redux Config Slice**
- [ ] Create `src/features/config/configSlice.js`
- [ ] Selector `getApiEndpoint(state)`
- [ ] Modify `stationsSlice.js` (pattern)
- [ ] Apply the pattern to the other 16 line slices

**Days 3-4: Read-Only Components**
- [ ] `ReadOnlyPopup.js` (no Form component)
- [ ] `LoadingOverlay.js` (replace Modal)
- [ ] Remove `stationFormSlice` from store

**Day 5: Conditional Rendering**
- [ ] `TransitMapApp.js` with `enabledLayers` checks
- [ ] Each `LayersControl.Overlay` conditional
- [ ] `SearchBar` guarded by `showSearchBar`

### Week 3: WordPress Integration

**Days 1-2: Block Editor (edit.js)**
- [ ] InspectorControls - API Configuration panel
- [ ] InspectorControls - Map Settings panel
- [ ] InspectorControls - Layers panel (9 checkboxes)
- [ ] InspectorControls - Features panel
- [ ] Preview mode in editor (optional)

**Days 3-4: Frontend Rendering**
- [ ] `src/view.js` entry point
- [ ] ConfigProvider component (if needed)
- [ ] PHP render callback in `class-block-registration.php`
- [ ] Data attributes → React props flow

**Day 5: Build Process**
- [ ] `webpack.config.js` custom config
- [ ] Bundle all dependencies
- [ ] CSS extraction (Leaflet + custom)
- [ ] Test bundle output in local WordPress

### Week 4: Optimization + Testing

**Days 1-2: Optimizations**
- [ ] Replace MUI TextField with native HTML `<input>`
- [ ] Code splitting by layers (lazy load)
- [ ] ErrorBoundary component
- [ ] Bundle size analysis

**Days 3-4: CORS + API Testing**
- [ ] Backend: Add WordPress domains to CORS
- [ ] Test with production API
- [ ] Error handling for all endpoints
- [ ] Loading states and error messages

**Day 5: Documentation**
- [ ] README.md for the plugin
- [ ] Installation instructions
- [ ] Guide for updating submodule
- [ ] Screenshots for WordPress.org (optional)

---

## ⚡ Benefits of This Approach

1. ✅ **Code reuse:** 80% of the frontend remains unchanged
2. ✅ **Keep Redux:** Avoids rewriting 17 slices and all components
3. ✅ **Git submodule:** Controlled updates, no dependency chaos
4. ✅ **Read-only:** Greatly simplifies (no forms, auth, PUT/DELETE)
5. ✅ **Configurable:** Each block instance can enable different layers
6. ✅ **Own bundle:** No conflicts with other WordPress plugins
7. ✅ **Separate backend:** Clean and scalable architecture
8. ✅ **Only GET requests:** No auth/permission concerns

---

## 🚨 Challenges and Mitigations

| Challenge | Mitigation |
|---------|------------|
| Large bundle size | Remove MUI (~80KB), use native HTML → ~105KB final |
| CORS configuration | Backend already uses CORS; add WP domain to `origin` array |
| Redux complexity | Keep Redux but simplify (remove stationForm, Modal) |
| WordPress testing | Use `@wordpress/env` for a local environment matching production |
| Submodule updates | NPM script for controlled updates, not automatic |
| Backend deployment | Document clearly that the backend must be running |

---

## ✅ Low Risks

- ✅ React 17 bundled → No version conflicts with other WP plugins
- ✅ Leaflet is well documented → Easy integration
- ✅ `@wordpress/scripts` → Standard and maintained build process
- ✅ Separate Node.js backend → Clean architecture
- ✅ Only GET requests → Minimal security concerns

---

## 🎬 How to Start

### Prerequisites

1. **WordPress installed** (local or server)
2. **Node.js backend running** on an accessible URL
3. **CORS configured** in the backend
4. **Git** installed
5. **Node.js** and **npm** installed

### Initial steps

1. **Create plugin structure:**
   ```bash
   cd wp-content/plugins/
   mkdir vandvoyage-transit-map
   cd vandvoyage-transit-map
   ```

2. **Initialize Git:**
   ```bash
   git init
   ```

3. **Add submodule:**
   ```bash
   git submodule add <URL-of-vandvoyage-server> vandvoyage-react-app
   ```

4. **Install dependencies:**
   ```bash
   npm init -y
   npm install --save-dev @wordpress/scripts
   ```

5. **Follow the 4-week implementation plan**

---

## 📞 Support and Next Steps

This plan is designed to be executed in 4 weeks by a developer familiar with:
- React + Redux
- WordPress Gutenberg blocks
- Node.js backends
- Git submodules

If you have questions or need clarification on any step, consult this document or the detailed plan in `.claude/plans/structured-soaring-lemon.md`.

---

**Last updated:** 2025-12-12  
**Plan version:** 1.0
