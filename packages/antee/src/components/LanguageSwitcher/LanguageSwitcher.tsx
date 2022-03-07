import React, { useState } from 'react';
import {
  Popover,
  ContextMenuPanel,
  ButtonEmpty,
  Text,
  ContextMenuItem,
  ButtonEmptyProps,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

import { useLanguageContext, LocaleType } from 'services/translation/context';

const VietNamese = () => <FormattedMessage defaultMessage="Vietnamese" />;

const English = () => <FormattedMessage defaultMessage="English" />;

export type LanguageSwitcherProps = Pick<ButtonEmptyProps, 'color'>;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  color = 'ghost',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { locale, changeLanguage } = useLanguageContext();

  const closeHandler = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const onLanguageClick = (localeValue: LocaleType) => () => {
    changeLanguage(localeValue);
    closeHandler();
  };

  const button = (
    <ButtonEmpty
      iconType="arrowDown"
      color={color}
      iconSide="right"
      size="s"
      onClick={toggleHandler}
    >
      {locale === 'vi-VN' ? <VietNamese /> : null}
      {locale === 'en-US' ? <English /> : null}
    </ButtonEmpty>
  );

  return (
    <Popover
      button={button}
      isOpen={isOpen}
      closePopover={closeHandler}
      panelPaddingSize="s"
      anchorPosition="downRight"
    >
      <ContextMenuPanel
        size="s"
        items={[
          <ContextMenuItem
            size="m"
            key="vi-vn"
            icon={
              <span role="img" aria-label="vietnam-icon">
                🇻🇳
              </span>
            }
            onClick={onLanguageClick('vi-VN')}
          >
            <Text>
              <p>
                <VietNamese />
              </p>
            </Text>
          </ContextMenuItem>,
          <ContextMenuItem
            size="m"
            key="en-us"
            icon={
              <span role="img" aria-label="english-icon">
                🇬🇧
              </span>
            }
            onClick={onLanguageClick('en-US')}
          >
            <Text>
              <p>
                <English />
              </p>
            </Text>
          </ContextMenuItem>,
        ]}
      />
    </Popover>
  );
};

export default LanguageSwitcher;
