import { FC } from 'react';
import { ToastProvider } from '@antoree/ant-ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { LanguageProvider } from 'services/translation/context';
import { AuthProvider } from 'services/auth/contexts';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AppProvider: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastProvider />
    </LanguageProvider>
  </QueryClientProvider>
);

export default AppProvider;
