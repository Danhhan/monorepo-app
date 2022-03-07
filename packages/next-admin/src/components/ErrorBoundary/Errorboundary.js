import PropTypes from 'prop-types';
import { ErrorBoundary } from 'react-error-boundary';
import { EmptyPrompt, Button } from '@antoree/ant-ui';

const ErrorFallback = () => {
  return (
    <div
      role="alert"
      className="flex flex-col justify-items-center items-center justify-center h-screen"
    >
      <EmptyPrompt
        iconType="alert"
        iconColor="danger"
        titleSize="l"
        title={<h1>Something went wrong :(</h1>}
        body={
          <>
            <p>The problem may cause by the version of your website</p>
            <p>------------------------</p>
            <div className="text-left">
              <p>You can try:</p>
              <p>With MacOS (Macbook) press: Command + shift + R</p>
              <p>With Window press: Crtl + shift + R</p>
            </div>
            <p>------------------------</p>
            <p>
              If it doesn&apos;t work after several times, so sorry for this
              inconvenient experience. Please contact for help!
            </p>
            <p>We&apos;re here to support you!</p>
          </>
        }
        actions={
          <div>
            <a href="/">
              <Button>Back to home</Button>
            </a>
          </div>
        }
      />
    </div>
  );
};

function ErrorBoundaryCustom(props) {
  const { children, errorHandler, fallback } = props;

  return (
    <ErrorBoundary FallbackComponent={fallback} onError={errorHandler}>
      {children}
    </ErrorBoundary>
  );
}

ErrorBoundaryCustom.defaultProps = {
  errorHandler: () => {},
  fallback: ErrorFallback,
};

ErrorBoundaryCustom.propTypes = {
  children: PropTypes.node.isRequired,
  errorHandler: PropTypes.func,
  fallback: PropTypes.elementType,
};

export default ErrorBoundaryCustom;
