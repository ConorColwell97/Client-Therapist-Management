import '../Styles.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';

const Therapist = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const [therapistData, setTherapistData] = useState(null);
    const [name, setName] = useState("");

    const search = async () => {
        sessionStorage.setItem("therapist", name);
        navigate("/TherapistDis");
    }

    return (
        <div className='container'>
            <NavBar />
            <div style={{ marginTop: "5%" }}>
                <h2>View all currently registered Therapists</h2>
                <button onClick={() => navigate("/TherapistDash")}>View Therapists</button>

                <h2 style={{ marginTop: "10%" }}>Search for a Therapist</h2>
                <div className='find'>
                    <input
                        className='input'
                        type="text"
                        placeholder='Enter therapist name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button onClick={search}>Enter</button>
                    <button onClick={() => setName("")}>Cancel</button>
                </div>
            </div>
        </div >
    );
}

export default Therapist;