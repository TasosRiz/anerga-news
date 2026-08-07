import React, { useEffect, useState } from 'react';
import './ContentSample.css';
import { apiUrl, baseUrl } from '../../../common/http';

const ContentSample = () => {
    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSection = async () => {
        try {
            const res = await fetch(`${apiUrl}/audience-section`);
            const result = await res.json();

            if (result.status === 200) {
                setSection(result.data);
            }
        } catch (error) {
            console.log('Content sample fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSection();
    }, []);

    if (loading) {
        return <div className="content-sample-loading">Loading...</div>;
    }

    if (!section) {
        return <div className="content-sample-loading">No section found.</div>;
    }

    const cards = [
        {
            id: 1,
            title: section.card_1_title,
            text: section.card_1_text,
            image: section.card_1_image,
        },
        {
            id: 2,
            title: section.card_2_title,
            text: section.card_2_text,
            image: section.card_2_image,
        },
        {
            id: 3,
            title: section.card_3_title,
            text: section.card_3_text,
            image: section.card_3_image,
        },
    ];

    return (
        <section className="content-sample-container">
            <h2>{section.section_title}</h2>

            <div className="content-sample-box">
                {cards.map((item) => (
                    <div className="content-sample-card" key={item.id}>
                        <div className="card-photo">
                            {item.image ? (
                                <img
                                    src={`${baseUrl}/${item.image}`}
                                    alt={item.title || 'Content image'}
                                    className="content-sample-image"
                                />
                            ) : (
                                <div className="content-sample-image-placeholder">No Image</div>
                            )}
                        </div>

                        <div className="card-title">
                            <h3>{item.title || 'No title'}</h3>
                        </div>

                        <div className="card-text">
                            <p>{item.text || 'No text available'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContentSample;