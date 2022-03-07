import { EmptyPrompt } from '@antoree/ant-ui';
import { ErrorBoundary } from 'components';

const fallback = () => (
  <EmptyPrompt
    iconType="editorStrike"
    title={<h2>You have no spice</h2>}
    body={
      <>
        <p>
          Navigators use massive amounts of spice to gain a limited form of
          prescience. This allows them to safely navigate interstellar space,
          enabling trade and travel throughout the galaxy.
        </p>
        <p>You&rsquo;ll need spice to rule Arrakis, young Atreides.</p>
      </>
    }
  />
);

function withSuspense(WrappedComponent) {
  return () => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent />
    </ErrorBoundary>
  );
}

export default withSuspense;
