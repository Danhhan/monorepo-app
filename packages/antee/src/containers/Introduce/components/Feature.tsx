import React, { FunctionComponent } from 'react';
import {
  FlexGroup,
  FlexItem,
  Slider,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import styles from '../Introduce.module.scss';
import settings from '../settingData/settings';

interface FeatureOwnProps {
  featureArr: any;
}

const Feature: FunctionComponent<FeatureOwnProps> = ({ featureArr }) => {
  return (
    <div className={styles.featurePanelsContain}>
      <div className="px-4 md:px-0 w-full">
        <Slider {...settings}>
          {featureArr?.map((featureItem: any) => (
            <div className="p-4">
              <FlexGroup
                gutterSize="none"
                direction="column"
                className="bg-white flex flex-col justify-center items-center rounded-lg p-4"
                justifyContent="center"
                alignItems="center"
              >
                <FlexItem
                  style={{ width: '70px', height: '70px' }}
                  className="flex justify-center items-center"
                >
                  <img
                    className="block"
                    src={featureItem?.logo}
                    alt="feature"
                  />
                </FlexItem>
                <Spacer size="s" />
                <FlexItem className="text-center w-5/6">
                  <Title size="s" className="font-semibold">
                    <p>{featureItem?.title}</p>
                  </Title>
                  <Spacer size="s" />
                  <Text color="text">
                    <p>{featureItem?.text}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Feature;
