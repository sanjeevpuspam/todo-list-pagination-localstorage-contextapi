import React , { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import ItemsContext from '../context/items-context';
import { userAction } from './../Helper';

const ComplitedTask = () => {
    const { items } = useContext(ItemsContext);
    const result = items.filter(item => item.category === 1);
	const [currentPage,setCurrentPage] = useState(1);
	const todosPerPage = 5;


    const completedTasks = () => {
		const indexOfLastTodo 	= currentPage * todosPerPage;
		const indexOfFirstTodo 	= indexOfLastTodo - todosPerPage;
       
        const currentTodos 		= result.slice(indexOfFirstTodo, indexOfLastTodo);
        const outputData = currentTodos.map( d => {
            return (<div className="shadow-sm p-3 mb-5 bg-primary rounded box " key={d.id}>
            <div><FontAwesomeIcon className="text-info" onClick={()=>{ alert('hello') }}  data-id={d.id} icon={ faCheckCircle  } /></div>
            <div><strong>{ d.note }</strong><p><small>{d.date}</small></p></div>
            <div>
                <FontAwesomeIcon className="text-danger cursor-ponter" onClick={(e) => userAction(result,d.id,2,'Confirm to Delete','Are you sure to do this.','Item marked deleted') } icon={ faTrash } />
                <FontAwesomeIcon className="text-info cursor-ponter" onClick={(e) => userAction(result,d.id,0,'Confirm to Pending','Are you sure to do this.','Item go back to review') } icon={ faUndoAlt } />
            </div>
        </div>)
        });
        return outputData;
    }
	
	const fetchPage = (st) =>{
		(st==='next') ?
			(currentPage === Math.ceil(result.length /todosPerPage)) ? setCurrentPage(currentPage) : setCurrentPage(currentPage+1)
		:
			(currentPage !==1 ) ? setCurrentPage(currentPage-1) : setCurrentPage(currentPage);
	}
	
	const displayPageNumber =()=> {
		const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(result.length /todosPerPage); i++) {
          pageNumbers.push(i);
        }
		const renderPageNumbers = pageNumbers.map(number => {
		  let liClassName = (currentPage===number) ? "page-item active" : "page-item";
          return (<li className={liClassName} key={number} ><a href="!#" className="page-link" onClick={() => setCurrentPage(number) } > {number} </a></li>);
        });
		
		return(<nav><ul className="pagination"><li className="page-item"><a href="!#" onClick={()=> fetchPage('previous')} className="page-link" >&laquo;</a></li>{renderPageNumbers}<li className="page-item"><a href="!#" className="page-link" onClick={()=> fetchPage('next')} >&raquo;</a></li></ul></nav>);
	}

    return (
        <div className="row"><div className="bg-light">
        <h5>Complited Task</h5>
        { completedTasks() }
        </div>{ displayPageNumber() } </div>
    );
};

export default ComplitedTask;