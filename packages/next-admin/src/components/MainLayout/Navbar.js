import { useMemo, useState, useCallback, memo } from 'react';
import {
  CollapsibleNav,
  HeaderSectionItemButton,
  FlexItem,
  CollapsibleNavGroup,
  Icon,
  ShowFor,
  ListGroupItem,
  PinnableListGroup,
  HorizontalRule,
} from '@antoree/ant-ui';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { DEFAULT_PINNED_ITEMS, NAVBAR_GROUPS } from './constants';

const NAV_IS_DOCKED_KEY = 'navIsDocked';

const PINNED_ITEMS_KEY = 'pinnedItems';

function Navbar() {
  const history = useHistory();
  const location = useLocation();

  const intl = useIntl();

  const [navIsOpen, setNavIsOpen] = useState(false);

  const [pinnedItems, setPinnedItems] = useState(
    () => JSON.parse(localStorage.getItem(PINNED_ITEMS_KEY)) ?? [],
  );

  const [navIsDocked, setNavIsDocked] = useState(
    () => JSON.parse(String(localStorage.getItem(NAV_IS_DOCKED_KEY))) ?? false,
  );

  const closeNavHandler = useCallback(() => setNavIsOpen(false), []);

  const toggleNavhandler = () => setNavIsOpen(prevState => !prevState);

  const toggleNavDockhandler = () =>
    setNavIsDocked(prevState => {
      localStorage.setItem(NAV_IS_DOCKED_KEY, JSON.stringify(!prevState));
      return !prevState;
    });

  const onItemClick = useCallback(
    item => () => {
      history.push({
        pathname: item.path,
        state: { from: location },
      });
      // Close navbar after click
      closeNavHandler();
    },
    [history, location, closeNavHandler],
  );

  const addPinHandler = useCallback(
    (item = {}) =>
      setPinnedItems(prevState => {
        let nextState = [...prevState];

        const pinnedItemIndex = prevState.findIndex(
          element => element.path === item.path,
        );

        if (pinnedItemIndex < 0) {
          nextState = [...nextState, { ...item, isActive: false }];
        }

        localStorage.setItem(PINNED_ITEMS_KEY, JSON.stringify(nextState));

        return nextState;
      }),
    [],
  );

  const removePinHandler = useCallback(
    (item = {}) =>
      setPinnedItems(prevState => {
        const nextState = [...prevState];

        const pinnedItemIndex = nextState.findIndex(
          element => element.path === item.path,
        );

        if (pinnedItemIndex > -1) {
          nextState.splice(pinnedItemIndex, 1);
        }

        localStorage.setItem(PINNED_ITEMS_KEY, JSON.stringify(nextState));

        return nextState;
      }),
    [],
  );

  const pinnedOptions = useMemo(
    () =>
      [...DEFAULT_PINNED_ITEMS, ...pinnedItems].map(item => ({
        message: item.message,
        label: intl.formatMessage(item.message),
        iconType: item.iconType,
        pinnable: item.pinnable,
        pinned: item.pinned,
        isActive: item.isActive,
        path: item.path,
        onClick: onItemClick(item),
      })),
    [intl, pinnedItems, onItemClick],
  );

  const navOptions = useMemo(
    () =>
      NAVBAR_GROUPS.map(group => ({
        id: group.id,
        title: intl.formatMessage(group.message),
        iconType: group.iconType,
        children: group.children.map(item => ({
          message: item.message,
          label: intl.formatMessage(item.message),
          onClick: onItemClick(item),
          path: item.path,
          isActive: location.pathname
            .split('/')
            .includes(item.path.replace('/', '')),
        })),
      })),
    [location.pathname, intl, onItemClick],
  );

  return (
    <CollapsibleNav
      id="guideHeaderCollapsibleNavExample"
      aria-label="Main navigation"
      showCloseButton={false}
      isOpen={navIsOpen}
      isDocked={navIsDocked}
      button={
        <HeaderSectionItemButton
          aria-label="Toggle main navigation"
          onClick={toggleNavhandler}
        >
          <Icon type="menu" size="m" aria-hidden="true" />
        </HeaderSectionItemButton>
      }
      onClose={closeNavHandler}
    >
      <FlexItem>
        <CollapsibleNavGroup
          className="eui-yScroll"
          style={{ maxHeight: '40vh' }}
        >
          <PinnableListGroup
            listItems={pinnedOptions}
            onPinClick={removePinHandler}
            color="text"
            size="s"
          />
        </CollapsibleNavGroup>
      </FlexItem>

      <HorizontalRule margin="none" />

      <FlexItem className="eui-yScroll">
        {navOptions.map(({ children, id, ...rest }) => (
          <CollapsibleNavGroup key={id} isCollapsible initialIsOpen {...rest}>
            <PinnableListGroup
              listItems={children}
              onPinClick={addPinHandler}
              color="subdued"
              size="s"
            />
          </CollapsibleNavGroup>
        ))}
      </FlexItem>

      <FlexItem grow={false}>
        <ShowFor sizes={['l', 'xl']}>
          <CollapsibleNavGroup>
            <ListGroupItem
              size="xs"
              color="subdued"
              label={`${navIsDocked ? 'Undock' : 'Dock'} navigation`}
              onClick={toggleNavDockhandler}
              iconType={navIsDocked ? 'lock' : 'lockOpen'}
            />
          </CollapsibleNavGroup>
        </ShowFor>
      </FlexItem>
    </CollapsibleNav>
  );
}

Navbar.defaultProps = {};

Navbar.propTypes = {};

export default memo(Navbar);
