import {
  Button,
  Card,
  FieldNumber,
  FieldText,
  FlexGroup,
  FlexItem,
  notification,
  Radio,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { withDebounce } from 'helpers';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import EditableText from '../../../../components/EditableText';

function PriceCard({
  card,
  onChangeRadiHour,
  onChangeRadiHour2,
  onChangeTitle,
  onAddedLesson,
  onRemoveLesson,
  onChangeDurationOther,
}) {
  const onChange = optionId => {
    onChangeRadiHour(optionId, card.id);
  };
  const onChange2 = optionId => {
    onChangeRadiHour2(optionId, card.id);
  };
  // state show input duration other
  const [isVisible1, setVisible1] = useState(false);
  const [isVisible2, setVisible2] = useState(false);
  const radio = card?.radioHours1?.find(item => item.checked);
  useEffect(() => {
    if (radio?.isOther) setVisible1(true);
    else setVisible1(false);
  }, [radio?.isOther]);
  const radio2 = card?.radioHours2?.find(item => item.checked);
  useEffect(() => {
    if (radio2?.isOther) setVisible2(true);
    else setVisible2(false);
  }, [radio2?.isOther]);
  return (
    <FlexItem>
      <Card
        style={{
          boxShadow:
            '0px 0.9px 4px -1px rgba(0, 0, 0, 0.08), 0px 2.6px 8px -1px rgba(0, 0, 0, 0.06), 0px 5.7px 12px -1px rgba(0, 0, 0, 0.05), 0px 15px 15px -1px rgba(0, 0, 0, 0.04)',
        }}
        textAlign="left"
        title={
          <FlexGroup className="py-1" gutterSize="s" justifyContent="center">
            <FlexItem>
              <EditableText
                value={card?.title}
                onEditCompleted={async value => {
                  onChangeTitle(value, card?.id);
                }}
                render={() => (
                  <span className="text-center">{card?.title}</span>
                )}
              />
            </FlexItem>
          </FlexGroup>
        }
        footer={
          <div>
            {!card?.isAdded ? (
              <Button
                onClick={() => {
                  if (!card?.teacherGroup1 && !card?.teacherGroup2) {
                    notification.error({
                      title: 'Calculate price failure',
                      text: 'Chưa chọn nhóm giáo viên kìa!!!',
                    });
                    return;
                  }
                  onAddedLesson(card?.id, true);
                }}
                color="text"
                iconType="plusInCircle"
                fullWidth
              >
                Thêm vào bảng giá
              </Button>
            ) : (
              <Button
                onClick={() => {
                  onRemoveLesson(card?.id);
                }}
                fill
                iconType="checkInCircleFilled"
                fullWidth
              >
                Đã thêm vào bảng giá
              </Button>
            )}
          </div>
        }
        hasBorder
      >
        <FlexGroup>
          <FlexItem>
            <FieldText
              value={card?.teacherGroup1?.label || ''}
              disabled
              compressed
              className="rounded-lg"
            />
          </FlexItem>
          <FlexItem>
            <FieldText
              value={card?.teacherGroup2?.label || ''}
              disabled
              compressed
              className="rounded-lg"
            />
          </FlexItem>
        </FlexGroup>
        <FlexGroup>
          <FlexItem>
            <FlexGroup>
              <FlexItem>
                <Title className="text-base font-bold">
                  <p>
                    <FormattedMessage defaultMessage="Số giờ:" />
                  </p>
                </Title>
              </FlexItem>
            </FlexGroup>
            <Spacer />
            {card?.radioHours1?.length > 0 &&
              card?.radioHours1?.map(radioHour1 => (
                <FlexGroup key={radioHour1.id}>
                  <FlexItem>
                    <Radio
                      id={radioHour1.id}
                      label={radioHour1.label}
                      checked={radioHour1.checked}
                      onChange={() => onChange(radioHour1.id)}
                    />
                  </FlexItem>
                </FlexGroup>
              ))}
            {isVisible1 && (
              <FlexGroup>
                <FlexItem>
                  <FieldNumber
                    onChange={withDebounce(e =>
                      onChangeDurationOther(
                        e.target.value,
                        card?.id,
                        'radioHours1',
                      ),
                    )}
                    className="rounded-lg"
                  />
                </FlexItem>
              </FlexGroup>
            )}
          </FlexItem>
          <FlexItem>
            <FlexGroup>
              <FlexItem>
                <Title className="text-base font-bold">
                  <p>
                    <FormattedMessage defaultMessage="Số giờ:" />
                  </p>
                </Title>
              </FlexItem>
            </FlexGroup>
            <Spacer />
            {card?.teacherGroup2 &&
              card?.radioHours2?.map(radioHour2 => (
                <FlexGroup key={radioHour2.id}>
                  <FlexItem>
                    <Radio
                      id={radioHour2.id}
                      label={radioHour2.label}
                      checked={radioHour2.checked}
                      onChange={() => onChange2(radioHour2.id)}
                    />
                  </FlexItem>
                </FlexGroup>
              ))}
            {isVisible2 && (
              <FlexGroup>
                <FlexItem>
                  <FieldNumber
                    onChange={withDebounce(e =>
                      onChangeDurationOther(
                        e.target.value,
                        card?.id,
                        'radioHours2',
                      ),
                    )}
                    className="rounded-lg"
                  />
                </FlexItem>
              </FlexGroup>
            )}
          </FlexItem>
        </FlexGroup>
      </Card>
    </FlexItem>
  );
}

PriceCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.object.isRequired,
  onChangeRadiHour: PropTypes.func.isRequired,
  onChangeRadiHour2: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onAddedLesson: PropTypes.func.isRequired,
  onRemoveLesson: PropTypes.func.isRequired,
  onChangeDurationOther: PropTypes.func.isRequired,
};

export default PriceCard;
