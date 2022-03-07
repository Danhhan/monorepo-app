/* eslint-disable dot-notation */
import { EuiButtonEmpty, EuiButtonEmptyProps } from '@elastic/eui';
import React from 'react';

type ButtonEmptyProps = EuiButtonEmptyProps & {
  customIcon?: string;
};

const ButtonEmpty: React.FC<ButtonEmptyProps> = ({
  customIcon,
  children,
  iconType,
  ...rest
}) => {
  // eslint-disable-next-line global-require
  const Solid: { [key: string]: any } = require('@heroicons/react/solid');

  const IconCustomize = customIcon ? Solid[customIcon] : <></>;

  return (
    <EuiButtonEmpty
      textProps={{ style: { width: '100%' } }}
      {...rest}
      iconType={
        customIcon
          ? () => (
              /* eslint-disable-next-line react/jsx-indent */
              <IconCustomize className="euiIcon euiIcon--medium euiButtonContent__icon" />
            )
          : iconType
      }
    >
      {children}
    </EuiButtonEmpty>
  );
};

export { ButtonEmpty, ButtonEmptyProps };
