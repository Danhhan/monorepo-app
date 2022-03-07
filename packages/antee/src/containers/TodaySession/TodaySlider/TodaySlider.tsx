/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FunctionComponent } from 'react';

import { Slider } from '@antoree/ant-ui';
import { isEmpty } from 'lodash';
import moment from 'moment';
import styles from '../TodaySession.module.scss';
import './TodaySlide.scss';
import DotLight from '../../../components/DotLight';

export type TodaySliderProps = {
  datesessiontoday: any;
  settings: any;
  nextHandle: () => void;
  prevHandle: () => void;
  sliderRef: any;
  datateacher: [];
  currentSlide: number;
  datateachertyest: [];
  datateachertmr: [];
  dayfilter: number;
};

const TodaySlider: FunctionComponent<TodaySliderProps> = ({
  datesessiontoday,
  settings,

  sliderRef,
  datateacher,
  currentSlide,
  datateachertyest,
  datateachertmr,
}) => {
  return (
    <div className={styles.TodaySlider}>
      <Slider
        {...settings}
        ref={sliderRef}
        infinite={datesessiontoday.length >= 3}
      >
        {datesessiontoday.map((item: any, index: number) => (
          <div key={item} style={{ marginTop: '10px' }}>
            <div
              style={{
                fontSize: '22px',
                fontWeight: 500,
                textTransform: 'capitalize',
                // cursor: 'pointer',
              }}
            >
              <>
                {isEmpty(datateacher) === false
                  ? datateacher?.map((it: any, indexN: number) => (
                      <div>
                        {moment(it.shortDateOccurred_at).format(
                          'YYYY-MM-DD',
                        ) === moment(item).format('YYYY-MM-DD') ? (
                          <>
                            <DotLight width={10} />
                          </>
                        ) : null}

                        {datateachertyest?.map((itd: any) => (
                          <p>
                            {itd?.shortDateOccurred_at ===
                            moment(item).format('YYYY-MM-DD') ? (
                              <DotLight width={10} />
                            ) : null}
                          </p>
                        ))}
                        {datateachertmr?.map((its: any) => (
                          <p>
                            {its?.shortDateOccurred_at ===
                            moment(item).format('YYYY-MM-DD') ? (
                              <DotLight width={10} />
                            ) : null}
                          </p>
                        ))}
                      </div>
                    ))
                  : null}
                <>
                  <p
                    className={
                      // eslint-disable-next-line radix
                      currentSlide === index ||
                      // eslint-disable-next-line radix
                      parseInt(moment().format('D')) ===
                        // eslint-disable-next-line radix
                        parseInt(moment(item).format('D'))
                        ? styles.Todaytime
                        : ''
                    }
                  >
                    {moment(item).format('dddd')}
                  </p>

                  <p
                    className={
                      // eslint-disable-next-line radix
                      currentSlide === index ||
                      // eslint-disable-next-line radix
                      parseInt(moment().format('D')) ===
                        // eslint-disable-next-line radix
                        parseInt(moment(item).format('D'))
                        ? styles.Todaytime
                        : ''
                    }
                  >
                    {moment(item).format('DD/MM/YYYY')}
                  </p>
                </>
              </>
            </div>
          </div>
        ))}
      </Slider>
      <span className="antoreeHr">―――</span>
    </div>
  );
};

export default TodaySlider;
