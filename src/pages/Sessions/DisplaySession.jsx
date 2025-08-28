import { useEffect, useState } from "react";
import axios from "axios";
import { animate, motion } from 'framer-motion';
import NavBar from "../../Components/NavBar";

const DisplaySession = () => {
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [session, setSession] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [newData, setNewData] = useState(null);

    const getTherapist = async () => {
        const name = sessionStorage.getItem("session");
        let response;

        try {
            response = await axios.get(`${VITE_URL}/therapists/name/${encodeURIComponent(name)}`);
            setSession(response.data);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

    }

    const update = async (data, type) => {
        let response;

        try {
            response = await axios.patch(`${VITE_URL}/therapists/${type}/${encodeURIComponent(therapist.Name)}`, { data }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            checkType(data, type);
            setNewData(data);
            sessionStorage.setItem("session", data);
            setMessage(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }
    }

    const checkType = (data, type) => {
        switch (type) {
            case 'name':
                therapist.Name = data;
                break;
            case 'title':
                therapist.Title = data;
                break;
            case 'email':
                therapist.Email = data;
                break;
            case 'location':
                therapist.Location = data;
                break;
            case 'years':
                therapist.YearsOfPractice = data;
                break
            case 'avail':
                therapist.Availability = data;
                break;
            default: return;
        }
    }

    useEffect(() => {
        if (message) {
            alert(`${message} to ${newData}`);
            setMessage("");
        }
    }, [message]);

    useEffect(() => {
        if (error) {
            alert(error);
            setError("");
        }
    }, [error]);

    useEffect(() => {
        getTherapist();
    }, []);

    return (
        <div className="container">
            <NavBar />
            <h1>Therapist Details</h1>
            <div>
                <motion.div className="displayContainer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    {therapist !== null ? (
                        <>
                            <div className="inner">
                                <p>Name: Dr.{therapist.Name}</p>
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newName = prompt("Enter new name");
                                    if (newName !== null && newName.trim() !== "") {
                                        update(newName, 'name');
                                    }
                                }}>Change Name</button>
                            </div>

                            <div className="inner top">
                                <p>Title: {therapist.Title}</p>
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newTitle = prompt("Enter new title");
                                    if (newTitle !== null && newTitle.trim() !== "") {
                                        update(newTitle, 'title');
                                    }
                                }}>Change Title</button>
                            </div>

                            <div className="inner top">
                                <p>Email: {therapist.Email}</p>
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newEmail = prompt("Enter new email");
                                    if (newEmail !== null && newEmail.trim() !== "") {
                                        update(newEmail, 'email');
                                    }
                                }}>Change Email</button>
                            </div>

                            <div className="inner top">
                                <p>Location: {therapist.Location}</p>
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newLocation = prompt("Enter new location");
                                    if (newLocation !== null && newLocation.trim() !== "") {
                                        update(newLocation, 'location');
                                    }
                                }}>Change Location</button>
                            </div>

                            <div className="inner top">
                                <p>Experience: {therapist.YearsOfPractice} year(s)</p>
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newYears = prompt("Enter new years of experience");
                                    if (newYears >= 0 && !isNaN(newYears)) {
                                        update(newYears, 'years');
                                    }
                                }}>Update Experience</button>
                            </div>

                            <div className="inner top">
                                {therapist.Availability == 'TAKING CLIENTS' ? (
                                    <p>Taking clients: YES</p>
                                ) : (
                                    <p>Taking clients: NO</p>
                                )}
                                <button style={{ backgroundColor: "#13141F" }} onClick={() => {
                                    const newAvail = (therapist.Availability === 'TAKING CLIENTS') ? 'NOT TAKING CLIENTS' : 'TAKING CLIENTS';
                                    alert("Change Therapist Availability?");
                                    if (newAvail === 'TAKING CLIENTS' || newAvail === 'NOT TAKING CLIENTS') {
                                        update(newAvail, 'avail');
                                    }
                                }}>Change Availability</button>
                            </div>
                        </>
                    ) : (
                        <h2>Not found</h2>
                    )}
                </motion.div>
            </div>
        </div>
    );
}

export default DisplaySession;