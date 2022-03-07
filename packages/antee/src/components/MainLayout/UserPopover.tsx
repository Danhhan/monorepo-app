/* eslint-disable array-callback-return */
import {
  Avatar,
  ButtonEmpty,
  HeaderSectionItemButton,
  notification,
  Popover,
  Text,
  Outline,
} from '@antoree/ant-ui';
import ChangePassWord from 'components/User/ChangePassWord';
import UserProfile from 'components/User/UserProfile';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import { useToggle } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveCurrentUser, useRetrieveStudentInfo } from 'services/user';
import { useUpdatePassword } from 'services/user/updatePassword';
import {
  useLanguageContext,
  englishLocale,
  vietnameseLocaleStatusPara,
  englishLocaleStatusPara,
} from 'services/translation/context';

import styles from './UserPopover.module.scss';

const UserPopoverV2: React.FC<{}> = () => {
  const { locale } = useLanguageContext();

  const { isVisiable, toggle, close } = useToggle();

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const {
    isVisiable: isShowPassWordModal,
    toggle: toggleModalPwd,
    close: closeModalPwd,
  } = useToggle();

  const { data } = useRetrieveCurrentUser({
    enabled: !IS_USING_SUB_USER,
  });

  const { data: userInfo } = useRetrieveStudentInfo(
    {
      localePara:
        locale === englishLocale
          ? englishLocaleStatusPara
          : vietnameseLocaleStatusPara,
    },
    {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );

  const { signOutHandler, userProfile, isAuthenticated } = useAuth();

  const user = {
    name: IS_USING_SUB_USER ? userProfile?.name : data?.data.displayName,
    avatar: IS_USING_SUB_USER ? userProfile?.avatarUrl : data?.data.avatar,
    email: IS_USING_SUB_USER ? userProfile?.email : data?.data.email,
    id: IS_USING_SUB_USER ? userProfile?.id : data?.data.id,
  };

  const goals: string[] = [];
  userInfo?.data.data.userInfo.map(info => {
    info.data.filter(item => {
      if (item.selected) {
        goals.push(item.name);
      }
    });
  });

  const ResponseUser = userInfo?.data.data.userProfile;

  const User = {
    fullName: ResponseUser?.displayName,
    phoneNumber: ResponseUser?.phone,
    birthDay: ResponseUser?.birthday,
    gender: ResponseUser?.gender,
    userType: userInfo?.data.data.userType,
    goals: goals.join(),
  };

  const { mutate, isLoading } = useUpdatePassword({
    onSuccess: () => {
      notification.success({
        title: <FormattedMessage defaultMessage="Change password success!" />,
      });
      closeModalPwd();
    },
    onError: err => {
      window.location.reload();
      const message = err?.response?.data?.errors[0]?.message;
      const status = err?.response?.status;

      notification.error({
        title: 'Change password Failure!',
        text: message || (
          <FormattedMessage
            defaultMessage="Internal Server Error"
            values={{ code: status }}
          />
        ),
      });
    },
  });
  const {
    UserIcon: UserIconOutline,
    PencilAltIcon,
    QuestionMarkCircleIcon,
    AcademicCapIcon,
    MenuIcon,
  } = Outline;
  return (
    <Popover
      id="userMemu"
      ownFocus
      repositionOnScroll
      button={
        <HeaderSectionItemButton
          aria-controls="userMemu"
          aria-expanded={isVisiable}
          aria-haspopup="true"
          aria-label="User menu"
          onClick={toggle}
        >
          <div
            className="flex justify-end items-center p-1 rounded-full bg-white ml-auto"
            style={{ border: '1px solid #cdcfd1', width: 'fit-content' }}
          >
            <MenuIcon
              className="euiIcon euiButtonContent__icon hidden lg:block lg:mr-2"
              style={{ width: '16px', height: '16px', color: 'black' }}
            />
            <Avatar
              name={user?.name ?? ''}
              imageUrl={user?.avatar ?? ''}
              size="s"
            />
          </div>
        </HeaderSectionItemButton>
      }
      isOpen={isVisiable}
      anchorPosition="downRight"
      closePopover={close}
      panelClassName={styles.popOver}
      panelPaddingSize="s"
    >
      {isAuthenticated ? (
        <>
          <div className={styles.itemMenu}>
            <ButtonEmpty onClick={toggleModal} className={styles.buttonItem}>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <Text className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Trang cá nhân" />
                  </p>
                </Text>
              </div>
            </ButtonEmpty>
          </div>
          <div className={styles.itemMenu}>
            <ButtonEmpty
              onClick={toggleModalPwd}
              className={styles.buttonItem}
              style={{ paddingRight: '37px' }}
              textProps={{
                style: {},
              }}
            >
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <Text className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Đổi mật khẩu" />
                  </p>
                </Text>
              </div>
            </ButtonEmpty>
          </div>
          <div className={styles.itemMenu}>
            <Link to="/sign-in" onClick={signOutHandler}>
              <ButtonEmpty className={styles.buttonItem}>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>

                  <Text className="ml-2">
                    <p>
                      <FormattedMessage defaultMessage="Đăng xuất" />
                    </p>
                  </Text>
                </div>
              </ButtonEmpty>
            </Link>
          </div>
        </>
      ) : (
        <div className={styles.itemMenu}>
          <Link to="/sign-in">
            <ButtonEmpty className={styles.buttonItem}>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <Text className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Log In" />
                  </p>
                </Text>
              </div>
            </ButtonEmpty>
          </Link>
        </div>
      )}
      <UserProfile
        User={User}
        isVisiable={isVisiableModal}
        onClose={closeModal}
      />
      <ChangePassWord
        isLoading={isLoading}
        mutate={mutate}
        isVisiable={isShowPassWordModal}
        onClose={closeModalPwd}
      />
    </Popover>
  );
};

export default UserPopoverV2;
