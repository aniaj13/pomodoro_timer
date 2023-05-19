import './ToDoList.css'
import {Component} from "react";

function ToDoItem({title, totalTimeInMinutes}) {

    return (
        <div className='ToDoItem'>
            <h3>{title} - {totalTimeInMinutes} minutes</h3>
            <div className='buttons'>
                <button>Edytuj</button>
                <button>Usuń</button>
                <button>Zacznij</button>
            </div>
            <br></br>
        </div>
    )
}

export default class ToDoList extends Component {
    state = {
        ToDoList: [
            {title: 'Uczyć się na egzamin', totalTimeInMinutes: 30},
            {title: 'Zrobić Couch Stretch', totalTimeInMinutes: 6},
            {title: 'Potańczyć', totalTimeInMinutes: 15},
        ]
    }

    render() {
        return (
            <div className='ToDoList'>
                <h2>To-do List</h2>
                <hr/>
                <div className='TaskAdding'>
                    <button>+ Add Task</button>
                </div>
                <div className='TaskList'>
                    {this.state.ToDoList.map(({title, totalTimeInMinutes}) => (
                            <ToDoItem key={title} title={title} totalTimeInMinutes={totalTimeInMinutes}/>
                        )
                    )}
                </div>
            </div>
        )
    }
}