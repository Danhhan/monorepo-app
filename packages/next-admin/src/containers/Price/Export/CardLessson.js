/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable consistent-return */
import {
  BetaBadge,
  Card,
  FlexGroup,
  FlexItem,
  Icon,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import {
  TEACHER_NAV,
  TEACHER_PHIL,
  TEACHER_PRE,
  TEACHER_PRE_5$,
  TEACHER_VIE,
} from 'configs/app.constants';
import PropTypes from 'prop-types';
import { formatMoney } from 'utils';
import styles from './Export.module.scss';

function CardLesson({ card, convertNameShortNational }) {
  const renderUnitPrice = () => {
    const { isMix } = card;
    return (
      <div grow={false} className={`${card?.textColor} ${card?.borderBottom}`}>
        {isMix ? (
          <div className="course-mix">
            <p className="font-bold text-lg">
              {`${generateNameNational(
                card?.teacherGroup1.value,
              )} ${formatMoney(card?.unitPrice1)}/h`}
            </p>
            <p className="font-bold text-lg">{`${generateNameNational(
              card?.teacherGroup2.value,
            )} ${formatMoney(card?.unitPrice2)}/h`}</p>
          </div>
        ) : (
          <>
            <p className="font-bold text-lg">{`${formatMoney(
              card?.unitPrice1,
            )}/h`}</p>
          </>
        )}
      </div>
    );
  };
  const generateNameNational = value => {
    switch (value) {
      case TEACHER_VIE:
        return 'Việt';
      case TEACHER_PHIL:
        return 'Phil';
      case TEACHER_NAV:
        return 'Nav';
      case TEACHER_PRE:
        return 'Pre';
      case TEACHER_PRE_5$:
        return `Pre'`;
      default:
        break;
    }
  };
  return (
    <>
      <FlexItem grow={false}>
        <Card
          marginTop={-30}
          className={styles.card}
          style={{
            boxShadow:
              '0px 0.9px 4px -1px rgba(0, 0, 0, 0.08), 0px 2.6px 8px -1px rgba(0, 0, 0, 0.06), 0px 5.7px 12px -1px rgba(0, 0, 0, 0.05), 0px 15px 15px -1px rgba(0, 0, 0, 0.04)',
            width: 322,
            height: 598,
            border: 'none',
            borderRadius: 16,
          }}
          image={
            <div style={{ position: 'relative' }}>
              <img src={card.bgHeader} alt="Nature" />
              <div
                style={{
                  position: 'absolute',
                  top: 45,
                  width: '100%',
                  textAlign: 'center',
                  color: 'white',
                }}
              >
                <Title className="text-4xl font-bold text-white uppercase">
                  <h1>{card?.title}</h1>
                </Title>
                <Text className="text-2xl uppercase">{card.subTitle}</Text>
              </div>
            </div>
          }
        >
          <FlexGroup className="items-center justify-center justify-items-center">
            <FlexItem grow={false}>{renderUnitPrice()}</FlexItem>
          </FlexGroup>
          <FlexGroup>
            <FlexItem grow={false}>&nbsp;</FlexItem>
            <FlexItem>
              {card?.descriptions.map((desc, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <FlexGroup className="py-1" key={index} gutterSize="none">
                  <FlexItem className="mt-1" grow={1}>
                    <Icon type={desc.icon} />
                  </FlexItem>
                  <FlexItem grow={10}>
                    <Text className="text-base text-left ml-1">
                      <p>{desc.text}</p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              ))}
            </FlexItem>
            <FlexItem grow={false}>&nbsp;</FlexItem>
          </FlexGroup>
          <div className={styles.cardFooter}>
            <div>
              <p
                className="text-2xl font-normal line-through mb-2"
                style={{ color: '#343741' }}
              >
                {formatMoney(card.specialPrice)}
              </p>
            </div>
            <div className={card?.footerColor}>
              <span className="text-4xl font-bold">
                {formatMoney(card.originalPrice)}
              </span>
              <div className={styles.discount}>
                <div className="mt-3">
                  <p
                    style={{ fontSize: '15px', fontWeight: '800' }}
                  >{`${card?.discount} %`}</p>
                  <p style={{ fontSize: '13px', fontWeight: 'normal' }}>OFF</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </FlexItem>
      {card?.isMix && (
        <>
          <FlexItem className="mt-12 text-center" grow={false}>
            <FlexGroup>
              <FlexItem grow={false}>
                <BetaBadge
                  label={convertNameShortNational(card?.teacherGroup1.value)}
                  size="l"
                />
              </FlexItem>
              <FlexItem grow={false}>
                <Text>
                  <span>{formatMoney(card?.price1?.specialPrice)}</span>
                </Text>
              </FlexItem>
              <FlexItem grow={false}>
                <Text>
                  <span className="line-through">
                    {formatMoney(card?.price1?.originalPrice)}
                  </span>
                </Text>
              </FlexItem>
            </FlexGroup>
            <Spacer size="s" />
            <FlexGroup>
              <FlexItem grow={false}>
                <BetaBadge
                  label={convertNameShortNational(card?.teacherGroup2.value)}
                  size="l"
                />
              </FlexItem>
              <FlexItem grow={false}>
                <Text>
                  <span>{formatMoney(card?.price2?.specialPrice)}</span>
                </Text>
              </FlexItem>
              <FlexItem grow={false}>
                <Text>
                  <span className="line-through">
                    {formatMoney(card?.price2?.originalPrice)}
                  </span>
                </Text>
              </FlexItem>
            </FlexGroup>
          </FlexItem>
        </>
      )}
    </>
  );
}

CardLesson.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  card: PropTypes.object.isRequired,
  convertNameShortNational: PropTypes.func.isRequired,
};

export default CardLesson;
