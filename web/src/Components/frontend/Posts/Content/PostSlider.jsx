import { Link } from "react-router-dom";

import Slider from "../../../common/components/Slider/Slider";
import PostImage from "../../../common/Posts/Image/PostImage";
import { formatDate } from "../../../common/components/Utils/formatDate";

import "./PostSlider.css";

const PostSlider = ({ posts = [], title = "Δημοσιεύσεις" }) => {
    if (!posts.length) {
        return null;
    }

    return (
        <section className="post-slider-section box">
            <div className="post-slider-header">
                <div>
                    <span className="post-slider-label">
                        Νέα
                    </span>

                    <h2>{title}</h2>
                </div>
            </div>

            <Slider direction="horizontal">
                {posts.map((post) => {
                    const postDate =
                        post.published_at || post.created_at || "";

                    return (
                        <article
                            className="post-slider-card"
                            key={post.id}
                        >
                            <div className="post-slider-card-top">
                                <span className="post-category-badge">
                                    {post.category?.name || "Χωρίς κατηγορία"}
                                </span>

                                <time
                                    className="post-slider-date"
                                    dateTime={postDate}
                                >
                                    {formatDate(postDate)}
                                </time>
                            </div>

                            <PostImage
                                photo={post.photo}
                                alt={post.title || "Εικόνα δημοσίευσης"}
                                variant="card"
                                showPlaceholder
                            />

                            <div className="post-slider-content">
                                <h3 className="text-no-overflow">
                                    {post.title || "Χωρίς τίτλο"}
                                </h3>

                                <p className="text-no-overflow">
                                    {post.body || "Δεν υπάρχει διαθέσιμη περιγραφή."}
                                </p>

                                <Link
                                    to={`/posts/${post.id}`}
                                    className="post-slider-link"
                                >
                                    Διαβάστε περισσότερα
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </Slider>
        </section>
    );
};

export default PostSlider;