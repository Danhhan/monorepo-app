import {
  Text,
  Button,
  Spacer,
  LoadingSpinner,
  Icon,
  Avatar,
  FlexGrid,
  FlexItem,
  notification,
  PageContentHeaderSection,
  ButtonEmpty,
  PageContentHeader,
  Title,
} from '@antoree/ant-ui';

import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveSubUsers, useRetrieveSubUserToken } from 'services/auth';
import { useRetrieveCurrentUser } from 'services/user';
import { isEmpty } from 'lodash';
import { useHistory } from 'react-router-dom';
import styles from './SignIn.module.scss';

interface Subuser {
  handleSuccess: any;
}

const SubUser = ({ handleSuccess }: Subuser) => {
  const {
    setSubUserHandler,
    authenticateSubUserHandler,
    signOutHandler,
  } = useAuth();

  const [profileChoosed, setProfileChoosed] = useState(0);
  const history = useHistory();

  const [isUsingBackUp, setIsUsingBackUp] = useState(false);

  const [subUserChoosed, setSubUserChoosed] = useState(0);

  const { data, isLoading } = useRetrieveSubUsers({
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: !!localStorage.getItem('token'),
    onSuccess: dataRes => {
      const arrLR = dataRes?.data?.data?.learningRequest || [];
      if (arrLR && arrLR[0]) {
        setProfileChoosed(arrLR[0].id);

        if (arrLR.length === 1) {
          confirmHandler(arrLR[0]);
        }
      } else {
        const contactInfo = dataRes?.data?.data?.contact;
        console.log(contactInfo);

        setSubUserHandler({
          id: contactInfo.id,
          userId: contactInfo.user.id,
          email: contactInfo.user.email,
          name: contactInfo.user.name,
          avatarUrl: contactInfo.user.avatarUrl,
          phone: contactInfo.user.phone,
        });
      }
    },
    onError: err => {
      setIsUsingBackUp(true);
    },
  });

  // if (typeof data !== 'undefined') {
  //   handleSuccess();
  // }

  const { isLoading: isLoadingBackup } = useRetrieveCurrentUser({
    refetchOnWindowFocus: false,
    cacheTime: 0,
    enabled: isUsingBackUp && !!localStorage.getItem('token'),
    onSuccess: dataRes => {
      if (isUsingBackUp && !!localStorage.getItem('token')) {
        const contactInfo = dataRes?.data;
        const preToken = localStorage.getItem('token');

        if (preToken) {
          authenticateSubUserHandler(preToken);
        }

        setSubUserHandler({
          id: contactInfo.id,
          userId: contactInfo.id,
          email: contactInfo.email,
          name: contactInfo.displayName,
          avatarUrl: contactInfo.avatar,
          phone: undefined,
        });
      }
    },
    onError: err => {
      const errCode = err?.response?.status;

      // signOutHandler();

      // const mesError = err?.response?.data?.errors[0]?.message;
      if (window.location.pathname !== '/sign-in') {
        window.location.reload();
      } else {
        history.push('/today');
      }
    },
  });

  const { isLoading: isLoadingSubUserToken } = useRetrieveSubUserToken(
    {
      idSub: subUserChoosed,
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      retry: 1,
      enabled: subUserChoosed > 0,
      onSuccess: dataRes => {
        handleSuccess();
        authenticateSubUserHandler(dataRes?.data?.accessToken);
      },
      onError: err => {
        const mesError = err?.response?.data?.errors[0]?.message;
        const errCode = err?.response?.status;

        notification.error({
          title: 'Login Failure!',
          text: mesError || (
            <FormattedMessage
              defaultMessage="Log in failure please contact tech for help! Error: {code}"
              values={{ code: errCode }}
            />
          ),
        });
      },
    },
  );

  const confirmHandler = (itemPara?: any) => {
    const userFinded =
      itemPara ||
      data?.data?.data?.learningRequest.find(
        item => profileChoosed === item.id,
      );

    if (userFinded) {
      setSubUserChoosed(userFinded.user.id || 0);
      setSubUserHandler({
        id: userFinded.id,
        userId: userFinded.user.id,
        email: userFinded.user.email,
        name: userFinded.user.name,
        avatarUrl: userFinded.user.avatarUrl,
        phone: userFinded.user.phone,
      });
      // window.location.reload();
    }
  };

  return isLoading || isLoadingBackup ? (
    <div className="p-10 flex flex-col justify-center items-center">
      <LoadingSpinner size="xl" />
      <Spacer size="m" />
      <Text size="m">
        <FormattedMessage defaultMessage="Loadding..." />
      </Text>
    </div>
  ) : (
    <div>
      <FlexGrid
        columns={4}
        gutterSize="m"
        className="justify-evenly flex-wrap"
        responsive={false}
      >
        {isEmpty(data) ? (
          <div>
            <p style={{ fontSize: '14px' }}>Không tìm thấy subuser</p>
            <Button
              style={{ marginTop: '15px' }}
              isLoading={isLoadingSubUserToken}
              fill
              fullWidth
              onClick={() => history.push('/today')}
            >
              <FormattedMessage defaultMessage="Tiếp tục" />
            </Button>
          </div>
        ) : (
          <>
            {data?.data?.data?.learningRequest?.map(({ id, user }) => (
              <FlexItem
                key={id}
                className="justify-center items-center relative cursor-pointer"
                onClick={() => setProfileChoosed(id)}
                grow={false}
              >
                <Avatar
                  name="image-subuser"
                  type="space"
                  className={styles.customAvatarSubUser}
                  style={{
                    border: `3px solid ${
                      profileChoosed === id ? '#00C081' : 'transparent'
                    }`,
                  }}
                  // eslint-disable-next-line react/jsx-curly-brace-presence
                  imageUrl={user?.avatarUrl || ''}
                  size="xl"
                />
                <Icon
                  type="checkInCircleFilled"
                  size="m"
                  color="primary"
                  className="absolute top-1 right-1 bg-white rounded-full"
                  style={{
                    display: profileChoosed === id ? 'block' : 'none',
                  }}
                />
                <Text size="s">
                  <p
                    className="mt-2 overflow-hidden overflow-ellipsis whitespace-nowrap"
                    style={{ maxWidth: '100px' }}
                  >
                    {user?.name || ''}
                  </p>
                </Text>
              </FlexItem>
            ))}
            <Button
              isLoading={isLoadingSubUserToken}
              fill
              fullWidth
              onClick={() => confirmHandler()}
            >
              <FormattedMessage defaultMessage="Xác nhận" />
            </Button>
          </>
        )}
      </FlexGrid>
      <Spacer size="m" />
    </div>
  );
};

export default SubUser;
