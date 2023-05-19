import './ToDoList.css'
import {Component} from "react";

function ToDoItem({title, totalTimeInMinutes, onEdit, onStart, onDelete}) {

    return (
        <div className='ToDoItem'>
            <h3>{title} - {totalTimeInMinutes} minutes</h3>
            <div className='buttons'>
                <button onClick={onEdit}>Edytuj</button>
                <button onClick={onDelete}>Usuń</button>
                <button onClick={onStart}>Zacznij</button>
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

    deleteItem = (key) => {
        console.log(key)
        const newToDoList = this.state.ToDoList.filter(item => item.title !== key)
        this.setState({ToDoList: newToDoList})
    }


    render() {

        const {pickTask} = this.props

        return (
            <div className='ToDoList'>
                <h2>To-do List</h2>
                <hr/>
                <div className='TaskAdding'>
                    <button>+ Add Task</button>
                </div>
                <div className='TaskList'>
                    {this.state.ToDoList.map(item => (
                            <ToDoItem
                                key={item.title}
                                title={item.title}
                                totalTimeInMinutes={item.totalTimeInMinutes}
                                onStart={() => pickTask(item)}
                                onDelete={() => this.deleteItem(item.title)}
                            />
                        )
                    )}
                </div>
            </div>
        )
    }
}