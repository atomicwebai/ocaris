# Repository Guidelines

## Project Structure

Ocaris is a React single-page application built with Vite and Tailwind CSS. Application code lives in `src/`: `pages/` contains route-level screens, `components/` reusable interface elements, `context/` shared reading preferences, and `data/` the bundled liturgical texts. Global styles are in `src/index.css`; routing and the app shell are in `src/App.jsx`. Static public assets belong in `public/` if added. There is currently no test directory or automated test suite.

## Development and Build Commands

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Vite development server (normally at `http://localhost:5173`).
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the production bundle locally after building.

## Coding Style and Naming

Use JavaScript ES modules and React function components. Follow the existing two-space indentation, single-quoted strings, and semicolon style. Name components and page files in PascalCase (for example, `LiturgicalViewer.jsx` and `DailyLiturgyPage.jsx`); use camelCase for variables and functions. Keep route-specific UI in `src/pages/`, reusable UI in `src/components/`, and static liturgical content in `src/data/`. Use Tailwind utility classes and preserve the existing light, dark, and sepia theme conventions. No formatter or linter is configured, so keep changes consistent with nearby code.

## Testing and Validation

There is no `npm test` script or configured test framework. For UI or application changes, run `npm run build` to catch compilation and bundling errors. When changing date-driven liturgy, verify a representative date with available readings and one where optional content is absent.

## Commits and Pull Requests

The Git history includes a `feat:` commit and short Portuguese descriptive messages. Use a concise imperative summary, preferably with a conventional prefix such as `feat:`, `fix:`, or `docs:`. Pull requests should describe user-visible changes, list validation performed, link related issues when applicable, and include screenshots for visual changes. Call out changes to API usage, environment configuration, or deployment behavior.

## Configuration and External Data

The daily liturgy screen requests date-specific content from `https://liturgia.up.railway.app/v2/`. Keep API failures visible and avoid embedding credentials or environment-specific secrets in client code.
