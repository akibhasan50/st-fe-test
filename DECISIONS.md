# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture

_Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?_

\*I structured state using TanStack Query to centralize server state, cache data, and simplify data fetching. To handle the flaky API, I configured retry: 3 with exponential backoff and set staleTime and gcTime to control caching and memory retention.

For loading states, I used keepPreviousData so UI transitions remain smooth during pagination or searches. The search input is debounced (500ms) and page resets on new filters. Errors from the API are handled gracefully through TanStack Query’s built-in mechanisms, ensuring the UI can respond appropriately without breaking.\*

## 2. Trade-offs and Omissions

_What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?_

\*I focused on core functionality, implemented unit tests with Vitest, and handled basic accessibility. I skipped E2E tests, Redux/Zustand not needed due to minimal prop drilling, Basic a11y implemented but still need to improve full keyboard/screen-reader support, and strict URL validation could be better.

With more time, I would add E2E tests, complete accessibility compliance, and stronger URL/state validation.\*

## 3. AI Usage

_How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you._

_I used AI tools like ChatGPT and Copilot to validate architecture decisions (e.g., keepPreviousData with debounced inputs for a flaky API), generate boilerplate code such as Tailwind classes and mock interfaces, refine CSS/styling (including the sticky blurred header), and even assist in writing unit tests with Vitest._

## 4. Edge Cases Identified

_Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here._

\*I identified a few edge cases and improvements.
-The product image doesn’t have a fallback if it fails to load.
-Background refetch errors may leave stale data without a clear retry option.
-URL parameters aren’t fully validated, which can lead to inconsistent states.
-Rapid user actions can cause temporary data mismatches due to race conditions.

-
