import { EuiFormRow, EuiFormRowProps } from '@elastic/eui';
import React from 'react';

type FormRowProps = EuiFormRowProps & {
  labelFontWeight?: number;
  required?: boolean;
};

const FormRow: React.FC<FormRowProps> = ({
  labelFontWeight,
  children,
  required,
  label,
  ...restProps
}) => {
  const labelCustom = label ? (
    <div
      style={{
        display: 'inline-flex',
        // eslint-disable-next-line no-unneeded-ternary
        fontWeight: labelFontWeight ? labelFontWeight : 600,
      }}
    >
      {label}
      {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
    </div>
  ) : null;
  return (
    <EuiFormRow label={labelCustom} {...restProps}>
      {children}
    </EuiFormRow>
  );
};

export { FormRow, FormRowProps };
