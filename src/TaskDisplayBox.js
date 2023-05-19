import Clock from './Clock'
import {Component} from "react";
import './TaskDisplayBox.css'

export default class TaskDisplayBox extends Component {


    render() {
        const {
            isPaused,
            isRunning,
            pauseCount,
            elapsedTimeInSeconds,
            title,
            totalTimeInMinutes,
        } = this.props

        const {handleStart, handleStop, togglePause} = this.props

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
                    <div style={{width: progressPercent}} className='progress'></div>
                </div>
                <div className='control_buttons'>
                    <button disabled={isRunning} onClick={handleStart}>Start</button>
                    <button disabled={!isRunning && !isPaused} onClick={handleStop}>Stop
                    </button>
                    <button disabled={elapsedTimeInSeconds === 0}
                            onClick={togglePause}> {isRunning ? 'Pauzuj' : 'Wznów'}</button>
                </div>
                <h3 className='breaks_counter'>Liczba przerw: {pauseCount}</h3>
            </div>
        )
    }
}