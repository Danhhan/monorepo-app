/* eslint-disable no-nested-ternary */
import {
  ButtonEmpty,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageContentHeader,
  PageContentHeaderSection,
  Text,
  Title,
} from '@antoree/ant-ui';
import LanguageSwitcher from 'components/LanguageSwitcher';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Redirect, useLocation } from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';
import { CompleteTestCode, useRetrieveStatusUser } from 'services/user';
import ForgotPasswordForm from './ForgotPasswordForm';
import styles from './SignIn.module.scss';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import SubUser from './SubUser';

const SignIn: React.FC<{}> = () => {
  const location = useLocation();
  const {
    setSubUserHandler,
    authenticateSubUserHandler,
    signOutHandler,
  } = useAuth();
  const { isAuthenticated, choosedSubUser } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubuser, setIsSubuser] = useState(false);

  const [isFogotPass, setIsForgotpass] = useState(false);

  const { data, isLoading } = useRetrieveStatusUser({
    cacheTime: 0,
    enabled: isAuthenticated,
  });

  if (!isLoading && isAuthenticated) {
    if (choosedSubUser || !IS_USING_SUB_USER) {
      if (data?.data?.status && data?.data?.status <= CompleteTestCode) {
        return (
          <Redirect
            to={{
              pathname: '/today',
              state: { from: location },
            }}
          />
        );
      }
      return (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: location },
          }}
        />
      );
    }
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.panelLeft}>{/* <PanelInfomation /> */}</div>
      <div className={styles.panelRight}>
        <Page
          className="h-full max-w-md m-auto py-4 bg-white"
          paddingSize="none"
        >
          <PageBody>
            <PageContent hasBorder={false} hasShadow={false}>
              <PageContentHeader>
                <PageContentHeaderSection />
                {isFogotPass ? (
                  <span style={{ marginRight: '140px' }}>
                    <ButtonEmpty
                      onClick={() => setIsForgotpass(false)}
                      // color="danger"
                      iconType="arrowLeft"
                      iconSide="left"
                      size="s"
                      contentProps={{
                        style: { paddingLeft: '0px' },
                      }}
                    >
                      <FormattedMessage defaultMessage="Đăng nhập" />
                    </ButtonEmpty>
                  </span>
                ) : null}
                {isAuthenticated && IS_USING_SUB_USER && !choosedSubUser ? (
                  <span style={{ marginRight: '140px' }}>
                    <ButtonEmpty
                      onClick={() => signOutHandler()}
                      // color="danger"
                      iconType="arrowLeft"
                      iconSide="left"
                      size="s"
                      contentProps={{
                        style: { paddingLeft: '0px' },
                      }}
                    >
                      <FormattedMessage defaultMessage="Đăng xuất" />
                    </ButtonEmpty>
                  </span>
                ) : null}
                <LanguageSwitcher color="primary" />
              </PageContentHeader>
              <PageContentHeader style={{ marginLeft: '5%' }}>
                <PageContentHeaderSection>
                  <Title size="l">
                    <h1>
                      {isSignUp ? (
                        <FormattedMessage defaultMessage="Đăng ký" />
                      ) : isFogotPass ? (
                        <FormattedMessage defaultMessage="Quên mật khẩu" />
                      ) : isAuthenticated &&
                        IS_USING_SUB_USER &&
                        !choosedSubUser ? (
                        <FormattedMessage defaultMessage="Chọn tài khoản" />
                      ) : (
                        <FormattedMessage defaultMessage="Đăng nhập" />
                      )}
                    </h1>
                  </Title>
                  <Text color="text">
                    <p>
                      {isSignUp ? (
                        <FormattedMessage defaultMessage="Điền thông tin để tạo tài khoản học thử và kiểm tra trình độ Tiếng Anh miễn phí" />
                      ) : isAuthenticated &&
                        IS_USING_SUB_USER &&
                        !choosedSubUser ? (
                        <FormattedMessage defaultMessage="Chọn tài khoản của bạn và tham gia khóa học" />
                      ) : isFogotPass ? null : (
                        <FormattedMessage defaultMessage="Tham gia học thử và test Tiếng Anh miễn phí" />
                      )}
                    </p>
                  </Text>
                </PageContentHeaderSection>
              </PageContentHeader>
              <PageContentBody style={{ marginLeft: '5%' }}>
                {isAuthenticated && IS_USING_SUB_USER && !choosedSubUser ? (
                  <SubUser handleSuccess={() => {}} />
                ) : isSignUp ? (
                  <SignUpForm handleFallBack={() => setIsSignUp(false)} />
                ) : isFogotPass ? (
                  <ForgotPasswordForm
                    setIsForgotpass={setIsForgotpass}
                    handleSignIn={() => setIsForgotpass(!isFogotPass)}
                    isPreLogin
                  />
                ) : (
                  <SignInForm
                    handleFogotPass={() => setIsForgotpass(true)}
                    handleSignUp={() => setIsSignUp(true)}
                    handleSuccess={() => {}}
                    isPreLogin={false}
                  />
                )}
              </PageContentBody>
            </PageContent>
          </PageBody>
        </Page>
      </div>
    </div>
  );
};

export default SignIn;
