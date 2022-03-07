import {
  FlexGroup,
  FlexItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Text,
  FormRow,
  FieldText,
  IconTip,
  Copy,
} from '@antoree/ant-ui';

import { FormattedMessage } from 'react-intl';
import { useState } from 'react';

export type FilterBarProps = {
  isModalVisibleCopy: boolean;
  closeModalCopy: () => void;
};

const ModalCopyAffiliate: React.FC<FilterBarProps> = ({
  isModalVisibleCopy = false,
  closeModalCopy = () => {},
}) => {
  const [copyText, setCopyText] = useState('http://antor.ee/32j122');
  const onChange = (e: any) => {
    setCopyText(e.target.value);
  };

  let modalCopy;
  if (isModalVisibleCopy) {
    modalCopy = (
      <Modal style={{ maxWidth: 800 }} onClose={closeModalCopy}>
        <ModalHeader>
          <div className="w-12 h-12 mx-auto border relative rounded-full bg-green-400">
            <div
              style={{
                fontSize: '50px',
                position: 'absolute',
                left: '25%',
                top: '-10%',
                color: 'white',
              }}
            >
              <IconTip type="check" size="l" />
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <FlexGroup justifyContent="center" gutterSize="xs" responsive={false}>
            <FlexItem>
              <FormRow label="Link chia sẻ" fullWidth>
                <FieldText
                  style={{
                    borderRadius: '3px',
                    border: '1.25px solid #999999',
                    height: '35px',
                  }}
                  fullWidth
                  value={copyText}
                  onChange={onChange}
                  placeholder="Link chia sẻ"
                />
              </FormRow>{' '}
            </FlexItem>
            <FlexItem grow={false}>
              <FormRow>
                <Copy textToCopy={copyText}>
                  {copy => (
                    <Button
                      style={{ background: '#343741', border: 'none' }}
                      fill
                      minWidth={90}
                      type="submit"
                      className="w-10 mt-5 ml-3"
                      onClick={copy}
                    >
                      <Text className="text-center" size="s">
                        <FormattedMessage defaultMessage="Copy link" />
                      </Text>
                    </Button>
                  )}
                </Copy>
              </FormRow>
            </FlexItem>
          </FlexGroup>
        </ModalBody>
      </Modal>
    );
  }
  return <>{modalCopy}</>;
};

export default ModalCopyAffiliate;
