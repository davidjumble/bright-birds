# BrightHR Absences 

## Hi

This SPA displays employee absences in a sortable table and highlights any conflicts. It’s built with **React, TypeScript, TanStack Query, and styled-components**, and demonstrates modern React best practices including hooks, memoization, and theming.


## what i've done

- **TanStack Query** is used for all data fetching:
  - It simplifies loading and error handling.
  - Provides caching and stale-time management to reduce unnecessary network requests.
  - Ensures a smooth UX when navigating between views.

- **Batching conflict requests**:
  - The API only supports fetching conflicts one ID at a time.
  - Requests are batched and limited in concurrency to avoid overwhelming the server.
  - This improves performance while keeping the UI responsive.
  - Ideally, the backend should allow sending multiple IDs at once and return all corresponding conflict data.

- **Memoization with `useMemo`**:
  - Sorting and preparing lists for display can be expensive with many rows.
  - `useMemo` is used to cache computed results (like sorted absences and ID lists) to avoid unnecessary recalculations on every render. more scaleable innit

- **Styled-components and theming**:
  - All colors, fonts, and border styles come from a central theme.
  - Provides consistent styling for tables, badges, and buttons.
  - Supports easy future changes to the visual design.



## Notes

- The current conflict fetching is a client-side workaround due to API limitations.
- In production, it would be preferable to have a batch API endpoint for conflicts, returning multiple results in a single response.
- Memoization ensures smooth performance when the dataset grows, minimizing re-renders and repeated calculations.
