import {
  ButtonEmpty,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  Slider,
  PageHeader,
  Title,
  Card,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const AffiliateHeader: React.FC<{}> = () => {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    swipeToSlide: true,
    arrows: false,

    autoplay: false,
    autoplaySpeed: 3000,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
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
  const data = [
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Top 20 IELTS Teachers M10-2022',
    },
    {
      id: 3,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing Discount 20% for Philippines Teacher Grou...',
    },
    {
      id: 4,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Study abroad training 3 months',
    },
    {
      id: 5,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'IELTS University Entry Requirements',
    },
    {
      id: 6,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 7,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
    {
      id: 8,
      imageUrl: 'https://source.unsplash.com/400x200/?Nature',
      title: 'Landing page Kid',
    },
  ];

  return (
    <>
      <PageHeader responsive paddingSize="s" rightSideItems={[]}>
        <FlexGroup justifyContent="spaceAround" className="fex items-center">
          <FlexItem grow={5}>
            <Title size="xs" className="text-black">
              <h1>
                <FormattedMessage defaultMessage="Tham gia chiến dịch" />
              </h1>
            </Title>
          </FlexItem>
          <FlexItem grow={5} className="items-end">
            <FlexGroup
              justifyContent="flexStart"
              alignItems="center"
              gutterSize="s"
              responsive
            >
              <ButtonEmpty color="text">
                <Link to="/affiliateList">
                  <span>Xem tất cả (6)</span>
                </Link>
              </ButtonEmpty>
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
            </FlexGroup>
          </FlexItem>
        </FlexGroup>
        <FlexGroup className="block min-h-0 min-w-0">
          <FlexItem>
            <Slider
              draggable
              pauseOnHover
              pauseOnFocus
              ref={sliderRef}
              {...settings}
            >
              {data.map(item => (
                <FlexItem grow={false} className="p-2">
                  <Card
                    key={item.id}
                    textAlign="left"
                    style={{ minHeight: '180px' }}
                    image={
                      <div>
                        <img
                          className="rounded-tl-lg rounded-tr-lg"
                          src="https://source.unsplash.com/400x200/?Nature"
                          alt="Nature"
                        />
                      </div>
                    }
                    title={<Text size="s">{item.title}</Text>}
                  />
                </FlexItem>
              ))}
            </Slider>
          </FlexItem>
        </FlexGroup>
      </PageHeader>
    </>
  );
};

export default AffiliateHeader;
