/* eslint-disable no-underscore-dangle */
import {
  Button,
  ButtonEmpty,
  FacetButton,
  FlexGroup,
  FlexItem,
  HorizontalRule,
  Icon,
  LoadingSpinner,
  Popover,
  PopoverFooter,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import PropTypes from 'prop-types';
import { Fragment, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { getCertificates, GET_CERTIFICATES } from 'services/common';

// export type FilterTeacherBoxProps = {
//   handleApplyTopic: Function,
//   topics,
//   handleApplyCer: Function,
//   certificates,
// };

const FilterCertsBox = ({ handleApplyCer, certificates }) => {
  const { isVisiable, toggle, close } = useToggle();

  const [selectedArrayCer, setSelectedArrayCer] = useState(certificates || []);

  const onChangeCer = valuePara => {
    const isExist = selectedArrayCer?.includes(valuePara);

    if (isExist) {
      const filteredArray = selectedArrayCer?.filter(
        item => item !== valuePara,
      );

      return setSelectedArrayCer(filteredArray);
    }

    return setSelectedArrayCer([...selectedArrayCer, valuePara]);
  };

  const handleResetAll = () => {
    setSelectedArrayCer([]);
    handleApplyCer(undefined);
    close();
  };

  const handleChange = () => {
    handleApplyCer(selectedArrayCer);
    close();
  };

  const {
    data: dataListCertificates,
    isLoading: isLoadingCertificates,
  } = useQuery([GET_CERTIFICATES], () => getCertificates('vi'), {
    refetchOnWindowFocus: false,
  });

  const handleSelectBox = (value, arrayValue) => {
    const isExist = arrayValue.includes(value?.toString());

    if (isExist) {
      return arrayValue.filter(item => item !== value?.toString());
    }

    return [...arrayValue, value];
  };

  useEffect(() => {
    setSelectedArrayCer(certificates);
  }, [certificates, isVisiable]);

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
          <FacetButton
            style={{ background: 'inherit' }}
            quantity={certificates?.length || undefined}
          >
            <Text size="s">
              <p>
                <FormattedMessage defaultMessage="Certificates" />
              </p>
            </Text>
          </FacetButton>
        </Button>
      }
      isOpen={isVisiable}
      closePopover={close}
      panelPaddingSize="none"
    >
      {isLoadingCertificates ? (
        <div className="p-4 flex flex-col justify-center items-center">
          <LoadingSpinner />
          <Text size="s" className="mt-2">
            <p>
              <FormattedMessage defaultMessage="Loading..." />
            </p>
          </Text>
        </div>
      ) : (
        <>
          <div className="max-h-60 overflow-auto scrollbar-hidden">
            <FlexGroup direction="column" className="m-0" gutterSize="none">
              <FlexItem className="flex flex-row cursor-default items-center py-1">
                <Title size="xxxs" className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Luyện thi chứng chỉ" />
                  </p>
                </Title>
              </FlexItem>
              <HorizontalRule margin="none" />
              {dataListCertificates?.data?.map(option => {
                return (
                  <Fragment key={option.id}>
                    <FlexItem
                      className="flex flex-row cursor-pointer items-center hover:bg-gray-100 px-2 py-1.5"
                      onClick={() => onChangeCer(option?.id?.toString())}
                    >
                      {selectedArrayCer?.includes(option?.id?.toString()) ? (
                        <Icon type="check" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      <Text size="s" className="ml-2">
                        <p>{option?.name}</p>
                      </Text>
                    </FlexItem>
                    <HorizontalRule margin="none" />
                  </Fragment>
                );
              })}
            </FlexGroup>
            <div className="scroll-down-tip " />
          </div>
          <PopoverFooter className="flex justify-end border-none pt-5">
            <ButtonEmpty size="s" autoFocus={false} onClick={handleResetAll}>
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
        </>
      )}
    </Popover>
  );
};

// export type FilterTeacherBoxProps = {
//   handleApplyTopic: Function,
//   topics,
//   handleApplyCer: Function,
//   certificates,
// };

FilterCertsBox.propTypes = {
  handleApplyCer: PropTypes.func,
  certificates: PropTypes.arrayOf(PropTypes.number),
};

FilterCertsBox.defaultProps = {
  handleApplyCer: certs => {},
  certificates: [],
};

export default FilterCertsBox;
