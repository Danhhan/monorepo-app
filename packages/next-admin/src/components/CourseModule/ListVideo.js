import {
  Popover,
  Button,
  ContextMenuPanel,
  ContextMenuItem,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useToggle } from 'hooks';

const ListVideos = ({ url, openRecording }) => {
  const { isVisiable, toggle, close } = useToggle();

  return (
    <Popover
      display="block"
      button={
        <Button
          size="s"
          className="w-full"
          color="primary"
          iconSide="right"
          iconType="arrowDown"
          fill
          style={{ color: '#fff' }}
          disabled={!(url?.length > 0)}
          onClick={toggle}
        >
          <FormattedMessage defaultMessage="Recordings" />
        </Button>
      }
      panelPaddingSize="none"
      isOpen={isVisiable}
      closePopover={close}
    >
      <ContextMenuPanel
        className="w-40"
        items={
          url?.reverse().map?.((urlLink, index) => (
            <ContextMenuItem
              key={urlLink}
              icon="videoPlayer"
              onClick={openRecording(urlLink)}
            >
              <FormattedMessage
                defaultMessage="Record {order}"
                values={{ order: index + 1 }}
              />
            </ContextMenuItem>
          )) ?? []
        }
      />
    </Popover>
  );
};

ListVideos.defaultProps = {
  url: [],
  openRecording: () => {},
};

ListVideos.propTypes = {
  url: PropTypes.arrayOf(PropTypes.string),
  openRecording: PropTypes.func,
};

export default ListVideos;
