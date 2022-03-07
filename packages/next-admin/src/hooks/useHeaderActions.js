import { HeaderActionContext } from 'contexts/HeaderActionContext';
import { isArray } from 'helpers';
import { useContext, useEffect } from 'react';

const useHeaderActions = (actionsTmp = []) => {
  const { actions, handleAddAction } = useContext(HeaderActionContext);

  useEffect(() => {
    // console.log('useHeaderActions');
    console.log(actionsTmp);
    if (isArray(actionsTmp)) {
      handleAddAction(actionsTmp);
    }
    return () => {
      handleAddAction([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleAddAction]);

  return actions;
};

export default useHeaderActions;
