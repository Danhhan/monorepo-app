import { createContext } from 'react';

const HeaderActionContext = createContext({
  actions: [],
  handleAddAction: () => {},
});

export default HeaderActionContext;
