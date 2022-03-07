import {
  Button,
  FlexItem,
  Icon,
  PageHeader,
  PageHeaderSection,
} from '@antoree/ant-ui';
import logoAntoree from 'assets/images/white-bg-logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { useToggle } from 'hooks';
import { useAuth } from 'services/auth/contexts';
import UserPopoverV2 from 'components/MainLayout/UserPopover';
import HeaderLoginModal from 'components/HeaderLoginModal/HeaderLoginModal';

const HeaderAffiliateMarketing: React.FC<{}> = () => {
  const {
    isVisiable: isShowSignInModal,
    toggle: toggleModalSignInModal,
    close: closeModalSignInModal,
  } = useToggle();
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  return (
    <div>
      <>
        <PageHeader
          paddingSize="m"
          style={{
            background: '#fff',
            maxWidth: '100%',
            margin: 'auto',
            zIndex: 100,
          }}
          className="sticky top-0"
          responsive={false}
        >
          <PageHeaderSection>
            <Link to="/tkhomepage">
              <Icon
                type={logoAntoree}
                style={{
                  width: 240,
                  height: 'auto',
                  paddingRight: 80,
                  marginLeft: '8%',
                }}
              />
            </Link>
          </PageHeaderSection>
          {isAuthenticated ? (
            <span style={{ marginRight: '25px' }}>
              <UserPopoverV2 />
            </span>
          ) : (
            <PageHeaderSection
              className="justify-end items-end flex"
              style={{
                width: 'fit-content',
                marginLeft: '0px',
                marginRight: '25px',
              }}
            >
              <FlexItem style={{ marginRight: '16px' }}>
                <div>
                  <Button
                    onClick={toggleModalSignInModal}
                    style={{
                      backgroundColor: 'rgba(52, 55, 65, 0.15)',
                      border: 'none',
                      outline: 'none',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    Đăng nhập
                  </Button>
                </div>
              </FlexItem>
            </PageHeaderSection>
          )}
        </PageHeader>
      </>
      <HeaderLoginModal
        isSignUpParam={false}
        isVisiable={isShowSignInModal}
        onConfirm={() => {
          closeModalSignInModal();
        }}
        onClose={closeModalSignInModal}
      />
    </div>
  );
};

export default HeaderAffiliateMarketing;
