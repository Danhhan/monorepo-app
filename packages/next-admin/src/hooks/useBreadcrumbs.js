import { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BreadcrumbsContext } from 'contexts/breadcrumbsContext';

const useBreadcrumbs = (breadcrumbsTmp = []) => {
  const history = useHistory();

  const { breadcrumbs, replaceBreadcrumbsHandler } = useContext(
    BreadcrumbsContext,
  );

  const navigateHandler = useCallback(item => () => history.push(item.path), [
    history,
  ]);

  useEffect(() => {
    if (breadcrumbsTmp.length > 0) {
      const items = breadcrumbsTmp.map(item => ({
        text: item.text,
        onClick: item?.path && navigateHandler(item),
      }));

      replaceBreadcrumbsHandler(items);
    }

    return () => {
      replaceBreadcrumbsHandler([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [replaceBreadcrumbsHandler, navigateHandler]);

  return breadcrumbs;
};

export default useBreadcrumbs;
