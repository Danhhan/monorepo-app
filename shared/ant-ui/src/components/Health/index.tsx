import { HTMLAttributes } from 'react';
import { EuiHealth, CommonProps, IconColor } from '@elastic/eui';

type EuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `secondary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     */
    color?: IconColor;
  };

export { EuiHealth as Health, EuiHealthProps as HealthProps };
