import React, { FunctionComponent } from 'react';
import {
  Page,
  PageBody,
  Title,
  FlexGroup,
  FlexItem,
  Button,
  Icon,
  Slider,
  Spacer,
  Text,
  FlexGrid,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from '../Introduce.module.scss';
import settingsYoutubeList1 from '../settingData/settingsYoutubeList1';
import { YoutubePlayer } from '../../../components';

interface YoutubeListProps {
  sliderRef: any;
  sliderRefSecond: any;
}

const YoutubeList: FunctionComponent<YoutubeListProps> = ({
  sliderRef,
  sliderRefSecond,
}) => {
  return (
    <div className={styles.youtubeList}>
      <div className="w-full md:px-14">
        <FlexGroup
          justifyContent="center"
          gutterSize="none"
          alignItems="center"
          responsive={false}
        >
          <FlexItem className="flex-row items-center justify-center">
            <Title size="s" className="font-semibold text-center text-white">
              <h4>
                <FormattedMessage defaultMessage="Các bé học tại Antoree" />
              </h4>
            </Title>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <Slider ref={sliderRef} {...settingsYoutubeList1}>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="WW5ljtrpvZM" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="hiFEKC3Wj1c" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="JZZIXYNNM3A" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="jQdG_ykih5g" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="oYdLenKZrbg" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="-I6-VM5hNnw" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="j_7wqej7t70" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="P4XD0bmaeag" />
            </div>
          </div>
        </Slider>
        <Spacer size="xl" />
        <Spacer size="xl" />

        <FlexGroup
          justifyContent="center"
          gutterSize="none"
          alignItems="center"
          responsive={false}
        >
          <FlexItem className="flex-row items-center justify-center">
            <Title size="s" className="font-semibold text-center text-white">
              <h4>
                <FormattedMessage defaultMessage="Chương trình học dành cho người lớn" />
              </h4>
            </Title>
          </FlexItem>
        </FlexGroup>
        <Spacer />
        <Slider ref={sliderRefSecond} {...settingsYoutubeList1}>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="FO0ArDe13Y0" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="uyMQ6VzeUS0" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="9kKJnUbcFDg" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="jQdG_ykih5g" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="u7mGJ1w4T2Y" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="-I6-4q0As894_bM" />
            </div>
          </div>
          <div className="px-2 ">
            <div className="rounded-lg overflow-hidden">
              <YoutubePlayer youtubeID="0IiKBH4PnP0" />
            </div>
          </div>
        </Slider>
        <Spacer />
      </div>
    </div>
  );
};

export default YoutubeList;
