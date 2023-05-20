import './ToDoList.css'
import {Component} from "react";

class TaskAdder extends Component {

    state = {
        isAddingOn: true,
        textInput: '',
        numberInput: 0,
    }

    handleTextInputChange = (e) => {
        this.setState({
            textInput: e.target.value,
        })
    }

    handleNumberInputChange = (e) => {
        this.setState({
            numberInput: e.target.value,
        })
    }

    render() {

        const {isAddingOn, numberInput, textInput} = this.state
        const {handleTaskAdding} = this.props

        return (
            <>
                {!isAddingOn &&
                    <div className='TaskAdding'>
                        <button>+ Add Task</button>
                    </div>}
                {isAddingOn &&
                    <div className='TaskInput'>
                        <input onChange={this.handleTextInputChange} className='textInput'
                               placeholder='Type your Task here' type="text"/>
                        <input onChange={this.handleNumberInputChange} className='numberInput' placeholder='Minutes'
                               type="number"/>
                        <button onClick={() => handleTaskAdding(textInput, numberInput)}>+</button>
                    </div>}
            </>
        )
    }
}

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
        const newToDoList = this.state.ToDoList.filter(item => item.title !== key)
        this.setState({ToDoList: newToDoList})
    }

    handleTaskAdding = (text, number) => {
        const newItem = {title: text, totalTimeInMinutes: number}
        this.setState(prevState => ({
            ToDoList: [...prevState.ToDoList, newItem]
        }))
    }

    render() {

        const {pickTask} = this.props

        return (
            <div className='ToDoList'>
                <h2>To-do List</h2>
                <hr/>
                <TaskAdder handleTaskAdding={this.handleTaskAdding}/>
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