/* eslint-disable no-underscore-dangle */
import {
  FlexGroup,
  FlexItem,
  Title,
  Text,
  ButtonEmpty,
  Button,
  Popover,
  PopoverFooter,
  Icon,
  FacetButton,
  HorizontalRule,
  LoadingSpinner,
} from '@antoree/ant-ui';
import { useToggle } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { SetStateAction, useState, useEffect } from 'react';
import {
  useRetriveCertificatesList,
  useRetriveTopicsList,
} from 'services/teachers';

export type FilterTeacherBoxProps = {
  handleApplyTopic: Function;
  topics: any;
  handleApplyCer: Function;
  certificates: any;
};

const FilterTopicBox: React.FC<FilterTeacherBoxProps> = ({
  handleApplyTopic,
  topics,
  handleApplyCer,
  certificates,
}) => {
  const { isVisiable, toggle, close } = useToggle();

  const [selectedArrayTopic, setSelectedArrayTopic] = useState<any>([]);

  const [selectedArrayCer, setSelectedArrayCer] = useState<any>([]);

  const onChangeTopic = (valuePara: SetStateAction<string>) => {
    const isExist = selectedArrayTopic.includes(valuePara);

    if (isExist) {
      const filteredArray = selectedArrayTopic.filter(
        (item: any) => item !== valuePara,
      );

      return setSelectedArrayTopic(filteredArray);
    }

    return setSelectedArrayTopic([...selectedArrayTopic, valuePara]);
  };

  const onChangeCer = (valuePara: SetStateAction<string>) => {
    const isExist = selectedArrayCer.includes(valuePara);

    if (isExist) {
      const filteredArray = selectedArrayCer.filter(
        (item: any) => item !== valuePara,
      );

      return setSelectedArrayCer(filteredArray);
    }

    return setSelectedArrayCer([...selectedArrayCer, valuePara]);
  };

  const handleResetAll = () => {
    setSelectedArrayTopic([]);
    setSelectedArrayCer([]);
    handleApplyTopic([]);
    handleApplyCer([]);
    close();
  };

  const handleChange = () => {
    handleApplyTopic(selectedArrayTopic);
    handleApplyCer(selectedArrayCer);
    close();
  };

  const {
    data: dataListCertificates,
    isLoading: isLoadingCertificates,
  } = useRetriveCertificatesList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  const {
    data: dataListTopics,
    isLoading: isLoadingTopics,
  } = useRetriveTopicsList(
    {
      localePara: 'vi',
    },
    {
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setSelectedArrayTopic(topics);
    setSelectedArrayCer(certificates);
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
          <FacetButton
            style={{ background: 'inherit' }}
            quantity={topics?.length + certificates?.length || undefined}
          >
            <Text size="s">
              <p>
                <FormattedMessage defaultMessage="Chủ đề" />
              </p>
            </Text>
          </FacetButton>
        </Button>
      }
      isOpen={isVisiable}
      closePopover={close}
      panelPaddingSize="none"
    >
      {isLoadingCertificates || isLoadingTopics ? (
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
                    <FormattedMessage defaultMessage="Chủ đề riêng" />
                  </p>
                </Title>
              </FlexItem>
              <HorizontalRule margin="none" />
              {dataListTopics?.data?.data?.map(option => {
                return (
                  <>
                    <FlexItem
                      className="flex flex-row cursor-pointer items-center hover:bg-gray-100 px-2 py-1.5 "
                      onClick={() => onChangeTopic(option?.id?.toString())}
                    >
                      {selectedArrayTopic?.includes(option?.id?.toString()) ? (
                        <Icon type="check" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      <Text size="s" className="ml-2">
                        <p>{option?.name}</p>
                      </Text>
                    </FlexItem>
                    <HorizontalRule margin="none" />
                  </>
                );
              })}
              <FlexItem className="flex flex-row cursor-default items-center py-1">
                <Title size="xxxs" className="ml-2">
                  <p>
                    <FormattedMessage defaultMessage="Luyện thi chứng chỉ" />
                  </p>
                </Title>
              </FlexItem>
              <HorizontalRule margin="none" />
              {dataListCertificates?.data?.data?.map(option => {
                return (
                  <>
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
                  </>
                );
              })}
            </FlexGroup>
            <div className="scroll-down-tip " />
          </div>
          <PopoverFooter className="flex justify-end border-none pt-5">
            <ButtonEmpty size="s" autoFocus={false} onClick={handleResetAll}>
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
        </>
      )}
    </Popover>
  );
};

export default FilterTopicBox;
