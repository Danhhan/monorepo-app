/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import { CustomComboBox } from 'components';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';
import { getCustomerDistrict, GET_CUSTOMER_DISTRICT } from 'services/homeTown';

function SelectDistrictField({
  cityId,
  isInvalid,
  handleSelected,
  valueOfSelected,
  disabled,
}) {
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [isEnabled, setEnabled] = useState(false);
  const { data, isLoading } = useQuery(
    [GET_CUSTOMER_DISTRICT(cityId)],
    () => getCustomerDistrict(cityId),
    {
      enabled: isEnabled,
      refetchOnReconnect: true,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );
  useEffect(() => {
    setEnabled(Boolean(cityId) || false);
    const _district = data?.customerDistricts?.find(
      customerDistrict => customerDistrict?.id === valueOfSelected,
    );
    setSelectedDistrict(
      _district
        ? [
            {
              label: _district?.name,
              id: _district?.id,
              key: Number(_district?.id),
            },
          ]
        : [],
    );
  }, [valueOfSelected, data, cityId]);
  return (
    <CustomComboBox
      className="rounded-lg border border-gray-300 border-solid"
      borderRadius={8}
      isInvalid={isInvalid}
      data={data?.customerDistricts}
      isLoading={isLoading}
      selectedOptions={selectedDistrict}
      handleSelected={handleSelected}
      disabled={disabled}
    />
  );
}

SelectDistrictField.defaultProps = {
  isInvalid: false,
  disabled: false,
};

SelectDistrictField.propTypes = {
  isInvalid: PropTypes.bool,
  disabled: PropTypes.bool,
  cityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleSelected: PropTypes.func.isRequired,
  valueOfSelected: PropTypes.number.isRequired,
};

export default SelectDistrictField;
