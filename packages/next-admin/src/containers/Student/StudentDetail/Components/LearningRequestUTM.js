import {
  BasicTable,
  Button,
  FlexGroup,
  FlexItem,
  notification,
} from '@antoree/ant-ui';
import { useFormModal } from 'hooks';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState } from 'react';
import {
  getLearningRequestUtm,
  GET_LEARNING_REQUEST,
  updateLearningRequestUTM,
} from 'services/learningRequest';
import EditUTMForm from './EditUTMForm';

function LearningRequestUTM({ id }) {
  const [itemUTM, setItemUTM] = useState(undefined);
  const { data, isFetching, error, remove } = useQuery(
    [GET_LEARNING_REQUEST(id)],
    () => getLearningRequestUtm(id),
    {
      enabled: Boolean(id),
      suspense: true,
      retry: 1,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const { isVisible, show, close } = useFormModal();
  const queryClient = useQueryClient();
  const updateLearningRequestUTMMutation = useMutation(
    mutateData => updateLearningRequestUTM(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: 'Update UTM successfully',
        });
        close();
        queryClient.invalidateQueries(GET_LEARNING_REQUEST(id));
      },
      onError: err => {
        notification.error({
          title: err?.message ?? 'Update UTM failure',
        });
      },
    },
  );
  return (
    <>
      <EditUTMForm
        isVisible={isVisible}
        closeModal={close}
        itemUTM={itemUTM}
        updateLearningRequestUTMMutation={updateLearningRequestUTMMutation}
      />
      {data?.lrUtm && (
        <BasicTable
          tableLayout="fixed"
          loading={isFetching}
          error={error?.toString()}
          items={data?.lrUtm ?? []}
          columns={[
            {
              field: 'order',
              name: <FormattedMessage defaultMessage="NO." />,
              width: 50,
            },
            {
              field: 'key',
              name: <FormattedMessage defaultMessage="UTM Info." />,
            },
            {
              field: 'value',
              name: <FormattedMessage defaultMessage="Cập nhật lần cuối" />,
            },
            {
              name: <FormattedMessage defaultMessage="Thao tác" />,
              render: item => (
                <FlexGroup>
                  <FlexItem grow={false}>
                    <Button
                      style={{
                        backgroundColor: '#343741',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '14px',
                      }}
                      size="s"
                      minWidth={20}
                      fill
                      iconType="documentEdit"
                      onClick={() => {
                        show();
                        setItemUTM(item);
                      }}
                    >
                      Chỉnh sửa
                    </Button>
                  </FlexItem>
                </FlexGroup>
              ),
            },
          ]}
        />
      )}
    </>
  );
}

LearningRequestUTM.defaultProps = {
  id: undefined,
};

LearningRequestUTM.propTypes = {
  id: PropTypes.number,
};

export default LearningRequestUTM;
