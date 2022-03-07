/* eslint-disable no-return-assign */
import {
  Avatar,
  Button,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  Slider,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { EuiMoment } from '@elastic/eui/src/components/search_bar/query/date_format';
import { ModalBooking, RatingCard } from 'components';
import { usePagiantion, useToggle } from 'hooks';
import moment from 'moment';
import { useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useTeacherTop } from 'services/teachers';
import { StringParam, withDefault } from 'use-query-params';
import useOnClickOutside from 'hooks/useOnClickOutside';
import { ref } from 'yup';
import { TEACHER_TEST_ROLE, TEACHER_TRIAL_ROLE } from './constant';
import styles from './TopTeachers.module.scss';

export type TopTeachersProps = {
  role: 2 | 3;
  successHandle?: () => void;
  isAcceptTrial?: boolean;
  customAvailable?: EuiMoment;
};

const TopTeachers: React.FC<TopTeachersProps> = ({
  successHandle,
  isAcceptTrial,
  customAvailable,
  role,
}) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '10px',
    dots: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: false,
    draggable: false,
    arrows: false,
    // className: '',
    useCSS: true,
    // variableWidth: true,
    // className: 'pr-20',

    responsive: [
      {
        breakpoint: 2440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          draggable: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          draggable: true,
        },
      },
    ],
  };

  const {
    query: { startTimeRange, endTimeRange, dateRange },
    // onSelect,
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
    dateRange: withDefault(
      StringParam,
      customAvailable?.format('YYYY-MM-DD') || moment().format('YYYY-MM-DD'),
    ),
  });

  const { data } = useTeacherTop(
    {
      role,
      dayTo: `${dateRange} ${startTimeRange}`,
      dayFrom: `${dateRange} ${endTimeRange}`,
    },
    { refetchOnWindowFocus: false },
  );
  const [isOpenmoda, setIopen] = useState(false);
  const [idteacher, setIdteacher] = useState(0);

  const hanldeOpenmodal = () => {
    setIopen(!isOpenmoda);
  };

  const sliderRef = useRef<any>(null);
  const { isVisiable, close, open } = useToggle();

  // eslint-disable-next-line no-shadow
  const ref = useRef<any>();
  useOnClickOutside(ref, () => setIopen(false));

  const nextHandle = () => {
    if (sliderRef?.current) {
      sliderRef?.current?.slickNext();
    }
  };

  const prevHandle = () => {
    if (sliderRef?.current) {
      sliderRef?.current?.slickPrev();
    }
  };

  return data?.data?.data && data?.data?.data?.length !== 0 ? (
    <div className="py-4">
      <FlexGroup
        direction="row"
        justifyContent="center"
        gutterSize="none"
        alignItems="center"
      >
        <FlexItem>
          <Title size="s">
            <h2 className="font-semibold">
              <FormattedMessage defaultMessage="Top Giáo viên" />
            </h2>
          </Title>
        </FlexItem>
        <FlexItem className="flex-row justify-end items-center">
          <Title size="s">
            <h2 className="font-medium">
              {data?.data?.data?.length || 0}
              &nbsp;
              <FormattedMessage defaultMessage="Giáo viên" />
            </h2>
          </Title>

          <ButtonIcon
            color="text"
            style={{ borderColor: '#CDCFD1' }}
            display="base"
            iconType="arrowLeft"
            size="s"
            aria-label="Prev"
            className="ml-2 rounded-lg"
            onClick={prevHandle}
          />
          <ButtonIcon
            style={{ borderColor: '#CDCFD1' }}
            color="text"
            className="ml-2 rounded-lg"
            display="base"
            iconType="arrowRight"
            size="s"
            aria-label="Next"
            onClick={nextHandle}
          />
        </FlexItem>
      </FlexGroup>
      <Spacer size="s" />
      <Slider
        {...settings}
        ref={sliderRef}
        className={styles.slider}
        infinite={data?.data?.data.length > 4}
      >
        {data?.data?.data?.map(teacher => (
          <div
            key={teacher.id}
            className="shadow-md rounded-md bg-white h-96 w-64 rounded-t-xl"
          >
            <div className="relative h-60">
              {/* <Avatar
                name={teacher?.name || ''}
                type="space"
                className="h-60 w-full block rounded-t-xl rounded-b-lg"
                imageUrl={teacher?.avatarUrl}
              /> */}
              <img
                src={teacher?.avatarUrl}
                alt="teacher"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '8px 8px 4px 4px',
                }}
              />

              <FlexGroup
                gutterSize="none"
                justifyContent="spaceBetween"
                alignItems="center"
                style={{ bottom: 0 }}
                className={`absolute py-2 px-2 w-full rounded-b-lg ${styles.shadowGradient}`}
                responsive={false}
              >
                <FlexItem grow={false}>
                  <RatingCard averageRating={teacher?.rating} />
                </FlexItem>
                <FlexItem grow={false} className="justify-center items-center">
                  <ModalBooking
                    ref={ref}
                    isOpen={isOpenmoda}
                    handleOpen={hanldeOpenmodal}
                    // eslint-disable-next-line react/no-children-prop
                    children={
                      <Button
                        onClick={() => {
                          setIdteacher(teacher?.id);
                        }}
                        fill
                        size="s"
                        minWidth={80}
                      >
                        <Text size="s">
                          <p>
                            <FormattedMessage defaultMessage="Đặt lịch" />
                          </p>
                        </Text>
                      </Button>
                    }
                    dateRange={
                      customAvailable?.format('YYYY-MM-DD') ||
                      moment().format('YYYY-MM-DD')
                    }
                    teacherId={idteacher || 0}
                    teacherInfo={{
                      avatar: teacher?.avatarUrl,
                      name: teacher?.name,
                      country: teacher?.nationality,
                      rating: teacher?.rating,
                      video: teacher?.video,
                      description:
                        teacher?.descriptionExperience || teacher?.description,
                    }}
                    successHandle={successHandle}
                    endTimeRange={moment()
                      .hours(23)
                      .minutes(59)
                      .seconds(0)
                      .format('HH:mm:ss')}
                    startTimeRange={moment()
                      .hours(0)
                      .minutes(0)
                      .seconds(0)
                      .format('HH:mm:ss')}
                    role={role}
                  />
                </FlexItem>
              </FlexGroup>
            </div>
            <div className="p-4">
              <Title size="xs">
                <h4>{teacher?.name}</h4>
              </Title>
              <Text color="text" size="s">
                <p>{teacher?.nationality}</p>
              </Text>
              <Spacer size="xs" />
              <Text color="text" size="s">
                <p
                  className="overflow-hidden overflow-ellipsis"
                  style={{
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    minHeight: '3rem',
                  }}
                >
                  {teacher?.descriptionExperience}
                </p>
              </Text>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  ) : null;
};

export default TopTeachers;
