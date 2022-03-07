import { ButtonEmpty } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useState, useEffect } from 'react';

const CountDownResend: React.FC<{
  resendHandle: Function;
  isLoadingResend: boolean;
  isLoadingVerify: boolean;
  initialSeconds: number;
}> = ({ resendHandle, isLoadingVerify, isLoadingResend, initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return (
    <ButtonEmpty
      style={{ marginLeft: '-8px' }}
      size="xs"
      isDisabled={seconds !== 0}
      onClick={() => resendHandle()}
      isLoading={isLoadingVerify || isLoadingResend}
    >
      <FormattedMessage defaultMessage="Không nhận được tin nhắn ? Gửi lại" />
      &nbsp;
      {seconds ? `in ${seconds}s` : null}
    </ButtonEmpty>
  );
};

export default CountDownResend;
