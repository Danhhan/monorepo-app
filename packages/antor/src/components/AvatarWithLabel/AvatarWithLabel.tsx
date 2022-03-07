/* eslint-disable no-nested-ternary */
import { Avatar, FlexGroup, FlexItem, Icon, Text } from '@antoree/ant-ui';
import skype from 'assets/icons/user/skype.svg';
import { memo } from 'react';
import { User } from 'services/course';

export type AvatarWithLabelProps = {
  student: User;
};
export const CONFIRM_SESSION_FORM_ID = 'CONFIRM_SESSION_FORM_ID';

const AvatarWithLabel: React.FC<AvatarWithLabelProps> = ({ student }) => {
  return (
    <>
      <FlexItem grow={false}>
        <Avatar
          className="h-14 w-14"
          name={student.name}
          imageUrl={student?.avatarUrl}
          size="m"
          type="space"
        />
      </FlexItem>
      <FlexItem grow={false} className="text-left">
        <Text className="font-bold text-xl">{student?.name}</Text>
        {student?.skypeId && (
          <FlexGroup gutterSize="xs" style={{ color: `#69707D` }}>
            <FlexItem grow={false}>
              <span>
                <Icon size="l" type={skype} />
              </span>
            </FlexItem>
            <FlexItem grow={false}>
              <p>{student?.skypeId}</p>
            </FlexItem>
          </FlexGroup>
        )}
      </FlexItem>
    </>
  );
};

export default memo(AvatarWithLabel);
