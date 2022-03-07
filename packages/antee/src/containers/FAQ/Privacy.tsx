/* eslint-disable react/no-unescaped-entities */
import {
  Page,
  PageBody,
  PageContent,
  PageSideBar,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { Link, useLocation } from 'react-router-dom';
import { Header, Footer } from 'components';

import styles from './FAQ.module.scss';

export type PrivacyProps = {};

const Privacy: React.FC<PrivacyProps> = () => {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Page paddingSize="none" className={styles.pageBody}>
        <PageSideBar paddingSize="l" sticky>
          <Link to="/about-us">
            <Text color={location.pathname !== '/about-us' ? 'black' : ''}>
              <p>Về chúng tôi</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/policy">
            <Text color={location.pathname !== '/policy' ? 'black' : ''}>
              <p>Chính sách khóa học</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/term">
            <Text color={location.pathname !== '/term' ? 'black' : ''}>
              <p>Điều khoản sử dụng</p>
            </Text>
          </Link>
          <Spacer size="s" />
          <Link to="/privacy">
            <Text color={location.pathname !== '/privacy' ? 'black' : ''}>
              <p>Chính sách bảo mật</p>
            </Text>
          </Link>
        </PageSideBar>
        <PageBody className="bg-white p-4">
          <PageContent
            verticalPosition="center"
            horizontalPosition="center"
            paddingSize="none"
            color="subdued"
            hasShadow={false}
            style={{ minHeight: '80vh' }}
          >
            <Title>
              <h2>Chính sách bảo mật</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Thank you very much for using Antoree! Here we describe how we
                collect, use and handle your information when you use our
                websites and services ("Services"). The Services are provided by
                Antoree International Pte. Ltd. ("Antoree"), a company
                incorporated in Singapore, with its registered office located at
                10 Anson Road #27-15, International Plaza, Singapore 079903. By
                using our Services, you agree with this Privacy Policy.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>1. Information that we collect</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We collect and use your information to provide, improve and
                protect our Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We collect, and associate with your account, information like
                your name, email address, phone number, payment info, and any
                other information that is related to providing you good
                Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                When you use our Services, we store, process and transmit your
                information and other information related to them.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>We also collect information about how you use our Services.</p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We use technologies like cookies and other technologies to
                provide, improve, protect and promote our Services. For example,
                cookies help us with things like remembering your username for
                your next visit, understanding how you are interacting with our
                Services, and improving them based on that information. You can
                set your browser to not accept cookies, but this may limit your
                ability to use the Services.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>2. How we use your information</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We may share information as discussed below, but we will not
                sell it to advertisers or other third parties.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Antoree may use certain trusted third parties to help us
                provide, improve, protect, and promote our Services. These third
                parties will access your information only to perform tasks on
                our behalf and in compliance with this Privacy Policy.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Our Services display you information such as your profile name,
                profile photo, contact information and any other information to
                other users in various places.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Stewardship of your data is critical to us and a responsibility
                that we embrace. We will keep your information secure.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We will retain information you store on our Services for as long
                as we need it to provide you the Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                To provide you with the Services, we may store, process and
                transmit information in locations around the world - including
                those outside your country. Information may also be stored
                locally on the devices you use to access the Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We may disclose your information to third parties if we
                determine that such disclosure is reasonably necessary to (a)
                comply with the law; or (b) protect any person from death or
                serious bodily injury; or (c) prevent fraud or abuse of Antoree
                or our users; or (d) protect Antoree's property rights.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We will abide by the government’s data requests that are limited
                to specific people and investigations, as provided by the law.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>3. Changes</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                If we are involved in a reorganization, merger, acquisition or
                sale of our assets, your information may be transferred as part
                of that deal. We will notify you (for example, via a message to
                the email address associated with your account) of any such deal
                and outline your choices in that event.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We may modify this Privacy Policy from time to time, and the
                most updated version of our Privacy Policy will always be on
                this page. Any changes will be effective immediately. If a
                revision meaningfully reduces your rights, we will notify you
                via email.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If you have any questions or concerns, please provide your
                feedback and suggestions by writing to us at hello@antoree.com.
              </p>
            </Text>
            <Spacer />
          </PageContent>
        </PageBody>
      </Page>
      <Footer />
    </div>
  );
};

export default Privacy;
