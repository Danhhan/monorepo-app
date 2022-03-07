/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  FlexGroup,
  FlexItem,
  Page,
  PageBody,
  PageHeader,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import academic from 'assets/icons/ExportPrice/academic.svg';
import circleChecked from 'assets/icons/ExportPrice/circleChecked.svg';
import bgb from 'assets/images/ExportPrice/BGB.png';
import bgg from 'assets/images/ExportPrice/BGG.png';
import bgo from 'assets/images/ExportPrice/BGO.png';
import bgr from 'assets/images/ExportPrice/BGR.png';
import textLogoUrl from 'assets/images/ExportPrice/logo.png';
import {
  TEACHER_NAV,
  TEACHER_PHIL,
  TEACHER_PRE,
  TEACHER_PRE_5$,
  TEACHER_VIE,
} from 'configs/app.constants';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { getPriceData } from '../CalculatePrice/LocalStoragePrice';
import {
  BASIC,
  CONFIDENT,
  FLUENTLY,
  MASTER,
  STUDY_PROGRAMS,
} from '../constants/constants';
import CardLesson from './CardLessson';
import styles from './Export.module.scss';

function Export() {
  const history = useHistory();

  const priceCards = getPriceData();
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (!priceCards) {
      history.push('/prices/calculate');
    } else {
      const localPriceCards = [...priceCards];
      for (let index = 0; index < localPriceCards.length; index += 1) {
        const element = localPriceCards[index];
        if (element.id === BASIC) {
          updateCards(
            element,
            styles.textcolorGradientGreen,
            styles.bgGradientGreen,
            styles.borderBottomGreen,
            styles.footerPriceGreen,
            bgg,
            [
              {
                icon: academic,
                text: 'Trải nghiệm học 1 kèm 1',
              },
              {
                icon: academic,
                text: 'Tạo phản xạ giao tiếp',
              },
              {
                icon: circleChecked,
                text: 'Được đổi giáo viên',
              },
            ],
          );
        }
        if (element.id === CONFIDENT) {
          updateCards(
            element,
            styles.textcolorGradientBlue,
            styles.bgGradientBlue,
            styles.borderBottomBlue,
            styles.footerPriceBlue,
            bgb,
            [
              {
                icon: academic,
                text: 'Phát âm tốt, có ngữ điệu',
              },
              {
                icon: academic,
                text: 'Phản xạ giao tiếp nhạy bén',
              },
              {
                icon: academic,
                text: 'Đa dạng chủ đề từ vựng',
              },
              {
                icon: circleChecked,
                text: 'Được đổi giáo viên',
              },
              {
                icon: circleChecked,
                text: 'Bảo lưu khóa học',
              },
            ],
          );
        }
        if (element.id === FLUENTLY) {
          updateCards(
            element,
            styles.textcolorGradientOrange,
            styles.bgGradientOrange,
            styles.borderBottomOrange,
            styles.footerPriceOrange,
            bgo,
            [
              {
                icon: academic,
                text: 'Phát âm tốt, có ngữ điệu',
              },
              {
                icon: academic,
                text: 'Phản xạ giao tiếp nhạy bén',
              },
              {
                icon: academic,
                text: 'Đa dạng chủ đề từ vựng',
              },
              {
                icon: circleChecked,
                text: 'Được đổi giáo viên',
              },
              {
                icon: circleChecked,
                text: 'Bảo lưu khóa học',
              },
              {
                icon: circleChecked,
                text: 'Chuyển nhượng khóa học',
              },
              {
                icon: circleChecked,
                text: 'Cam kết đầu ra',
              },
            ],
          );
        }
        if (element.id === MASTER) {
          updateCards(
            element,
            styles.textcolorGradientRed,
            styles.bgGradientRed,
            styles.borderBottomRed,
            styles.footerPriceRed,
            bgr,
            [
              {
                icon: academic,
                text: 'Phát âm như người bản xứ',
              },
              {
                icon: academic,
                text: 'Phản xạ giao tiếp nhạy bén',
              },
              {
                icon: academic,
                text: 'Đa dạng chủ đề từ vựng',
              },
              {
                icon: academic,
                text: 'Mở rộng chủ đề nâng cao',
              },
              {
                icon: circleChecked,
                text: 'Được đổi giáo viên',
              },
              {
                icon: circleChecked,
                text: 'Bảo lưu khóa học',
              },
              {
                icon: circleChecked,
                text: 'Chuyển nhượng khóa học',
              },
              {
                icon: circleChecked,
                text: 'Cam kết đầu ra',
              },
            ],
          );
        }
      }
      setCards(localPriceCards);
    }
  }, []);
  const updateCards = (
    selectedCard,
    textcolorGradient,
    bgGradient,
    borderBottom,
    footerColor,
    bgHeader,
    desc,
  ) => {
    selectedCard.isMix = false;
    const selectedDuration1 = selectedCard?.radioHours1?.find(
      radio => radio.checked,
    );
    const selectedDuration2 = selectedCard?.radioHours2?.find(
      radio => radio.checked,
    );
    selectedCard.bgHeader = bgHeader;
    selectedCard.textColor = textcolorGradient;
    selectedCard.bgGradient = bgGradient;
    selectedCard.borderBottom = borderBottom;
    selectedCard.descriptions = desc;
    selectedCard.footerColor = footerColor;
    const duration1 = selectedDuration1 ? selectedDuration1.value : 0;
    const duration2 = selectedDuration2 ? selectedDuration2.value : 0;
    selectedCard.unitPrice1 = selectedCard?.price1?.specialPrice / duration1;
    selectedCard.unitPrice2 = selectedCard?.price2?.specialPrice / duration2;
    if (duration1 > 0) selectedCard.subTitle = `${duration1} GIỜ`;
    if (duration2 > 0) selectedCard.subTitle = `${duration1} GIỜ`;
    if (
      duration1 > 0 &&
      duration2 > 0 &&
      selectedCard.teacherGroup1 &&
      selectedCard.teacherGroup2
    ) {
      selectedCard.subTitle = `${duration1}H ${convertNameShortNational(
        selectedCard.teacherGroup1.value,
      )} - ${duration2}H ${convertNameShortNational(
        selectedCard.teacherGroup2.value,
      )}`;
      selectedCard.isMix = true;
    }
    return selectedCard;
  };
  const renderTeacherLabel = () => {
    let result;
    if (cards[0]?.teacherGroup1) {
      if (cards[0]?.teacherGroup1.value === TEACHER_PRE_5$) {
        result = `Premium'`;
      } else result = cards[0]?.teacherGroup1?.label;
    }
    if (cards[0]?.teacherGroup2) {
      if (cards[0]?.teacherGroup2.value === TEACHER_PRE_5$) {
        result = `Premium'`;
      } else result = cards[0]?.teacherGroup2?.label;
    }
    if (cards[0]?.teacherGroup1 && cards[0]?.teacherGroup2) {
      result = `${
        cards[0]?.teacherGroup1?.value === TEACHER_PRE_5$
          ? `Premium'`
          : cards[0]?.teacherGroup1?.label
      } - ${
        cards[0]?.teacherGroup2?.value === TEACHER_PRE_5$
          ? `Premium'`
          : cards[0]?.teacherGroup2?.label
      }`;
    }
    return <span>{result}</span>;
  };
  const convertNameShortNational = value => {
    switch (value) {
      case TEACHER_VIE:
        return 'VIỆT';
      case TEACHER_PHIL:
        return 'PHIL';
      case TEACHER_NAV:
        return 'NAV';
      case TEACHER_PRE:
        return 'PRE';
      case TEACHER_PRE_5$:
        return `PRE'`;
      default:
        break;
    }
  };
  const mapTeacherGroup = teacherGroup => {
    switch (teacherGroup?.value) {
      case TEACHER_VIE:
        return (
          <p>
            <strong>
              Giáo viên <span>{teacherGroup?.label}</span>:{' '}
            </strong>
            <span>
              chuyên đào tạo giao tiếp và ngữ pháp lưu loát, làm quen để học với
              giáo viên nước ngoài
            </span>
          </p>
        );
      case TEACHER_PHIL:
        return (
          <p>
            <strong>
              Giáo viên <span>{teacherGroup?.label}</span>:{' '}
            </strong>
            <span>
              chuyên đào tạo giao tiếp và ngữ pháp lưu loát, trình độ tiếng Anh
              đứng đầu Đồng Nam Á
            </span>
          </p>
        );
      case TEACHER_PRE:
        return (
          <p>
            <strong>
              Giáo viên <span>{teacherGroup?.label}</span>:{' '}
            </strong>
            <span>
              chuyên đào tạo giao tiếp và ngữ pháp theo văn hoá Châu Âu
            </span>
          </p>
        );
      case TEACHER_PRE_5$:
        return (
          <p>
            <strong>
              Giáo viên <span>Premium&apos;</span>:{' '}
            </strong>
            <span>
              chuyên đào tạo giao tiếp và ngữ pháp theo văn hoá Châu Âu
            </span>
          </p>
        );
      case TEACHER_NAV:
        return (
          <p>
            <strong>
              Giáo viên <span>{teacherGroup?.label}</span>:{' '}
            </strong>
            <span>
              chuyên đào tạo giao tiếp lưu loát theo âm giọng và văn hóa các
              nước bản xứ
            </span>
          </p>
        );

      default:
        break;
    }
  };
  const renderNote = () => {
    if (cards[0]?.teacherGroup1 && !cards[0]?.teacherGroup2) {
      return mapTeacherGroup(cards[0]?.teacherGroup1);
    }
    if (!cards[0]?.teacherGroup1 && cards[0]?.teacherGroup2) {
      return mapTeacherGroup(cards[0]?.teacherGroup2);
    }
    if (cards[0]?.teacherGroup1 && cards[0]?.teacherGroup2) {
      const teacherGr1 = mapTeacherGroup(cards[0]?.teacherGroup1);
      const teacherGr2 = mapTeacherGroup(cards[0]?.teacherGroup2);
      return (
        <>
          <p>{teacherGr1}</p>
          <Spacer size="m" />
          <p>{teacherGr2}</p>
        </>
      );
    }
  };
  return (
    <div className={styles.container}>
      <Page className={styles.page}>
        <PageBody style={{ marginTop: 20 }}>
          <PageHeader
            style={{ position: 'relative' }}
            pageTitle={
              <FlexGroup>
                <FlexItem style={{ position: 'absolute' }}>
                  <Link to="/">
                    <img
                      src={textLogoUrl}
                      alt="Antoree text logo"
                      className="w-48 self-center"
                    />
                  </Link>
                </FlexItem>
                <FlexItem className="text-center">
                  <Title className="text-3xl font-bold">
                    <h1>
                      HỌC PHÍ GIÁO VIÊN
                      <span className="uppercase ml-2 mr-2">
                        {renderTeacherLabel()}
                      </span>
                      DẠY{' '}
                      <span>
                        {
                          STUDY_PROGRAMS.find(
                            item => item.id === cards[0]?.studyProgram,
                          )?.subLabel
                        }
                      </span>
                    </h1>
                  </Title>
                  {cards[0]?.applyAt && (
                    <Text className="text-xl mt-1">
                      (Áp dụng từ nay đến{' '}
                      <>{moment(cards[0]?.applyAt).format('DD-MM-YYYY')}</>)
                    </Text>
                  )}
                </FlexItem>
              </FlexGroup>
            }
          />
          <Spacer />
          <div>
            <FlexGroup
              gutterSize="xl"
              className="items-center justify-center justify-items-center"
            >
              {cards.map((card, index) => (
                <FlexItem ke={index} grow={false}>
                  <CardLesson
                    card={card}
                    convertNameShortNational={convertNameShortNational}
                  />
                </FlexItem>
              ))}
            </FlexGroup>
            {cards[0]?.isMix ? (
              <Spacer size="xxl" />
            ) : (
              <>
                <Spacer size="xxl" />
                <Spacer size="xxl" />
              </>
            )}

            <FlexGroup className="items-center justify-center justify-items-center">
              <FlexItem grow={false}>{renderNote()}</FlexItem>
            </FlexGroup>
          </div>
        </PageBody>
      </Page>
    </div>
  );
}

export default Export;
