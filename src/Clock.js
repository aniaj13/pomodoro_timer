import './Clock.css'
export default function Clock({minutes, seconds}) {
    return (
        <div className='Clock'>
            {minutes}:{seconds}
        </div>
    )
}

