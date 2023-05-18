import './App.css';
import {Component} from "react";

function Clock({minutes, seconds}) {
    return (
        <div>
            Pozostało {minutes}:{seconds}
        </div>
    )
}

class TaskEditor extends Component {

    render() {
        const {onTitleChange, onTimeChange} = this.props
        return (
            <div className='TaskEditor'>
                <label> Co chcesz robić?<input onChange={onTitleChange} type="text"/></label>
                <label> Przez ile minut?<input onChange={onTimeChange} type="number"/></label>
                <button>Zatwierdź zmiany</button>
            </div>
        )
    }
}

class TaskDisplayBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pauseCount: 0,
            elapsedTimeInSeconds: 0,
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

        const { title, totalTimeInMinutes } = this.props

        const totalTimeInSeconds = totalTimeInMinutes * 60
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds
        const minutesLeft = Math.floor(timeLeftInSeconds / 60)
        const secondsLeft = Math.floor(timeLeftInSeconds % 60)
        const progressPercent = `${(elapsedTimeInSeconds/totalTimeInSeconds) * 100}%`



        return (
            <div className='TaskDisplayBox'>
                <h2 className='task_name'>{title}</h2>
                <Clock minutes={minutesLeft} seconds={secondsLeft}/>
                <div className={`ProgressBar ${isPaused ? 'inactive' : ''}`}>
                    <div style={{
                        width: progressPercent}} className='progress'></div>
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
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleTimeChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value})
    }

    render() {
        const {title, totalTimeInMinutes } = this.state

        return (
            <>
                <TaskEditor onTitleChange={this.handleTitleChange} onTimeChange={this.handleTimeChange}/>
                <TaskDisplayBox title={title} totalTimeInMinutes={totalTimeInMinutes}/>
            </>
        )
    }
}

function App() {
    return (
        <div className="App">
            <EditableTimeBox/>
        </div>
    );
}

export default App;
