import '../Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from '../../Components/NavBar'; 

const Therapist = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const [therapists, setTherapists] = useState([]);
    const [therapistData, setTherapistData] = useState(null);
    const [name, setName] = useState("");

    const checkStorage = () => {
        if (sessionStorage.getItem("therapists")) {
            setTherapists(sessionStorage.getItem("therapists"));
        } else {
            getAllTherapists();
        }
        navigate("/DisplayTherapists");
    }

    const getAllTherapists = async () => {
        try {
            setError("");
            const response = await axios.get(`${VITE_URL}/therapists`);
            setTherapists(response.data);
            sessionStorage.setItem("therapists", therapists);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
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
        navigate("/EditTherapist");
    }

    return (
        <div className='container'>
            <NavBar />
            <div style={{ marginTop: "5%" }}>
                <h2>View all currently registered Therapists</h2>
                <button onClick={checkStorage}>View Therapists</button>

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

        </div>

    );
}

const EditTherapist = () => {
    const [data, setData] = useState(null);
    setData(sessionStorage.getItem("therapist"));

    return (
        <>
            {therapists.map((therapist, index) => {
                <div key={index} style={{ paddingBottom: "10px" }}>
                    <p>{therapist.Name}</p>
                    <p>{therapist.Title}</p>
                    <p>{therapist.Email}</p>
                    <p>{therapist.Location}</p>
                    <p>{therapist.YearsOfPractice}</p>
                    <p>{therapist.Availability}</p>
                </div>
            })}
        </>
    );
}

const DisplayTherapists = () => {
    return (
        <div>
            <p>{therapistData.Name}</p>
            <p>{therapistData.Name}</p>
            <p>{therapistData.Title}</p>
            <p>{therapistData.Email}</p>
            <p>{therapistData.Location}</p>
            <p>{therapistData.YearsOfPractice}</p>
            <p>{therapistData.Availability}</p>
        </div>
    );
}

export { Therapist, EditTherapist, DisplayTherapists };