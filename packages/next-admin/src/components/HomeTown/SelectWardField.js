/* eslint-disable no-underscore-dangle */
import { CustomComboBox } from 'components';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getCustomerWard, GET_CUSTOMER_WARD } from 'services/homeTown';

function SelectWardField({
  districtId,
  isInvalid,
  valueOfSelected,
  handleSelected,
  disabled,
}) {
  const [selectedWard, setSelectedWard] = useState();
  const [isEnabled, setEnabled] = useState(false);
  const { data, isLoading } = useQuery(
    [GET_CUSTOMER_WARD(districtId)],
    () => getCustomerWard(districtId),
    {
      enabled: isEnabled,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setEnabled(Boolean(districtId) || false);
    const _ward = data?.customerWards?.find(
      customerWard => customerWard?.id === valueOfSelected,
    );
    setSelectedWard(
      _ward
        ? [
            {
              label: _ward?.name,
              id: _ward?.id,
              key: _ward?.id,
            },
          ]
        : [],
    );
  }, [valueOfSelected, data, districtId]);

  return (
    <CustomComboBox
      className="rounded-lg border border-gray-300 border-solid"
      borderRadius={8}
      isInvalid={isInvalid}
      data={data?.customerWards}
      selectedOptions={selectedWard}
      isLoading={isLoading}
      handleSelected={handleSelected}
      disabled={disabled}
    />
  );
}

SelectWardField.defaultProps = {
  isInvalid: false,
  disabled: false,
};

SelectWardField.propTypes = {
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  districtId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  handleSelected: PropTypes.func.isRequired,
  valueOfSelected: PropTypes.number.isRequired,
};

export default SelectWardField;
