import './Styles.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return(
        <div className='container'>
            <h1 className='header'>Therapy Client Management</h1>
            <h1 className='header'>Home Page</h1>
            <h1 className='header' id='selectPage'>Select Page</h1>

            <nav id='homeNavbar'>
                <button className='homeButtons' id='leftButton' onClick={() => navigate("/Therapist")}>Therapists</button>
                <button className='homeButtons' id='middleButton' onClick={() => navigate("/Client")}>Clients</button>
                <button className='homeButtons' id='rightButton' onClick={() => navigate("/Session")}>Sessions</button>
            </nav>
        </div>
    );
}
export default Home;