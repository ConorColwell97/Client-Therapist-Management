import '../Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import axios from 'axios';

const Session = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [add, setAdd] = useState(false);

    const [newName, setNewName] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newYears, setNewYears] = useState("");
    const [newAvail, setNewAvail] = useState("NOT TAKING CLIENTS");
    const [checked, setChecked] = useState(false);

    const disabled = (newName === "" || newTitle === "" || newEmail === "" || newLocation === "" || newYears === "");

    const search = async () => {
        sessionStorage.setItem("session", name);
        navigate("/SessionDis");
    }

    const addTherapist = async () => {
        let response;

        try {
            response = await axios.post(`${VITE_URL}/therapists`, {
                Name: newName,
                Title: newTitle,
                Email: newEmail,
                Location: newLocation,
                YearsOfPractice: newYears,
                Availability: newAvail
            });
            setMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    useEffect(() => {
        if (message) {
            alert(message);
            setAdd(false);
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    useEffect(() => {
        if (checked) {
            setNewAvail("TAKING CLIENTS");
        } else {
            setNewAvail("NOT TAKING CLIENTS");
        }
    }, [checked]);

    return (
        <div className='container'>
            <NavBar />
            {add ? (
                <>
                    <h2>Enter details</h2>
                    <div className='enter'>
                        <label style={{ fontWeight: "bold" }}>
                            Therapist Name:
                            <input
                                type="text"
                                placeholder='Enter name'
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Therapist Title:
                            <input
                                type="text"
                                placeholder='Enter title'
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Therapist Email:
                            <input
                                type="text"
                                placeholder='Enter email'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Therapist Location:
                            <input
                                type="text"
                                placeholder='Enter location'
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Therapist Experience:
                            <input
                                type="text"
                                placeholder='Enter YOE'
                                value={newYears}
                                onChange={(e) => setNewYears(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Therapist Availability:
                            <input
                                type="checkbox"
                                onChange={() => setChecked(!checked)}
                            />
                            Tick box for yes
                        </label>
                        <button style={{ backgroundColor: "#1F51FF", width: "10rem", margin: "0 auto" }} disabled={disabled} onClick={addTherapist}>Finish</button>
                        <button style={{ backgroundColor: "#1F51FF", width: "10rem", margin: "0 auto" }} onClick={() => setAdd(false)}>Cancel</button>
                    </div>
                </>

            ) : (
                <div className='menu'>
                    <div>
                        <h2>View all currently registered Therapists</h2>
                        <button onClick={() => navigate("/SessionDash")}>View Therapists</button>
                    </div>

                    <div>
                        <h2>Search for a Therapist</h2>
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

                    <div>
                        <h2 style={{ marginTop: "10%" }}>Add a Therapist</h2>
                        <button onClick={() => setAdd(true)}>Add Therapist</button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Session;