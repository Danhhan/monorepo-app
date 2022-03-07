import React, { FunctionComponent } from 'react';
import { FlexGroup, FlexItem, Icon, Text, Title } from '@antoree/ant-ui';
import styles from '../Homepage.module.scss';

interface HomeBannerUnderOwnProps {
  underBannerArr: any;
}

const HomeBannerUnder: FunctionComponent<HomeBannerUnderOwnProps> = ({
  underBannerArr,
}) => {
  return (
    <>
      <div>
        <div className={styles.underBanner}>
          <FlexGroup
            // responsive={false}
            gutterSize="l"
            justifyContent="spaceEvenly"
            className={styles.underBannerInner}
          >
            {underBannerArr?.map((underBannerItem: any) => (
              <FlexItem
                key={underBannerItem.icon}
                className="flex justify-center items-center"
              >
                <FlexGroup gutterSize="none" responsive={false}>
                  <FlexItem
                    grow={false}
                    className="flex justify-center items-center mr-4"
                  >
                    <Icon
                      style={{ height: '50px', width: '50px' }}
                      type={underBannerItem?.icon}
                    />
                  </FlexItem>
                  <FlexItem grow={false}>
                    <Title
                      className="whitespace-nowrap font-semibold text-white"
                      size="m"
                    >
                      <h2>{underBannerItem?.title}</h2>
                    </Title>
                    <Text
                      style={{ fontSize: '20px' }}
                      className="whitespace-nowrap font-normal text-white"
                    >
                      <p>{underBannerItem?.text}</p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
            ))}
          </FlexGroup>
        </div>
      </div>
    </>
  );
};

export default HomeBannerUnder;
