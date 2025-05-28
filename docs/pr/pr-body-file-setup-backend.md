# Setup Backend Application with Express and E2E Testing

## Summary

This PR establishes the foundational backend infrastructure for the workshop project by adding a new Express.js backend application with comprehensive testing setup. The backend provides a minimal API endpoint and is configured with proper development tooling, build processes, and end-to-end testing capabilities using the Nx monorepo structure.

## Key Changes

- **New Backend Application (`apps/backend/`)**
  - Created Express.js server with basic API endpoint (`/api`)
  - Configured TypeScript compilation with `tsconfig.app.json`
  - Added Webpack configuration for bundling
  - Included static asset serving capability
  - Set up development server on port 3333

- **End-to-End Testing Setup (`apps/backend-e2e/`)**
  - Created dedicated e2e testing application
  - Configured Jest with SWC for fast test execution
  - Added global setup/teardown for test environment
  - Included basic API endpoint test using Axios

- **Workspace Configuration Updates**
  - Updated `nx.json` with Webpack plugin configuration
  - Modified `package.json` to include Express dependencies
  - Updated `pnpm-lock.yaml` with new package resolutions
  - Enhanced `tsconfig.json` for backend compilation

- **Development Infrastructure**
  - Configured build, serve, and preview targets via Nx plugins
  - Set up TypeScript compilation with proper module resolution
  - Added asset management and static file serving

## Testing Done

- **Manual Verification Steps:**
  1. Run `pnpm install` to install new dependencies
  2. Execute `nx serve backend` to start the development server
  3. Verify server starts on `http://localhost:3333`
  4. Test API endpoint: `curl http://localhost:3333/api`
  5. Expected response: `{"message":"Welcome to backend!"}`
  6. Run `nx test backend-e2e` to execute end-to-end tests
  7. Verify all tests pass successfully

- **Build Verification:**
  1. Run `nx build backend` to create production build
  2. Verify build artifacts are generated in `dist/apps/backend/`
  3. Confirm TypeScript compilation completes without errors

- **Workspace Integration:**
  1. Verify `nx graph` shows proper dependency relationships
  2. Confirm all Nx commands work correctly with new applications
  3. Test that existing frontend application remains unaffected

## Related Issues

This PR addresses the initial backend setup requirements for the workshop project, providing the foundation for future API development and integration with the frontend application.

## Notes

- The backend is currently minimal and intended for development/workshop purposes
- Production readiness will require additional security, logging, and error handling
- E2E tests are basic but provide a foundation for comprehensive API testing
- All new files follow the established project structure and coding standards 