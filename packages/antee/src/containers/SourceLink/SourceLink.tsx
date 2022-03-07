import {
  Page,
  PageBody,
  PageContent,
  LoadingSpinner,
  Text,
  Spacer,
} from '@antoree/ant-ui';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useLocation, useHistory } from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';

export type SourceLinkProps = {};

const SourceLink: React.FC<SourceLinkProps> = () => {
  const { isAuthenticated } = useAuth();

  const history = useHistory();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  useEffect(() => {
    const sourceFrom = query.get('from');

    if (isAuthenticated) {
      history.push('/sign-in');
    } else if (sourceFrom) {
      localStorage.setItem('source', sourceFrom);

      history.push('/sign-in');
    } else {
      history.push('/sign-in');
    }
  }, []);

  const query = useQuery();

  return (
    <Page paddingSize="m" className="bg-white" style={{ minHeight: '100vh' }}>
      <PageBody style={{ border: 'none' }}>
        <PageContent
          paddingSize="none"
          style={{ border: 'none', boxShadow: 'none' }}
          className="flex justify-center items-center"
        >
          <div className="flex justify-center items-center m-6 flex-col">
            <LoadingSpinner size="xl" />
            <Spacer size="m" />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Loading..." />
              </p>
            </Text>
          </div>
        </PageContent>
      </PageBody>
    </Page>
  );
};

export default SourceLink;
