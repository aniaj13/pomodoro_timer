import './App.css';
import {Component} from "react";

class TaskDisplayBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pauseCount: 0,
        }
    }

    handleStart = () => {
        this.setState({
            isRunning: true,
            isPaused: false,
        })
    }

    handlePause = () => {
        this.setState({
            isRunning: false,
            isPaused: true,
            pauseCount: this.state.pauseCount + 1
        })
    }

    handleStop = () => {
        this.setState({
            isRunning: false,
            isPaused: false,
            pauseCount: 0,
        })
    }

    render() {
        return (
            <div className='TaskDisplayBox'>
                <h2 className='task_name'>Uczę się Reacta</h2>
                <h3 className='time_left'>Pozostało: ....</h3>
                <div className={`ProgressBar ${this.state.isPaused ? 'inactive' : ''}`}>
                    <div className='progress'></div>
                </div>
                <div className='control_buttons'>
                    <button disabled={this.state.isRunning} onClick={this.handleStart}>Start</button>
                    <button disabled={!this.state.isRunning && !this.state.isPaused} onClick={this.handleStop}>Stop</button>
                    <button disabled={!this.state.isRunning} onClick={this.handlePause}>{this.state.isRunning ? 'Pauzuj' : 'Wznów'}</button>
                </div>
                <h3 className='breaks_counter'>Liczba przerw: {this.state.pauseCount}</h3>
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