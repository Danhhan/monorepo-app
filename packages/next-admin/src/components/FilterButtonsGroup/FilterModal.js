import {
  ModalHeader,
  ModalHeaderTitle,
  FlexGroup,
  FlexItem,
  Spacer,
  FormRow,
  DatePicker,
  DatePickerRange,
  Button,
  Modal,
  ModalBody,
  ButtonEmpty,
  HorizontalRule,
  ModalFooter,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

const FilterModal = ({
  closeModal,
  handle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <Modal onClose={closeModal}>
      <ModalHeader>
        <ModalHeaderTitle>
          <FormattedMessage defaultMessage="Data Filters" />
        </ModalHeaderTitle>
      </ModalHeader>
      <HorizontalRule margin="none" />
      <ModalBody style={{ height: '380px' }}>
        <Spacer />
        <FlexGroup>
          <FlexItem>
            <FormRow label={<FormattedMessage defaultMessage="Date Range" />}>
              <DatePickerRange
                startDateControl={
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    popoverPlacement="bottom-start"
                    placeholder="Select time"
                    selected={startDate}
                    onChange={setStartDate}
                    startDate={startDate}
                    maxDate={endDate}
                    endDate={endDate}
                  />
                }
                endDateControl={
                  <DatePicker
                    dateFormat="DD/MM/YYYY"
                    popoverPlacement="bottom-start"
                    placeholder="Select time"
                    startDate={startDate}
                    endDate={endDate}
                    // maxDate={moment()}
                    selected={endDate}
                    onChange={setEndDate}
                  />
                }
              />
            </FormRow>
          </FlexItem>
        </FlexGroup>
        <Spacer />
      </ModalBody>
      <ModalFooter>
        <ButtonEmpty onClick={closeModal} size="s">
          <FormattedMessage defaultMessage="Cancel" />
        </ButtonEmpty>
        <Button onClick={handle} fill size="s">
          <FormattedMessage defaultMessage="Apply" />
        </Button>
      </ModalFooter>
    </Modal>
  );
};

FilterModal.defaultProps = {
  closeModal: () => {},
  handle: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  startDate: moment(),
  endDate: moment(),
};

FilterModal.propTypes = {
  closeModal: PropTypes.func,
  handle: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  startDate: PropTypes.any,
  // eslint-disable-next-line react/forbid-prop-types
  endDate: PropTypes.any,
  setStartDate: PropTypes.func,
  setEndDate: PropTypes.func,
};

export default FilterModal;
