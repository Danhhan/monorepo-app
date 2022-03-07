import React, { FunctionComponent } from 'react';
import {
  Button,
  FlexGroup,
  FlexItem,
  Outline,
  Slider,
  Spacer,
  Text,
  Title,
  Skeleton,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import styles from '../Homepage.module.scss';
import numberSliderBg from '../../../assets/images/numberSliderBg.svg';
import sty from '../HomepageV2.module.scss';
import { RatingCard } from '../../../components';

interface TopTeacherProps {
  settings: any;
  dataListTeacherTopMonth: any;
  sliderRef: any;
  scrollToTop: () => void;
  isLoading: boolean;
}

const TopTeacher: FunctionComponent<TopTeacherProps> = ({
  dataListTeacherTopMonth,
  sliderRef,
  settings,
  scrollToTop,
  isLoading,
}) => {
  const { ClockIcon, UserIcon: OutlinieUserIcon } = Outline;
  const history = useHistory();

  return (
    <>
      {isLoading ? (
        <span
          style={{
            textAlign: 'center',
            paddingTop: '15px',
            fontSize: '14px',
          }}
        />
      ) : (
        <div className="py-4 pt-16">
          <FlexGroup
            justifyContent="center"
            gutterSize="none"
            alignItems="center"
            responsive={false}
          >
            <FlexItem className="flex-row items-center">
              <Title size="s">
                <h2 className="font-semibold">
                  <FormattedMessage defaultMessage="Top giáo viên tháng" />
                </h2>
              </Title>
            </FlexItem>
            <FlexItem grow={false}>
              <div className={styles.headerItem}>
                <div className={styles.navButtonContain} />
                {/* <div>
                  <Icon type="arrowRight" size="l" />
                </div> */}
              </div>
            </FlexItem>
          </FlexGroup>
          <Spacer size="m" />
          <Slider {...settings} ref={sliderRef}>
            {dataListTeacherTopMonth?.map((teacher: any, index: number) => (
              <div key={teacher.id}>
                <FlexGroup
                  gutterSize="none"
                  direction="row"
                  className="pr-4"
                  responsive={false}
                >
                  <FlexItem className="relative">
                    <img
                      // className="block w-full object-cover object-center rounded-xl"
                      style={{ width: '140%', zIndex: -1 }}
                      alt="feature"
                      src={numberSliderBg}
                    />
                    <p
                      className="absolute text-8xl top-2 -left-5 right-0 m-auto text-center font-bold"
                      style={{
                        color: '#00C081',
                        width: '150%',
                        zIndex: -1,
                        fontFamily: 'Montserrat',
                      }}
                    >
                      {index + 1}
                    </p>
                    <p
                      className="absolute text-8xl top-3 -left-6 right-0 m-auto text-center font-bold"
                      style={{
                        color: 'transparent',
                        width: '150%',
                        zIndex: -1,
                        fontFamily: 'Montserrat',
                        WebkitTextStrokeWidth: '2px',
                        WebkitTextStrokeColor: '#fff',
                      }}
                    >
                      {index + 1}
                    </p>
                  </FlexItem>
                  <FlexItem grow={2}>
                    <div className={styles.imgContain}>
                      <img
                        className={sty.antoreeTeacherIMG}
                        // className="block w-full object-cover object-center rounded-xl"
                        src={teacher?.avatarUrlThumb}
                        alt="feature"
                      />
                      <div
                        className="absolute bottom-0 w-full py-4 flex justify-center rou"
                        id={sty.antoreeButtonDetail}
                      >
                        <Button
                          fill
                          className="z-10 relative"
                          onClick={() => {
                            history.push({
                              pathname: `/detail-teacher/${teacher?.id}`,
                              search: '',
                            });
                            sessionStorage.setItem(
                              'utm_email',
                              // eslint-disable-next-line no-restricted-globals
                              location.search,
                            );
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
                          <p>{teacher?.nationality}</p>
                        </Text>
                      </FlexItem>
                      <FlexItem grow={false}>&nbsp; ∙ &nbsp;</FlexItem>
                      <FlexItem grow={false}>
                        <RatingCard averageRating={4.8} />
                      </FlexItem>
                    </FlexGroup>
                    <Title size="xs">
                      <h5>{teacher?.name}</h5>
                    </Title>
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
                        <Text color="subdued" size="xs">
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
                        <Text color="subdued" size="xs">
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
                  </FlexItem>
                </FlexGroup>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default TopTeacher;
