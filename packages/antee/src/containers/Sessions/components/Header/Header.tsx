import {
  FlexItem,
  FlexGroup,
  PageHeader,
  PageHeaderSection,
  Text,
  Icon,
  Title,
  Avatar,
} from '@antoree/ant-ui';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAuth } from 'services/auth/contexts';

export type HeaderProps = {
  teacherName?: string;
  teacherAvatar?: string;
  courseTitle?: string;
};

const Header: React.FC<HeaderProps> = ({
  teacherName,
  teacherAvatar,
  courseTitle,
}) => (
  <PageHeader className="bg-white px-6" paddingSize="s" responsive={false}>
    <PageHeaderSection>
      <FlexGroup responsive={false} gutterSize="s" alignItems="center">
        <FlexItem grow={false}>
          <Link to="/courses">
            <Icon type="sortLeft" />
          </Link>
        </FlexItem>
        <FlexItem>
          <Text>
            <p>{courseTitle ?? ''}</p>
          </Text>
        </FlexItem>
      </FlexGroup>
    </PageHeaderSection>
    <PageHeaderSection>
      <FlexGroup
        gutterSize="s"
        alignItems="center"
        justifyContent="flexEnd"
        responsive={false}
      >
        <FlexItem grow={false}>
          <FlexGroup
            direction="column"
            gutterSize="none"
            alignItems="flexEnd"
            responsive={false}
          >
            <FlexItem>
              <Text size="xs" color="text">
                <p>
                  <FormattedMessage defaultMessage="Teacher" />
                </p>
              </Text>
            </FlexItem>
            <FlexItem>
              <Title size="xxs" className="text-right">
                <h4>{teacherName ?? ''}</h4>
              </Title>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem grow={false}>
          <Avatar
            size="l"
            name={teacherName ?? ''}
            imageUrl={teacherAvatar ?? ''}
          />
        </FlexItem>
      </FlexGroup>
    </PageHeaderSection>
  </PageHeader>
);

export default Header;
