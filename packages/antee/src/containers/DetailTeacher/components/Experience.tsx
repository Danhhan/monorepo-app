/* eslint-disable react/no-array-index-key */
import { FunctionComponent } from 'react';
import {
  FlexGroup,
  FlexItem,
  HorizontalRule,
  LoadingSpinner,
  Outline,
  Page,
  PageBody,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AvailableTimeNew, Footer, Header, RatingCard } from 'components';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { useRetrieveTeacherDetail } from 'services/teacher-market';
import styles from './DetailTeacher.module.scss';
import sty from './Videodetail.module.scss';

interface ExperienceProps {
  workExperiences: any;
}

const Experience: FunctionComponent<ExperienceProps> = ({
  workExperiences,
}: ExperienceProps) => {
  return (
    <>
      <Title size="s" className="font-medium">
        <h3>
          <FormattedMessage defaultMessage="Kinh nghiệm làm việc" />
        </h3>
      </Title>
      <Spacer />
      <div>
        {workExperiences?.map((item: any, index: number) => (
          <>
            <FlexGroup gutterSize="none">
              <FlexItem style={{ marginBottom: '0px' }}>
                <Text>
                  <p key={index}>
                    {moment(item?.start).format('MM/YYYY')} -{' '}
                    {moment(item?.end).format('MM/YYYY')}
                  </p>
                </Text>
              </FlexItem>
              <FlexItem grow={2}>
                <Title size="xs">
                  <h4>
                    {item?.field || item?.position} &nbsp; - &nbsp;{' '}
                    {item?.school || item?.company}
                  </h4>
                </Title>
                <Spacer size="s" />
                <Text>
                  <p
                    // className={styles.textDescription}
                    dangerouslySetInnerHTML={{
                      __html: item?.description || '',
                    }}
                  />
                </Text>
              </FlexItem>
            </FlexGroup>
            <Spacer size="xl" />
          </>
        ))}
      </div>
    </>
  );
};

export default Experience;
