import '../pages/Styles.css';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className='navBar'>
            <button className='navButtons' onClick={() => navigate("/Therapist")}>Therapist</button>
            <button className='navButtons' onClick={() => navigate("/Client")}>Client</button>
            <button className='navButtons' onClick={() => navigate("/Session")}>Session</button>
        </nav>
    );
}

export default NavBar;