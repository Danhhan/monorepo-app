import {
  FlexGroup,
  FlexItem,
  Page,
  PageBody,
  PageContent,
  PageContentHeader,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { useState } from 'react';
import { STATUS_OPEN } from 'constants/courses';
import { AffiliateHeader, FilterBar, AffiliateBody } from './components';
import { HeaderAffiliateMarketing } from '../IncludeAffiliate/components';

const Affiliates: React.FC<{}> = () => {
  const [status, setStatus] = useState<number>(STATUS_OPEN);
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const onSelect = (statusValue: string) => {
    setStatus(parseInt(statusValue, 10));
  };

  return (
    <Page
      className="min-h-screen w-screen z-50 opacity-1 lg:overflow-hidden"
      paddingSize="none"
    >
      <PageBody>
        <HeaderAffiliateMarketing />
        <section className="md:px-8">
          <AffiliateHeader />
          <PageContent color="transparent" hasBorder={false} hasShadow={false}>
            <PageContentHeader>
              <FlexGroup>
                <FlexItem grow={false}>
                  <FilterBar
                    status={status}
                    onSelect={onSelect}
                    onInputChange={onInputChange}
                  />
                </FlexItem>
              </FlexGroup>
            </PageContentHeader>
            <AffiliateBody />
          </PageContent>
        </section>
      </PageBody>
    </Page>
  );
};

export default Affiliates;
