import './ToDoList.css'
import {Component} from "react";
import nextId from 'react-id-generator'

class TaskAdder extends Component {

    state = {
        isAddingOn: false,
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

    enableTaskAdder = () => {
        this.setState({
            isAddingOn: true,
        })
    }

    render() {

        const {isAddingOn, numberInput, textInput} = this.state
        const {handleTaskAdding} = this.props

        return (
            <>
                {!isAddingOn &&
                    <div className='TaskAdding'>
                        <button onClick={this.enableTaskAdder}>+ Add Task</button>
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

// TODO add is adding on false on button click

class ToDoItem extends Component {



    render() {
        const {title, totalTimeInMinutes, onStart, onDelete, onTitleChange, onMinuteChange} = this.props

        return (
            <div className='ToDoItem'>
                <div className='Item'>
                    <input onChange={onTitleChange} className='titleInput' type="text" placeholder={title} value={title}/>
                    <span>-</span>
                    <input onChange={onMinuteChange} min={1} className='minutesInput' type="number" placeholder={totalTimeInMinutes}/>
                    <span>minutes</span>
                </div>
                <div className='buttons'>
                    <button onClick={onDelete}>Usuń</button>
                    <button onClick={onStart}>Zacznij</button>
                </div>
                <br></br>
            </div>
        )
    }

}

export default class ToDoList extends Component {

    constructor(props) {
        super(props);
        this.handleTitleEdit = this.handleTitleEdit.bind(this)
        this.handleMinuteEdit = this.handleMinuteEdit.bind(this)
    }

    state = {
        ToDoList: [
            {id: nextId(), title: 'Uczyć się na egzamin', totalTimeInMinutes: 30},
            {id: nextId(), title: 'Zrobić Couch Stretch', totalTimeInMinutes: 6},
            {id: nextId(), title: 'Potańczyć', totalTimeInMinutes: 15},
        ]
    }

    deleteItem = (key) => {
        const newToDoList = this.state.ToDoList.filter(item => item.id !== key)
        this.setState({ToDoList: newToDoList})
    }

    handleTaskAdding = (text, number) => {
        const newItem = {id: nextId(), title: text, totalTimeInMinutes: number}
        this.setState(prevState => ({
            ToDoList: [...prevState.ToDoList, newItem]
        }))
    }

    handleTitleEdit = (event, pickedItem) => {
        const updatedToDoList = this.state.ToDoList.map(item => {
            if (item.id === pickedItem.id) {
                return {
                    ...item,
                    title: event.target.value,
                    totalTimeInMinutes: item.totalTimeInMinutes
                };
            }
            return item;
        });

        this.setState({ToDoList: updatedToDoList});
    };

    handleMinuteEdit = (event, pickedItem) => {
        const updatedToDoList = this.state.ToDoList.map(item => {
            if (item.id === pickedItem.id) {
                return {
                    ...item,
                    title: item.title,
                    totalTimeInMinutes: event.target.value
                };
            }
            return item;
        });

        this.setState({ToDoList: updatedToDoList});
    };


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
                                key={item.id}
                                title={item.title}
                                totalTimeInMinutes={item.totalTimeInMinutes}
                                onStart={() => pickTask(item)}
                                onDelete={() => this.deleteItem(item.id)}
                                onTitleChange={event => this.handleTitleEdit(event, item)}
                                onMinuteChange={event => this.handleMinuteEdit(event, item)}
                            />
                        )
                    )}
                </div>
            </div>
        )
    }
}