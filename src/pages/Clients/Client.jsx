import '../Styles.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../../Components/NavBar';
import axios from 'axios';

const Client = () => {
    const navigate = useNavigate();
    const VITE_URL = import.meta.env.VITE_API_URL;
    const [message, setMessage] = useState(null);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [add, setAdd] = useState(false);

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newReg, setNewReg] = useState("");

    const disabled = (newName === "" || newEmail === "" || newLocation === "" || newNumber === "" || newReg === "");

    const search = async () => {
        sessionStorage.setItem("client", name);
        navigate("/ClientDis");
    }

    const addClient = async () => {
        let response;

        try {
            response = await axios.post(`${VITE_URL}/clients`, {
                Name: newName,
                Email: newEmail,
                Location: newLocation,
                PhoneNumber: newNumber,
                Regularity: newReg
            });
            setMessage(response.data.message);

        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
        }

        setNewName("");
        setNewEmail("");
        setNewLocation("");
        setNewNumber("");
        setNewReg("");
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

    return (
        <div className='container'>
            <NavBar />
            {add ? (
                <>
                    <h2>Enter details</h2>
                    <div className='enter'>
                        <label style={{ fontWeight: "bold" }}>
                            Client Name:
                            <input
                                type="text"
                                placeholder='Enter name'
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Client Email:
                            <input
                                type="text"
                                placeholder='Enter email'
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Client Location:
                            <input
                                type="text"
                                placeholder='Enter location'
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Client Phone number:
                            <input
                                type="text"
                                placeholder='Enter phone number'
                                value={newNumber}
                                onChange={(e) => setNewNumber(e.target.value)}
                            />
                        </label>

                        <label style={{ fontWeight: "bold" }}>
                            Regularity of Sessions:
                            <input
                                type="radio"
                                value="weekly"
                                checked={newReg === "weekly"}
                                onChange={(e) => setNewReg(e.target.value)}
                            />
                            Weekly
                            <input
                                type="radio"
                                value="monthly"
                                checked={newReg === "monthly"}
                                onChange={(e) => setNewReg(e.target.value)}
                            />
                            Monthly
                        </label>

                        <button style={{ backgroundColor: "#1F51FF", width: "10em", margin: "0 auto" }} disabled={disabled} onClick={addClient}>Finish</button>
                        <button style={{ backgroundColor: "#1F51FF", width: "10em", margin: "0 auto" }} onClick={() => setAdd(false)}>Cancel</button>
                    </div>
                </>

            ) : (
                <div className='menu'>
                    <div>
                        <h2>View all currently registered Clients</h2>
                        <button onClick={() => navigate("/ClientDash")}>View Clients</button>
                    </div>

                    <div>
                        <h2>Search for a Client</h2>
                        <div className='find'>
                            <input
                                className='input'
                                type="text"
                                placeholder='Enter client name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <button onClick={search}>Enter</button>
                            <button onClick={() => setName("")}>Cancel</button>
                        </div>
                    </div>

                    <div>
                        <h2 style={{ marginTop: "10%" }}>Add a Client</h2>
                        <button onClick={() => setAdd(true)}>Add Client</button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Client;