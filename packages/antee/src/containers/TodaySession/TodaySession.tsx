/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/*  */

import {
  AntoreeCustomizeLoading,
  notification,
  Text,
  LoadingSpinner,
} from '@antoree/ant-ui';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useRef, useState } from 'react';
import { useRetrieveToDaySession } from 'services/session';
import {
  useRetrieveRoomUrlByCourseId,
  useRetrieveRoomUrlBySessionId,
} from 'services/videoCall';
import { ERROR_STATUS } from '../Sessions/components/SessionCard/constants';

import styles from './TodaySession.module.scss';
import TodaySlider from './TodaySlider/TodaySlider';
import TodayCard from './TodayCard';
import banner1 from '../../assets/images/booking-confirmation.png';
import { useRetrieveTodayCourses } from '../../services/course';

moment.locale('vi');
export type TodaySessionProps = {
  selectHandle?: Function;
};

const TodaySession: React.FC<TodaySessionProps> = ({ selectHandle }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data, isLoading: loadingsession } = useRetrieveToDaySession();

  const sliderRef = useRef<any>(null);

  // kết thúc lấy khóa học theo id
  // chức năng slide
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

  const d = new Date();
  // lấy tháng
  const monthget = d.getMonth();
  function getDaysInMonth(month: number, year: number) {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  const year = new Date();
  // lấy năm
  const yearget = year.getFullYear();
  // Trả về array trong 1 tháng
  const datesessiontoday = getDaysInMonth(monthget, yearget).map(x =>
    x.toString(),
  );

  const newLocal = new Date();
  const today = newLocal;
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  const days = `${dd}/${mm}/${yyyy}`;
  // find index array of date today
  const dayfilter = datesessiontoday.findIndex(
    item => moment(item).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY'),
  );

  // lấy danh sách giáo viên theo ngày :
  const datateacher = isEmpty(
    data?.data?.items[
      moment(datesessiontoday[currentSlide || dayfilter]).format('YYYY-MM-DD')
    ],
  )
    ? []
    : data?.data?.items[
        moment(datesessiontoday[currentSlide || dayfilter]).format('YYYY-MM-DD')
      ];

  const datateachertmr = isEmpty(
    data?.data?.items[
      moment(datesessiontoday[dayfilter + 1]).format('YYYY-MM-DD')
    ],
  )
    ? []
    : data?.data?.items[
        moment(datesessiontoday[dayfilter + 1]).format('YYYY-MM-DD')
      ];

  const datateachertyest = isEmpty(
    data?.data?.items[
      moment(datesessiontoday[dayfilter - 1]).format('YYYY-MM-DD')
    ],
  )
    ? []
    : data?.data?.items[
        moment(datesessiontoday[dayfilter - 1]).format('YYYY-MM-DD')
      ];
  // console.log(currentSlide);
  // console.log(data?.data.items);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '10px',
    dots: false,
    speed: 500,
    initialSlide: dayfilter,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: false,
    draggable: false,
    arrows: false,
    // className: '',
    useCSS: true,
    // variableWidth: true,
    // className: 'pr-20',
    beforeChange: (current: any, next: any) => {
      setCurrentSlide(next);
    },
    afterChange: (current: any) => {
      setCurrentSlide(current);
    },
    responsive: [
      {
        breakpoint: 4000,
        settings: {
          centerMode: true,
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 3000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
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
        breakpoint: 1120,
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

  const { mutate: joinbyCourceid } = useRetrieveRoomUrlByCourseId({
    // eslint-disable-next-line no-shadow
    onSuccess: (data: any) => {
      window.open(data?.data?.vcUrl, '_blank');
    },
    onError: (error: any) => {
      notification.error({
        title: <Text>Không tìm thấy khóa học</Text>,
      });
    },
  });
  const { mutate: joinbySessionId, isLoading } = useRetrieveRoomUrlBySessionId({
    onSuccess: res => {
      const typeRes = typeof res.data.vcUrl;
      if (typeRes === 'object') {
        notification.error({
          title: 'Lỗi',
        });
      } else {
        res.data.vcUrl
          ? window.open(res?.data?.vcUrl, '_blank')
          : window.open(res?.data?.studentUrl, '_blank');
      }
    },
    onError: res => {
      const errorFinded = ERROR_STATUS.find(
        errItem => errItem.code === res?.response?.status,
      );
      if (errorFinded) {
        notification.error({
          title: errorFinded.message,
        });
      } else {
        notification.error({
          title: 'Không thể tham gia',
        });
      }
    },
  });

  return (
    <>
      <div className={styles.TodayContainer}>
        <div className={styles.arrowLeft} onClick={prevHandle}>
          <span className={styles.btnLeft}>
            {' '}
            <ArrowBackIosNewIcon />
          </span>
        </div>
        <span className={styles.sliderAntee}>
          <TodaySlider
            currentSlide={currentSlide}
            dayfilter={dayfilter}
            datateacher={datateacher}
            datateachertmr={datateachertmr}
            datateachertyest={datateachertyest}
            datesessiontoday={datesessiontoday}
            nextHandle={nextHandle}
            prevHandle={prevHandle}
            settings={settings}
            sliderRef={sliderRef}
          />
        </span>
        <span className={styles.hR2} />

        <div onClick={nextHandle} className={styles.arrowRight}>
          <span className={styles.btnRight}>
            <ArrowForwardIosIcon />
          </span>
        </div>
      </div>
      <div className={styles.Overview} id="overview">
        {/* info */}
        <div className={styles.SesionTodayContainer}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {loadingsession ? (
            <div>
              {' '}
              <LoadingSpinner size="xl" />
            </div>
          ) : isEmpty(datateacher) === false ? (
            datateacher?.map((item: any) => (
              <>
                <TodayCard
                  item={item}
                  joinbySessionId={joinbySessionId}
                  joinbyCourceid={joinbyCourceid}
                />
              </>
            ))
          ) : (
            <div>
              <img
                src={banner1}
                alt="map"
                style={{
                  width: '340px',
                  paddingBottom: '32px',
                }}
              />
              <p style={{ textAlign: 'center' }}>
                {' '}
                Không có buổi học trong hôm nay
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TodaySession;
