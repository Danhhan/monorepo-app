import OtpInput from 'react-otp-input';
import { useState } from 'react';

const OTPVerifyInput: React.FC<{
  //   handleSuccess?: (value: boolean) => void;
  handleVerify?: (value: string) => void;
  value?: string;
  onChange?: (value: string | number) => void;
}> = ({ handleVerify, value, onChange }) => {
  const [otpInput, setOtpInput] = useState('');

  const handleChange = (otp: string) => setOtpInput(otp);

  return (
    <OtpInput
      value={value || otpInput}
      onChange={onChange || handleChange}
      numInputs={6}
      separator={<span>-</span>}
      isInputNum
      containerStyle={{
        justifyContent: 'center',
        marginTop: '8px',
      }}
      focusStyle={{
        outline: 'rgba(0, 192, 129, 1) auto 1px',
      }}
      inputStyle={{
        width: '2.5rem',
        height: '2.5rem',
        margin: '0 0.5rem',
        fontSize: '1.5rem',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.3)',
      }}
    />
  );
};

export default OTPVerifyInput;
