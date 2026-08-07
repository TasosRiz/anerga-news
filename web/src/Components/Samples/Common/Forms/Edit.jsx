import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../../common/http";

const Edit = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await fetch(`${apiUrl}/categories/${id}`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error("Error loading item.");
                }

                const data = await res.json();
                const item = data.data ?? data;

                setName(item.name || "");
                setStatus(String(item.status ?? ""));
            } catch (err) {
                setError(err.message);
            }
        };

        if (token) {
            fetchItem();
        }
    }, [id, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${apiUrl}/categories/${id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name,
                    status,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to save changes.");
            }

            navigate("/admin/dashboard/categories");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Edit Item</h2>

                <Link to="/admin/dashboard/categories" className="back-button">
                    Back
                </Link>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <div className="form-body">
                <div className="form-content">
                    <form onSubmit={handleSubmit} className="form-card">
                        {error && <p className="error">{error}</p>}

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="1">Active</option>
                                <option value="0">Blocked</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button className="btn primary" disabled={loading}>
                                {loading ? "Saving..." : "Update"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit;