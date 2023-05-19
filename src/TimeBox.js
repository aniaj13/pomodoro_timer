import {Component} from "react";
import TaskDisplayBox from "./TaskDisplayBox";
import './Timebox.css'
import ToDoList from "./ToDoList";

export default class TimeBox extends Component {
    state = {
        title: 'Uczę się Reacta',
        totalTimeInMinutes: 1,
        isEditorActive: true,
        isTaskActive: true,
    }

    confirmChanges = () => {
        this.setState({isEditorActive: false})
        this.setState({isTaskActive: true})
    }


    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleTimeChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value})
    }

    handleEdit = () => {
        this.setState({isEditorActive: true})
        this.setState({isTaskActive: false})
    }

    render() {
        const {title, totalTimeInMinutes, isTaskActive} = this.state

        return (
            <>
                <TaskDisplayBox isActive={isTaskActive} onEdit={this.handleEdit} title={title}
                                totalTimeInMinutes={totalTimeInMinutes}/>
                <ToDoList/>
            </>
        )
    }
}