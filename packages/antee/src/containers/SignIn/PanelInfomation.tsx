/* eslint-disable no-nested-ternary */
import {
  FlexItem,
  FlexGrid,
  Title,
  Text,
  TabbedContentProps,
  Tabs,
  Tab,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useState, useMemo } from 'react';
import CertificateLogo from 'assets/images/certificate.png';
import GlobalStandardLogo from 'assets/images/global-standard.png';
import SuggestLogo from 'assets/images/suggest.png';
import TestLevelLogo from 'assets/images/test-level.png';
import ComunicatingLogo from 'assets/images/comunicating.svg';
import FlexibleLogo from 'assets/images/flexible.svg';
import BenefitStudentLogo from 'assets/images/benefit-student.svg';
import AgentLogo from 'assets/images/agent.svg';

const PanelInfomation: React.FC<{}> = () => {
  const tabCollections = [
    {
      title: <FormattedMessage defaultMessage="Chuẩn quốc tế" />,
      text: (
        <FormattedMessage defaultMessage="Dựa trên thang điểm chuẩn Cambridge/Oxford" />
      ),
      image: GlobalStandardLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Kiểm tra trình độ" />,
      text: (
        <FormattedMessage defaultMessage="Học viên biết được năng lực hiện tại của mình" />
      ),
      image: TestLevelLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Nhận lộ trình kép" />,
      text: (
        <FormattedMessage defaultMessage="Thi chứng chỉ Cambridge, IELTS, TOEFL" />
      ),
      image: CertificateLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Đề xuất giáo viên phù hợp" />,
      text: (
        <FormattedMessage defaultMessage="Từ Anh, Úc, Mỹ, Canada, Philippines và Việt Nam" />
      ),
      image: SuggestLogo,
    },
  ];

  const tabCollectionsTrial = [
    {
      title: <FormattedMessage defaultMessage="Tăng khả năng giao tiếp" />,
      text: (
        <FormattedMessage defaultMessage="100% thời gian tương tác 1 -1 với giáo viên bằng Tiếng Anh" />
      ),
      image: ComunicatingLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Chủ động" />,
      text: (
        <FormattedMessage defaultMessage="Học mọi lúc mọi nơi trên điện thoại và máy tính" />
      ),
      image: AgentLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Linh hoạt" />,
      text: (
        <FormattedMessage defaultMessage="Lựa chọn giáo viên phù hợp với mỗi học viên" />
      ),
      image: FlexibleLogo,
    },
    {
      title: <FormattedMessage defaultMessage="Hỗ trợ" />,
      text: (
        <FormattedMessage
          defaultMessage="Quyền lợi học viên
            luôn được đảm bảo"
        />
      ),
      image: BenefitStudentLogo,
    },
  ];

  const tabs: TabbedContentProps['tabs'] = [
    {
      id: 'test-course',
      name: <FormattedMessage defaultMessage="Test Tiếng Anh miễn phí" />,
      // name: 'test-course',
      content: (
        <>
          <Text className="px-6 py-4 text-center" style={{ minHeight: '80px' }}>
            <p>
              <FormattedMessage defaultMessage="Chỉ với 20 phút bạn có thể biết được trình độ của mình và lựa chọn giáo viên phù hợp" />
            </p>
          </Text>
          <FlexGrid
            columns={2}
            gutterSize="m"
            className="m-0"
            style={{ minHeight: '440px' }}
          >
            {tabCollections.map(item => (
              <FlexItem className="text-center px-2">
                <img
                  style={{ objectFit: 'contain', display: 'block' }}
                  src={item.image}
                  alt="overview-item"
                  className="w-24 h-24 mx-auto"
                />
                <Title size="xs" className="mb-2">
                  <h4>{item.title}</h4>
                </Title>
                <Text size="xs">
                  <p>{item.text}</p>
                </Text>
              </FlexItem>
            ))}
          </FlexGrid>
        </>
      ),
    },
    {
      id: 'trial-course',
      name: <FormattedMessage defaultMessage="Học thử" />,
      // name: 'trial-course',
      content: (
        <>
          <Text className="px-6 py-4 text-center" style={{ minHeight: '80px' }}>
            <p>
              <FormattedMessage defaultMessage="Trải nghiệm học với các giáo viên của Antoree" />
            </p>
          </Text>
          <FlexGrid
            columns={2}
            gutterSize="m"
            className="m-0 "
            style={{ minHeight: '440px' }}
          >
            {tabCollectionsTrial.map(item => (
              <FlexItem className="text-center px-2">
                <img
                  style={{ objectFit: 'contain', display: 'block' }}
                  src={item.image}
                  alt="overview-item"
                  className="w-24 h-24 mx-auto"
                />
                <Title size="xs" className="mb-2">
                  <h4>{item.title}</h4>
                </Title>
                <Text size="xs">
                  <p>{item.text}</p>
                </Text>
              </FlexItem>
            ))}
          </FlexGrid>
        </>
      ),
    },
  ];

  const [selectedTabId, setSelectedTabId] = useState('test-course');
  const selectedTabContent = useMemo(() => {
    return tabs.find(obj => obj.id === selectedTabId)?.content;
  }, [selectedTabId]);

  const onSelectedTabChanged = (id: string) => {
    setSelectedTabId(id);
  };

  // console.log(selectedTab, tabs[1]);

  return (
    <div
      className="py-2 m-0 bg-white h-3/5 w-4/6 rounded-2xl flex justify-center items-center flex-col"
      style={{ minWidth: '420px', minHeight: '580px' }}
    >
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            // href={tab.href}
            onClick={() => onSelectedTabChanged(tab.id)}
            isSelected={tab.id === selectedTabId}
            // disabled={tab.disabled}
            // prepend={tab.prepend}
            // append={tab.append}
          >
            {tab.name}
          </Tab>
        ))}
      </Tabs>
      {selectedTabContent}
    </div>
    // {selectedTabContent}
    // <TabbedContent
    //   className="m-0 bg-white h-4/5 w-4/6 rounded-2xl flex justify-center items-center flex-col"
    //   style={{ minWidth: '420px' }}
    //   tabs={tabs}
    //   selectedTab={selectedTab}
    //   onTabClick={onTabClick}
    // />
  );
};

export default PanelInfomation;
