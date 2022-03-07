/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import {
  Title,
  FlexGroup,
  FlexItem,
  Icon,
  Slider,
  Spacer,
  ButtonIcon,
  Button,
  Text,
  Badge,
  LoadingSpinner,
  Outline,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useRef } from 'react';
import { RatingCard } from 'components';
import { useHistory, Link } from 'react-router-dom';

import styles from './Components.module.scss';

export type TeacherCateShowProps = {
  link?: string;
  pagination: number | string;
  imgBanner: string;
  isLoading: boolean;
  filterParam?: number[];
  data: {
    avatarUrl: string;
    avatarUrlThumb: string;
    nationality: string;
    name: string;
    id: number;
    rating: number;
    students_count: number;
    teaching_hours: string;
    topics: {
      name: string;
      topic_id: number;
    }[];
  }[];
  title: any;
};

const TeacherCateShow: React.FC<TeacherCateShowProps> = ({
  imgBanner,
  pagination,
  data,
  isLoading,
  title,
  link,
  filterParam,
}) => {
  const history = useHistory();

  const sliderRef = useRef<any>(null);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipeToSlide: true,
    arrows: false,

    autoplay: false,
    autoplaySpeed: 3000,

    // variableWidth: true,
    // className: 'pr-20',
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          autoplay: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 900,
        settings: {
          autoplay: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const { ClockIcon, UserIcon: OutlinieUserIcon } = Outline;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <FlexGroup
        justifyContent="center"
        gutterSize="none"
        alignItems="center"
        responsive={false}
      >
        <FlexItem className="flex-row items-center">
          <Title size="s">
            <h2 className="font-semibold">{title}</h2>
          </Title>
          <div className="pl-4">
            <Badge className="rounded-md p-1" color="#ffc70026">
              <p className="" style={{ color: 'rgba(226, 177, 0, 1)' }}>
                <FormattedMessage defaultMessage="MIỄN PHÍ HỌC THỬ" />
              </p>
            </Badge>
          </div>
        </FlexItem>
        <FlexItem grow={false}>
          <div className={styles.headerItem}>
            <div className={styles.navButtonContain}>
              <Link onClick={scrollToTop} to={link || 'tkhomepage'}>
                <Title size="xs">
                  <h2 className="font-medium">Tất cả ({pagination || 0})</h2>
                </Title>
              </Link>
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
            </div>
            <div>
              <Icon
                onClick={() => {
                  history.push(link || '/');
                  scrollToTop();
                }}
                type="arrowRight"
                size="l"
              />
            </div>
          </div>
        </FlexItem>
      </FlexGroup>
      <Spacer size="m" />
      <FlexGroup gutterSize="none" className="">
        <FlexItem grow={2} id={styles.imgBanner}>
          <img
            className="block w-full object-cover object-center rounded-xl"
            src={imgBanner}
            alt="map"
          />
        </FlexItem>
        <FlexItem grow={4} className="block min-h-0 min-w-0">
          {isLoading ? (
            <div className="py-4 flex justify-center items-center h-full">
              <LoadingSpinner size="xl" />
            </div>
          ) : (
            <Slider
              draggable
              pauseOnHover
              pauseOnFocus
              ref={sliderRef}
              {...settings}
            >
              {data?.map((teacher, index) => (
                <Link
                  key={index}
                  onClick={scrollToTop}
                  to={{
                    pathname: `/detail-teacher/${teacher?.id}`,
                    search: '',
                  }}
                  className={styles.teacherRowItem}
                >
                  <div className="pl-4 relative">
                    <div className={styles.imgContain}>
                      <img
                        className="block w-full object-cover object-center rounded-xl"
                        style={{ height: '14rem' }}
                        src={teacher?.avatarUrlThumb}
                        alt="feature"
                      />
                      <div className="absolute bottom-0 w-full py-2 flex justify-center">
                        <Button
                          fill
                          className="z-10 relative"
                          onClick={() => {
                            history.push({
                              pathname: `/detail-teacher/${teacher?.id}&id=1`,
                              search: ``,
                            });
                            scrollToTop();
                          }}
                          style={{ background: '#14B24C' }}
                        >
                          <FormattedMessage defaultMessage="Xem chi tiết" />
                        </Button>
                        <div
                          className="bg-black w-full h-full bottom-0 absolute"
                          style={{
                            opacity: '0.5',
                            zIndex: 0,
                            borderRadius: '0px 0px 12px 12px',
                          }}
                        />
                      </div>
                    </div>
                    <Spacer size="s" />
                    <FlexGroup
                      gutterSize="none"
                      alignItems="center"
                      responsive={false}
                    >
                      <FlexItem grow={false}>
                        <Text size="s">
                          <p
                            // style={{ maxWidth: '80%' }}
                            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                          >
                            {teacher?.nationality}
                          </p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={false}>&nbsp; ∙ &nbsp;</FlexItem>
                      <FlexItem grow={false}>
                        <RatingCard averageRating={4.8} />
                      </FlexItem>
                    </FlexGroup>
                    <Title size="xs">
                      <h5
                        style={{ maxWidth: '100%' }}
                        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                      >
                        {teacher?.name}
                      </h5>
                    </Title>
                    <Text color="text" size="s">
                      <p
                        style={{ maxWidth: '100%' }}
                        className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                      >
                        {
                          teacher?.topics?.find(item =>
                            filterParam?.includes(item?.topic_id),
                          )?.name
                        }
                      </p>
                    </Text>
                    <Text color="subdued" size="s">
                      <p>
                        {
                          teacher?.topics[
                            Math.floor(Math.random() * teacher?.topics?.length)
                          ]?.name
                        }
                      </p>
                    </Text>
                    <Spacer size="xs" />
                    <FlexGroup gutterSize="none" responsive={false}>
                      <FlexItem grow={false}>
                        <Text color="text" size="xs">
                          <p className="flex justify-center items-center">
                            <ClockIcon
                              style={{
                                width: '16px',
                                height: '16px',
                                fill: 'none',
                              }}
                              className="euiIcon euiButtonContent__icon mr-1"
                            />
                            {Math.round(
                              // eslint-disable-next-line radix
                              parseInt(teacher?.teaching_hours || '1') ?? 0,
                            )}{' '}
                            giờ
                          </p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={false} className="ml-2">
                        <Text color="text" size="xs">
                          <p className="flex justify-center items-center">
                            <OutlinieUserIcon
                              style={{
                                width: '16px',
                                height: '16px',
                                fill: 'none',
                              }}
                              className="euiIcon euiButtonContent__icon"
                            />
                            &nbsp;
                            {teacher?.students_count}
                            &nbsp;
                            <FormattedMessage defaultMessage="học viên" />
                          </p>
                        </Text>
                      </FlexItem>
                    </FlexGroup>
                  </div>
                </Link>
              ))}
            </Slider>
          )}
        </FlexItem>
      </FlexGroup>
    </>
  );
};

export default TeacherCateShow;
