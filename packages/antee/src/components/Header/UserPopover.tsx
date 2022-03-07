/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
import {
  Avatar,
  ButtonEmpty,
  Popover,
  Text,
  Outline,
  Icon,
} from '@antoree/ant-ui';
import PreLoginModal from 'components/PreLoginModal';
import UserProfile from 'components/User/UserProfile';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import { useToggle } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';
import { useRetrieveCurrentUser, useRetrieveStudentInfo } from 'services/user';
import {
  useLanguageContext,
  englishLocale,
  vietnameseLocaleStatusPara,
  englishLocaleStatusPara,
} from 'services/translation/context';
import defaultUser from 'assets/images/default-user.png';

import styles from './UserPopover.module.scss';
import HeaderLoginModal from '../HeaderLoginModal/HeaderLoginModal';

const UserPopoverV2: React.FC<{}> = () => {
  const { locale } = useLanguageContext();
  const preToken = localStorage.getItem('token');
  // console.log(preToken);

  const { isVisiable, toggle, close } = useToggle();
  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const {
    isVisiable: isShowSignInModal,
    toggle: toggleModalSignInModal,
    close: closeModalSignInModal,
  } = useToggle();

  const {
    isVisiable: isShowSignUpModal,
    toggle: toggleModalSignUpModal,
    close: closeModalSignUpModal,
  } = useToggle();

  const { data } = useRetrieveCurrentUser({
    enabled: !IS_USING_SUB_USER,
  });
  const history = useHistory();

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
        <ButtonEmpty
          onClick={toggle}
          className="flex"
          contentProps={{
            style: { minWidth: '60px' },
          }}
        >
          {/* <UserIcon
            style={{ width: '24px', height: '24px' }}
            className="euiIcon euiButtonContent__icon"
          /> */}
          <div
            className="flex justify-end items-center p-1 rounded-full bg-white ml-auto"
            id={styles.antoreeAvatar}
            // style={{
            //   border: '1px solid #cdcfd1',
            //   width: 'fit-content',
            //   marginLeft: '30px',
            // }}
          >
            <MenuIcon
              className="euiIcon euiButtonContent__icon hidden lg:block lg:mr-2"
              style={{ width: '16px', height: '16px', color: 'black' }}
            />
            <Avatar
              name={user?.name ?? ''}
              className="block"
              imageUrl={user?.avatar ?? defaultUser}
              size="s"
            />
          </div>
        </ButtonEmpty>
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
                    <FormattedMessage defaultMessage="Tài khoản của tôi" />
                  </p>
                </Text>
              </div>
            </ButtonEmpty>
          </div>
          <div className={styles.itemMenu}>
            <Link to="/sign-in">
              <ButtonEmpty className={styles.buttonItem}>
                <div className="flex">
                  <AcademicCapIcon
                    style={{ width: '24px', height: '24px', fill: 'none' }}
                    className="euiIcon euiButtonContent__icon"
                  />
                  <Text className="ml-2">
                    <p>
                      <FormattedMessage defaultMessage="Trang học viên" />
                    </p>
                  </Text>
                </div>
              </ButtonEmpty>
            </Link>
          </div>
          <div
            className={styles.itemMenu}
            style={{
              borderTop: '1px solid #EAEAEA',
              borderBottom: '1px solid #EAEAEA',
              marginLeft: '-0.5rem',
              marginRight: '-0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
          >
            <Link to="/affiliates">
              <ButtonEmpty className={styles.buttonItem}>
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 13V9H8V13H13V10.487V4H14V10.487V13C14 13.552 13.553 14 13 14H1C0.447 14 0 13.552 0 13V11H1V13H7ZM11.8532 2.85379L8.85414 5.85386C8.94764 6.04949 9 6.26859 9 6.5C9 7.329 8.328 8 7.5 8C7.01917 8 6.59095 7.77372 6.31638 7.42163L3.60215 8.32622L2.99976 8.52708C2.98532 9.34356 2.31897 10 1.5 10C0.672 10 0 9.329 0 8.5C0 7.671 0.672 7 1.5 7C1.98099 7 2.40933 7.22643 2.68389 7.57872L6.00024 6.47289C6.0147 5.65642 6.68104 5 7.5 5C7.73137 5 7.95056 5.05239 8.14631 5.14599L11.146 2.14634C11.0524 1.95066 11 1.73149 11 1.5C11 0.671 11.672 0 12.5 0C13.328 0 14 0.671 14 1.5C14 2.329 13.328 3 12.5 3C12.2684 3 12.0491 2.94752 11.8532 2.85379Z"
                      fill="#343741"
                    />
                  </svg>
                  <Text className="ml-2">
                    <p>
                      <FormattedMessage defaultMessage="Tiếp thị liên kết" />
                    </p>
                  </Text>
                </div>
              </ButtonEmpty>
            </Link>
          </div>
          <div className={styles.itemMenu}>
            <Link to="/today">
              <ButtonEmpty className={styles.buttonItem}>
                <div className="flex">
                  <QuestionMarkCircleIcon
                    style={{ width: '24px', height: '24px', fill: 'none' }}
                    className="euiIcon euiButtonContent__icon"
                  />
                  <Text className="ml-2">
                    <p>
                      <FormattedMessage defaultMessage="FAQs" />
                    </p>
                  </Text>
                </div>
              </ButtonEmpty>
            </Link>
          </div>

          <div className={styles.itemMenu}>
            <div onClick={signOutHandler}>
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
            </div>
          </div>
        </>
      ) : (
        <div className={styles.itemMenu}>
          <div>
            <ButtonEmpty
              onClick={toggleModalSignInModal}
              className={styles.buttonItem}
              style={{ paddingLeft: '0px' }}
              contentProps={{
                style: { justifyContent: 'start' },
              }}
              textProps={{
                style: {},
              }}
            >
              <div className="flex">
                <UserIconOutline
                  style={{ width: '24px', height: '24px', fill: 'none' }}
                  className="euiIcon euiButtonContent__icon"
                />
                <Text className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Đăng nhập" />
                  </p>
                </Text>
              </div>
            </ButtonEmpty>
          </div>
          <ButtonEmpty
            onClick={toggleModalSignUpModal}
            className={styles.buttonItem}
            style={{ paddingLeft: '0px' }}
            contentProps={{
              style: { justifyContent: 'start' },
            }}
            textProps={{
              style: {},
            }}
          >
            <div className="flex">
              <PencilAltIcon
                style={{ width: '24px', height: '24px', fill: 'none' }}
                className="euiIcon euiButtonContent__icon"
              />
              <Text className="ml-2">
                <p>
                  <FormattedMessage defaultMessage="Đăng ký tài khoản" />
                </p>
              </Text>
            </div>
          </ButtonEmpty>
          <div
            className={styles.itemMenu}
            style={{
              borderTop: '1px solid #EAEAEA',
              borderBottom: '1px solid #EAEAEA',
              marginLeft: '-0.5rem',
              marginRight: '-0.5rem',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
            }}
          >
            <Link to="/affiliatemarketing">
              <ButtonEmpty className={styles.buttonItem}>
                <div className="flex items-center">
                  <Icon
                    type="stats"
                    style={{ width: '24px', height: '24px' }}
                  />
                  <Text className="ml-2">
                    <p>
                      <FormattedMessage defaultMessage="Tiếp thị liên kết" />
                    </p>
                  </Text>
                </div>
              </ButtonEmpty>
            </Link>
          </div>
          <Link to="/courses">
            <ButtonEmpty className={styles.buttonItem}>
              <div className="flex">
                <QuestionMarkCircleIcon
                  style={{ width: '24px', height: '24px', fill: 'none' }}
                  className="euiIcon euiButtonContent__icon"
                />
                <Text className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="FAQs" />
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

      <HeaderLoginModal
        isSignUpParam={false}
        isVisiable={isShowSignInModal}
        onConfirm={() => {
          closeModalSignInModal();
        }}
        onClose={closeModalSignInModal}
      />
      <HeaderLoginModal
        isVisiable={isShowSignUpModal}
        onConfirm={() => {
          closeModalSignUpModal();
        }}
        onClose={closeModalSignUpModal}
      />
    </Popover>
  );
};

export default UserPopoverV2;
