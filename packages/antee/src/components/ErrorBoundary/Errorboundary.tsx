import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ReactChild, ComponentType, FC } from 'react';
import { EmptyPrompt, Button } from '@antoree/ant-ui';

const ErrorFallback = () => (
  <div
    role="alert"
    className="flex flex-col justify-items-center items-center justify-center h-screen"
  >
    <EmptyPrompt
      iconType="alert"
      iconColor="danger"
      titleSize="l"
      title={
        <h1>
          Oops! Something went wrong!
          <span role="img" aria-label="smile-icon">
            🙂
          </span>
        </h1>
      }
      body={
        <>
          <p>Sorry! Our spaghetti code is not working properly.</p>
          <p>We&apos;re working on a quick fix, come back soon!</p>
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

export interface ErrorBoundaryCustomProps {
  children: ReactChild;
  FallbackComponent?: ComponentType<FallbackProps>;
  onError?: (
    error: Error,
    info: {
      componentStack: string;
    },
  ) => void;
}

const ErrorBoundaryCustom: FC<ErrorBoundaryCustomProps> = ({
  children,
  onError,
  FallbackComponent = ErrorFallback,
}) => (
  <ErrorBoundary FallbackComponent={FallbackComponent} onError={onError}>
    {children}
  </ErrorBoundary>
);

export default ErrorBoundaryCustom;
