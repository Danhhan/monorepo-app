/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  Title,
  FlexGroup,
  FlexItem,
  PopoverFooter,
  Spacer,
  Outline,
  HorizontalRule,
  htmlIdGenerator,
  ButtonIcon,
  Text,
  Icon,
  FlexGrid,
  Popover,
  ButtonEmpty,
  Checkbox,
  LoadingSpinner,
} from '@antoree/ant-ui';
import { useHistory, useLocation } from 'react-router-dom';
import {
  BooleanParam,
  StringParam,
  ArrayParam,
  withDefault,
  encodeQueryParams,
} from 'use-query-params';
import { stringify } from 'query-string';
import { isMobile } from 'react-device-detect';
import { useToggle, usePagiantion } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { SetStateAction, useState, useEffect } from 'react';
import moment from 'moment';
import {
  useRetriveCertificatesList,
  useRetriveTopicsList,
} from 'services/teachers';

import styles from './FilterBar.module.scss';

const FilterBar: React.FC<{ mobileView?: boolean }> = ({ mobileView }) => {
  const { SunIcon, MoonIcon, CloudIcon } = Outline;

  const { isVisiable, toggle, close } = useToggle();
  const {
    isVisiable: isVisiable2,
    toggle: toggle2,
    close: close2,
  } = useToggle();
  const {
    isVisiable: isVisiable3,
    toggle: toggle3,
    close: close3,
  } = useToggle();

  const genderSelections = [
    {
      label: <FormattedMessage defaultMessage="Nam" />,
      value: '1',
    },
    {
      label: <FormattedMessage defaultMessage="Nữ" />,
      value: '2',
    },
    {
      label: <FormattedMessage defaultMessage="Khác" />,
      value: '3',
    },
  ];

  const nationSelections = [
    {
      label: <FormattedMessage defaultMessage="Việt Nam" />,
      value: '1',
    },
    {
      label: <FormattedMessage defaultMessage="Mỹ" />,
      value: '2',
    },
    {
      label: <FormattedMessage defaultMessage="Philippines" />,
      value: '3',
    },
    {
      label: <FormattedMessage defaultMessage="Anh" />,
      value: '4',
    },
    {
      label: <FormattedMessage defaultMessage="Canada" />,
      value: '5',
    },
    {
      label: <FormattedMessage defaultMessage="Úc" />,
      value: '6',
    },
  ];

  const regionSelections = [
    {
      label: <FormattedMessage defaultMessage="Miền Bắc" />,
      value: '30',
    },
    {
      label: <FormattedMessage defaultMessage="Miền Trung" />,
      value: '46',
    },
    {
      label: <FormattedMessage defaultMessage="Miền Nam" />,
      value: '25',
    },
  ];

  const arrayOptionsDate = [
    {
      label: (
        <span>
          <FormattedMessage defaultMessage="Hôm nay" />
          ,&nbsp;
          {moment().format('DD-MM-YYYY')}
        </span>
      ),
      onclick: () => onSelect('dateRange')(moment().format('YYYY-MM-DD')),
      // onclick: () => {},
      value: moment(),
    },
    {
      label: (
        <span>
          <FormattedMessage defaultMessage="Ngày mai" />
          ,&nbsp; {moment().add(1, 'days').format('DD-MM-YYYY')}
        </span>
      ),
      value: moment().add(1, 'days'),
      // onclick: () => {},
      onclick: () =>
        onSelect('dateRange')(moment().add(1, 'days').format('YYYY-MM-DD')),
    },
  ];

  const arrayOptionTime = [
    {
      label: <FormattedMessage defaultMessage="All Time" />,
      hoursLabel: 'All Day',
      startTime: '00:00:00',
      endTime: '23:59:00',
      icons: [
        <SunIcon className="euiIcon euiButtonContent__icon" />,
        <MoonIcon className="euiIcon euiButtonContent__icon" />,
      ],
    },
    {
      label: <FormattedMessage defaultMessage="Sáng" />,
      hoursLabel: '8 - 12 giờ',
      startTime: '08:00:00',
      endTime: '12:00:00',
      icons: [<SunIcon className="euiIcon euiButtonContent__icon" />],
    },
    {
      label: <FormattedMessage defaultMessage="Chiều" />,
      hoursLabel: '12 - 18 giờ',
      startTime: '12:00:00',
      endTime: '18:00:00',
      icons: [<CloudIcon className="euiIcon euiButtonContent__icon" />],
    },
    {
      label: <FormattedMessage defaultMessage="Tối" />,
      hoursLabel: '18 - 22 giờ',
      startTime: '18:00:00',
      endTime: '22:00:00',
      icons: [<MoonIcon className="euiIcon euiButtonContent__icon" />],
    },
  ];

  const handleSelectBox = (value: string | number, arrayValue: any[]) => {
    const isExist = arrayValue.includes(value?.toString());

    if (isExist) {
      return arrayValue.filter((item: any) => item !== value?.toString());
    }

    return [...arrayValue, value];
  };

  const handleResetAll = () => {
    setRegionArray([]);
    setNationArray([]);
    setGenderArray([]);
    // handleChangeApply([], [], []);
    handleApplySearch();
    close();
  };

  const handleResetAllTopicCer = () => {
    setSelectedArrayCer([]);
    setSelectedArrayTopic([]);

    handleApplySearch();
    close2();
  };

  const [regionArray, setRegionArray] = useState<any>([]);
  const [nationArray, setNationArray] = useState<any>([]);
  const [genderArray, setGenderArray] = useState<any>([]);

  const {
    data: dataListTopics,
    isLoading: isLoadingTopics,
  } = useRetriveTopicsList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const {
    data: dataListCertificates,
    isLoading: isLoadingCertificates,
  } = useRetriveCertificatesList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  const [selectedArrayTopic, setSelectedArrayTopic] = useState<any>([]);

  const [selectedArrayCer, setSelectedArrayCer] = useState<any>([]);

  const onChangeTopic = (valuePara: SetStateAction<string>) => {
    const isExist = selectedArrayTopic.includes(valuePara);

    if (isExist) {
      const filteredArray = selectedArrayTopic.filter(
        (item: any) => item !== valuePara,
      );

      return setSelectedArrayTopic(filteredArray);
    }

    return setSelectedArrayTopic([...selectedArrayTopic, valuePara]);
  };

  const onChangeCer = (valuePara: SetStateAction<string>) => {
    const isExist = selectedArrayCer.includes(valuePara);

    if (isExist) {
      const filteredArray = selectedArrayCer.filter(
        (item: any) => item !== valuePara,
      );

      return setSelectedArrayCer(filteredArray);
    }

    return setSelectedArrayCer([...selectedArrayCer, valuePara]);
  };

  const handleToggle = (toggleFunc: () => void) => {
    close();
    close2();
    close3();
    // handleApplySearch();
    toggleFunc();
  };

  const renderOption = () => {
    if (!selectedArrayTopic[0] && !selectedArrayCer[0]) {
      return <FormattedMessage defaultMessage="Chọn chủ đề" />;
    }
    const firstSelect =
      dataListTopics?.data?.data?.find(
        item => item?.id?.toString() === selectedArrayTopic[0],
      ) ||
      dataListCertificates?.data?.data?.find(
        item => item?.id?.toString() === selectedArrayCer[0],
      );

    return firstSelect?.name;
  };

  const renderOptionTeacher = () => {
    if (!genderArray[0] && !nationArray[0] && !regionArray[0]) {
      return <FormattedMessage defaultMessage="Lọc giáo viên" />;
    }

    // return `+${
    //   genderArray?.length + nationArray?.length + regionArray?.length
    // }`;
    const firstSelect =
      genderSelections?.find(item => item?.value === genderArray[0]) ||
      nationSelections.find(item => item?.value === nationArray[0]) ||
      regionSelections.find(item => item?.value === regionArray[0]);

    return firstSelect?.label;
  };

  const {
    query: {
      startTimeRange,
      endTimeRange,
      dateRange,
      gender,
      nation,
      region,
      topics,
      certificates,
    },
    onSelect,
  } = usePagiantion({
    startTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment().hours(0).minutes(0).seconds(0).format('HH:mm:ss'),
    ),
    endTimeRange: withDefault(
      StringParam,
      // eslint-disable-next-line prettier/prettier
      moment().hours(23).minutes(59).seconds(0).format('HH:mm:ss'),
    ),
    dateRange: withDefault(StringParam, moment().format('YYYY-MM-DD')),
    // search: withDefault(StringParam, ''),
    originalRegion: withDefault(BooleanParam, true),
    gender: withDefault(ArrayParam, []),
    nation: withDefault(ArrayParam, []),
    region: withDefault(ArrayParam, []),
    topics: withDefault(ArrayParam, []),
    certificates: withDefault(ArrayParam, []),
  });

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setGenderArray(gender);
    setNationArray(nation);
    setRegionArray(region);
    setSelectedArrayCer(certificates);
    setSelectedArrayTopic(topics);
  }, []);

  const handleApplySearch = () => {
    if (location.pathname !== '/search-page') {
      // return redirect('/search-page');
      const test = encodeQueryParams(
        {
          region: ArrayParam,
          nation: ArrayParam,
          gender: ArrayParam,
          certificates: ArrayParam,
          topics: ArrayParam,
        },
        {
          region: regionArray,
          nation: nationArray,
          gender: genderArray,
          certificates: selectedArrayCer,
          topics: selectedArrayTopic,
        },
      );

      history.push({
        pathname: '/search-page',
        search: `?${stringify(test)}`,
      });

      return;
    }

    onSelect('region')(regionArray);
    onSelect('nation')(nationArray);
    onSelect('gender')(genderArray);
    onSelect('certificates')(selectedArrayCer);
    onSelect('topics')(selectedArrayTopic);
  };

  return (
    <div
      className={styles.filterButtonContain}
      style={{ display: mobileView ? 'block' : '' }}
    >
      <FlexGroup gutterSize="none" style={{ padding: '0px' }}>
        <FlexItem key={0}>
          <Popover
            id="popoverExampleMultiSelect"
            panelStyle={{ maxWidth: '100vw' }}
            style={{ width: '100%' }}
            display="block"
            button={
              <ButtonEmpty
                onClick={() => handleToggle(toggle)}
                color="text"
                className={styles.filterButton}
              >
                <Text
                  size="s"
                  color="text"
                  className="font-medium"
                  textAlign="left"
                >
                  <p>
                    <FormattedMessage defaultMessage="Chủ đề học" />
                  </p>
                </Text>
                <Text size="m" color="text" textAlign="left">
                  <p>
                    {renderOption()}
                    {selectedArrayTopic?.length + selectedArrayCer?.length >= 2
                      ? ` +${
                          selectedArrayTopic?.length +
                          selectedArrayCer?.length -
                          1
                        } more`
                      : ''}
                  </p>
                </Text>
              </ButtonEmpty>
            }
            isOpen={isVisiable}
            closePopover={close}
            panelPaddingSize="none"
          >
            <div className="p-4">
              <FlexGroup gutterSize="s" className="relative">
                <FlexItem grow={2}>
                  <Title size="xs">
                    <p>
                      <FormattedMessage defaultMessage="Nhu cầu riêng" />
                    </p>
                  </Title>
                  <div className="absolute right-0 top-0" onClick={close}>
                    <Icon type="cross" />
                  </div>
                  <Spacer size="s" />
                  {isLoadingTopics ? (
                    <div className="p-4 py-8 items-center justify-center flex">
                      <LoadingSpinner size="xl" />
                    </div>
                  ) : (
                    <FlexGrid columns={2} gutterSize="s">
                      {dataListTopics?.data?.data?.map((topicItem, index) => (
                        <FlexItem key={index}>
                          <Checkbox
                            id={htmlIdGenerator()()}
                            label={topicItem.name}
                            checked={selectedArrayTopic?.includes(
                              topicItem?.id?.toString(),
                            )}
                            onChange={() =>
                              onChangeTopic(topicItem?.id?.toString())
                            }
                            // disabled
                          />
                        </FlexItem>
                      ))}
                    </FlexGrid>
                  )}
                </FlexItem>
                <FlexItem grow={2}>
                  <Title size="xs">
                    <p>
                      <FormattedMessage defaultMessage="Luyện thi chứng chỉ" />
                    </p>
                  </Title>
                  <Spacer size="s" />
                  {isLoadingCertificates ? (
                    <div className="p-4 py-8 items-center justify-center flex">
                      <LoadingSpinner size="xl" />
                    </div>
                  ) : (
                    <FlexGrid columns={2} gutterSize="s">
                      {dataListCertificates?.data?.data?.map(
                        (certItem, index) => (
                          <FlexItem key={index}>
                            <Checkbox
                              id={htmlIdGenerator()()}
                              label={certItem.name}
                              checked={selectedArrayCer?.includes(
                                certItem?.id?.toString(),
                              )}
                              onChange={() =>
                                onChangeCer(certItem?.id?.toString())
                              }
                              // disabled
                            />
                          </FlexItem>
                        ),
                      )}
                    </FlexGrid>
                  )}
                </FlexItem>
              </FlexGroup>
            </div>
            <PopoverFooter className="flex justify-end">
              <ButtonEmpty size="s" onClick={handleResetAllTopicCer}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Remove Select" />
                  </p>
                </Text>
              </ButtonEmpty>
              <ButtonEmpty size="s" onClick={close}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Close" />
                  </p>
                </Text>
              </ButtonEmpty>
            </PopoverFooter>
          </Popover>
        </FlexItem>
        <FlexItem>
          <Popover
            style={{ width: '100%' }}
            id="popoverExampleMultiSelect"
            panelStyle={{ maxWidth: '80vw' }}
            display="block"
            button={
              <ButtonEmpty
                onClick={() => handleToggle(toggle2)}
                color="text"
                className={styles.filterButton}
              >
                <Text
                  size="s"
                  color="text"
                  className="font-medium"
                  textAlign="left"
                >
                  <p>
                    <FormattedMessage defaultMessage="Giáo viên" />
                  </p>
                </Text>
                <Text size="m" color="text" textAlign="left">
                  <p>
                    {renderOptionTeacher()}
                    {genderArray?.length +
                      nationArray?.length +
                      regionArray?.length >=
                    2
                      ? ` +${
                          genderArray?.length +
                          nationArray?.length +
                          regionArray?.length -
                          1
                        } more`
                      : ''}
                  </p>
                </Text>
              </ButtonEmpty>
            }
            isOpen={isVisiable2}
            closePopover={close2}
            panelPaddingSize="none"
          >
            <div className="p-4 ">
              <div className="relative">
                <div className="absolute right-0 top-0" onClick={close2}>
                  <Icon type="cross" />
                </div>
                <Title size="xs">
                  <p>
                    <FormattedMessage defaultMessage="Gender" />
                  </p>
                </Title>
                <Spacer size="s" />
                <FlexGroup>
                  {genderSelections.map((genderItem, index) => (
                    <FlexItem key={index}>
                      <Checkbox
                        id={htmlIdGenerator()()}
                        label={genderItem.label}
                        checked={genderArray.includes(genderItem?.value)}
                        onChange={() =>
                          setGenderArray(
                            handleSelectBox(genderItem.value, genderArray),
                          )
                        }
                        // disabled
                      />
                    </FlexItem>
                  ))}
                </FlexGroup>
              </div>
              <Spacer />
              <div>
                <Title size="xs">
                  <p>
                    <FormattedMessage defaultMessage="Nation" />
                  </p>
                </Title>
                <Spacer size="s" />
                <FlexGrid columns={2} gutterSize="s">
                  {nationSelections.map((nationItem, index) => (
                    <FlexItem key={index}>
                      <Checkbox
                        id={htmlIdGenerator()()}
                        label={nationItem.label}
                        checked={nationArray.includes(nationItem?.value)}
                        onChange={() =>
                          setNationArray(
                            handleSelectBox(nationItem.value, nationArray),
                          )
                        }
                        // disabled
                      />
                    </FlexItem>
                  ))}
                </FlexGrid>
              </div>
              <Spacer />
              <div>
                <Title size="xs">
                  <p>
                    <FormattedMessage defaultMessage="Region" />
                  </p>
                </Title>
                <Spacer size="s" />
                <FlexGroup>
                  {regionSelections.map((regionItem, index) => (
                    <FlexItem key={index}>
                      <Checkbox
                        id={htmlIdGenerator()()}
                        label={regionItem.label}
                        checked={regionArray.includes(regionItem?.value)}
                        onChange={() =>
                          setRegionArray(
                            handleSelectBox(regionItem.value, regionArray),
                          )
                        }
                        // disabled
                      />
                    </FlexItem>
                  ))}
                </FlexGroup>
              </div>
              <Spacer />
            </div>
            <PopoverFooter className="flex justify-end">
              <ButtonEmpty size="s" onClick={handleResetAll}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Remove Select" />
                  </p>
                </Text>
              </ButtonEmpty>
              <ButtonEmpty size="s" onClick={close2}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Close" />
                  </p>
                </Text>
              </ButtonEmpty>
            </PopoverFooter>
          </Popover>
        </FlexItem>
        <FlexItem>
          <Popover
            style={{ width: '100%' }}
            id="popoverExampleMultiSelect"
            panelStyle={{ maxWidth: '80vw' }}
            display="block"
            button={
              <ButtonEmpty
                className={styles.filterButton}
                onClick={() => handleToggle(toggle3)}
                color="text"
              >
                <Text
                  size="s"
                  color="text"
                  className="font-medium"
                  textAlign="left"
                >
                  <p>
                    <FormattedMessage defaultMessage="Thời gian" />
                  </p>
                </Text>
                <Text size="m" color="text" textAlign="left">
                  <p>
                    {/* <FormattedMessage defaultMessage="Chọn giờ học" /> */}
                    {arrayOptionsDate.find(item =>
                      item.value.isSame(dateRange, 'day'),
                    )?.label ?? (
                      <FormattedMessage defaultMessage="Chọn giờ học" />
                    )}
                  </p>
                </Text>
              </ButtonEmpty>
            }
            isOpen={isVisiable3}
            closePopover={close3}
            panelPaddingSize="none"
          >
            <div className="p-4">
              <FlexGroup gutterSize="none">
                {arrayOptionsDate.map((item, index) => (
                  <FlexItem key={index}>
                    <ButtonEmpty
                      onClick={item.onclick}
                      style={
                        item.value.isSame(dateRange, 'day')
                          ? { background: '#CCF2E6' }
                          : {}
                      }
                      className="rounded-lg p-4"
                    >
                      {item.label}
                    </ButtonEmpty>
                  </FlexItem>
                ))}
              </FlexGroup>
              <HorizontalRule margin={isMobile ? 'xs' : 'm'} />
              <FlexGroup
                style={{ overflowX: 'auto' }}
                responsive
                gutterSize="none"
              >
                {arrayOptionTime.map((option, index) => (
                  <FlexItem key={index}>
                    <ButtonEmpty
                      className="p-4 rounded-xl text-gray-600"
                      style={
                        option.startTime === startTimeRange &&
                        option.endTime === endTimeRange
                          ? { background: '#CCF2E6', height: 'fit-content' }
                          : { height: 'fit-content' }
                      }
                      // style={{ height: 'fit-content' }}
                      contentProps={{ style: { height: 'fit-content' } }}
                      textProps={{ style: { height: 'fit-content' } }}
                      isSelected={
                        option.startTime === startTimeRange &&
                        option.endTime === endTimeRange
                      }
                      onClick={() => {
                        onSelect('startTimeRange')(option.startTime);
                        onSelect('endTimeRange')(option.endTime);
                      }}
                    >
                      <Title size="xs" className="mb-2">
                        <p className="text-gray-600">
                          {option.label}
                          {/* {option.startTime === startTimeRange &&
                                option.endTime === endTimeRange} */}
                        </p>
                      </Title>
                      <Text>
                        <p>{option.hoursLabel}</p>
                      </Text>
                      <FlexGroup responsive={false}>
                        {option.icons.map((icon: any) => (
                          <FlexItem key={icon}>
                            <div
                              className="mx-auto"
                              style={{ width: '24px', height: '24px' }}
                            >
                              {icon}
                            </div>
                          </FlexItem>
                        ))}
                      </FlexGroup>
                    </ButtonEmpty>
                  </FlexItem>
                ))}
              </FlexGroup>
            </div>
            <PopoverFooter className="flex justify-end">
              <ButtonEmpty size="s" onClick={handleResetAll}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Remove Select" />
                  </p>
                </Text>
              </ButtonEmpty>
              <ButtonEmpty size="s" onClick={close3}>
                <Text size="s">
                  <p>
                    <FormattedMessage defaultMessage="Close" />
                  </p>
                </Text>
              </ButtonEmpty>
            </PopoverFooter>
          </Popover>
        </FlexItem>
        <FlexItem grow={false} className="justify-center items-center md:px-4">
          <ButtonIcon
            onClick={handleApplySearch}
            className={styles.Buttonsearch}
            size="m"
            display="fill"
            iconType="search"
          />
        </FlexItem>
      </FlexGroup>
    </div>
  );
};

export default FilterBar;
