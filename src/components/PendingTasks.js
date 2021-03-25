import React , { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import ItemsContext from '../context/items-context';
import { userAction } from './../Helper';

const PendingTasks = () => {

    const { items } = useContext(ItemsContext);
    const result = items.filter(item => item.category === 0);
    const [currentPage,setCurrentPage] = useState(1);
    const todosPerPage = 5;


    const pendingTasks = ()=> {
		const indexOfLastTodo 	= currentPage * todosPerPage;
		const indexOfFirstTodo 	= indexOfLastTodo - todosPerPage;
        const currentTodos 		= result.slice(indexOfFirstTodo, indexOfLastTodo);
		
        const outputData = currentTodos.map( d => {
            return (
                <div className="shadow-sm p-3 mb-5 bg-white rounded box" key={d.id}>
                    <div></div>
                    <div>
                        <strong>{ d.note }</strong>
                        <p><small>{d.date}</small></p>
                    </div>
                    <div>
                        <FontAwesomeIcon className="text-primary cursor-ponter" onClick={(e) => userAction(result,d.id,1,'Confirm to Complite','Are you sure to do this.','Item going to complite') } icon={faCheckCircle} />
                    </div>
                </div>
            )
        });
        return outputData;
    }
	
	const fetchPage = (st) =>{
		(st==='next') ? (currentPage === Math.ceil(result.length /todosPerPage)) ? setCurrentPage(currentPage) : setCurrentPage(currentPage+1) :  (currentPage !==1 ) ? setCurrentPage(currentPage-1) : setCurrentPage(currentPage);
	}
	
	const displayPageNumber =()=> {
		const pageNumbers = [];
		const pageSize = Math.ceil(result.length /todosPerPage);
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
        <div className="row"><div className="bg-light">
        <p>PENDING</p>
        { pendingTasks() }
        </div>{ displayPageNumber() } </div>
    );
};

export default PendingTasks;