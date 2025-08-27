import { animate, motion } from 'framer-motion';
import '../pages/Styles.css';

const SessionDashboard = ({ data, name }) => {
    return (
        <div>
            <h2>{name}</h2>
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <motion.div key={index} initial={{opacity: 0}} animate={{opacity:1}} transition={{duration: 0.5}}>
                        <p>{item.Name}</p>
                        <p>{item.Title}</p>
                        {/* <p>{item.Email}</p>
                        <p>{item.Location}</p>
                        <p>{item.YearsOfPractice}</p> */}
                        <p>{item.Availability}</p>
                    </motion.div>
                ))
            ) : (
                <h2>No data available</h2>
            )}
        </div>
    );
}