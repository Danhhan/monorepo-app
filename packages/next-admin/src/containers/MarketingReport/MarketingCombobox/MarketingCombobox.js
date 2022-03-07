import {
  Button,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MarketingSelection from '../MarketingSelection/MarketingSelection';

const MarketingCombobox = ({
  handleRemove,
  handleAddNew,
  dateFrom,
  dateTo,
  hanldegetEmail,
  dataMakter,
}) => {
  MarketingCombobox.propTypes = {
    handleRemove: PropTypes.func,
    hanldegetEmail: PropTypes.func,
    handleAddNew: PropTypes.func,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    dataMakter: PropTypes.oneOfType(PropTypes.array),
  };
  MarketingCombobox.defaultProps = {
    handleRemove,
    hanldegetEmail,
    handleAddNew,
    dateFrom: '',
    dateTo: '',
    dataMakter: [],
  };
  const [isShowModal, setShowModal] = useState(false);
  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // console.log(selectedOptions);
  const onChange = data => {
    // handleAddNew(data);

    setSelected(data);
  };

  const hanldeShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const hanldeCombobox = data => {};
  return (
    <div>
      <FlexGroup>
        <FlexItem>
          <Button
            fill
            onClick={hanldeShowModal}
            color="text"
            style={{ width: '150px', marginBottom: '10px' }}
          >
            Thêm marketer
          </Button>
        </FlexItem>
      </FlexGroup>
      {isShowModal ? (
        <Modal onClose={closeModal}>
          <ModalHeader>Danh sách marketer</ModalHeader>
          <ModalBody>
            <MarketingSelection
              onChange={onChange}
              selectedOptions={selectedOptions}
              hanldeCombobox={hanldeCombobox}
              handleRemove={handleRemove}
              handleAddNew={handleAddNew}
              dateFrom={dateFrom}
              dateTo={dateTo}
              dataMakter={dataMakter}
              // dataUtm={dataUtm}
              hanldegetEmail={hanldegetEmail}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              fill
              onClick={() => {
                hanldeCombobox(selectedOptions);
                closeModal();
              }}
              color="warning"
              // style={{ color: 'black' }}
            >
              Thêm
            </Button>
          </ModalFooter>
        </Modal>
      ) : null}
    </div>
  );
};

export default MarketingCombobox;
