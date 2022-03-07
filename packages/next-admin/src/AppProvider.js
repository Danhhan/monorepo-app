import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastProvider } from '@antoree/ant-ui';
import { BreadcrumbsProvider } from 'contexts/breadcrumbsContext';
import { CurrentUserProvider } from 'contexts/UserContext';
import { GlobalConfirmModal } from 'components';
import LanguageProvider from 'contexts/LanguageContext';
import { ErrorModalProvider } from 'contexts/ErrorModalContext';
import ErrorModal from 'components/ErrorModal';
import { HeaderActionProvider } from 'contexts/HeaderActionContext';

const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorModalProvider>
        <LanguageProvider>
          <>
            <CurrentUserProvider>
              <BreadcrumbsProvider>
                <HeaderActionProvider>{children}</HeaderActionProvider>
              </BreadcrumbsProvider>
            </CurrentUserProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <ToastProvider />
            <GlobalConfirmModal />
            <ErrorModal />
          </>
        </LanguageProvider>
      </ErrorModalProvider>
    </QueryClientProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppProvider;
