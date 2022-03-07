/* eslint-disable react/jsx-closing-tag-location */
import { Button, Modal, ModalBody, ModalFooter, Title } from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line react/prop-types

const DisplayRatingTeacher = ({
  isVisible,
  closeModal,
  dataRating,
  openRating,
}) => {
  const datRating = [
    {
      name: 'Nguyễn Văn Tính',
      email: 'tinhdnd@gmail.com',
      rateAt: '10/11/2021 13:00',

      content: 'Hay, rất hay',

      ratingnum: 4,
    },
    {
      name: 'Nguyễn Văn Hòa',
      email: 'hoand@gmail.com',
      rateAt: '10/11/2021 13:00',
      content: 'Hay, rất hay',
      ratingnum: 3,
    },
    {
      name: 'Nguyễn Mai Linh',
      email: 'linh@gmail.com',
      rateAt: '10/11/2021 13:00',
      content: 'Hay, rất hay',
      ratingnum: 5,
    },
    {
      name: 'Trần Tuyết An',
      email: 'antran@gmail.com',
      rateAt: '10/11/2021 13:00',
      content: 'Hơi tồi',
      ratingnum: 2,
    },
    {
      name: 'Trần Văn Huy',
      email: 'huy@gmail.com',
      rateAt: '10/11/2021 13:00',
      content: 'Antoree is best',
      ratingnum: 5,
    },
  ];
  DisplayRatingTeacher.defaultProps = {
    dataRating: {},
    isVisible: false,
    openRating: { openRating },
    closeModal: { closeModal },
  };
  DisplayRatingTeacher.propTypes = {
    dataRating: PropTypes.string,
    isVisible: PropTypes.bool,
    openRating: PropTypes.func,
    closeModal: PropTypes.func,
  };

  return isVisible ? (
    <Modal
      style={{
        width: '750pt',
      }}
      onClose={openRating}
    >
      {/* <ModalHeader style={{ textAlign: 'center' }}>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Chi tiết đánh giá" />
        </ModalHeaderTitle>
      </ModalHeader> */}

      <ModalBody>
        <div className="container">
          <div className="header_review">
            <Title size="s">
              <h3 style={{ marginBottom: '15px', textAlign: 'center' }}>
                <FormattedMessage defaultMessage="Chi tiết đánh giá" />
              </h3>
            </Title>
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                marginLeft: '25%',
              }}
            >
              <span>
                <img
                  alt={dataRating.name}
                  src="/favicon.ico"
                  style={{
                    width: '50px',
                    height: '50px',
                    float: 'left',
                    marginRight: '10px',
                  }}
                />
                <span
                  style={{
                    fontSize: '15px',
                    textAlign: 'left',
                    fontWeight: 'bold',
                  }}
                >
                  {' '}
                  {dataRating.name}
                </span>
                <span style={{ fontSize: '13px', display: 'inline-block' }}>
                  {' '}
                  {dataRating.email}
                </span>
              </span>
              <span style={{ marginLeft: '10%' }}>
                <span
                  className="star_rating"
                  style={{
                    backgroundColor: '#63e084',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '15px',
                      color: 'white',
                      fontSize: '12px',
                    }}
                  >
                    {`${dataRating.rating} ★ `}
                  </p>
                </span>
              </span>
              <span
                style={{
                  color: '#706f6b',
                  fontSize: '10px',
                  display: 'inline-block',
                  marginLeft: '5px',
                  marginTop: '10px',
                }}
              >
                {' '}
                ({datRating.length} đánh giá)
              </span>
            </div>
          </div>
          <div className="review_body" style={{ marginTop: '25px' }}>
            {datRating.map(item => (
              <div style={{ marginTop: '15px' }}>
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: '15px',
                  }}
                >
                  {item.name}
                  <span style={{ color: '#fc8803', marginLeft: '5px' }}>
                    {item.ratingnum}★{' '}
                  </span>
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#7D7B7B',
                    marginTop: '8px',
                  }}
                >{`${item.rateAt} bởi ${item.email}`}</p>
                <p style={{ fontSize: '13px', marginTop: '8px' }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={openRating} fill>
          <FormattedMessage defaultMessage="Đóng" />
        </Button>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default DisplayRatingTeacher;
