import { FunctionComponent } from 'react';
import {
  FlexGroup,
  FlexItem,
  HorizontalRule,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

interface TeacherTopicProps {
  topics: any;
}

const TeacherTopic: FunctionComponent<TeacherTopicProps> = ({
  topics,
}: TeacherTopicProps) => {
  // console.log(topics);
  return (
    <>
      <HorizontalRule margin="m" />
      <Spacer />
      <Title size="m" className="font-medium">
        <h3>
          <FormattedMessage defaultMessage="Chủ đề dạy" />
        </h3>
      </Title>
      <Spacer />
      {topics?.map((item: { description: string; name: string }) => (
        <div>
          <FlexGroup>
            <FlexItem>
              <Text>
                <p>{item?.name}</p>
              </Text>
            </FlexItem>
            <FlexItem grow={2}>
              <Text>
                <p>{item?.description}</p>
              </Text>
            </FlexItem>
          </FlexGroup>
          <Spacer />
        </div>
      ))}
    </>
  );
};

export default TeacherTopic;
