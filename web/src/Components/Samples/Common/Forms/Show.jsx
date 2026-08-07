import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/http";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";
import "./ShowForm.css";

const Show = () => {
    const [categories, setCategories] = useState([]);
    const [loader, setLoader] = useState(false);

    const fetchCategories = async () => {
        try {
            setLoader(true);

            const res = await fetch(`${apiUrl}/categories`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token || adminToken()}`
                }
            });

            const result = await res.json();
            console.log(result);

            setCategories(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            const res = await fetch(`${apiUrl}/categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${adminToken()}`,
                },
            });

            const result = await res.json();

            if (result.status === 200) {
                const newCategories = categories.filter((category) => category.id !== id);
                setCategories(newCategories);
            } else {
                console.log("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">Categories</h2>
                <Link to="/admin/categories/create" className="primary-button">
                    Create
                </Link>
            </div>

            <div className="page-layout">
                <section className="content-card">
                    <div className="card-body">
                        {loader && <Loader />}

                        {!loader && categories.length === 0 && (
                            <Nostate text="Categories Not Found" />
                        )}

                        {!loader && categories.length > 0 && (
                            <div className="table-wrapper">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th width="60">ID</th>
                                            <th>Name</th>
                                            <th width="120">Status</th>
                                            <th width="140">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>
                                                    {category.status === 1 ? (
                                                        <span className="status-badge status-active">
                                                            Active
                                                        </span>
                                                    ) : (
                                                        <span className="status-badge status-blocked">
                                                            Block
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="action-group">
                                                        <Link
                                                            to={`/admin/categories/edit/${category.id}`}
                                                            className="action-link action-edit"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="action-link action-delete"
                                                            onClick={() => deleteCategory(category.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Show;