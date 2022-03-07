import { AntoreeCustomizeLoading } from '@antoree/ant-ui';
import AppProvider from 'AppProvider';
import AppRouter from 'AppRouter';
import { ErrorBoundary } from 'components';
import { Suspense, useEffect } from 'react';

const fallbackComponent = (
  <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
    {/* <LoadingSpinner size="xl" />
    <Text>
      <p>Loading...</p>
    </Text> */}
    <AntoreeCustomizeLoading />
  </div>
);

export default function App() {
  return (
    <Suspense fallback={fallbackComponent}>
      <ErrorBoundary>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
