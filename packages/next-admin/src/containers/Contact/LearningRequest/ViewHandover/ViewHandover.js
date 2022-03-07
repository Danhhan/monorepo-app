/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  AntoreeCustomizeLoading,
  Button,
  FlexGroup,
  FlexItem,
  Form,
  Icon,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageSideBar,
  Text,
  Title,
} from '@antoree/ant-ui';
import { useBreadcrumbs, useErrorModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import {
  getLearningRequestV1,
  GET_LEARNING_REQUEST_V1,
} from 'services/learningRequest';
import { Link } from 'react-router-dom';
import {
  CourseInfomationBox,
  OtherInformationBox,
  ReferralerBox,
  SideBar,
  StudentInformationBox,
} from '../components';
import { navbars } from '../constants';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: (
      <p>
        <FormattedMessage defaultMessage="Contact" />
      </p>
    ),
    path: '/contracts',
  },
  {
    text: <FormattedMessage defaultMessage="Handover" />,
  },
];
function ViewHandover() {
  const [, dispatch] = useErrorModal();
  const UPDATE_HANDOVER_FORM_ID = 'update-handover-form';
  useBreadcrumbs(breadcrumbs);
  const { requestId } = useParams();
  const location = useLocation();
  const { control, handleSubmit, errors, getValues, reset } = useForm({
    // mode: 'onChange',
    defaultValues: {
      contractID: undefined,
      data: {
        hour_v: 0,
        hour_p: 0,
        hour_pre: 0,
        hour_n: 0,
        started_at: undefined,
        tags: undefined,
        schedule: undefined,
        student_name: undefined,
        gender: undefined,
        email: undefined,
        phone: undefined,
        skype: undefined,
        city: undefined,
        district: undefined,
        ward: undefined,
        address: undefined,
        guardian: undefined,
        sale_skype: undefined,
        referral_phone: undefined,
        referral_email: undefined,
        paid_note: undefined,
      },
    },
  });
  const { data, isLoading } = useQuery(
    [GET_LEARNING_REQUEST_V1(requestId)],
    () => getLearningRequestV1(requestId),
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
      onError: err => {
        const payload = {
          type: 'SHOW_ERROR_MODAL',
          err,
        };
        dispatch(payload);
      },
    },
  );

  useEffect(() => {
    const handover = data?._data?.learning_request;
    const levelMeta = handover?.level_meta?.level_6?.sub_level_602_data;
    const homeTown = {
      city: levelMeta?.cityId,
      district: levelMeta?.districtId,
      ward: levelMeta?.wardId,
    };
    reset({
      contractID: handover?.contract?.id,
      data: { ...levelMeta, ...homeTown },
    });
  }, [data]);
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);
  return (
    <Page style={{ scrollBehavior: 'smooth' }}>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center justify-items-center fixed top-0 left-0 h-screen w-screen">
          <AntoreeCustomizeLoading />
        </div>
      ) : (
        <>
          <PageSideBar className="min-w-full" sticky>
            <SideBar location={location} />
          </PageSideBar>
          <PageBody component="main">
            <PageContent>
              <PageContentBody>
                <FlexGroup>
                  <FlexItem>
                    <Title className="font-semibold">
                      <span>Bàn giao khoá học</span>
                    </Title>
                  </FlexItem>
                  <FlexItem className="text-right">
                    <Link
                      to={`/contacts/learning-requests/${requestId}/handover/edit`}
                    >
                      <Button
                        style={{
                          backgroundColor: '#343741',
                          border: 'none',
                        }}
                        minWidth={20}
                        fill
                      >
                        <Text size="s" color="white">
                          <p>
                            <>
                              <Icon type="documentEdit" className="mr-2" />
                              <FormattedMessage defaultMessage="Chỉnh sửa" />
                            </>
                          </p>
                        </Text>
                      </Button>
                    </Link>
                  </FlexItem>
                </FlexGroup>

                <Form
                  component="form"
                  id={UPDATE_HANDOVER_FORM_ID}
                  // onSubmit={handleSubmit(handleStore)}
                >
                  <div id={navbars[0].id}>
                    <CourseInfomationBox
                      control={control}
                      errors={errors}
                      view
                    />
                  </div>
                  <div id={navbars[1].id}>
                    <StudentInformationBox
                      control={control}
                      errors={errors}
                      getValues={getValues}
                      view
                    />
                  </div>
                  <div id={navbars[2].id}>
                    <OtherInformationBox
                      control={control}
                      errors={errors}
                      view
                    />
                  </div>
                  <div id={navbars[3].id}>
                    <ReferralerBox control={control} errors={errors} view />
                  </div>
                </Form>
              </PageContentBody>
            </PageContent>
          </PageBody>
        </>
      )}
    </Page>
  );
}

export default ViewHandover;
