/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import {
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
import { yupResolver } from '@hookform/resolvers/yup';
import { SUB_LEVEL_6_SOLD_OUT } from 'configs/app.constants';
import { useBreadcrumbs } from 'hooks';
import * as moment from 'moment';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { useMutation } from 'react-query';
import { useLocation, useParams } from 'react-router';
import { storeAccoutingApproval } from 'services/learningRequest';
import * as yup from 'yup';
import { useEffect } from 'react';
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
function CreateHandover() {
  const CREATE_HANDOVER_FORM_ID = 'create-handover-form';

  useBreadcrumbs(breadcrumbs);
  const { requestId } = useParams();
  const location = useLocation();
  const { control, handleSubmit, errors, getValues } = useForm({
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
  const createHandoverMutation = useMutation(storeAccoutingApproval, {
    onSuccess: () => {
      notification.success({
        title: 'Successfully',
        text: <FormattedMessage defaultMessage="Tạo thành công!" />,
      });
      // history.push('/contracts');
    },
    onError: err => {
      notification.error({
        title: 'Failure',
        text: <FormattedMessage defaultMessage="Tạo thất bại!" />,
      });
    },
  });
  const handleStore = formData => {
    formData.sub_level = SUB_LEVEL_6_SOLD_OUT;
    formData.level = 6;
    formData.status = 1;
    formData.data.save_at_level_6 = true;
    const localStartedAt = { ...formData.data.started_at };
    formData.data.started_at = localStartedAt
      ? moment(localStartedAt).format('YYYY-MM-DD')
      : null;
    createHandoverMutation.mutate({
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
                id={CREATE_HANDOVER_FORM_ID}
                onSubmit={handleSubmit(handleStore)}
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
                    form={CREATE_HANDOVER_FORM_ID}
                    isLoading={createHandoverMutation.isLoading}
                  >
                    <Text size="s" color="white">
                      <FormattedMessage defaultMessage="Lưu" />
                    </Text>
                  </Button>
                </FlexItem>
              </FlexGroup>
            </PageContentBody>
          </PageContent>
        </PageBody>
      </>
    </Page>
  );
}

export default CreateHandover;
