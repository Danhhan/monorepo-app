import {
  Accordion,
  ButtonEmpty,
  ButtonIcon,
  Health,
  Icon,
  Link,
  LoadingContent,
  Panel,
  Spacer,
  Text,
  Popover,
  FlexGroup,
  Avatar,
  FlexItem,
  HorizontalRule,
} from '@antoree/ant-ui';
import medal1 from 'assets/icons/medal_1.svg';
import medal2 from 'assets/icons/medal_2.svg';
import medal3 from 'assets/icons/medal_3.svg';
import medal4 from 'assets/icons/medal_4.svg';
import medal5 from 'assets/icons/medal_5.svg';
import PropTypes from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useToggle } from 'hooks';
import { getSubUsers, GET_OR_UPDATE_SUB_USERS } from 'services/student';

import { STUDENT_STATUS, STUDENT_TYPES } from '../constants';
import NoteModal from './NoteModal';
import ReAssignContactModal from './ReAssignContactModal';
import StudentsTableCell from './StudentsTableCell';
import StudentNeedsModal from './StudentNeedsModal';
import CoursesListModal from './CoursesListModal';

const StudentsTableRow = ({
  isSelected,
  selectHandle,
  data,
  id,
  handleSaveNote,
  handleReassignContact,
}) => {
  const intl = useIntl();

  const handleClick = isOpen => {
    if (data?.subuserCount === 0) {
      return;
    }
    selectHandle(isSelected ? undefined : id);
  };

  const { data: subUsersData, isLoading } = useQuery(
    [GET_OR_UPDATE_SUB_USERS(id)],
    () => getSubUsers(id),
    {
      retry: 1,
      refetchOnReconnect: false,
      enabled: isSelected,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const renderStatus = valueStatus => {
    const matchedStatus = STUDENT_STATUS.find(
      ({ value }) => value === valueStatus,
    );

    return matchedStatus ? (
      <Health color={matchedStatus.color}>
        {intl.formatMessage(matchedStatus.label)}
      </Health>
    ) : null;
  };

  const renderType = valueStatus => {
    const label = STUDENT_TYPES.find(({ value }) => value === valueStatus)
      ?.label;

    return label ? <FormattedMessage {...label} /> : null;
  };

  const medalFromStatus = status => {
    switch (status) {
      case 1:
        return medal1;
      case 2:
        return medal2;
      case 3:
        return medal3;
      case 4:
        return medal4;
      case 5:
        return medal5;
      default:
        return null;
    }
  };

  const tipsTextFromStatus = status => {
    switch (status) {
      case 1:
        return (
          <FormattedMessage defaultMessage="Khách hàng đã đăng ký tài khoản, đang chờ đặt lịch test." />
        );
      case 2:
        return (
          <FormattedMessage defaultMessage="Khách đã đặt lịch, đang chờ test." />
        );
      case 3:
        return (
          <FormattedMessage defaultMessage="Khách đã test, đang chờ trả kết quả." />
        );
      case 4:
        return (
          <FormattedMessage defaultMessage="Khách đã trial, đang chờ chốt sale." />
        );
      case 5:
        return (
          <FormattedMessage defaultMessage="Khách đã đóng tiền! Zia Zia." />
        );
      default:
        return '';
    }
  };

  const tipsTitleFromStatus = status => {
    switch (status) {
      case 1:
        return 'Cool';
      case 2:
        return 'Good';
      case 3:
        return 'Brilliant';
      case 4:
        return 'Excellent';
      case 5:
        return 'Outstanding';
      default:
        return 'Unknow';
    }
  };

  const hasStatusNum = [
    'mar-web',
    'mar-mobile',
    '[Mobile][AS]',
    '[WEB][AS]',
  ].find(source =>
    data?.learningRequest?.utmSource
      ?.toUpperCase()
      .includes(source.toUpperCase()),
  );

  const { isVisiable, toggle, close } = useToggle();

  return (
    <div style={{ minWidth: 'fit-content' }} className="w-full mb-2">
      <Accordion
        id={`${id}`}
        buttonClassName="w-full"
        buttonContentClassName="w-full"
        buttonProps={{
          style: {
            width: '100%',
            userSelect: 'text',
            textDecoration: 'none',
            cursor: 'default',
          },
        }}
        arrowDisplay="none"
        forceState={isSelected ? 'open' : 'closed'}
        buttonContent={
          <Panel
            className="border flex justify-center items-center "
            style={{
              width: '100%',
            }}
            hasBorder={false}
            hasShadow={false}
            paddingSize="none"
            color="plain"
          >
            <div className="px-2 flex-grow-0">
              <ButtonIcon
                className="rounded-full transition ease-in-out duration-300"
                style={{
                  transform: `rotateZ(${isSelected ? '90deg' : '0deg'})`,
                  cursor: 'pointer',
                }}
                onClick={handleClick}
                isDisabled={data?.subuserCount === 0}
                display="fill"
                size="xs"
                iconSize="m"
                aria-label="arrowRight"
                iconType="arrowRight"
              />
            </div>
            <div className="flex py-4 flex-1 ">
              {hasStatusNum ? (
                <div className="flex flex-col justify-center">
                  <Popover
                    display="block"
                    panelPaddingSize="s"
                    isOpen={isVisiable}
                    anchorPosition="upCenter"
                  >
                    <Text>
                      <p className="font-semibold whitespace-nowrap">
                        {`Level ${data?.status}`}
                        {` - ${tipsTitleFromStatus(data?.status)}`}
                      </p>
                    </Text>
                    <HorizontalRule margin="xs" />
                    <Text size="s">
                      <p style={{ maxWidth: '200px' }}>
                        {tipsTextFromStatus(data?.status)}
                      </p>
                    </Text>
                  </Popover>
                  <Icon
                    size="original"
                    style={{
                      maxWidth: '56px',
                      maxHeight: '56px',
                      margin: '0px',
                      display: 'block',
                    }}
                    onMouseEnter={toggle}
                    onMouseLeave={close}
                    type={medalFromStatus(data?.status)}
                  />
                </div>
              ) : (
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                  }}
                />
              )}

              <StudentsTableCell
                label={<FormattedMessage defaultMessage="LR ID" />}
                value={
                  <div className="flex ">
                    <span>{data?.learningRequest?.id}</span>
                    {data?.subuserCount ? (
                      <div
                        style={{
                          background: '#343741',
                          width: '20px',
                          height: '20px',
                        }}
                        className="ml-2 rounded-md p-1 text-white flex justify-items-center text-center items-center"
                      >
                        <p
                          className=""
                          style={{ margin: '0 auto', fontSize: '12px' }}
                        >
                          {data?.subuserCount}
                        </p>
                      </div>
                    ) : null}
                  </div>
                }
                width={80}
              />
              <StudentsTableCell
                label={<FormattedMessage defaultMessage="User" />}
                value={
                  <>
                    <Spacer size="xs" />
                    <FlexGroup
                      responsive={false}
                      alignItems="center"
                      gutterSize="s"
                    >
                      <FlexItem grow={false}>
                        <Avatar
                          name={data?.name ?? ''}
                          imageUrl={data?.avatar ?? ''}
                          size="m"
                          type="space"
                        />
                      </FlexItem>
                      <FlexItem>
                        <span
                          style={{ width: '80%' }}
                          className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                        >
                          <Link to={`/students/${id}`}>{data?.name}</Link>
                        </span>

                        <Spacer size="xs" />
                        <span>{data?.phone}</span>
                      </FlexItem>
                    </FlexGroup>
                  </>
                }
                width={200}
              />
              <StudentsTableCell
                label={
                  <p
                    className="text-center w-full"
                    style={{ marginBottom: '0px' }}
                  >
                    <FormattedMessage defaultMessage="Needs" />
                  </p>
                }
                value={
                  <>
                    <StudentNeedsModal type={data?.type?.id} id={id} />
                  </>
                }
              />
              <StudentsTableCell
                label={
                  <p
                    className="text-center w-full"
                    style={{ marginBottom: '0px' }}
                  >
                    <FormattedMessage defaultMessage="Schedule" />
                  </p>
                }
                value={
                  <>
                    <CoursesListModal
                      handleSaveNote={handleSaveNote}
                      type={data?.type?.id}
                      idStudent={id}
                    />
                  </>
                }
              />
              <StudentsTableCell
                label={
                  <p style={{ marginBottom: '0px' }}>
                    <FormattedMessage defaultMessage="Status" />
                  </p>
                }
                value={renderStatus(data?.status)}
                width={80}
              />

              <StudentsTableCell
                label={<FormattedMessage defaultMessage="Type" />}
                value={renderType(data?.type?.id)}
                width={80}
              />

              <StudentsTableCell
                label={<FormattedMessage defaultMessage="SaleMan" />}
                value={data?.sale?.name}
                width={140}
              />
              <StudentsTableCell
                label={<FormattedMessage defaultMessage="Created At" />}
                value={
                  <>
                    <span>{data?.created_at}</span>
                    <br />
                    <span> {data?.learningRequest?.utmSource}</span>
                    <br />
                    <span className="text-xs euiTextColor--subdued">
                      {data?.learningRequest?.utmCampaign}
                    </span>
                  </>
                }
                width={150}
              />
              <StudentsTableCell
                label={
                  <p className="text-right " style={{ marginBottom: '0px' }}>
                    <FormattedMessage defaultMessage="Action" />
                  </p>
                }
                value={
                  <FlexGroup
                    justifyContent="flexEnd"
                    gutterSize="s"
                    className="mb-2"
                  >
                    <FlexItem grow={false}>
                      <NoteModal
                        referencePrice={data?.referencePrice}
                        handleSaveNote={handleSaveNote}
                        note={data?.note}
                        lrId={data?.learningRequest?.id}
                      />
                    </FlexItem>
                    <FlexItem grow={false}>
                      <ReAssignContactModal
                        handleReassignContact={handleReassignContact}
                        contactId={data?.contactId}
                      />
                    </FlexItem>
                  </FlexGroup>
                }
              />
            </div>
          </Panel>
        }
      >
        {isLoading ? (
          <LoadingContent lines={data?.subuserCount || 4} />
        ) : (
          subUsersData?.data?.learningRequests?.map(subUser => (
            <Panel
              className="border flex justify-center items-center mb-0"
              style={{
                width: '100%',
              }}
              key={subUser?.id}
              hasBorder={false}
              hasShadow={false}
              paddingSize="none"
              color="subdued"
            >
              <div className="px-4">
                <ButtonEmpty size="xs" />
              </div>
              <div
                className="flex py-4  flex-1"
                style={{ borderBottom: '1px solid #c4c4c4' }}
              >
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="LR ID" />}
                  value={subUser?.id}
                  width={80}
                />
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="User ID" />}
                  value={subUser?.user?.id}
                  width={80}
                />
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="User" />}
                  value={
                    <>
                      <Spacer size="xs" />
                      <FlexGroup
                        responsive={false}
                        alignItems="center"
                        gutterSize="s"
                      >
                        <FlexItem grow={false}>
                          <Avatar
                            name={subUser?.user?.name ?? ''}
                            imageUrl={subUser?.user?.avatar ?? ''}
                            size="m"
                            type="space"
                          />
                        </FlexItem>
                        <FlexItem>
                          <span
                            style={{ width: '80%' }}
                            className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                          >
                            {subUser?.user?.name}
                          </span>

                          <Spacer size="xs" />
                          <span>{subUser?.user?.phone || data?.phone}</span>
                        </FlexItem>
                      </FlexGroup>
                    </>
                  }
                  width={150}
                />
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="Type" />}
                  value={renderType(subUser?.user?.type)}
                  width={80}
                />
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="Status" />}
                  value={renderStatus(subUser?.user?.status)}
                  width={80}
                />
                <StudentsTableCell
                  label={<FormattedMessage defaultMessage="Email" />}
                  value={subUser?.user?.email}
                  width={180}
                />
              </div>
            </Panel>
          ))
        )}
        <Spacer />
      </Accordion>
    </div>
  );
};

StudentsTableRow.defaultProps = {
  id: '',
  data: {},
  isSelected: false,
  selectHandle: () => {},
  handleSaveNote: undefined,
  handleReassignContact: undefined,
};
/* eslint-disable react/forbid-prop-types */
StudentsTableRow.propTypes = {
  isSelected: PropTypes.bool,
  selectHandle: PropTypes.func,
  handleReassignContact: PropTypes.any,
  handleSaveNote: PropTypes.any,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.shape({
    note: PropTypes.string,
    avatar: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.number,
    status: PropTypes.number,
    email: PropTypes.string,
    created_at: PropTypes.string,
    sale: PropTypes.string,
    shouldDisplaySubuser: PropTypes.bool,
    subuserCount: PropTypes.number,
    referralCode: PropTypes.string,
    referencePrice: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      specific: PropTypes.string,
    }),
    type: PropTypes.shape({
      id: PropTypes.number,
    }),
    contactId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    learningRequest: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      utmSource: PropTypes.string,
      utmCampaign: PropTypes.string,
    }),
  }),
};

export default StudentsTableRow;
