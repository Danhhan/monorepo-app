/* eslint-disable no-underscore-dangle */
import {
  FlexGroup,
  FlexItem,
  Title,
  Spacer,
  Text,
  ButtonEmpty,
  Button,
  Popover,
  PopoverFooter,
  Checkbox,
  htmlIdGenerator,
  FlexGrid,
  FacetButton,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';
import { useRetriveNationsList } from 'services/teachers';

import { genderSelections, regionSelections } from './constant';

export type FilterTeacherBoxProps = {
  handleChangeApply: Function;
  gender: any;
  nation: any;
  region: any;
};

const FilterTeacherBox: React.FC<FilterTeacherBoxProps> = ({
  handleChangeApply,
  gender,
  nation,
  region,
}) => {
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

  const [regionArray, setRegionArray] = useState<any>(region || []);
  const [nationArray, setNationArray] = useState<any>(nation || []);
  const [genderArray, setGenderArray] = useState<any>(gender || []);

  const handleSelectBox = (value: string | number, arrayValue: any[]) => {
    const isExist = arrayValue.includes(value?.toString());

    if (isExist) {
      return arrayValue.filter((item: any) => item !== value?.toString());
    }

    return [...arrayValue, value];
  };

  const {
    data: dataListNation,
    isLoading: isLoadingNation,
  } = useRetriveNationsList(
    {
      localePara: 'vi',
    },
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
  }, [isVisiable]);

  return (
    <Popover
      id="popoverExampleMultiSelect"
      panelStyle={{ maxWidth: '80vw' }}
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
            <Text size="s" color="text">
              <p>
                <FormattedMessage defaultMessage="Giáo viên" />
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
              <FormattedMessage defaultMessage="Giới tính" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGroup>
            {genderSelections.map(genderItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={genderItem.label}
                  checked={genderArray.includes(genderItem?.value)}
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
              <FormattedMessage defaultMessage="Quốc gia" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGrid columns={2} gutterSize="s">
            {dataListNation?.data?.data?.map(nationItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={nationItem.name}
                  checked={nationArray.includes(nationItem?.id?.toString())}
                  onChange={() =>
                    setNationArray(
                      handleSelectBox(nationItem.id?.toString(), nationArray),
                    )
                  }
                  // disabled
                />
              </FlexItem>
            ))}
          </FlexGrid>
        </div>
        <Spacer />
        <div>
          <Title size="xs">
            <p>
              <FormattedMessage defaultMessage="Khu vực" />
            </p>
          </Title>
          <Spacer size="s" />
          <FlexGroup>
            {regionSelections.map(regionItem => (
              <FlexItem>
                <Checkbox
                  id={htmlIdGenerator()()}
                  label={regionItem.label}
                  checked={regionArray.includes(regionItem?.value)}
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
              <FormattedMessage defaultMessage="Xóa lựa chọn" />
            </p>
          </Text>
        </ButtonEmpty>
        <Button size="s" minWidth={80} onClick={handleChange}>
          <Text size="s">
            <p>
              <FormattedMessage defaultMessage="Áp dụng" />
            </p>
          </Text>
        </Button>
      </PopoverFooter>
    </Popover>
  );
};

export default FilterTeacherBox;
