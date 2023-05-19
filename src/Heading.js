import Logo from "./tomato.png";
import './Heading.css'

export default function Heading() {
    return (
        <div className='Heading'>
            <div className='AppLogo'>
                <img className='logo' src={Logo} alt=""/>
                <h2>Pomodoro App</h2>
            </div>
            <a className='sources' href="https://www.flaticon.com/free-icons/tomato" title="tomato icons">Tomato icons
                created by justicon -
                Flaticon</a>
        </div>
    )
}