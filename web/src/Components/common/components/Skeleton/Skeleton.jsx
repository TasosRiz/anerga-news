import "./Skeleton.css";

const HomeSkeleton = () => {
    return (
        <div className="home-skeleton">
            <section className="skeleton-section">
                <div className="skeleton skeleton-title"></div>

                <div className="skeleton-cards">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className="skeleton-card" key={index}>
                            <div className="skeleton skeleton-image"></div>
                            <div className="skeleton skeleton-line large"></div>
                            <div className="skeleton skeleton-line"></div>
                            <div className="skeleton skeleton-line short"></div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="skeleton-section light">
                <div className="skeleton skeleton-title"></div>

                <div className="skeleton-cards">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div className="skeleton-card" key={index}>
                            <div className="skeleton skeleton-image small"></div>
                            <div className="skeleton skeleton-line large"></div>
                            <div className="skeleton skeleton-line"></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomeSkeleton;