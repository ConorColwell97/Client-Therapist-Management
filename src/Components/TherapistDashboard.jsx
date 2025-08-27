import { animate, motion } from 'framer-motion';
import '../pages/Styles.css';

const Dashboard = ({data, name}) => {
    return (
        <motion.div className='dashboard' initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 0.5}}>
            <h2>{name}</h2>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <div className='display' key={index}>
                        <p>{item.Name}</p>
                        <p>{item.Title}</p>
                        {/* <p>{item.Email}</p>
                        <p>{item.Location}</p>
                        <p>{item.YearsOfPractice}</p> */}
                        <p>{item.Availability}</p>
                    </div>
                ))
            ) : (
                <h2>No data available</h2>
            )}
        </motion.div>
    );
}

export default Dashboard;