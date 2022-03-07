import {
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  notification,
  Outline,
} from '@antoree/ant-ui';
import { downloadURI } from '@antoree/helpers';
import { fileType, HOME_WORK_FILES } from 'constants/session';
import { FormattedMessage } from 'react-intl';
import { HomeworkFile } from 'services/session';

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
    window.open(uri);
  };

  const { XIcon } = Outline;

  const renderFile = (item: HomeworkFile, index: number) => {
    const file: fileType | undefined = findFileByType(item);
    if (file)
      return (
        <FlexGroup gutterSize="none">
          {file?.icon ? (
            <FlexItem grow={false}>
              <img
                style={{ width: '56px', height: '56px' }}
                src={file?.icon}
                className="mr-2"
                alt="social-logo"
              />
            </FlexItem>
          ) : (
            <FlexItem grow={false}>
              <img
                style={{ width: '56px', height: '56px' }}
                src={item.url}
                className="mr-2"
                alt="social-logo"
              />
            </FlexItem>
          )}

          <FlexItem grow={false}>
            <ButtonEmpty onClick={onClickView(item.url)}>
              {`${file.name}.${index + 1}.${file.suffixType}`}
            </ButtonEmpty>
          </FlexItem>
        </FlexGroup>
      );
    return (
      <FlexItem grow={false}>
        <ButtonEmpty onClick={onClickView(item.url)}>Unknow</ButtonEmpty>
      </FlexItem>
    );
  };

  const findFileByType = (item: HomeworkFile) => {
    const foundFile: fileType | undefined = HOME_WORK_FILES.find(
      (file: fileType) => file.type === item.type,
    );
    return foundFile;
  };

  return (
    <div>
      {data &&
        data.map((item, index) => (
          <FlexGroup key={index} responsive={false}>
            <FlexItem>{renderFile(item, index)}</FlexItem>
            <FlexItem grow={false}>
              <ButtonEmpty onClick={onclick(item)}>
                <FlexGroup
                  gutterSize="s"
                  style={{ alignItems: 'center', color: 'black' }}
                >
                  <FlexItem>
                    <XIcon style={{ width: '16px', height: '16px' }} />
                  </FlexItem>
                  <FlexItem>Remove</FlexItem>
                </FlexGroup>
              </ButtonEmpty>
            </FlexItem>
          </FlexGroup>
        ))}
    </div>
  );
};

export default DownloadList;
