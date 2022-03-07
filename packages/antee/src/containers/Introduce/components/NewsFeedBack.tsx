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
import introductionData from '../data/introductionData';

interface StudentFeedBackProps {
  settings: any;
}

const NewsFeedBack: FunctionComponent<StudentFeedBackProps> = ({
  settings,
}) => {
  return (
    <div className={styles.newsList}>
      <div className="md:px-14">
        <Title className="font-semibold text-center">
          <h4>
            <FormattedMessage defaultMessage="Báo chí viết về Antoree" />
          </h4>
        </Title>
        <Spacer />
        <Slider {...settings} dots>
          {introductionData?.map(newsItem => (
            <div className="p-4 py-8 ">
              <a href={newsItem?.link} target="_blank">
                <FlexGroup
                  gutterSize="none"
                  direction="column"
                  className={styles.itemNews}
                  justifyContent="center"
                  alignItems="center"
                >
                  <FlexItem className="flex justify-center items-center">
                    <img
                      className="block w-full"
                      src={newsItem?.logoImg}
                      alt="feature"
                    />
                  </FlexItem>
                  <Spacer size="s" />
                  <FlexItem className="text-center w-5/6">
                    <Title size="xs" className="font-medium">
                      <p className={styles.titleNews}>{newsItem?.title}</p>
                    </Title>
                  </FlexItem>
                  <Spacer size="s" />
                </FlexGroup>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default NewsFeedBack;
