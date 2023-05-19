import Clock from './Clock'
import {Component} from "react";
import './TaskDisplayBox.css'

export default class TaskDisplayBox extends Component {
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

        const {title, totalTimeInMinutes} = this.props

        const totalTimeInSeconds = totalTimeInMinutes * 60
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds
        const minutesLeft = Math.floor(timeLeftInSeconds / 60)
        const secondsLeft = Math.floor(timeLeftInSeconds % 60)
        const progressPercent = `${(elapsedTimeInSeconds / totalTimeInSeconds) * 100}%`


        return (
            <div className='TaskDisplayBox'>
                <h2>" {title} "</h2>
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