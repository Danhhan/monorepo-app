/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  BasicTable,
  FlexGroup,
  FlexItem,
  htmlIdGenerator,
  notification,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { calulatePrice } from 'services/price';
import { formatMoney } from 'utils';
import {
  BASIC,
  CONFIDENT,
  DEFAULT_PRICE_DATA,
  FLUENTLY,
  LAST_PRICE,
  MASTER,
  ORIGINAL,
  RADIO_HOURS,
  SPECIAL,
  TEACHER_DURATION_1,
  TEACHER_DURATION_2,
  TEACHER_FEE_1,
  TEACHER_FEE_2,
  TOTAL_DURATION,
  TOTAL_SPECIAL,
} from '../../constants/constants';
import {
  removePriceData,
  savePriceData,
  getPriceData,
} from '../LocalStoragePrice';
import PriceCard from './PriceCard';

// Don't be cry
function CardPrice({
  typeTeacher1,
  typeTeacher2,
  studentType,
  studyProgram,
  applyAt,
}) {
  const [priceData, setPriceData] = useState(DEFAULT_PRICE_DATA);
  const [responsePrice, setResponsePrice] = useState(undefined);
  const [selectedCardId, setSelectedCardId] = useState(undefined);
  const generalRadioHours = (start, deleteCount, nameCourse) => {
    const itemOther = {
      // referValue: STUDENT_TYPE_KID,
      id: htmlIdGenerator()(),
      value: undefined,
      label: 'Khác',
      checked: false,
      isOther: true,
    };
    let localRadioHours = [...RADIO_HOURS]
      .filter(item => item.referValue === studentType)
      .map(item => item);
    localRadioHours.splice(start, deleteCount);
    const result = [];
    localRadioHours.forEach(element => {
      const localEl = { ...element };
      localEl.id = htmlIdGenerator(nameCourse)();
      result.push(localEl);
    });
    localRadioHours = [];
    localRadioHours = [...result];
    localRadioHours.push(itemOther);
    return localRadioHours;
  };
  const initPriceData = [
    {
      id: BASIC,
      title: 'Cơ bản',
      teacherGroup1: undefined,
      teacherGroup2: undefined,
      isAdded: false,
      radioHours1: undefined,
      radioHours2: undefined,
      price1: undefined,
      price2: undefined,
    },
    {
      id: CONFIDENT,
      title: 'Tự tin',
      teacherGroup1: undefined,
      teacherGroup2: undefined,
      isAdded: false,
      radioHours1: undefined,
      radioHours2: undefined,
      price1: undefined,
      price2: undefined,
    },
    {
      id: FLUENTLY,
      title: 'Lưu loát',
      teacherGroup1: undefined,
      teacherGroup2: undefined,
      isAdded: false,
      radioHours1: undefined,
      radioHours2: undefined,
      price1: undefined,
      price2: undefined,
    },
    {
      id: MASTER,
      title: 'Nâng cao',
      teacherGroup1: undefined,
      teacherGroup2: undefined,
      isAdded: false,
      radioHours1: undefined,
      radioHours2: undefined,
      price1: undefined,
      price2: undefined,
    },
  ];
  const [cards, setCards] = useState(initPriceData);
  useEffect(() => {
    const localCards = [...cards];
    const checkCardActive = localCards?.some(card => card.isAdded);
    const newCards = localCards.map(card => {
      const localCard = { ...card };
      if (typeTeacher1) {
        localCard.teacherGroup1 = {
          value: typeTeacher1?.value,
          label: typeTeacher1?.label,
        };
        updateRadioHours(localCard, 'radioHours1');
      }
      if (typeTeacher2) {
        localCard.teacherGroup2 = {
          value: typeTeacher2?.value,
          label: typeTeacher2?.label,
        };
        updateRadioHours(localCard, 'radioHours2');
      }
      localCard.applyAt = applyAt;
      localCard.studyProgram = studyProgram;

      if (checkCardActive) {
        localCard.isAdded = false;
        onRemovePriceTable('value1');
        onRemovePriceTable('value2');
        onRemovePriceTable('value3');
        onRemovePriceTable('value4');
        removePriceData();
      }
      if (!typeTeacher1) {
        localCard.teacherGroup1 = undefined;
        localCard.radioHours1 = undefined;
      }
      if (!typeTeacher2) {
        localCard.teacherGroup2 = undefined;
        localCard.radioHours2 = undefined;
      }
      return localCard;
    });
    setCards(newCards);
  }, [typeTeacher1, typeTeacher2, studyProgram]);

  const updateRadioHours = (localCard, props) => {
    if (localCard.id === BASIC) {
      localCard[props] = generalRadioHours(2, 3, 'basic-1');
      localCard[props] = generalRadioHours(2, 3, 'basic-2');
    }
    if (localCard.id === CONFIDENT) {
      localCard[props] = generalRadioHours(3, 2, 'confident-1');
      localCard[props] = generalRadioHours(3, 2, 'confident-2');
    }
    if (localCard.id === FLUENTLY) {
      localCard[props] = generalRadioHours(4, 1, 'fluent-1');
      localCard[props] = generalRadioHours(4, 1, 'fluent-2');
    }
    if (localCard.id === MASTER) {
      localCard[props] = generalRadioHours(0, 0, 'advanced-1');
      localCard[props] = generalRadioHours(0, 0, 'advanced-2');
    }
  };
  const handleChangeRadioHour = (optionId, cardId) => {
    const localCards = [...cards];
    const indexCard = localCards.findIndex(card => card.id === cardId);
    const { radioHours1 } = localCards[indexCard];
    const indexRadio = radioHours1?.findIndex(hour => hour.id === optionId);
    radioHours1.forEach(radio => {
      // eslint-disable-next-line no-param-reassign
      radio.checked = false;
    });
    radioHours1[indexRadio].checked = true;
    localCards[indexCard].radioHours1 = radioHours1;
    setCards(localCards);
  };
  const handleChangeRadioHour2 = (optionId, cardId) => {
    const localCards = [...cards];
    const indexCard = localCards.findIndex(card => card.id === cardId);
    const { radioHours2 } = localCards[indexCard];
    const indexRadio = radioHours2?.findIndex(hour => hour.id === optionId);
    radioHours2.forEach(radio => {
      // eslint-disable-next-line no-param-reassign
      radio.checked = false;
    });
    radioHours2[indexRadio].checked = true;
    localCards[indexCard].radioHours2 = radioHours2;
    setCards(localCards);
  };
  const handleChangeTitle = (value, cardId) => {
    const localCards = [...cards];
    const indexCard = localCards.findIndex(card => card.id === cardId);
    localCards[indexCard].title = value;
    const localStoragePrices = getPriceData();
    if (localStoragePrices?.length > 0) {
      removePriceData();
      savePriceData(localCards);
    }
    setCards(localCards);
  };
  const updatePriceData = (data, selectedCard) => {
    const {
      originalPrice: totalOriginalPrice,
      specialPrice: totalSpecialPrice,
      detail,
      discount,
    } = data;
    const localCards = [...cards];
    const index = localCards.findIndex(card => card.id === selectedCard?.id);
    if (selectedCard?.id === BASIC) {
      updatePriceTable(
        totalOriginalPrice,
        totalSpecialPrice,
        selectedCard,
        'value1',
        detail,
        discount,
      );
    }
    if (selectedCard?.id === CONFIDENT) {
      updatePriceTable(
        totalOriginalPrice,
        totalSpecialPrice,
        selectedCard,
        'value2',
        detail,
        discount,
      );
    }
    if (selectedCard?.id === FLUENTLY) {
      updatePriceTable(
        totalOriginalPrice,
        totalSpecialPrice,
        selectedCard,
        'value3',
        detail,
        discount,
      );
    }
    if (selectedCard?.id === MASTER) {
      updatePriceTable(
        totalOriginalPrice,
        totalSpecialPrice,
        selectedCard,
        'value4',
        detail,
        discount,
      );
    }
    // ============= update card
    if (localCards[index].id === BASIC) {
      updatePrice(
        localCards[index],
        detail,
        totalOriginalPrice,
        totalSpecialPrice,
        discount,
      );
    }
    if (localCards[index].id === CONFIDENT) {
      updatePrice(
        localCards[index],
        detail,
        totalOriginalPrice,
        totalSpecialPrice,
        discount,
      );
    }
    if (localCards[index].id === FLUENTLY) {
      updatePrice(
        localCards[index],
        detail,
        totalOriginalPrice,
        totalSpecialPrice,
        discount,
      );
    }
    if (localCards[index].id === MASTER) {
      updatePrice(
        localCards[index],
        detail,
        totalOriginalPrice,
        totalSpecialPrice,
        discount,
      );
    }
    removePriceData();
    const filteredCards = localCards?.filter(card => card.isAdded);
    savePriceData(filteredCards);
    setCards(localCards);
  };

  const addPrice = (localCards, specialPrice, originalPrice, prop) => {
    localCards[prop] = {
      specialPrice,
      originalPrice,
    };
  };

  const updatePriceTable = (
    totalOriginalPrice,
    totalSpecialPrice,
    selectedCard,
    prop,
    detail,
    discount,
  ) => {
    const localPriceData = [...priceData];
    const indexOrigin = localPriceData.findIndex(
      price => price.id === ORIGINAL,
    );
    localPriceData[indexOrigin][prop] = formatMoney(totalOriginalPrice);
    const indexSpecial = localPriceData.findIndex(
      price => price.id === SPECIAL,
    );
    localPriceData[indexSpecial][prop] = formatMoney(totalSpecialPrice);

    const selectedDuration1 = selectedCard?.radioHours1?.find(
      duration => duration.checked,
    );

    const selectedDuration2 = selectedCard?.radioHours2?.find(
      duration => duration.checked,
    );

    if (typeTeacher1) {
      const indexTeacherDuration1 = localPriceData.findIndex(
        price => price.id === TEACHER_DURATION_1,
      );
      localPriceData[indexTeacherDuration1][prop] = selectedDuration1.value;
      localPriceData[indexTeacherDuration1].teacherGroup = typeTeacher1.label;

      const indexTeacherFee1 = localPriceData.findIndex(
        price => price.id === TEACHER_FEE_1,
      );
      const price1 = findPriceByTeacherType(detail, selectedCard.teacherGroup1);
      const { specialPrice } = price1;
      localPriceData[indexTeacherFee1][prop] = formatMoney(specialPrice);
      localPriceData[indexTeacherFee1].teacherGroup = typeTeacher1.label;
    }

    if (typeTeacher2) {
      const indexTeacherDuration2 = localPriceData.findIndex(
        price => price.id === TEACHER_DURATION_2,
      );
      localPriceData[indexTeacherDuration2][prop] = selectedDuration2.value;
      localPriceData[indexTeacherDuration2].teacherGroup = typeTeacher2.label;
      const indexTeacherFee2 = localPriceData.findIndex(
        price => price.id === TEACHER_FEE_2,
      );
      const price2 = findPriceByTeacherType(detail, selectedCard.teacherGroup2);
      const { specialPrice } = price2;
      localPriceData[indexTeacherFee2][prop] = formatMoney(specialPrice);
      localPriceData[indexTeacherFee2].teacherGroup = typeTeacher2.label;
    }

    const indexDuration = localPriceData.findIndex(
      price => price.id === TOTAL_DURATION,
    );
    const totalDuration =
      Number(typeTeacher1 ? selectedDuration1.value : 0) +
      Number(typeTeacher2 ? selectedDuration2.value : 0);
    localPriceData[indexDuration][prop] = totalDuration;

    const indexLastPrice = localPriceData.findIndex(
      price => price.id === LAST_PRICE,
    );
    localPriceData[indexLastPrice][prop] = formatMoney(totalSpecialPrice);

    const indexTotalSpecial = localPriceData.findIndex(
      price => price.id === TOTAL_SPECIAL,
    );
    const result = totalOriginalPrice - totalSpecialPrice;
    localPriceData[indexTotalSpecial][prop] = `${formatMoney(
      result,
    )} (${Math.round(discount)}%)`;
    setPriceData(localPriceData);
  };
  const updatePrice = (
    localCard,
    detail,
    totalOriginalPrice,
    totalSpecialPrice,
    discount,
  ) => {
    const price1 = findPriceByTeacherType(detail, localCard.teacherGroup1);
    const price2 = findPriceByTeacherType(detail, localCard?.teacherGroup2);
    if (price1) {
      const { specialPrice, originalPrice } = price1;
      addPrice(localCard, specialPrice, originalPrice, 'price1');
    }
    if (price2) {
      const { specialPrice, originalPrice } = price2;
      addPrice(localCard, specialPrice, originalPrice, 'price2');
    }
    localCard.specialPrice = totalOriginalPrice;
    localCard.originalPrice = totalSpecialPrice;
    localCard.discount = Math.round(discount);
  };
  const findPriceByTeacherType = (detail, teacherGroup) => {
    const price = detail.find(
      item => item.src.teacherType === teacherGroup?.value,
    );
    return price;
  };

  const calculatePriceMutation = useMutation(
    mutateData => calulatePrice(mutateData),
    {
      onSuccess: data => {
        setResponsePrice(data);
      },
      onError: err => {
        const errMessage = err?.response?.data?.errors[0]?.message;
        const errCode = err?.response?.status;
        if (errCode !== 500) {
          notification.error({
            title: err?.message ?? 'Calculate price failure',
            text: errMessage,
          });
        } else {
          notification.error({
            title: err?.message ?? 'Calculate price failure',
            text: 'Something went wrong!',
          });
        }
      },
    },
  );
  const handleAddedLesson = (cardId, isAdded) => {
    setSelectedCardId(cardId);
    const localCards = [...cards];
    const index = localCards.findIndex(card => card.id === cardId);
    const { radioHours1, radioHours2 } = localCards[index];
    const hourSelected1 = radioHours1
      ? radioHours1?.find(radioHour => radioHour.checked)
      : undefined;
    const hourSelected2 = radioHours2
      ? radioHours2?.find(radioHour => radioHour.checked)
      : undefined;
    const params = [];
    if (typeTeacher1) {
      params.push({
        topic: studyProgram,
        teacherType: typeTeacher1?.value,
        tag: studentType,
        duration: hourSelected1?.value,
      });
    }
    if (typeTeacher2) {
      params.push({
        topic: studyProgram,
        teacherType: typeTeacher2?.value,
        tag: studentType,
        duration: hourSelected2?.value,
      });
    }
    const body = { priceList: params };
    calculatePriceMutation.mutate({ body });
  };
  const handleRemoveLesson = cardId => {
    const localCards = [...cards];
    const index = localCards.findIndex(card => card.id === cardId);
    localCards[index].isAdded = false;
    if (localCards[index]?.id === BASIC) {
      onRemovePriceTable('value1');
    }
    if (localCards[index]?.id === CONFIDENT) {
      onRemovePriceTable('value2');
    }
    if (localCards[index]?.id === FLUENTLY) {
      onRemovePriceTable('value3');
    }
    if (localCards[index]?.id === MASTER) {
      onRemovePriceTable('value4');
    }
    const localStoragePrice = getPriceData();
    if (localStoragePrice.length === 1) {
      removePriceData();
    } else {
      const newPrices = localStoragePrice.filter(
        item => item.id !== localCards[index]?.id,
      );
      removePriceData();
      savePriceData(newPrices);
    }
    setCards(localCards);
  };
  const onRemovePriceTable = prop => {
    const localPriceData = [...priceData];
    const indexOrigin = localPriceData.findIndex(
      price => price.id === ORIGINAL,
    );
    localPriceData[indexOrigin][prop] = undefined;
    const indexSpecial = localPriceData.findIndex(
      price => price.id === SPECIAL,
    );
    localPriceData[indexSpecial][prop] = undefined;

    const indexTeacherDuration1 = localPriceData.findIndex(
      price => price.id === TEACHER_DURATION_1,
    );
    localPriceData[indexTeacherDuration1][prop] = undefined;
    localPriceData[indexTeacherDuration1].teacherGroup = undefined;

    const indexTeacherFee1 = localPriceData.findIndex(
      price => price.id === TEACHER_FEE_1,
    );
    localPriceData[indexTeacherFee1][prop] = undefined;
    localPriceData[indexTeacherFee1].teacherGroup = undefined;

    const indexTeacherDuration2 = localPriceData.findIndex(
      price => price.id === TEACHER_DURATION_2,
    );
    localPriceData[indexTeacherDuration2][prop] = undefined;
    localPriceData[indexTeacherDuration2].teacherGroup = undefined;
    const indexTeacherFee2 = localPriceData.findIndex(
      price => price.id === TEACHER_FEE_2,
    );
    localPriceData[indexTeacherFee2][prop] = undefined;
    localPriceData[indexTeacherFee2].teacherGroup = undefined;

    const indexDuration = localPriceData.findIndex(
      price => price.id === TOTAL_DURATION,
    );
    localPriceData[indexDuration][prop] = undefined;

    const indexLastPrice = localPriceData.findIndex(
      price => price.id === LAST_PRICE,
    );
    localPriceData[indexLastPrice][prop] = undefined;

    const indexTotalSpecial = localPriceData.findIndex(
      price => price.id === TOTAL_SPECIAL,
    );
    localPriceData[indexTotalSpecial][prop] = undefined;
    setPriceData(localPriceData);
  };
  useEffect(() => {
    if (calculatePriceMutation.isSuccess) {
      const localCards = [...cards];
      const index = localCards.findIndex(card => card.id === selectedCardId);
      localCards[index].isAdded = true;
      updatePriceData(responsePrice, localCards[index]);
      setCards(localCards);
    }
  }, [calculatePriceMutation.isSuccess]);
  const handleChangeDurationOther = (value, cardId, propRadioHour) => {
    const localCards = [...cards];
    const index = localCards.findIndex(card => card.id === cardId);
    const tmpRadioHours = [...localCards[index][propRadioHour]];
    const indexRadio = tmpRadioHours.findIndex(item => item?.checked);
    if (indexRadio !== -1) {
      tmpRadioHours[indexRadio].value = value;
      localCards[index][propRadioHour] = tmpRadioHours;
      setCards(localCards);
    }
  };
  return (
    <>
      <FlexGroup>
        {cards.map(card => (
          <PriceCard
            key={card.id}
            card={card}
            onChangeRadiHour={handleChangeRadioHour}
            onChangeRadiHour2={handleChangeRadioHour2}
            onChangeTitle={handleChangeTitle}
            typeTeacher1={typeTeacher1}
            typeTeacher2={typeTeacher2}
            studentType={studentType}
            studyProgram={studyProgram}
            onAddedLesson={handleAddedLesson}
            onRemoveLesson={handleRemoveLesson}
            onChangeDurationOther={handleChangeDurationOther}
          />
        ))}
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          <BasicTable
            items={priceData}
            columns={[
              {
                field: 'label',
                render: (label, { teacherGroup, id }) => (
                  <p>
                    {
                      <>
                        {id === TOTAL_SPECIAL ? (
                          <span className="text-primary">{label}</span>
                        ) : (
                          <span>{label}</span>
                        )}
                      </>
                    }{' '}
                    <strong>{teacherGroup}</strong>
                  </p>
                ),
              },
              {
                name: <>{cards[0].title}</>,
                field: 'value1',
                render: (value1, { id }) => (
                  <>
                    {value1 ? (
                      <>
                        {id === TOTAL_SPECIAL ? (
                          <p className="text-primary">{value1}</p>
                        ) : (
                          <p>{value1}</p>
                        )}
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </>
                ),
              },
              {
                name: <>{cards[1].title}</>,
                field: 'value2',
                render: (value2, { id }) => (
                  <>
                    {value2 ? (
                      <>
                        {id === TOTAL_SPECIAL ? (
                          <p className="text-primary">{value2}</p>
                        ) : (
                          <p>{value2}</p>
                        )}
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </>
                ),
              },
              {
                name: <>{cards[2].title}</>,
                field: 'value3',
                render: (value3, { id }) => (
                  <>
                    {value3 ? (
                      <>
                        {id === TOTAL_SPECIAL ? (
                          <p className="text-primary">{value3}</p>
                        ) : (
                          <p>{value3}</p>
                        )}
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </>
                ),
              },
              {
                name: <>{cards[3].title}</>,
                field: 'value4',
                render: (value4, { id }) => (
                  <>
                    {value4 ? (
                      <>
                        {id === TOTAL_SPECIAL ? (
                          <p className="text-primary">{value4}</p>
                        ) : (
                          <p>{value4}</p>
                        )}
                      </>
                    ) : (
                      <p>-</p>
                    )}
                  </>
                ),
              },
            ]}
          />
        </FlexItem>
      </FlexGroup>
    </>
  );
}

CardPrice.defaultProps = {
  typeTeacher2: undefined,
  typeTeacher1: undefined,
  studentType: undefined,
  studyProgram: undefined,
  applyAt: undefined,
};

CardPrice.propTypes = {
  typeTeacher1: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }),
  typeTeacher2: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }),
  studentType: PropTypes.number,
  studyProgram: PropTypes.number,
  applyAt: PropTypes.string,
};

export default CardPrice;
