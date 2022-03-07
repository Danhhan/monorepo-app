import React, { FC, HTMLAttributes, ReactChild } from 'react';
// import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import './assets/styles.scss';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
export const Thing: FC<Props> = ({ children }) => {
  // eslint-disable-next-line prettier/prettier
  return <div>{children || `the snozzberries taste like snozzberries`}</div>;
};

export {
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
} from '@elastic/eui';

export { default as htmlIdGenerator } from './services/accessibility/htmlIdGenerator';
export { default as dragDropReorder } from './services/dragDropReorder';

/* PLOP_INJECT */
export * from './components/FilterButton';
export * from './components/FilePicker';
export * from './components/InputPopover';
export * from './components/FormControlLayout';
export * from './components/SplitPanel';
export * from './components/Progress';
export * from './components/HeaderSectionItem';
export * from './components/HeaderLink';
export * from './components/Divider';
export * from './components/ContextMenu';
export * from './components/ContextMenuPanel';
export * from './components/ContextMenuItem';
export * from './components/InMemoryTable';
export * from './components/LoadingChart';
export * from './components/PageTemplate';
export * from './components/Steps';
export * from './components/IconTip';
export * from './components/FacetButton';
export * from './components/Draggable';
export * from './components/Droppable';
export * from './components/DragDropContext';
export * from './components/Highlight';
export * from './components/BetaBadge';
export * from './components/EmptyPrompt';
export * from './components/LoadingSpinner';
export * from './components/TabbedContent';
export * from './components/Panel';
export * from './components/Stat';
export * from './components/LoadingContent';
export * from './components/Copy';
export * from './components/CheckboxGroup';
export * from './components/Switch';
export * from './components/DescribedFormGroup';
export * from './components/Badge';
export * from './components/FieldNumber';
export * from './components/Portal';
export * from './components/DatePickerRange';
export * from './components/FlyoutFooter';
export * from './components/FlyoutHeader';
export * from './components/FlyoutBody';
export * from './components/Flyout';
export * from './components/ButtonEmpty';
export * from './components/ModalFooter';
export * from './components/ModalBody';
export * from './components/ModalHeaderTitle';
export * from './components/ModalHeader';
export * from './components/Modal';
export * from './components/TextArea';
export * from './components/DescriptionListDescription';
export * from './components/DescriptionListTitle';
export * from './components/Card';
export * from './components/ConfirmModal';
export * from './components/OverlayMask';
export * from './components/ComboBox';
export * from './components/Health';
export * from './components/SuperSelect';
export * from './components/DatePicker';
export * from './components/FlexGrid';
export * from './components/ButtonIcon';
export * from './components/FieldSearch';
export * from './components/FlexGroup';
export * from './components/PageHeaderSection';
export * from './components/PageHeader';
export * from './components/DescriptionList';
export * from './components/BasicTable';
export * from './components/PinnableListGroup';
export * from './components/ListGroupItem';
export * from './components/ShowFor';
export * from './components/Title';
export * from './components/PageContentHeaderSection';
export * from './components/PageContentHeader';
export * from './components/PageContentBody';
export * from './components/PageContent';
export * from './components/PageBody';
export * from './components/Link';
export * from './components/PopoverFooter';
export * from './components/PopoverTitle';
export * from './components/HorizontalRule';
export * from './components/GlobalToastList';
export * from './components/CollapsibleNavGroup';
export * from './components/FlexItem';
export * from './components/CollapsibleNav';
export * from './components/Page';
export * from './components/Text';
export * from './components/Avatar';
export * from './components/Popover';
export * from './components/Icon';
export * from './components/HeaderSectionItemButton';
export * from './components/HeaderLogo';
export * from './components/Header';
export * from './components/CallOut';
export * from './components/Spacer';
export * from './components/FieldPassword';
export * from './components/FieldText';
export * from './components/FormRow';
export * from './components/Form';
export * from './components/Button';
export * from './components/InfiniteScroll';
export * from './components/ButtonGroup';
export * from './components/FilterButton';
export * from './components/Accordion';
export * from './components/Pagination';
export * from './components/Tabs';
export * from './components/FilterButton';
export * from './components/Radio';
export * from './components/Select';
export * from './components/Slider';
export * from './components/ErrorShow';
export * from './components/Slider';
export * from './components/PageSideBar';
export * from './components/NotificationBadge';
export * from './components/PageSideBar';
export * from './components/KeyPadMenu';
export * from './components/BottomBar';
export * from './components/ToolTip';
export * as Solid from '@heroicons/react/solid';
export * as Outline from '@heroicons/react/outline';
export * from './components/Fullcalendar';
export * from './components/Skeleton';
