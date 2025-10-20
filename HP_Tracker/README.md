# HP Tracker with Remote Control

A D&D 5e HP tracking system with remote control capabilities.

## Features
- **Main Display** (`index.html`): Full-screen HP tracker with character portraits and health bars
- **Control Panel** (`server.html`): Remote control interface for managing HP from a different window/device
- **Wild Shape Support**: Special mechanics for Druid's Wild Shape (Batula)
- **Auto-scaling**: UI automatically adjusts to window size
- **Keyboard Shortcuts**: Fast character selection and HP changes

## How to Use

### Step 1: Start the Server
Run the server on port 8888:
```bash
python3 start_server.py
```

### Step 2: Open the Main Display
Open in your browser (for projection/display):
```
http://localhost:8888/index.html
```

### Step 3: Open the Control Panel
Open in another window/tab/device (for DM control):
```
http://localhost:8888/server.html
```

## Control Panel Usage

### HP Changes
1. Click a character button (or press 1-5)
2. Enter the HP amount to change
3. Click "Damage (-)" or "Heal (+)" (or use Arrow Left/Right)

### Wild Shape (Batula Only)
1. Enter the Wild Shape Max HP
2. Click "Activate" to enable Wild Shape
3. When active, HP changes apply to Wild Shape HP first
4. Wild Shape auto-deactivates when HP reaches 0
5. Click "Deactivate" to manually end Wild Shape

## Keyboard Shortcuts

### Main Display (index.html)
- `1-5`: Select character
- `Arrow Left`: -1 HP
- `Arrow Right`: +1 HP
- `Arrow Up/Down`: Navigate characters
- `Escape`: Deselect

### Control Panel (server.html)
- `1-5`: Select character
- `Arrow Left`: Apply damage
- `Arrow Right`: Apply heal
- `Escape`: Deselect

## Technical Details
- Communication uses `localStorage` for cross-window messaging
- Works on same origin (localhost)
- No backend/database required - pure client-side
- Portrait images should be placed in `Portrait/` folder

## Characters
1. Zendith (20 HP)
2. Terra (18 HP)
3. Feathers (28 HP)
4. Immeral (23 HP)
5. Batula (21 HP) - with Wild Shape

## Notes
- Both windows must be open in the same browser for communication to work
- Refresh the main display if it gets out of sync
- Wild Shape HP is temporary and resets when deactivated
