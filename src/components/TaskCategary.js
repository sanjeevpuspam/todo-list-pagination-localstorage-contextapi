import React from 'react';
import {BrowserRouter as Router,Switch,Route, NavLink} from "react-router-dom";

import AllTasks from './AllTasks';
import ComplitedTask from './ComplitedTask';
import PendingTasks from './PendingTasks';

const TaskCategary = () => {
    return (
        <Router>
        <div className="row">
        <div className="col-4">
            <ul className="nav flex-column">
                <li className="nav-item btn"><NavLink exact activeClassName="btn-light" to="/">ALL TASKS</NavLink></li>
                <li className="nav-item btn"><NavLink exact activeClassName="btn-light" to="/complited">COMPLETED</NavLink></li>
                <li className="nav-item btn"><NavLink exact activeClassName="btn-light" to="/pending">PENDING</NavLink></li>
            </ul>
          </div>
          <div className="col-8">
          <Switch>
            <Route path="/pending" component={ PendingTasks } />
            <Route path="/complited" component={ComplitedTask} />
            <Route path="/" component={AllTasks } />
          </Switch>
          </div>
        </div>
      </Router>
    );
};

export default TaskCategary;