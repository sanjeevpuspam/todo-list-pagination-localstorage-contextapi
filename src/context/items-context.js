import { createContext } from 'react';

const ItemsContext = createContext({
  itemsArray: [],
  itemsDispatch: () => {},
});

export { ItemsContext as default };
