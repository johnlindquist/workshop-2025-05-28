# Task: Implement Mock Design from designs/mock.tsx into Frontend

## Commit 1: feat: Add WorkshopBanner component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `WorkshopBanner` component in `apps/frontend/app/components/WorkshopBanner.tsx`. This component displays a dismissible banner for a workshop promotion. Implement basic styling using Tailwind CSS classes as defined in `designs/mock.tsx`.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=WorkshopBanner.spec.tsx`
    *   **Expected Outcome:** Component renders correctly with the provided text and link. Test clickability of the link.
2.  **Logging Check:**
    *   **Action:** Load the page containing the `WorkshopBanner`.
    *   **Expected Log:** `INFO: WorkshopBanner component rendered.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info` (environment variable)

---

## Commit 2: feat: Add Header component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `Header` component in `apps/frontend/app/components/Header.tsx`. This component includes the site logo, navigation links (Topics, Courses), a search bar, and sign-in/enrollment links, and a dark mode toggle. Implement styling from `designs/mock.tsx`. The dark mode toggle functionality will be connected in a later commit.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=Header.spec.tsx`
    *   **Expected Outcome:** Component renders all navigation elements, search bar, and placeholder logo. Links are correct.
2.  **Logging Check:**
    *   **Action:** Interact with the dark mode toggle (even if not fully functional yet).
    *   **Expected Log:** `INFO: Header component rendered. Dark mode toggle clicked.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 3: feat: Add HeroSection component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `HeroSection` component in `apps/frontend/app/components/HeroSection.tsx`. This component displays the main headline and a prominent search bar. Implement styling from `designs/mock.tsx`.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=HeroSection.spec.tsx`
    *   **Expected Outcome:** Component renders the headline and search input.
2.  **Logging Check:**
    *   **Action:** Type into the search input.
    *   **Expected Log:** `INFO: HeroSection component rendered. Search input focused/changed.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 4: feat: Add BrowseTopics component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `BrowseTopics` component in `apps/frontend/app/components/BrowseTopics.tsx`. This component displays a grid of topics with images and names, linking to topic pages. Use placeholder data and images for now. Implement styling from `designs/mock.tsx`.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=BrowseTopics.spec.tsx`
    *   **Expected Outcome:** Component renders a grid of topics. Each topic has an image, name, and link.
2.  **Logging Check:**
    *   **Action:** Click on a topic link.
    *   **Expected Log:** `INFO: BrowseTopics component rendered. Topic 'React' clicked.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 5: feat: Add FeedCard and FeedSection components [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create `FeedCard` in `apps/frontend/app/components/FeedCard.tsx` and `FeedSection` in `apps/frontend/app/components/FeedSection.tsx`. `FeedCard` represents an individual item in the feed (article or lesson). `FeedSection` displays a list of `FeedCard`s with a sort dropdown. Use placeholder data. Implement styling from `designs/mock.tsx`.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=FeedCard.spec.tsx && pnpm nx test frontend --testFile=FeedSection.spec.tsx`
    *   **Expected Outcome:** `FeedCard` renders correctly for different item types. `FeedSection` renders multiple cards and the sort dropdown.
2.  **Logging Check:**
    *   **Action:** Change the sort order in `FeedSection`.
    *   **Expected Log:** `INFO: FeedSection component rendered. Sort order changed to 'popular'.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 6: feat: Add Pagination component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `Pagination` component in `apps/frontend/app/components/Pagination.tsx`. This component provides navigation for paginated content (e.g., the feed). Implement styling from `designs/mock.tsx`. Functionality will be basic initially.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=Pagination.spec.tsx`
    *   **Expected Outcome:** Component renders page numbers and next/previous/first/last links.
2.  **Logging Check:**
    *   **Action:** Click a page number or navigation link.
    *   **Expected Log:** `INFO: Pagination component rendered. Page '2' clicked.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 7: feat: Add Footer component [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Create the `Footer` component in `apps/frontend/app/components/Footer.tsx`. This component includes site links, copyright information, and a dark mode toggle. Implement styling from `designs/mock.tsx`. The dark mode toggle functionality will be connected in a later commit.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=Footer.spec.tsx`
    *   **Expected Outcome:** Component renders all links and the dark mode toggle.
2.  **Logging Check:**
    *   **Action:** Click the dark mode toggle in the footer.
    *   **Expected Log:** `INFO: Footer component rendered. Dark mode toggle clicked.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 8: feat: Integrate components into main App layout and implement dark mode [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Modify `apps/frontend/app/page.tsx` (or the main layout file) to include all newly created components (`WorkshopBanner`, `Header`, `HeroSection`, `BrowseTopics`, `FeedSection`, `Footer`). Implement the dark mode toggle functionality using `useState` and `useEffect` hooks as shown in `designs/mock.tsx`, ensuring it controls the `dark` class on the `html` element. Remove any linter errors from `designs/mock.tsx` related to missing React or incorrect props after components are moved.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx test frontend --testFile=App.spec.tsx` (or equivalent for the main page)
    *   **Expected Outcome:** All components render in the correct order. Dark mode toggle switches themes correctly, applying/removing the 'dark' class.
2.  **Logging Check:**
    *   **Action:** Toggle dark mode multiple times. Navigate through the page.
    *   **Expected Log:** `INFO: App loaded. Dark mode toggled to: true/false. All components mounted.`
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info`

---

## Commit 9: chore: Install React and fix linter errors [docs/tasks/2025-05-28-08-56-implement-mock-design.md]
**Description:**
Run `pnpm add react react-dom @types/react @types/react-dom` to install React and its types, resolving the "Cannot find module 'react'" error. Address the `FeedCard` prop type error by ensuring the `key` prop is not explicitly defined in the component's props interface, as React handles it automatically.

**Verification:**
1.  **Automated Test(s):**
    *   **Command:** `pnpm nx lint frontend && pnpm nx test frontend`
    *   **Expected Outcome:** All linter errors are resolved. All tests pass.
2.  **Logging Check:**
    *   **Action:** Start the development server.
    *   **Expected Log:** Application starts without React-related errors.
    *   **Toggle Mechanism:** `NEXT_PUBLIC_LOG_LEVEL=info` 