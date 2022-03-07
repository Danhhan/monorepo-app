import {
  FlexGroup,
  FlexItem,
  PageHeader,
  Title,
  Card,
  Text,
  IconTip,
} from '@antoree/ant-ui';
import { HeaderAffiliateMarketing } from 'containers/Affiliate/IncludeAffiliate/components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const AffiliateList: React.FC<{}> = () => {
  const data = [
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Top 20 IELTS Teachers M10-2022',
    },
    {
      id: 3,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing Discount 20% for Philippines Teacher Grou...',
    },
    {
      id: 4,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Study abroad training 3 months',
    },
    {
      id: 5,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'IELTS University Entry Requirements',
    },
    {
      id: 6,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 7,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 8,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 9,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
  ];

  return (
    <>
      <HeaderAffiliateMarketing />
      <PageHeader
        responsive
        paddingSize="s"
        rightSideItems={[]}
        className="md:px-8"
      >
        <FlexGroup justifyContent="spaceAround">
          <FlexItem
            grow={5}
            className="flex"
            style={{ display: 'flex', flexDirection: 'inherit' }}
          >
            <Link to="/affiliates">
              <div style={{ color: '#000000', marginRight: '2px' }}>
                <IconTip type="arrowLeft" size="l" />
              </div>
            </Link>{' '}
            <Title size="xs" className="text-black ">
              <h1>
                <FormattedMessage defaultMessage="Danh sách chiến dịch" />
              </h1>
            </Title>
          </FlexItem>
        </FlexGroup>
        <div className="grid md:grid-cols-5 gap-4 mt-3 px-4">
          {data.map(item => (
            <div>
              {' '}
              <Card
                key={item.id}
                textAlign="left"
                style={{ minHeight: '180px' }}
                image={
                  <div>
                    <img
                      className="rounded-tl-lg rounded-tr-lg"
                      src="https://source.unsplash.com/400x200/?Nature"
                      alt="Nature"
                    />
                  </div>
                }
                title={<Text size="s">{item.title}</Text>}
              />
            </div>
          ))}
        </div>
      </PageHeader>
    </>
  );
};

export default AffiliateList;
