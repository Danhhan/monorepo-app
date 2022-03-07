/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
  AntoreeCustomizeLoading,
  Button,
  FlexGroup,
  FlexItem,
  Form,
  notification,
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
import * as moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import {
  getLearningRequestV1,
  GET_LEARNING_REQUEST_V1,
  storeAccoutingApproval,
} from 'services/learningRequest';
import { SUB_LEVEL_6_SOLD_OUT } from 'configs/app.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
function EditHandover() {
  const [, dispatch] = useErrorModal();
  const history = useHistory();
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
    resolver: yupResolver(
      yup.object().shape({
        contractID: yup.string().required('Required'),
        data: yup.object().shape({
          started_at: yup.string().required('Required'),
          tags: yup.string().required('Required'),
          hour_v: yup.string().required('Required'),
          hour_p: yup.string().required('Required'),
          hour_pre: yup.string().required('Required'),
          hour_n: yup.string().required('Required'),
          schedule: yup.string().required('Required'),
          student_name: yup.string().required('Required'),
          phone: yup.string().required('Required'),
          email: yup.string().required('Required'),
          gender: yup.string().required('Required'),
          guardian: yup.string().required('Required'),
          sale_skype: yup.string().required('Required'),
          paid_note: yup.string().required('Required'),
          referral_email: yup.string().email('Invalid referral email format'),
        }),
      }),
    ),
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
  const updateHandoverMutation = useMutation(storeAccoutingApproval, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Cập nhật thành công!" />,
      });
      history.push(`/contacts/learning-requests/${requestId}/handover`);
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Cập nhật thất bại!" />,
      });
    },
  });
  const handleUpdate = formData => {
    formData.sub_level = SUB_LEVEL_6_SOLD_OUT;
    formData.level = 6;
    formData.status = 1;
    formData.data.save_at_level_6 = true;
    const localStartedAt = { ...formData.data.started_at };
    formData.data.started_at = localStartedAt
      ? moment(localStartedAt).format('YYYY-MM-DD')
      : null;
    updateHandoverMutation.mutate({
      formData,
      started_at: formData.issued_date
        ? moment(formData.issued_date).format('YYYY-MM-DD')
        : null,
      requestId,
    });
  };
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
                <Title className="font-semibold">
                  <span>Bàn giao khoá học</span>
                </Title>
                <Form
                  component="form"
                  id={UPDATE_HANDOVER_FORM_ID}
                  onSubmit={handleSubmit(handleUpdate)}
                >
                  <div id={navbars[0].id}>
                    <CourseInfomationBox control={control} errors={errors} />
                  </div>
                  <div id={navbars[1].id}>
                    <StudentInformationBox
                      control={control}
                      errors={errors}
                      getValues={getValues}
                    />
                  </div>
                  <div id={navbars[2].id}>
                    <OtherInformationBox control={control} errors={errors} />
                  </div>
                  <div id={navbars[3].id}>
                    <ReferralerBox control={control} errors={errors} />
                  </div>
                </Form>
                <FlexGroup justifyContent="flexEnd" gutterSize="xs">
                  <FlexItem grow={false}>
                    <Button
                      fill
                      type="submit"
                      form={UPDATE_HANDOVER_FORM_ID}
                      isLoading={updateHandoverMutation.isLoading}
                    >
                      <Text size="s" color="white">
                        <FormattedMessage defaultMessage="Cập nhật" />
                      </Text>
                    </Button>
                  </FlexItem>
                </FlexGroup>
              </PageContentBody>
            </PageContent>
          </PageBody>
        </>
      )}
    </Page>
  );
}

export default EditHandover;
