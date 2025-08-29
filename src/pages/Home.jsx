import './Styles.css';
import NavBar from '../Components/NavBar';

const Home = () => {
    return (
        <div className='container'>
            <div style={{ minWidth: "50%" }}>
                <h1 className='header' style={{ marginBottom: "5em" }}>Therapy Client Management</h1>
                <h1 className='header' style={{ fontSize: "2em" }} id='selectPage'>Select Page</h1>
                <NavBar />
            </div>

        </div>
    );
}
export default Home;