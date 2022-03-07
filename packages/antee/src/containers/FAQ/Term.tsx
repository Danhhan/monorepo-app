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

export type TermProps = {};

const Term: React.FC<TermProps> = () => {
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
              <h2>Điều khoản sử dụng</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                {`Thank you very much for using Antoree! These terms of service
                ("Terms") cover your use and access to our services and websites
                ("Services"). The Services are provided by Antoree International
                Pte. Ltd. ("Antoree"), a company incorporated in Singapore, with
                its registered office located at 10 Anson Road #27-15,
                International Plaza, Singapore 079903.`}
              </p>
            </Text>

            <Spacer />

            <Text>
              <p>
                By using our Services in any manner, you are agreeing to be
                bound by all of these Terms and other policies that may be set
                forth from time to time.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>1. Using our Services</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                You must not misuse our Services in any way. For example, do not
                interfere with our Services or try to access them using a method
                other than the interface and the instructions that we provide.
                You may use our Services only as permitted by law. We may
                suspend or stop providing our Services to you if you do not
                comply with our terms or policies or if we are investigating
                suspected misconduct.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You also agree not to use our Services to violate the academic
                honesty policy or other conduct policies of your school,
                university, academic institution or workplace.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Using our Services does not give you the ownership of any
                intellectual property rights in our Services or the content you
                access. You may not use content from our Services unless you
                obtain the necessary permissions or are otherwise permitted by
                law. These terms do not grant you the right to use any branding
                or logos used in our Services.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>2. About our Services</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Our Services offer a marketplace for those seeking tutoring
                services to connect with those seeking to provide tutoring
                services. Please note that the Tutors control the methods,
                materials and all other aspects of such tutoring services. We
                will not be responsible for any services and actions that are
                provided/conducted by the Tutors and/or Learners.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Antoree operates our Services from various locations and makes
                no representation that our websites and services are appropriate
                or available for use in all of those locations.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Our Services display some content that does not belong to
                Antoree. Such content is the sole responsibility of the entity
                that owns it. We may review content to determine whether it is
                illegal or violates our policies, and we may remove or refuse to
                display content that we reasonably believe violates our policies
                or the law. But that does not necessarily mean that we review
                content, so please do not assume that we do. Please also note
                that we will not be responsible for any such content which does
                not belong to Antoree, even if we fail to make a proper review
                of such content.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                In connection with your use of our Services, we may send you
                service announcements, administrative messages, and other
                information or communications, or contact you using various
                methods. You hereby grant us the rights to contact you and/or
                send you such information and communications.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Some of our Services are available on mobile devices. Do not use
                such Services in a way that distracts you and prevents you from
                obeying traffic or safety laws.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>3. Your Antoree account</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                You may need an Antoree account in order to use some of our
                Services. You may create your own Antoree account, or your
                Antoree account may be assigned to you by an administrator.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                To protect your Antoree account, keep your password
                confidential. You are responsible for the activity that happens
                on or through your Antoree account.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>4. Privacy and Copyright Protection</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Our Privacy Policy explains how we treat your personal data and
                protect your privacy when you use our Services. By using our
                Services, you agree that Antoree can use such data in accordance
                with our privacy policies.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We respond to notices of alleged copyright infringement and
                terminate accounts of repeated infringers according to the
                process set out in the law.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We provide information to help copyright holders manage their
                intellectual property online. If you think somebody is violating
                your copyrights and want to notify us, please write to us at
                hello@antoree.com.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>5. Your Content in our Services</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                Our Services may allow you to upload, submit, store, send or
                receive content. You retain ownership of any intellectual
                property rights that you hold in that content. In short, what
                belongs to you stays yours.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                When you upload, submit, store, send or receive content to or
                through our Services, you give Antoree (and those we work with)
                a worldwide license to use, host, store, reproduce, modify,
                create derivative works (such as those resulting from
                translations, adaptations or other changes we make so that your
                content works better with our Services), communicate, publish,
                publicly perform, publicly display and distribute such content.
                The rights you grant in this license are for the limited purpose
                of operating, promoting and improving our Services, and to
                develop new ones. This license may continue even when you stop
                using our Services, unless you contact us by writing to us at
                hello@antoree.com. Make sure you have the necessary rights to
                grant us this license for any content that you submit to our
                Services. Our automated systems may analyze your content to
                provide you personally relevant product/service features when
                you use our Services. This analysis may occur as the content is
                sent, received, and when it is stored.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If you have an Antoree account, we may display your profile
                name, profile photo and other information and actions you take
                on Antoree in our Services (and the services of those we work
                with), with the limited purpose of operating, promoting and
                improving our Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If you have any concerns about the way that we display and/or
                use your information, please provide your feedback and
                suggestions by writing to us at hello@antoree.com, and we may
                use your feedback or suggestions without obligation to you. And
                after that, if you still disagree with the way that we handle
                your information or you are not happy with our resolution of the
                issue, please stop using our Services. And if you want any of
                your information to be removed from our websites, please give us
                notice by writing to us at hello@antoree.com.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You can find more information about how Antoree uses and stores
                content in our Privacy Policy or additional terms for particular
                Services. If you submit feedback or suggestions about our
                Services, we may use your feedback or suggestions without
                obligation to you.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>
                6. Modifying and Terminating our Services5. Your Content in our
                Services
              </h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We are constantly changing and improving our Services. We may
                add or remove functionalities or features, and we may suspend or
                stop a Service altogether.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You can stop using our Services at any time, although we will be
                sorry to see you go. Antoree may also stop providing Services to
                you, or add or create new limits to our Services at any time, at
                any time at our discretion and without notice. For example, we
                may suspend or terminate your use of the Services if you are not
                complying with these Terms, or use the Services in a manner that
                would cause us legal liability, disrupt the Services or disrupt
                others' use of the Services.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>7. Our Warranties and Disclaimers</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We provide our Services using a commercially reasonable level of
                skill and care and we hope that you will enjoy using them. But
                there are certain things that we do not promise about our
                Services.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Other than as expressly set out in these terms or additional
                terms, neither Antoree nor its affiliates, officers, agents,
                employees, suppliers, distributors or business partners make any
                specific promises about the Services. For example, we do not
                make any commitments about the content within the Services, the
                specific functions of the Services, or their reliability,
                availability, or ability to meet your needs. We provide the
                Services “AS IS”.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You agree and understand that you assume all risks when using
                our Services, including without limitation any and all of the
                risks associated with any online or offline interactions with
                other users. You agree to take all necessary precautions when
                interacting with other users.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                Some jurisdictions provide for certain warranties, like the
                implied warranty of merchantability, fitness for a particular
                purpose and non-infringement. To the extent permitted by law, we
                exclude all warranties.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>8. Liability for our Services</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                When permitted by law, Antoree, and Antoree’s affiliates,
                officers, agents, employees, suppliers, distributors and
                business partners, will not be responsible for lost profits,
                revenues, or data, financial losses or indirect, special,
                consequential, exemplary, or punitive damages.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                To the fullest extent permitted by law, the total liability of
                Antoree, and its affiliates, officers, agents, employees,
                suppliers, distributors and business partners, for any claims
                under these terms, including for any implied warranties, is
                limited to the amount that you already paid us to use the
                Services in the past 12 months but no greater than 20 USD. Some
                countries do not allow the types of limitations in this
                paragraph, so they may not apply to you.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                In all cases, Antoree, and its affiliates, officers, agents,
                employees, suppliers, distributors and business partners, will
                not be liable for any loss or damage that is not reasonably
                foreseeable.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                We recognize that in some countries, you might have legal rights
                as a consumer. If you are using the Services for a personal
                purpose, then nothing in these terms or any additional terms
                limits any consumer legal rights which may not be waived by
                contract.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>9. Resolving Disputes</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We want to address your concerns without needing a formal legal
                case. Before filing a claim against Antoree, you agree to try to
                resolve the dispute informally by contacting us at
                hello@antoree.com. We will try to resolve the dispute informally
                by contacting you via email.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You and Antoree agree to resolve any claims relating to these
                Terms or the Services through final and binding arbitration.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You may only resolve disputes with us on an individual basis,
                and may not bring a claim as a plaintiff or a class member in a
                class, consolidated, or representative action. Class
                arbitrations, class actions, private attorney general actions,
                and consolidation with other arbitrations are not allowed.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>10. Controlling Law</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                These Terms shall be governed by the law of Singapore without
                regard to its conflicts with law provisions. You and Antoree
                agree to submit to the non-exclusive jurisdiction of the courts
                of Singapore.
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>11. Business uses of our Services</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                {`If you are using our Services on behalf of a business
                  organization, that business or organization accepts these terms.
                  It will hold harmless and indemnify Antoree and its affiliates,
                  officers, agents, employees, suppliers, distributors and
                  business partners from any claim, suit or action arising from or
                  related to the use of the Services or violation of these terms,
                  including any liability or expense arising from claims, losses,
                  damages, suits, judgments, litigation costs and attorneys' fees.`}
              </p>
            </Text>
            <Spacer />
            <Title size="xs">
              <h2>12. About these Terms</h2>
            </Title>
            <Spacer />
            <Text>
              <p>
                We may modify these terms or any additional terms that apply to
                a Service to, for example, reflect changes to the law or changes
                to our Services. You should look at the terms regularly. The
                most updated Terms will always be on this page. Any changes will
                be effective immediately. If you do not agree to the modified
                terms for a Service, you should discontinue your use of that
                Service.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If there is a conflict between the old terms and the new terms,
                the new terms will control for that conflict.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                These terms control the relationship between Antoree and you.
                They do not create any third party beneficiary rights.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If you do not comply with these terms, and we do not take action
                right away, this does not mean that we are giving up any rights
                that we may have (such as taking action in the future).
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                If it turns out that a particular term is not enforceable, this
                will not affect any other terms. An enforceable term will be
                substituted reflecting our intent as closely as possible.
              </p>
            </Text>
            <Spacer />
            <Text>
              <p>
                You may not assign any of your rights under these Terms, and any
                such attempt will be void. Antoree may assign its rights to any
                of its affiliates or subsidiaries or agents or business
                partners, or to any successor in interest of any business
                associated with the Services.
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

export default Term;
