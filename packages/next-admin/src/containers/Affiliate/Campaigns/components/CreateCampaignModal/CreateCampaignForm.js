import { FilePicker, Form, FormRow, Switch } from '@antoree/ant-ui';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import { CREATE_CAMPAIGN_FORM } from './CreateCampaignModal';
import CustomFieldText from '../../../components/CustomFieldText';
import { STATUS_PRIVATE, STATUS_PUBLIC } from '../../../constant';

const StyleFileWrapper = styled.div`
  .euiFilePicker__prompt {
    border: 1px solid #cdcfd1;
    border-radius: 8px;
  }
`;

const CreateCampaignForm = ({ createCampaignMutation }) => {
  const [imageFile, setImageFile] = useState();
  const { control, handleSubmit, setValue, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      sourceLink: '',
      utmCampaign: '',
      utmSource: '',
      utmMedium: '',
      campaignStatus: '',
    },
  });
  const onFormSubmit = data => {
    const formData = new FormData();
    const campaignStatus = data?.campaignStatus
      ? STATUS_PUBLIC
      : STATUS_PRIVATE;
    formData.append('image', imageFile[0]);
    formData.append('source-link', data.sourceLink);
    formData.append('utm-campaign', data.utmCampaign);
    formData.append('utm-source', data.utmSource);
    formData.append('utm-medium', data.utmMedium);
    formData.append('status', campaignStatus);
    createCampaignMutation.mutate({
      formData,
    });
  };
  return (
    <Form
      id={CREATE_CAMPAIGN_FORM}
      component="form"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <FormRow>
        <Controller
          render={({ onChange, value }) => (
            <Switch
              checked={value}
              onChange={e => onChange(e.target.checked)}
              label="Everyone can access"
            />
          )}
          name="isPrivate"
          control={control}
        />
      </FormRow>
      <CustomFieldText
        label="Source link"
        fieldName="sourceLink"
        control={control}
      />
      <CustomFieldText
        label="UTM Campaign"
        fieldName="utmCampaign"
        control={control}
      />
      <CustomFieldText
        label="UTM Source"
        fieldName="utmSource"
        control={control}
      />
      <CustomFieldText
        label="UTM Medium"
        fieldName="utmMedium"
        control={control}
      />
      <FormRow fullWidth label="Cover picture">
        <StyleFileWrapper>
          <FilePicker
            style={{ border: '1px solid #CDCFD1' }}
            // eslint-disable-next-line react/jsx-curly-brace-presence
            display={'large'}
            compressed
            // multiple
            initialPromptText={<p>Upload files</p>}
            fullWidth
            onChange={file => {
              if (file) {
                setImageFile(file);
              }
            }}
            // isLoading={sendingHomework.isLoading}
            // disabled={view}
          />
        </StyleFileWrapper>
      </FormRow>
    </Form>
  );
};

CreateCampaignForm.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  createCampaignMutation: PropTypes.any.isRequired,
};

export default CreateCampaignForm;
