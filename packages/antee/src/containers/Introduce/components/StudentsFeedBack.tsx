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
import introFeedBack from '../data/introFeedBack';

interface StudentsFeedBackProps {}

const StudentsFeedBack: FunctionComponent<StudentsFeedBackProps> = ({}) => {
  return (
    <div className={styles.feedbackList}>
      <div>
        <Title className="font-semibold text-center">
          <h4>
            <FormattedMessage defaultMessage="Học viên Antoree nói gì" />
          </h4>
        </Title>
        <Spacer />
        <Spacer />
        {introFeedBack?.map(feedback => (
          <>
            <div
              className="rounded-xl p-4 md:w-3/5 md:m-auto"
              style={{ background: '#F5F7FA' }}
            >
              <FlexGroup>
                <FlexItem grow={false}>
                  <img
                    className="rounded-full"
                    style={{ width: '64px', height: '64px' }}
                    src={feedback?.img}
                    alt="feedback-profile-avt"
                  />
                </FlexItem>
                <FlexItem>
                  <Title className="font-medium" size="xs">
                    <p>{feedback?.name}</p>
                  </Title>
                  <Text color="text">
                    <p className={styles.descriptionFeedback}>
                      {feedback?.description}
                    </p>
                  </Text>
                </FlexItem>
              </FlexGroup>
              <Spacer />
              <Text>
                <p>&quot;{feedback?.feedbackComment}&quot;</p>
              </Text>
            </div>
            <Spacer />
          </>
        ))}
        <div className="flex justify-center items-center">
          <Button
            minWidth={120}
            style={{
              width: 'fit-content',
              margin: 'auto',
              background: '#14B24C',
            }}
            fill
            iconType="arrowDown"
            iconSide="right"
            iconSize="m"
          >
            <FormattedMessage defaultMessage="Xem thêm" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsFeedBack;
