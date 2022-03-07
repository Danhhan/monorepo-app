import {
  FlexGroup,
  FlexItem,
  PageHeader,
  PageHeaderSection,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

export type HeaderProps = {
  totalCourses?: number;
  openingCourses?: number;
  pausedCourses?: number;
  closedCourses?: number;
};

const Header: React.FC<HeaderProps> = ({
  totalCourses,
  openingCourses,
  pausedCourses,
  closedCourses,
}) => (
  <PageHeader className="bg-white" paddingSize="m">
    <PageHeaderSection>
      <FlexGroup>
        <FlexItem grow={false}>
          <Text className="text-green-500">
            <p>
              <FormattedMessage
                defaultMessage="Total: {totalCourse} courses"
                values={{ totalCourse: totalCourses ?? 0 }}
              />
            </p>
          </Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text className="text-green-500">
            <p>
              <FormattedMessage
                defaultMessage="Opening: {totalCourse} courses"
                values={{ totalCourse: openingCourses ?? 0 }}
              />
            </p>
          </Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text className="text-green-500">
            <p>
              <FormattedMessage
                defaultMessage="Paused: {totalCourse} courses"
                values={{ totalCourse: pausedCourses ?? 0 }}
              />
            </p>
          </Text>
        </FlexItem>
        <FlexItem grow={false}>
          <Text className="text-green-500">
            <p>
              <FormattedMessage
                defaultMessage="Closed: {totalCourse} courses"
                values={{ totalCourse: closedCourses ?? 0 }}
              />
            </p>
          </Text>
        </FlexItem>
      </FlexGroup>
    </PageHeaderSection>
  </PageHeader>
);

export default Header;
