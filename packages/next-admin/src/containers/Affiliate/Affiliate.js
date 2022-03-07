import {
  Button,
  HeaderSectionItemButton,
  Page,
  PageBody,
  PageHeader,
  PageHeaderSection,
  Tab,
  Tabs,
} from '@antoree/ant-ui';
import {
  useBreadcrumbs,
  useFormModal,
  useHeaderActions,
  useRedirect,
} from 'hooks';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CampaignReport from './CampaignReport';
import Campaigns from './Campaigns';
import {
  // link
  CreateCampaignLinkModal,
  CreateLinkPopover,
  CreateTeacherLinkModal,
} from './components';
import { PartnerReport, PartnerReportDetail } from './PartnerReport';

const StyleWrapper = styled.div`
  .euiTab__content {
    padding-top: 4px;
    padding-bottom: 4px;
  }
  .euiTab.euiTab-isSelected {
    box-shadow: inset 0 -2px 0 #000000;
  }
`;
const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Affiliate management" />,
  },
];
const Affiliate = () => {
  useBreadcrumbs(breadcrumbs);
  const [selectedTabContent, setSelectedTabContent] = useState();
  const { isVisible, show, close } = useFormModal();
  const match = useRouteMatch();
  const {
    isVisible: isVisibleCampaignLink,
    show: showCampaignLink,
    close: closeCampaignLink,
  } = useFormModal();
  const {
    isVisible: isVisibleTeacherLink,
    show: showTeacherLink,
    close: closeTeacherLink,
  } = useFormModal();

  const { redirectTo } = useRedirect();
  const campaignManagementId = 'campaign-management--id';
  const tabs = [
    {
      id: 'campaign-report--id',
      link: '/affiliate/campaign-report',
      name: <FormattedMessage defaultMessage="Campaign report" />,
      content: <CampaignReport />,
    },
    {
      id: 'partner-report--id',
      link: '/affiliate/partner-report',
      name: <FormattedMessage defaultMessage="Partner Report" />,
      content: <PartnerReport />,
    },
    {
      id: campaignManagementId,
      link: '/affiliate/campaigns',
      name: <FormattedMessage defaultMessage="Campaign management" />,
      content: <Campaigns isVisible={isVisible} close={close} />,
    },
    {
      id: 'partner-report-detail--id',
      link: '/affiliate/partner-report/:id',
      content: <PartnerReportDetail />,
    },
  ];
  const history = useHistory();
  const location = useLocation();

  const handleClickCreateCampaign = () => {
    const currentTab = tabs.find(obj => obj.link === match.path);
    if (currentTab?.id !== campaignManagementId) {
      const campaignManagementTab = tabs.find(
        obj => obj.id === campaignManagementId,
      );
      redirectTo(campaignManagementTab.link);
    }
    history.push({
      state: { isAutoRedirect: true },
    });
  };
  useEffect(() => {
    // handle show create campaign modal
    const currentTab = tabs.find(obj => obj.link === match.path);
    if (
      currentTab?.id === campaignManagementId &&
      location?.state?.isAutoRedirect
    ) {
      show();
    }
  }, [match, location]);
  // remove state when mounted or unmounted
  useEffect(() => {
    history.push({
      state: { isAutoRedirect: false },
    });
    return () => {
      history.push({
        state: { isAutoRedirect: false },
      });
    };
  }, []);

  const headerActions = [
    <CreateLinkPopover
      onShowLinkCampaignLink={showCampaignLink}
      onShowTeacherLink={showTeacherLink}
    />,
    <HeaderSectionItemButton>
      <Button
        size="s"
        fill
        iconType="plusInCircle"
        onClick={handleClickCreateCampaign}
      >
        Create Campaign
      </Button>
    </HeaderSectionItemButton>,
  ];
  useHeaderActions(headerActions);
  useEffect(() => {
    const newSelectedTabContent = tabs.find(obj => obj.link === match.path)
      ?.content;
    setSelectedTabContent(newSelectedTabContent);
    // if match or isVisible change then update state SelectedTabContent
  }, [match, isVisible]);

  return (
    <>
      <PageHeader
        className="sticky top-0 z-10 pl-10"
        style={{
          backgroundColor: '#fff',
          boxShadow: 'inset 0px -1px 0px #EAEAEA',
        }}
        responsive={false}
      >
        <PageHeaderSection>
          <StyleWrapper>
            <Tabs display="condensed">
              {tabs
                .filter(item => item.name)
                .map(tab => (
                  <Tab
                    key={tab.id}
                    onClick={() => {
                      redirectTo(tab.link);
                    }}
                    isSelected={match.path.startsWith(tab.link)}
                  >
                    <Link
                      style={{
                        color: match.path.startsWith(tab.link)
                          ? '#000000'
                          : '#69707D',
                      }}
                    >
                      <p>{tab.name}</p>
                    </Link>
                  </Tab>
                ))}
            </Tabs>
          </StyleWrapper>
        </PageHeaderSection>
      </PageHeader>
      <Page className="pt-0">
        <PageBody>
          {selectedTabContent}
          <CreateCampaignLinkModal
            isVisible={isVisibleCampaignLink}
            onCloseModal={closeCampaignLink}
          />
          <CreateTeacherLinkModal
            isVisible={isVisibleTeacherLink}
            onCloseModal={closeTeacherLink}
          />
        </PageBody>
      </Page>
    </>
  );
};

export default Affiliate;
