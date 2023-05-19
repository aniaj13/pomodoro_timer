import {Component} from "react";
import TaskDisplayBox from "./TaskDisplayBox";
import './Timebox.css'
import ToDoList from "./ToDoList";

export default class TimeBox extends Component {
    state = {
        title: 'Uczę się Reacta',
        totalTimeInMinutes: 25,
        isRunning: false,
        isPaused: false,
        pauseCount: 0,
        elapsedTimeInSeconds: 0,
    }

    pickTask = (item) => {
        this.setState({
            title: item.title,
            totalTimeInMinutes: item.totalTimeInMinutes,
        })
        this.handleStop()
    }

    startTimer = () => {
        clearInterval(this.intervalId)
        this.intervalId = window.setInterval(() => {
            this.setState((prevState) => ({
                elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
            }))
        }, 100)
    }

    handleStart = () => {
        this.setState({
            isRunning: true,
            isPaused: false,
        })
        this.startTimer();
    }

    togglePause = () => {
        this.setState(
            function (prevState) {
                const isPaused = this.state.isPaused
                isPaused ? this.startTimer() : this.stopTimer()
                return {
                    isPaused: !isPaused,
                    pauseCount: isPaused ? prevState.pauseCount : prevState.pauseCount + 1,
                    isRunning: isPaused
                }
            }
        )
    }

    stopTimer = () => {
        window.clearInterval(this.intervalId)
    }
    handleStop = () => {
        this.setState({
            isRunning: false,
            isPaused: false,
            pauseCount: 0,
            elapsedTimeInSeconds: 0
        })
        this.stopTimer();
    }


    render() {

        return (
            <>
                <TaskDisplayBox {...this.state} handleStop={this.handleStop} handleStart={this.handleStart}
                                togglePause={this.togglePause}/>
                <ToDoList pickTask={this.pickTask}/>
            </>
        )
    }
}