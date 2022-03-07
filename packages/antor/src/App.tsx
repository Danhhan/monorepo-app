import { Suspense } from 'react';
import {
  Button,
  AntoreeCustomizeLoading,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { ErrorBoundary } from 'components';
import AppProvider from 'AppProvider';
import AppRouter from 'AppRouter';
import { isMobile } from 'react-device-detect';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const fallbackComponent = (
  <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
    {/* <LoadingSpinner size="xl" />
    <Text>
      <p>Loading...</p>
    </Text> */}
    <AntoreeCustomizeLoading />
  </div>
);

const RedirectToMobileComponent = () => (
  <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
    <Title className="text-center" size="m">
      <p>We recently still not support web version on mobile devices.</p>
    </Title>
    <Spacer size="m" />
    <Button fill>
      <a
        style={{ textDecoration: 'none', color: 'white' }}
        href="http://bit.ly/Antoree-App"
      >
        <Text>Try On Our App Now!!!</Text>
      </a>
    </Button>
  </div>
);

export default function App() {
  return isMobile ? (
    <RedirectToMobileComponent />
  ) : (
    <Suspense fallback={fallbackComponent}>
      <ErrorBoundary>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </ErrorBoundary>
    </Suspense>
  );
}
