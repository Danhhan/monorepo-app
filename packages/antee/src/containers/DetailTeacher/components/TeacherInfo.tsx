import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FlexGroup, FlexItem, Outline, Text } from '@antoree/ant-ui';
import { RatingCard } from '../../../components';

type TeacherInfoProps = {
  data: any;
};

const TeacherInfo: React.FC<TeacherInfoProps> = data => {
  const { ClockIcon, UserIcon: UserIconOutline } = Outline;
  const dataTeacherInfo = data ? data.data : {};
  return (
    <div>
      {data.data ? (
        <div>
          <FlexGroup responsive gutterSize="none">
            <FlexItem>
              <FlexGroup
                gutterSize="none"
                responsive={false}
                className="items-center flex-wrap"
              >
                <FlexItem grow={false} className="flex-row">
                  <Text className="font-medium">
                    <p>{dataTeacherInfo.nationality}</p>
                  </Text>
                  &nbsp; . &nbsp;
                  <RatingCard averageRating={dataTeacherInfo.rating || 5} />
                </FlexItem>

                <FlexItem className="-mt-2 hidden md:block" grow={false}>
                  &nbsp;&nbsp;
                </FlexItem>
                <FlexItem grow={false} className="flex-row">
                  <Text color="subdued" size="m">
                    <p>
                      <ClockIcon
                        style={{
                          width: '16px',
                          height: '16px',
                          fill: 'none',
                        }}
                        className="euiIcon euiButtonContent__icon"
                      />
                      &nbsp;
                      {Math.round(
                        // eslint-disable-next-line radix
                        parseInt(dataTeacherInfo.teaching_hours || '1') ?? 0,
                      )}{' '}
                      giờ
                    </p>
                  </Text>
                  <Text color="subdued" size="m" className="ml-2">
                    <p>
                      <UserIconOutline
                        style={{
                          width: '16px',
                          height: '16px',
                          fill: 'none',
                        }}
                        className="euiIcon euiButtonContent__icon"
                      />
                      &nbsp;{dataTeacherInfo.students_count}&nbsp;
                      <FormattedMessage defaultMessage="học viên" />
                    </p>
                  </Text>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          </FlexGroup>
        </div>
      ) : null}
    </div>
  );
};

export default TeacherInfo;
