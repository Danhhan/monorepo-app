import {
  Button,
  Text,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FlexGroup,
  FlexGrid,
  Card,
  Icon,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import sessionRecordVideo from 'assets/images/sessionRecordVideo.svg';

export type SessionRecordProps = {
  videoUrl: any;
  isVisiable: boolean;
  isLoading?: boolean;
  onClose: () => void;
};

const SessionRecord: React.FC<SessionRecordProps> = ({
  videoUrl = [],
  isVisiable = false,
  isLoading = false,
  onClose = () => {},
}) => {
  const openLink = (url: string) => () => {
    window.open(url, '_blank');
  };

  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Text size="s" style={{ width: '100%' }}>
          <h2>Session recorded video</h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <FlexGrid columns={2}>
          {videoUrl?.map?.(
            (url: string, index: number) =>
              (
                <FlexItem>
                  <Card
                    layout="horizontal"
                    icon={
                      <Icon className="w-40 h-24" type={sessionRecordVideo} />
                    }
                    title=""
                    description={
                      <FormattedMessage
                        defaultMessage="Record {order}"
                        values={{ order: index + 1 }}
                      />
                    }
                    onClick={openLink(url)}
                  />
                </FlexItem>
              ) ?? [],
          )}
        </FlexGrid>
      </ModalBody>
      <ModalFooter>
        <FlexGroup>
          <FlexItem />
          <FlexItem>
            <Button color="primary" fill onClick={onClose}>
              <FormattedMessage defaultMessage="Close" />
            </Button>
          </FlexItem>
        </FlexGroup>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default SessionRecord;
