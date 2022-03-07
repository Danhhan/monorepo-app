import { FC } from 'react';
import { ToastProvider } from '@antoree/ant-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { LanguageProvider, UserProvider } from 'contexts';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const AppProvider: FC<{}> = ({ children }) => (
  <LanguageProvider>
    <HelmetProvider context={{}}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastProvider />
    </HelmetProvider>
  </LanguageProvider>
);

export default AppProvider;
