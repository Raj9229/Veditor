# V-Editor Debugging & Testing Guide

## 🐛 Issues Fixed

### 1. **Code Synchronization Not Working**
- **Problem**: Changes in one editor didn't appear in others
- **Fix**: 
  - Now waits for document to fully sync before creating Monaco binding
  - Added `onSync` event listener to ensure provider is ready
  - Provider now properly initializes before binding

### 2. **Connected Users Not Showing**
- **Problem**: User list was empty even with multiple connections
- **Fix**:
  - Fixed awareness state tracking
  - Added `updateUsers` function to capture all connected users
  - Now properly updates on awareness "change" events
  - Updates on initial connection and when users join/leave

### 3. **User Count Not Displaying**
- **Problem**: Count always showed 0
- **Fix**:
  - Connected to awareness change events properly
  - Updates state when users connect/disconnect
  - Displays real-time count in header

## 🚀 How to Test (Step by Step)

### Step 1: Start Backend Server
```bash
cd backend
npm run dev
```

**Expected Console Output:**
```
[Server] ✓ Server is running on http://localhost:3000
[Server] ✓ Socket.io ready for collaborative editing
```

### Step 2: Start Frontend Dev Server (new terminal)
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
  VITE v... 
  ➜  Local:   http://localhost:5173/
```

### Step 3: Open Multiple Browser Windows

**Window 1:**
- Open `http://localhost:5173`
- Enter username: `Alice`
- Click Join

**Expected Console Logs:**
```
[Veditor] Setting up provider for user: Alice
[Veditor] Provider created
[Veditor] Awareness set for user: Alice
[Veditor] Connected users updated: ["Alice"]
[Veditor] Connection status: connected
[Veditor] Sync event: true
[Veditor] Document synced, creating Monaco binding
[Veditor] Monaco binding created successfully
```

**Window 2:**
- Open `http://localhost:5173` in a new tab/window
- Enter username: `Bob`
- Click Join

**Expected Console Logs (Window 1):**
```
[Veditor] Connected users updated: ["Alice", "Bob"]
```

**Expected Console Logs (Window 2):**
```
[Veditor] Connected users updated: ["Alice", "Bob"]
```

**Expected Backend Console:**
```
[Server] Client connected: <socket-id>
[Server] Client connected: <socket-id>
```

### Step 4: Test Real-Time Sync

**In Window 1 (Alice's editor):**
- Type: `// Hello from Alice`

**Result:**
- Text appears immediately in Window 2 (Bob's editor)
- Both show the same content

**In Window 2 (Bob's editor):**
- Type: `console.log("Bob was here")`

**Result:**
- Text appears immediately in Window 1 (Alice's editor)
- Both editors are synchronized

### Step 5: Verify User List

**Header Section:**
- Should show "Connected Users (2)"
- Should display green pills with usernames: `Alice` `Bob`
- If you close one window, count should update to 1

## 🔍 Debugging Checklist

### If Users Not Showing:

1. **Check Browser Console (F12):**
   - Look for `[Veditor]` log messages
   - Should see "Connected users updated" logs
   - Should show awareness events

2. **Check Backend Console:**
   - Should see connection logs for each user
   - Check for any socket.io errors

3. **Verify Connection:**
   - Both clients should connect to `http://localhost:3000`
   - No CORS errors in browser console
   - Check Network tab → WebSocket connection should be active

### If Code Not Syncing:

1. **Verify Monaco Binding Created:**
   - Look for `[Veditor] Monaco binding created successfully`
   - If not appearing, binding might not be created

2. **Check Sync Status:**
   - Look for `[Veditor] Sync event: true`
   - If showing `false`, document isn't synced yet

3. **Verify Editor Mounted:**
   - Check if `[Veditor] Setting up provider for user` appears
   - Should appear after joining with username

## 🔧 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Failed to connect" | Ensure backend is running on port 3000 |
| Users list empty | Refresh browser, check awareness logs |
| Code not syncing | Wait 2-3 seconds after joining, code should sync |
| WebSocket errors | Check CORS settings (should allow `*`) |
| Editor blank | Wait for binding to create, don't type before sync |

## 📊 What's Working Now

✅ Multiple users can connect simultaneously  
✅ Real-time text synchronization using Yjs  
✅ User presence tracking via awareness  
✅ Connected user list displays correctly  
✅ User count updates in real-time  
✅ Proper Socket.io connection handling  
✅ Full Monaco Editor integration  
✅ Dark theme UI with Tailwind CSS  

## 🎯 Architecture Flow

1. User joins → username set
2. Editor mounts → ytextRef created
3. useEffect triggers → Provider created
4. Awareness initialized → User added to list
5. Document syncs → Monaco Binding created
6. Real-time sync active → Code changes propagate

## 📱 Try Multiple Devices

For best testing, open on different devices:
- Desktop + Laptop
- Desktop + Mobile (same network)
- Different browsers

All should sync in real-time!

## 💡 Pro Tips

- Open DevTools (F12) to see all `[Veditor]` logs
- Open backend terminal to see connection events
- Cursor positions and selections don't sync yet (can add later)
- Closing a browser tab automatically removes user from list

---

**Status**: ✅ Production Ready  
**Last Updated**: 2026-08-29
