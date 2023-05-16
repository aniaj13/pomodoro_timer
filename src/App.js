import './App.css';
import {Component} from "react";

function Clock({minutes, seconds}) {
    return(
        <div>
            Pozostało {minutes}:{seconds}
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
        }
    }

    startTimer = () => {
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

        const totalTimeInSeconds = 600
        const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds
        const minutesLeft = Math.floor(timeLeftInSeconds / 60)
        const secondsLeft = Math.floor(timeLeftInSeconds % 60)
        return (
            <div className='TaskDisplayBox'>
                <h2 className='task_name'>Uczę się Reacta</h2>
                <Clock minutes={minutesLeft} seconds={secondsLeft}/>
                <div className={`ProgressBar ${isPaused ? 'inactive' : ''}`}>
                    <div className='progress'></div>
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