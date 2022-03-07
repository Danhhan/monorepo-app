/* eslint-disable no-underscore-dangle */
import {
  Button,
  ButtonEmpty,
  Checkbox,
  FacetButton,
  FlexGrid,
  FlexGroup,
  FlexItem,
  htmlIdGenerator,
  Popover,
  PopoverFooter,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getNationsList, GET_NATION } from 'services/common';
import { genderSelections, regionSelections } from './constant';

const FilterTeacherBox = ({ handleChangeApply, gender, nation, region }) => {
  const { isVisiable, toggle, close } = useToggle();

  const numFilter = () => {
    let numberFilter = 0;

    const isFilterGender = gender?.length !== 0;
    const isFilterNation = nation?.length !== 0;
    const isFilterRegion = region?.length !== 0;

    if (isFilterGender) {
      numberFilter += 1;
    }

    if (isFilterNation) {
      numberFilter += 1;
    }

    if (isFilterRegion) {
      numberFilter += 1;
    }

    if (numberFilter <= 0) {
      return undefined;
    }

    return numberFilter;
  };

  const [regionArray, setRegionArray] = useState(region || []);
  const [nationArray, setNationArray] = useState(nation || []);
  const [genderArray, setGenderArray] = useState(gender || []);

  const handleSelectBox = (value, arrayValue) => {
    const isExist = arrayValue.includes(value?.toString());

    if (isExist) {
      return arrayValue.filter(item => item !== value?.toString());
    }

    return [...arrayValue, value];
  };

  const { data: dataListNation } = useQuery(
    [GET_NATION],
    () => getNationsList('vi'),
    {
      refetchOnWindowFocus: false,
    },
  );

  const handleChange = () => {
    handleChangeApply(genderArray, nationArray, regionArray);
    close();
  };

  const handleResetAll = () => {
    setRegionArray([]);
    setNationArray([]);
    setGenderArray([]);
    handleChangeApply([], [], []);
    close();
  };

  useEffect(() => {
    setRegionArray(region);
    setNationArray(nation);
    setGenderArray(gender);
  }, [gender, isVisiable, nation, region]);

  return (
    <Popover
      id="popoverExampleMultiSelect"
      // display="block"
      button={
        <Button
          minWidth={80}
          iconType="arrowDown"
          iconSide="right"
          onClick={toggle}
          color="text"
          style={{
            borderColor: 'rgba(205, 207, 209, 1)',
          }}
        >
          <FacetButton style={{ background: 'inherit' }} quantity={numFilter()}>
            <Text size="s" color="subdued">
              <p>
                <FormattedMessage defaultMessage="Teacher" />
              </p>
            </Text>
          </FacetButton>
        </Button>
      }
      isOpen={isVisiable}
      closePopover={close}
      panelPaddingSize="none"
    >
      <div className="p-4">
        <div>
          <Title size="xs">
            <p>
              <FormattedMessage defaultMessage="Gender" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGroup>
            {genderSelections.map(genderItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={genderItem.label}
                  checked={genderArray?.includes(genderItem?.value)}
                  onChange={() =>
                    setGenderArray(
                      handleSelectBox(genderItem.value, genderArray),
                    )
                  }
                  // disabled
                />
              </FlexItem>
            ))}
          </FlexGroup>
        </div>
        <Spacer />
        <div>
          <Title size="xs">
            <p>
              <FormattedMessage defaultMessage="Nation" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGrid columns={2} gutterSize="s">
            {dataListNation?.data?.map(nationItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={nationItem.name}
                  checked={nationArray?.includes(nationItem?.id?.toString())}
                  onChange={() =>
                    setNationArray(
                      handleSelectBox(nationItem.id?.toString(), nationArray),
                    )
                  }
                />
              </FlexItem>
            ))}
          </FlexGrid>
        </div>
        <Spacer />
        <div>
          <Title size="xs">
            <p>
              <FormattedMessage defaultMessage="Region (For Vietnam)" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGroup>
            {regionSelections.map(regionItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={regionItem.label}
                  checked={regionArray?.includes(regionItem?.value)}
                  onChange={() =>
                    setRegionArray(
                      handleSelectBox(regionItem.value, regionArray),
                    )
                  }
                  // disabled
                />
              </FlexItem>
            ))}
          </FlexGroup>
        </div>
        <Spacer />
      </div>
      <PopoverFooter className="flex justify-end">
        <ButtonEmpty size="s" onClick={handleResetAll}>
          <Text size="s">
            <p>
              <FormattedMessage defaultMessage="Remove Select" />
            </p>
          </Text>
        </ButtonEmpty>
        <Button size="s" minWidth={80} onClick={handleChange}>
          <Text size="s">
            <p>
              <FormattedMessage defaultMessage="Apply" />
            </p>
          </Text>
        </Button>
      </PopoverFooter>
    </Popover>
  );
};

FilterTeacherBox.propTypes = {
  handleChangeApply: PropTypes.func,
  gender: PropTypes.arrayOf(PropTypes.number),
  nation: PropTypes.arrayOf(PropTypes.number),
  region: PropTypes.arrayOf(PropTypes.number),
};

FilterTeacherBox.defaultProps = {
  handleChangeApply: () => {},
  gender: [],
  nation: [],
  region: [],
};

export default FilterTeacherBox;
