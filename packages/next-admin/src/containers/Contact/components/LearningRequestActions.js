import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ContextMenuItem,
  ContextMenuPanel,
  FlexGroup,
  FlexItem,
  htmlIdGenerator,
  Icon,
  Popover,
  Text,
} from '@antoree/ant-ui';
import { useHistory } from 'react-router';
import {
  BOOK_TEST,
  BOOK_TRIAL,
  CREATE_ACCOUNT,
  CREATE_CONTRACT,
  CREATE_TRANSFER,
  LR_MENU_ITEM,
  VIEW_TRANSFER,
} from '../constant';

function LearningRequestActions({ level, contactId, lrId, levelMeta }) {
  const history = useHistory();
  const [isPopoverOpen, setPopover] = useState(false);
  const [items, setItems] = useState(LR_MENU_ITEM);
  const onButtonClick = () => {
    updateItem();
    setPopover(!isPopoverOpen);
  };
  const closePopover = () => {
    setPopover(false);
  };
  useEffect(() => {
    if (!isPopoverOpen) {
      updateDisableAll();
    }
  }, [isPopoverOpen]);
  const updateItem = () => {
    switch (level) {
      case 1:
        updateDisable(CREATE_ACCOUNT);
        break;
      case 3:
      case 4:
        updateDisable(CREATE_ACCOUNT);
        updateDisable(BOOK_TEST);
        updateDisable(BOOK_TRIAL);
        break;
      case 5:
        updateDisable(CREATE_ACCOUNT);
        updateDisable(BOOK_TEST);
        updateDisable(BOOK_TRIAL);
        updateDisable(CREATE_CONTRACT);
        break;
      case 6:
        updateDisable(CREATE_ACCOUNT);
        updateDisable(BOOK_TEST);
        updateDisable(BOOK_TRIAL);
        updateDisable(CREATE_CONTRACT);
        if (levelMeta?.level_6?.sub_level_602_data?.save_at_level_6) {
          updateDisable(VIEW_TRANSFER);
        } else {
          updateDisable(CREATE_TRANSFER);
        }

        break;
      default:
        return null;
    }
    return null;
  };
  const updateDisableAll = () => {
    const localItems = [...items];
    const itemList = localItems.map(item => {
      const localItem = { ...item };
      localItem.disabled = true;
      return localItem;
    });
    setItems(itemList);
  };
  const updateDisable = id => {
    const localItems = [...items];
    const index = localItems.findIndex(item => item.id === id);
    localItems[index].disabled = false;
    setItems(localItems);
  };
  const handleClickMenuItem = id => {
    switch (id) {
      case CREATE_TRANSFER:
        if (window.location.origin === 'http://localhost:3000') {
          window.open(
            `${window.location.origin}/contacts/learning-requests/${lrId}/handover/create`,
          );
        } else {
          window.open(
            `${window.location.origin}/v2/contacts/learning-requests/${lrId}/handover/create`,
          );
        }
        break;
      case VIEW_TRANSFER:
        history.push(`/contacts/learning-requests/${lrId}/handover`);
        break;
      default:
        break;
    }
  };
  const renderMenuItem = () => {
    return items.map(item => {
      return (
        <ContextMenuItem
          key={item.id}
          icon={item.icon}
          disabled={item.disabled}
          onClick={() => handleClickMenuItem(item.id)}
        >
          {item.label}
        </ContextMenuItem>
      );
    });
  };

  return (
    <FlexGroup>
      <FlexItem>
        <Popover
          id={htmlIdGenerator()()}
          button={
            <Button
              className="rounded-lg"
              size="s"
              minWidth={20}
              fill
              onClick={onButtonClick}
            >
              <Text size="s" style={{ color: 'white' }}>
                <p>
                  <>
                    <span className="mr-1">Tuỳ chỉnh</span>
                    <Icon className="mb-0.5" type="arrowDown" />
                  </>
                </p>
              </Text>
            </Button>
          }
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="downLeft"
        >
          <ContextMenuPanel size="s" items={renderMenuItem()} />
        </Popover>
      </FlexItem>
    </FlexGroup>
  );
}

LearningRequestActions.defaultProps = {
  levelMeta: undefined,
};

LearningRequestActions.propTypes = {
  level: PropTypes.number.isRequired,
  contactId: PropTypes.number.isRequired,
  lrId: PropTypes.number.isRequired,
  levelMeta: PropTypes.oneOfType([PropTypes.object]),
};

export default LearningRequestActions;
