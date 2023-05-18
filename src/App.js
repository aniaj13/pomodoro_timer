import './App.css';
import {Component} from "react";
import Logo from './tomato.png'
function Clock({minutes, seconds}) {
    return (
        <div className='Clock'>
            {minutes}:{seconds}
        </div>
    )
}

class TaskDisplayBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pauseCount: 0,
            elapsedTimeInSeconds: 0,
            isActive: this.props,
        }
    }

    startTimer = () => {
        clearInterval(this.intervalId)
        this.intervalId = window.setInterval(() => {
            this.setState((prevState) => ({
                elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
            }))
        }, 100)
    }

    // Todo : disable wznów button if timer not started

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
        const {
            isPaused,
            isRunning,
            pauseCount,
            elapsedTimeInSeconds,
        } = this.state

        const {title, totalTimeInMinutes, isActive} = this.props

        const totalTimeInSeconds = totalTimeInMinutes * 60
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds
        const minutesLeft = Math.floor(timeLeftInSeconds / 60)
        const secondsLeft = Math.floor(timeLeftInSeconds % 60)
        const progressPercent = `${(elapsedTimeInSeconds / totalTimeInSeconds) * 100}%`


        return (
            <div className={`TaskDisplayBox ${isActive ? '' : 'inactive'}`}>
                <h2 className='task_name'>" {title} "</h2>
                <Clock minutes={minutesLeft} seconds={secondsLeft}/>
                <div className={`ProgressBar ${isPaused ? 'inactive' : ''}`}>
                    <div style={{
                        width: progressPercent
                    }} className='progress'></div>
                </div>
                <div className='control_buttons'>
                    <button disabled={isRunning} onClick={this.handleStart}>Start</button>
                    <button disabled={!isRunning && !isPaused} onClick={this.handleStop}>Stop
                    </button>
                    <button onClick={this.togglePause}> {isRunning ? 'Pauzuj' : 'Wznów'}</button>
                </div>
                <h3 className='breaks_counter'>Liczba przerw: {pauseCount}</h3>
            </div>
        )
    }
}

class EditableTimeBox extends Component {
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
            </>
        )
    }
}

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

class ToDoList extends Component {
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
                            <ToDoItem title={title} totalTimeInMinutes={totalTimeInMinutes}/>
                        )
                    )}
                </div>
            </div>
        )
    }
}

function Heading() {
    return (
        <div className='Heading'>
            <img className='logo' src={Logo} alt=""/>
            <h2>Pomodoro App</h2>
            <a href="https://www.flaticon.com/free-icons/tomato" title="tomato icons">Tomato icons created by justicon -
                Flaticon</a>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <Heading/>
            <EditableTimeBox/>
            <ToDoList/>
        </div>
    );
}

export default App;
