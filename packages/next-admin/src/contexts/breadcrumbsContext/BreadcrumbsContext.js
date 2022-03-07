import { createContext } from 'react';

const BreadcrumbsContext = createContext({
  breadcrumbs: [],
  replaceBreadcrumbsHandler: () => {},
});

export default BreadcrumbsContext;
