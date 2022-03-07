import { useState } from 'react';
import {
  Popover,
  ContextMenuPanel,
  ButtonEmpty,
  Text,
  ContextMenuItem,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useLanguageContext } from 'contexts/LanguageContext';

const VietNamese = () => <FormattedMessage defaultMessage="Vietnamese" />;

const English = () => <FormattedMessage defaultMessage="English" />;

function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);

  const { locale, changeLanguage } = useLanguageContext();
  // const locale = 'en-US';

  const closeHandler = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  const onLanguageClick = value => () => {
    changeLanguage(value);
    closeHandler();
  };

  const button = (
    <ButtonEmpty
      iconType="arrowDown"
      color="ghost"
      iconSide="right"
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
}

export default LanguageSwitcher;
