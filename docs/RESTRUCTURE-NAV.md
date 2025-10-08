# Website Reorganization - Implementation Specifications

## Overview

Restructure the personal website navigation and Story page to create a clearer information hierarchy and user experience.

## Navigation Changes

### Current State

- Top navigation bar with "RAY'S GARDEN" (links to root page.tsx)
- Tabs: "My Story", "NOW", "Connect"
- First-time visitor modal on My Story page asking if user wants to "start at the beginning"

### Target State

- Top navigation bar with "RAY'S GARDEN" (links to root page.tsx) - **unchanged**
- New tabs: "Story", "Toolkit", "Connect"
- Remove first-time visitor modal
- Remove "NOW" tab

### Navigation Implementation Tasks

1. Update navigation component to reflect new tab names and routes:
   - "My Story" → "Story" (route: `/story`)
   - Add "Toolkit" (route: `/toolkit`)
   - Keep "Connect" (existing route)
2. Remove or disable the first-time visitor modal logic from the Story page

3. Remove "NOW" tab and any associated routing/navigation logic

## Story Page Restructure

### Current State

- Single page with chronological story content
- "NOW" tab links to top of this page
- First-time visitor flow

### Target State

**Page Layout (top to bottom):**

1. **Hero/Summary Section** (new)

   - Core narrative synthesizing the complete journey
   - Key learnings and insights
   - Vision for the world being worked toward
   - This should be a static, prominently displayed section

2. **Timeline Component** (replaces current story layout)
   - Reverse chronological order: most recent entries at **top**, oldest at **bottom**
   - Scrollable component
   - Visual timeline design (specific design details TBD - coordinate with designer/requester)

### Story Page Implementation Tasks

1. **Create new hero/summary section:**

   - Add a dedicated section at the top of `/story` page
   - Content to be provided separately (coordinate with content owner)
   - Ensure responsive design for mobile/tablet/desktop
   - Consider typography hierarchy for readability

2. **Refactor existing story content into Timeline component:**

   - Convert current story entries into timeline format
   - Implement reverse chronological sorting (newest first)
   - Preserve all existing story content/data
   - Ensure timeline is scrollable within the page layout

3. **Timeline component specifications:**
   - Design pattern: [To be determined - coordinate with designer]
   - Consider including:
     - Date markers for each entry
     - Visual timeline line/progression indicator
     - Entry titles/headings
     - Entry content/descriptions
   - Responsive behavior across breakpoints

## New Toolkit Page

### Requirements

1. Create new `/toolkit` route and page component
2. Page structure and content TBD - coordinate with content owner
3. Ensure consistent styling with existing pages (Story, Connect)
4. Add to navigation bar between "Story" and "Connect"

## Testing Requirements

### Functional Testing

- [ ] All navigation links route correctly
- [ ] "RAY'S GARDEN" logo links to root page
- [ ] Story page displays hero section followed by timeline
- [ ] Timeline displays in reverse chronological order
- [ ] Toolkit page renders and is accessible from navigation
- [ ] Connect page remains unchanged and functional
- [ ] First-time visitor modal no longer appears
- [ ] "NOW" tab no longer appears in navigation

### Responsive Testing

- [ ] Navigation responsive on mobile, tablet, desktop
- [ ] Story page hero section responsive across breakpoints
- [ ] Timeline component scrolls properly on all devices
- [ ] Toolkit page responsive across breakpoints

### Cross-browser Testing

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Verify no layout breaks or navigation issues

## Migration Considerations

1. **Content Migration:**

   - Extract hero/summary content for Story page (coordinate timing)
   - Map existing story entries to new timeline structure
   - Prepare Toolkit page content

2. **URL/Routing:**

   - Ensure `/story` route works
   - Handle any redirects if URLs are changing
   - Update internal links if any pages reference old routes

3. **Analytics/Tracking:**
   - Update any analytics tracking for renamed pages
   - Add tracking for new Toolkit page
   - Update event tracking if modal removal affects metrics

## Questions for Clarification

Before implementation, confirm:

1. Timeline component design specifics (visual style, interaction patterns)
2. Content for Story page hero section - when will this be ready?
3. Content for Toolkit page - scope and timeline?
4. Are there any existing timeline libraries/components to use, or build from scratch?

## Deliverables

- [ ] Updated navigation component
- [ ] Refactored Story page with hero section and timeline
- [ ] New Toolkit page (structure ready for content)
- [ ] Removed first-time visitor modal
- [ ] All tests passing
- [ ] Responsive design verified
- [ ] Documentation updated (if applicable)
