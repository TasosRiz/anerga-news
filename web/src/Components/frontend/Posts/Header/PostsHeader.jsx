import { Link } from "react-router-dom";
import "./PostsHeader.css";



const PostsHeader = () => {

    return (
        <section className="front-posts-header">
            <span className="front-posts-title">ServiceKit</span>
            <h1>Νέα και ενημερώσεις</h1>
            <p>
                Δείτε τις τελευταίες δημοσιεύσεις, δράσεις και ενημερώσεις
                που αφορούν την πόλη και τις δημοτικές υπηρεσίες.
            </p>

        </section>


    );
};

export default PostsHeader;