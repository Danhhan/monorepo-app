/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import { FormattedMessage, useIntl } from 'react-intl';
import {
  FlexGroup,
  FlexItem,
  Title,
  Text,
  Avatar,
  Icon,
} from '@antoree/ant-ui';
import skype from 'assets/icons/user/skype.svg';

export type TestResultInformationProps = {
  title: string;
  sessionId: number | string;
  studentName: string;
  avatarUrl?: string;
};

const TestResultInformation: React.FC<TestResultInformationProps> = ({
  title,
  sessionId,
  studentName,
  avatarUrl,
}) => {
  const intl = useIntl();

  return (
    <FlexGroup responsive={false}>
      <FlexItem>
        <FlexGroup gutterSize="m" responsive={false}>
          <FlexItem grow={false}>
            <Avatar
              name={studentName}
              className="h-16 w-16"
              type="space"
              imageUrl={avatarUrl || ''}
            />
          </FlexItem>
          <FlexItem>
            <Title size="s">
              <h1>{studentName}</h1>
            </Title>
            <FlexGroup gutterSize="xs" style={{ color: `#69707D` }}>
              <FlexItem grow={false}>
                <span>
                  <Icon size="l" type={skype} />
                </span>
              </FlexItem>
              <FlexItem grow={false}>
                <Text color="subdued">
                  <p>
                    <FormattedMessage defaultMessage="live:2231abc12" />
                  </p>
                </Text>
              </FlexItem>
            </FlexGroup>
          </FlexItem>
        </FlexGroup>
      </FlexItem>
    </FlexGroup>
  );
};

export default TestResultInformation;
