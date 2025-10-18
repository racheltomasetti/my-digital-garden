# Live Stream Indicator - Implementation Plan

## Project Overview

Build a floating live indicator in the top-left corner of the homepage that automatically detects when you're streaming on Twitch and displays stream information. When offline, the indicator is completely hidden.

---

## Architecture Overview

### Tech Stack

- Next.js API Routes (server-side Twitch API calls)
- Twitch Helix API (stream status check)
- React Component (floating card UI)
- Polling mechanism (check status every 60s)

### Data Flow

1. Frontend component polls `/api/stream-status` every 60 seconds
2. API route checks Twitch API (with 60s cache to avoid rate limits)
3. If live, component shows animated card with stream info
4. If offline, component is hidden

---

## Build Steps

### ✅ COMPLETED

- [x] Twitch Developer Application registered
- [x] Client ID, Client Secret, and Username stored in `.env.local`
- [x] Restream.io account set up
- [x] OBS configured with streaming screens
- [x] YouTube verified for live streaming
- [x] Multi-platform streaming ready via Restream.io

### 🔨 TO BUILD

#### Step 1: Create API Route

**File:** `/app/api/stream-status/route.ts`

**Requirements:**

- Authenticate with Twitch API (OAuth client credentials flow)
- Fetch user ID from username
- Check if stream is live via Helix API
- Return stream data: `{ isLive, title, game, viewerCount, thumbnailUrl }`
- Implement 60-second cache to prevent rate limiting
- Handle errors gracefully

**Twitch API Endpoints:**

- Token: `POST https://id.twitch.tv/oauth2/token`
- User: `GET https://api.twitch.tv/helix/users?login={username}`
- Stream: `GET https://api.twitch.tv/helix/streams?user_id={user_id}`

**Environment Variables Required:**

- `TWITCH_CLIENT_ID`
- `TWITCH_CLIENT_SECRET`
- `TWITCH_USERNAME`

---

#### Step 2: Build Live Indicator Component

**File:** `/components/LiveIndicator.tsx`

**Requirements:**

- Poll `/api/stream-status` every 60 seconds using `setInterval`
- Two states: hidden (offline) or visible (live)
- When live, display:
  - 🔴 Animated "LIVE" badge with pulse effect
  - Stream title
  - Viewer count (with eye icon)
  - "Watch Stream" button/link
- Smooth fade-in/out animations using CSS transitions
- Click anywhere on card to open stream in new tab
- Open stream URL: `https://twitch.tv/{username}`
- Responsive design (scales for mobile)
- Use `useEffect` for polling logic
- Clean up interval on component unmount

---

#### Step 3: Style the Component

**Styling Requirements:**

- Position: `fixed` top-left corner (e.g., `top: 20px, left: 20px`)
- Z-index high enough to float above content (e.g., `z-index: 1000`)
- Card styling options:
  - Glassmorphism: `backdrop-blur`, semi-transparent background
  - OR solid card with subtle drop shadow
- Pulse animation on live dot (CSS `@keyframes`)
- Hover effects on clickable elements (cursor pointer, slight scale)
- Smooth transitions for showing/hiding (opacity + transform)
- Mobile responsive: smaller on mobile, adjust positioning if needed

**Design Notes:**

- Keep it subtle but semi-prominent
- Top-left corner placement (can adjust later)
- Hidden completely when offline

---

#### Step 4: Integrate into Homepage

**File:** `/app/page.tsx`

**Requirements:**

- Import and render `<LiveIndicator />` component
- Place it outside main content containers so it floats freely
- Ensure it doesn't interfere with existing layout
- Test positioning on different screen sizes

**Implementation:**

```tsx
import LiveIndicator from "@/components/LiveIndicator";

export default function Home() {
  return (
    <>
      <LiveIndicator />
      {/* Rest of your homepage content */}
    </>
  );
}
```

---

#### Step 5: Testing & Polish

**Testing Checklist:**

- [ ] Test with stream live vs offline
- [ ] Verify caching works (check Network tab in DevTools)
- [ ] Test click-through to Twitch stream
- [ ] Mobile responsiveness check
- [ ] Different screen sizes (desktop, tablet, mobile)
- [ ] Error handling for API failures
- [ ] Console errors check
- [ ] Loading state displays correctly (optional)

**Polish Items:**

- Add loading state while fetching initial status (optional)
- Error handling: if API fails, hide component gracefully
- Accessibility: proper aria-labels, keyboard navigation
- Performance: ensure polling doesn't cause memory leaks

---

#### Step 6: Future Enhancements (Post-MVP)

- [ ] Add YouTube stream detection (check both platforms)
- [ ] Show which platform you're streaming on (Twitch/YouTube badge)
- [ ] Add stream preview thumbnail
- [ ] Notification sound when you go live (if user opts in)
- [ ] Add to `/ki` page as well
- [ ] Analytics: track how many people click through
- [ ] Add "Notify me when live" feature with email/push notifications

---

## File Structure

```
your-project/
├── .env.local (✅ completed)
│   ├── TWITCH_CLIENT_ID
│   ├── TWITCH_CLIENT_SECRET
│   └── TWITCH_USERNAME
├── app/
│   ├── page.tsx (needs update - Step 4)
│   ├── ki/
│   │   └── page.tsx (optional - Step 6)
│   └── api/
│       └── stream-status/
│           └── route.ts (to build - Step 1)
└── components/
    └── LiveIndicator.tsx (to build - Step 2)
```

---

## API Response Schema

### GET `/api/stream-status`

**Success Response (Live):**

```json
{
  "isLive": true,
  "title": "Building in Public - Personal Site Development",
  "game": "Software and Game Development",
  "viewerCount": 23,
  "thumbnailUrl": "https://static-cdn.jtvnw.net/previews-ttv/live_user_{username}-440x248.jpg"
}
```

**Success Response (Offline):**

```json
{
  "isLive": false
}
```

**Error Response:**

```json
{
  "error": "Failed to fetch stream status",
  "isLive": false
}
```

---

## Technical Notes

### Rate Limiting

- Twitch API: ~800 requests/minute (per client ID)
- Our implementation: ~1 request per minute per user (due to caching)
- Safe buffer: Even with 100 concurrent users, we're well within limits

### Caching Strategy

- Server-side cache with 60-second TTL
- Prevents hitting Twitch API on every frontend poll
- Frontend polls every 60 seconds (matches cache duration)

### Security

- API credentials never exposed to client
- All Twitch API calls happen server-side
- Client only receives stream status data

---

## Next Actions

1. Build the API route (Step 1)
2. Build the component (Step 2)
3. Integrate and test (Steps 3-5)

---

## Resources

- [Twitch API Documentation](https://dev.twitch.tv/docs/api/)
- [Twitch Authentication Guide](https://dev.twitch.tv/docs/authentication/)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
