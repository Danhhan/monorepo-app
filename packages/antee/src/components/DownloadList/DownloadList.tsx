import {
  FlexGroup,
  FlexItem,
  Text,
  notification,
  ButtonIcon,
} from '@antoree/ant-ui';
import { downloadURI } from '@antoree/helpers';
import { FormattedMessage } from 'react-intl';

export type DownloadListProps = {
  data?: Array<any>;
  deleteHandler?: Function;
};

const DownloadList: React.FC<DownloadListProps> = ({ data, deleteHandler }) => {
  const downloadFileHandler = (uri?: string) => async () => {
    try {
      if (uri) {
        await downloadURI(uri);
      }
    } catch (error) {
      notification.error({
        title: <FormattedMessage defaultMessage="Download failed" />,
      });
    }
  };

  const onclick = (uri?: string) => () => {
    if (deleteHandler) {
      deleteHandler(uri);
    }
  };

  const onClickView = (uri?: string) => () => {
    if (uri) {
      window.open(uri);
    }
  };

  return (
    <div>
      {data &&
        data.map(item => (
          <FlexGroup justifyContent="flexStart" responsive={false}>
            <FlexItem>
              <Text className="eui-textTruncate" size="s">
                {item.name}
              </Text>
              <Text className="text-gray-500 " size="xs">
                {item.type}
              </Text>
            </FlexItem>
            <FlexItem grow={false}>
              <FlexGroup gutterSize="s" responsive={false}>
                <FlexItem>
                  <ButtonIcon
                    iconType="eye"
                    iconSize="s"
                    onClick={onClickView(item.url)}
                    size="xs"
                  />
                </FlexItem>
                <FlexItem>
                  <ButtonIcon
                    iconType="download"
                    iconSize="s"
                    onClick={downloadFileHandler(item.url)}
                    size="xs"
                  />
                </FlexItem>
                <FlexItem>
                  {deleteHandler && (
                    <ButtonIcon
                      iconType="trash"
                      color="danger"
                      iconSize="s"
                      onClick={onclick(item.url)}
                      size="xs"
                    />
                  )}
                </FlexItem>
              </FlexGroup>
            </FlexItem>
          </FlexGroup>
        ))}
    </div>
  );
};

export default DownloadList;
