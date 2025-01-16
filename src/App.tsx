import { use } from 'react';

import { SignInPage } from './components/SignInPage/SignInPage.tsx';

/**
 * Intercepts requests to the API and returns mocked responses from the Service Worker (./mocks/handlers.ts).
 */
async function enableMocking() {
  const { worker } = await import('./mocks/browser');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start({
    serviceWorker: {
      url: 'http://localhost:8080/mockServiceWorker.js',
    },
    onUnhandledRequest(request, print) {
      const url = new URL(request.url);

      if (!url.pathname.includes('/api/')) {
        return;
      }

      print.warning();
    },
  });
}

const promise = enableMocking();

function App() {
  use(promise);

  return (
    <div className="App">
      <SignInPage />
    </div>
  );
}

export default App;
