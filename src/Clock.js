import './Clock.css'
export default function Clock({minutes, seconds}) {
    return (
        <div className='Clock'>
            {minutes <= 0 ? '0' : minutes}:{seconds < 1 ? '0' : seconds}
        </div>
    )
}

