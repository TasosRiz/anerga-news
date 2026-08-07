import UserProfile from "../../../../common/Users/UserProfile/UserProfile";
import "./PersonalInfo.css";

const PersonalInfo = ({ token, user }) => {
    return (
        <div className="personal-container">
            <div className="personal-left-side">
                <UserProfile
                    user={user}
                />
            </div>

            <div className="personal-right-side">
                <form className="personal-form">
                    <div className="form-section-title">
                        <h3>Personal Information</h3>
                        <p>Update your personal details and contact information.</p>
                    </div>

                    <div className="account-row">
                        <div className="account-item">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="account-item">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Email"
                            />
                        </div>
                    </div>

                    <div className="account-item">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter Address"
                        />
                    </div>

                    <div className="account-row">
                        <div className="account-item">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                placeholder="Enter Mobile"
                            />
                        </div>

                        <div className="account-item">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                placeholder="City"
                            />
                        </div>
                    </div>

                    <div className="account-row">
                        <div className="account-item">
                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                placeholder="State"
                            />
                        </div>

                        <div className="account-item">
                            <label htmlFor="zip">Zip</label>
                            <input
                                type="text"
                                id="zip"
                                placeholder="Zip"
                            />
                        </div>
                    </div>

                    <div className="personal-actions">
                        <button type="button" className="cancel-btn">
                            Cancel
                        </button>

                        <button type="submit" className="save-btn">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PersonalInfo;