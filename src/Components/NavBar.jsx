import '../pages/Styles.css';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className='navBar'>
            <button className='navButtons' onClick={() => navigate("/")}>Home</button>
            <button className='navButtons' onClick={() => navigate("/Therapist")}>Therapists</button>
            <button className='navButtons' onClick={() => navigate("/Client")}>Clients</button>
            <button className='navButtons' onClick={() => navigate("/Session")}>Sessions</button>
        </nav>
    );
}

export default NavBar;