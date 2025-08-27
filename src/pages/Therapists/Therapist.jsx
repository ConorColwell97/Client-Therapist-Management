import '../Styles.css';
import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from '../../Components/NavBar';
const Dashboard = lazy(() => import('../../Components/TherapistDashboard.jsx'));

const Therapist = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const [therapists, setTherapists] = useState([]);
    const [dash, setDash] = useState(false);
    const [therapistData, setTherapistData] = useState(null);
    const [name, setName] = useState("");

    const getAllTherapists = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/therapists`);
            setTherapists(response.data);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
        setDash(true);
    }

    const getTherapist = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/therapists/name/${encodeURIComponent(name)}`);
            setTherapistData(response.data);
            setName("");
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className='container'>
            {dash ? (
                <Suspense fallback={<p>Loading...</p>}>
                    <Dashboard data={therapists} name={"Therapists"} />
                    <button style={{ marginTop: "1rem" }} onClick={() => setDash(false)}>Go back</button>
                </Suspense>
            ) : (
                <>
                    <NavBar />
                    <div style={{ marginTop: "5%" }}>
                        <h2>View all currently registered Therapists</h2>
                        <button onClick={getAllTherapists}>View Therapists</button>

                        <h2 style={{ marginTop: "10%" }}>Search for a Therapist</h2>
                        <div className='find'>
                            <input
                                className='input'
                                type="text"
                                placeholder='Enter therapist name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button onClick={getTherapist}>Enter</button>
                            <button onClick={() => setName("")}>Cancel</button>
                        </div>
                    </div>
                </>

            )}
        </div >

    );
}

export default Therapist;