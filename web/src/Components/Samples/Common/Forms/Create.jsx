import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";

const Create = ({ token }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const saveItem = async (data) => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${apiUrl}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${token || adminToken()}`,
                },
                body: JSON.stringify({
                    name: data.name,
                    status: data.status,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Item created successfully!");
                navigate("/admin/dashboard/categories");
            } else {
                setError(result.message || "Something went wrong");
                toast.error(result.message || "Something went wrong");
            }
        } catch (err) {
            setError("Network error");
            toast.error("Network error");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header">
                <h2>Create Item</h2>
                <Link to="/admin/dashboard/categories" className="back-button">
                    Back
                </Link>
            </div>

            {error && <p className="error-msg">{error}</p>}

            <div className="form-body">
                <div className="form-content">
                    <form onSubmit={handleSubmit(saveItem)} className="form-card">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Status</label>
                            <select
                                {...register("status", {
                                    required: "Status is required",
                                })}
                            >
                                <option value="">Select status</option>
                                <option value="1">Active</option>
                                <option value="0">Blocked</option>
                            </select>
                            {errors.status && <p className="error">{errors.status.message}</p>}
                        </div>

                        <div className="form-actions">
                            <button className="btn primary" disabled={loading}>
                                {loading ? "Saving..." : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Create;