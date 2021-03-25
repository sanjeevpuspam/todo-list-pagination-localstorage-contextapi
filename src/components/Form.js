import React, { useState, useContext } from 'react';
import { NotificationManager } from 'react-notifications';

import ItemsContext from '../context/items-context';
import { currentDate } from '../Helper';


const Form = () => {
    const [note,setNote] = useState('');
    const {itemsDispatch, items } = useContext(ItemsContext);
    

    const setLocalStorage = (e) => {
        if(note !==''){
            e.preventDefault();
                var newItem = { 'id': items.length+1, 'note': note, 'date': currentDate(), 'category': 0};
                itemsDispatch({ type: 'ADD_ITEM', item:newItem });
                // var oldItems = localStorage.getItem("itemsArray") ? JSON.parse(localStorage.getItem('itemsArray')) : [];
                // oldItems.unshift(newItem);
                // localStorage.setItem('itemsArray', JSON.stringify(oldItems));
                setNote('');
                document.getElementById("createnote").reset();
                NotificationManager.success('Item added successfully');
        } else {
            NotificationManager.error('Please enter input note first');
        }
    }

    return (
           <form id="createnote" className="row g-3 needs-validation">
                <h3>Create New Task</h3>
                <textarea className="form-control" onKeyUp={(e)=> setNote(e.target.value)} rows="3"  placeholder="Enter note here…" />
                <button type="button" onClick={ setLocalStorage } id="note" className="btn bg-danger text-white">Submit</button>
           </form>
    );
};

export default Form;