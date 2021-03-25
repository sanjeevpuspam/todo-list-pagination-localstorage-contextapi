import React, { useEffect, useReducer } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

import Form from './components/Form';
import TaskCategary from './components/TaskCategary';

import itemsReducer from './reducer/items';
import ItemsContext from './context/items-context';


function App() {
 const [items, itemsDispatch] = useReducer(itemsReducer, []);
 
 useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      itemsDispatch({ type: 'POPULATE_ITEMS', items });
    }
  }, []);
 
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
 
  return (
  <ItemsContext.Provider value={{ items, itemsDispatch }}>
		<div className="container">
		  <div className="row bg-primary top align-middle text-white">
			<div className="col-3"><strong>TASK MANAGEMENT APP</strong></div>
			<div className="col-9"></div>
		  </div>
		  <div className="row">
			<div className="col-9"><TaskCategary /></div>
			<div className="col-3"><Form /></div>
		  </div>
		  <NotificationContainer />
		</div>
	</ItemsContext.Provider>
  );
}


export default App;
