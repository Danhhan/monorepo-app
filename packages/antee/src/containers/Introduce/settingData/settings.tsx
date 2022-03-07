import styles from '../Introduce.module.scss';

const settings = {
  dots: true,
  dotsClass: ' slick-dots text-white ',
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  customPaging: (i: any) => (
    // eslint-disable-next-line react/button-has-type
    <button className={styles.buttonDots}>{i}</button>
  ),
  // variableWidth: true,
  // className: 'pr-20',
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default settings;
