import { getPathName } from 'helpers';
import { Redirect } from 'react-router';
import { useRetrieveOriginalLink } from 'services/affiliate';
import { useAuth } from 'services/auth/contexts';

const AutoRedirect: React.FC<{}> = ({}) => {
  const { isAuthenticated, choosedSubUser } = useAuth();
  /** Handle redirect to original link from short link */
  const pathName = getPathName();
  if (pathName) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, isSuccess } = useRetrieveOriginalLink(
      { code: pathName },
      {
        suspense: true,
      },
    );
    if (isSuccess) {
      window.location.href = `${data?.data?.campaignLink?.sourceLink}`;
    }
  }

  if (isAuthenticated) {
    if (!choosedSubUser) {
      return <Redirect to="/sign-in" />;
    }
    return <Redirect to="/today" />;
  }
  return <Redirect to="/today" />;
};

export default AutoRedirect;
