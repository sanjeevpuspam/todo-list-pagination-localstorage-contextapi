import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import ItemsContext from '../context/items-context';

import { userAction  } from '../Helper';

const AllTasks = () => {

    const { items } = useContext(ItemsContext);
    const [currentPage,setCurrentPage] = useState(1);
    const todosPerPage = 5;


    // const markDeleted = (id) => {
    //     confirmAlert({
    //         title: 'Confirm to Delete',
    //         message: 'Are you sure to do this.',
    //         buttons: [
    //           {
    //             label: 'Yes',
    //             onClick: () => {
    //                 // for (var i = 0; i < oldData.length; i++){
    //                 //     if (oldData[i].id === id){
    //                 //         oldData[i].category=2;
    //                 //     }
    //                 // }
    //                 // setData(oldData);
	// 				// oldData.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    //                 // localStorage.setItem('items', JSON.stringify(oldData));
    //                 // NotificationManager.success('Item marked deleted');
    //             }
    //           },
    //           {
    //             label: 'No',
    //             onClick: () => alert('Click No')
    //           }
    //         ]
    //       }); 
    // }
	
    const allTasks = ()=> {
		const indexOfLastTodo 	= currentPage * todosPerPage;
		const indexOfFirstTodo 	= indexOfLastTodo - todosPerPage;
        const currentTodos 		= items.slice(indexOfFirstTodo, indexOfLastTodo);
		
        const outputData = currentTodos.map( d => {
            if(d.category ===2) {
                return (<div className="shadow-sm p-3 mb-5 bg-white deleted rounded box " key={d.id}>
                <div><FontAwesomeIcon className="text-danger cursor-ponter" onClick={()=>{ alert('hello') }}   icon={ faCheckCircle } /></div>
                <div><strong>{ d.note }</strong><p><small>{d.date}</small></p></div>
            </div>)
            } else if(d.category ===1){
                return (<div className="shadow-sm p-3 mb-5 bg-primary rounded box " key={d.id}>
                <div><FontAwesomeIcon className="text-info" onClick={()=>{ alert('hello') }}  icon={ faCheckCircle  } /></div>
                <div><strong>{ d.note }</strong><p><small>{d.date}</small></p></div>
                <div><FontAwesomeIcon className="text-danger cursor-ponter" onClick={(e) => userAction(items,d.id,2,'Confirm to Delete','Are you sure to do this.','Item marked deleted') } icon={ faTrash } /></div>
            </div>)
            } else {
                return (<div className="shadow-sm p-3 mb-5 bg-white rounded box " key={d.id}>
                <div><FontAwesomeIcon className="text-info cursor-ponter" onClick={(e) => userAction(items,d.id,1,'Confirm to Complite','Are you sure to do this.','Item going to complite') }  icon={ faCheckCircle } /></div>
                <div><strong>{ d.note }</strong><p><small>{d.date}</small></p></div>
            </div>)
            }
        });
		
        return outputData;
    }
	
	const fetchPage = (st) =>{
		(st==='next') ?
			(currentPage === Math.ceil(items.length /todosPerPage)) ? setCurrentPage(currentPage) : setCurrentPage(currentPage+1)
		:
			(currentPage !==1 ) ? setCurrentPage(currentPage-1) : setCurrentPage(currentPage);
	}
	
	const displayPageNumber = () => {
		const pageNumbers = [];
		const pageSize = Math.ceil(items.length /todosPerPage);
        for (let i = 1; i <= pageSize; i++) {
          pageNumbers.push(i);
        }
		const renderPageNumbers = pageNumbers.map(number => {
		  let liClassName = (currentPage===number) ? "page-item active" : "page-item";
          return (<li className={liClassName} key={number} ><a href="!#" className="page-link" onClick={() => setCurrentPage(number) } > {number} </a></li>);
        });
		return(<nav><ul className="pagination"><li className="page-item"><a href="!#" onClick={()=> fetchPage('previous')} className="page-link" >&laquo;</a></li>{renderPageNumbers}<li className="page-item"><a href="!#" className="page-link" onClick={()=> fetchPage('next')} >&raquo;</a></li></ul></nav>);
	}

    return (
	<div className="row">
        <div className="bg-light">
        <h5>ALL Task</h5>
        { allTasks() } 
		</div>
		{ displayPageNumber() } 
	</div>);
};

export default AllTasks;