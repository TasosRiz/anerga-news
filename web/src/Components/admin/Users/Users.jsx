import React from "react";
import PagesLayout from "../pages/pages-layout/pages-layout";
import "./Users.css";

// Sections
import UserList from "./UserList/UserList";
import UsersHeader from './UsersHeader/UsersHeader'

// Filter
import { useSearchParams } from "react-router-dom";

// Hooks
import { useAuth } from "../../common/Auth/provider/AuthProvider"; //Token

//  Σελίδα διαχείρισης χρηστών.
//
//  Αναλαμβάνει:
//  - ανάγνωση των filters από το URL
//  - εμφάνιση του header χρηστών
//  - εμφάνιση της λίστας χρηστών

const Users = () => {
    const { token } = useAuth();

    // Filter
    // Διαβάζει τα ενεργά filters από τα query parameters.
    const [searchParams] = useSearchParams();

    const roleFilter = searchParams.get("role") || "";
    const createdFilter = searchParams.get("created") || "";



    return (
        <PagesLayout
            title="Χρήστες"
            showSearch={false}
            showNotification={false}
        >
            <div className="users-page-container">
                <UsersHeader token={token} />
                <UserList
                    token={token}
                    roleFilter={roleFilter}
                    createdFilter={createdFilter}
                />
            </div>
        </PagesLayout>
    );
};

export default Users;