import { useBreadcrumbs } from 'hooks';

function withBreadcrumbs(WrappedComponent) {
  return breadcrumbs => () => {
    useBreadcrumbs(breadcrumbs);

    return <WrappedComponent />;
  };
}

export default withBreadcrumbs;
