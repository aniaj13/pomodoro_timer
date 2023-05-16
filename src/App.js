import './App.css';
import {useEffect, useState} from "react";

function Clock({minutes, seconds}) {

    return (
        <div className='Clock'>
            Pozostało: {minutes}:{seconds}
        </div>
    )
}

function TaskDisplayBox() {

    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [pauseCount, setPauseCount] = useState(0)
    const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0)

    const totalTimeInSeconds = 600
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds
    const minutesLeft = Math.floor(timeLeftInSeconds / 60)
    const secondsLeft = Math.floor(timeLeftInSeconds % 60)
    const [progressPercent, setProgressPercent] = useState(0)

    useEffect(() => {
        if (isRunning) {
            const timeInterval = setInterval(() => {
                setElapsedTimeInSeconds(elapsedTimeInSeconds + 0.1)
                setProgressPercent((elapsedTimeInSeconds / totalTimeInSeconds) * 100)
            }, 100);
            return () => {
                clearInterval(timeInterval)
            }
        }
    }, [isRunning, elapsedTimeInSeconds, totalTimeInSeconds,])


    function handleStart() {
        setIsRunning(true)
        setIsPaused(false)
    }


    function handleStop() {
        setIsRunning(false)
        setPauseCount(0)
        setElapsedTimeInSeconds(0)
    }

    function togglePause() {
        if (!isPaused) {
            setPauseCount(pauseCount + 1)
        }
        setIsPaused(!isPaused)
        setIsRunning(!isRunning)
    }

    return (
        <div className='TaskDisplayBox'>
            <h2 className='task_name'>Uczę się Reacta</h2>
            <Clock minutes={minutesLeft} seconds={secondsLeft}/>
            <div className={`ProgressBar ${isRunning ? '' : 'inactive'}`}>
                <div className='progress' style={{width: `${progressPercent}%`}}></div>
            </div>
            <div className='control_buttons'>
                <button disabled={isRunning} onClick={handleStart}>Start</button>
                <button disabled={!isRunning && !isPaused} onClick={handleStop}>Stop
                </button>
                <button onClick={togglePause}> {isRunning ? 'Pauzuj' : 'Wznów'}</button>
            </div>
            <h3 className='breaks_counter'>Liczba przerw: {pauseCount}</h3>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <TaskDisplayBox/>
        </div>
    );
}

export default App;

// import React from "react";
// import './App.css'
//
//
// function Heading() {
//     return (
//         <h1>Pomodoro Clock</h1>
//     )
// }
//
// function TimeBoxEditor() {
//     return (
//         <div className='TimeBoxEditor'>
//             <label>Co robisz?<input id='task_name_input' type="text" value=''/></label>
//             <label>Ile minut? <input id='task_time_input' type="number"/></label>
//             <button>Rozpocznij</button>
//         </div>
//     )
// }
//
// class TimeBox extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isRunning: true,
//             isPaused: false,
//             pausesCount: 0,
//
//         }
//     }
//
//     handleStart() {
//         this.setState({
//             isRunning: true,
//             isPaused: false,
//         })
//     }
//
//     handlePause() {
//         this.setState({
//             isRunning: false,
//             isPaused: true
//         })
//     }
//
//
//     render() {
//         return (
//             <div className='TimeBox'>
//                 <h2 className='task_name'>Uczę się Reacta</h2>
//                 <h3 className='time_left'>Pozostało: ....</h3>
//                 <div className='ProgressBar'>
//                     <div className='progress'></div>
//                 </div>
//                 <div className='control_buttons'>
//                     <button onClick={this.handleStart}>Start</button>
//                     <button onClick={this.handleStop}>Stop</button>
//                     <button onClick={this.handlePause}>{this.isRunning ? 'Pauzuj' : 'Wznów'}</button>
//                 </div>
//                 <h3 className='breaks_counter'>Liczba przerw:</h3>
//             </div>
//         )
//     }
//
// }
//
// export default function App() {
//     return (
//         <div className='App'>
//             <Heading/>
//             <TimeBoxEditor/>
//             <TimeBox/>
//         </div>
//     )
// }