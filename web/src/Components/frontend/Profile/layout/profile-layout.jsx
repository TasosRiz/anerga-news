//  Κεντρικό layout της περιοχής προφίλ.

//  Περιλαμβάνει το sidebar του χρήστη.

//  Eμφανίζει τις επιμέρους
//  σελίδες προφίλ, dashboard και αιτημάτων μέσω nested routes.

import { Routes, Route, useOutletContext } from "react-router-dom";
import UserSidebar from "../Sidebar/Sidebar";
import "./profile-layout.css";

// Reports-
import Reports from "../Reports/Page/ReportsPage";
// import CreateReport from "../Reports/CreateReport";
// import ReportDetails from "../Reports/ViewReport";
// import EditReport from "../Reports/EditReport";
import User from "../User/User";

// Dashboard
import FrontDashboard from "../Dashboard/FrontDashboard";
import DashHeader from "../../../common/components/DashHeader/dash-header";

const ProfilePage = () => {
    /*
      Παίρνει την κατάσταση του profile sidebar και τη γενική λειτουργία
      κλεισίματος των menus από το FrontendLayout μέσω Outlet context.

      Το ProfilePage δεν χρειάζεται να γνωρίζει τη λογική του Navbar.
     */
    const {
        sidebarOpen,
        setSidebarOpen,
        closeAllMenus,
    } = useOutletContext();

    return (
        <div className="user-dashboard-layout">
            {/*
              Sidebar της περιοχής προφίλ.
              Το onNavigate κλείνει όλα τα responsive menus
              όταν ο χρήστης επιλέξει μία σελίδα.
             */}
            <UserSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onNavigate={closeAllMenus}
            />

            {/* Κύρια περιοχή περιεχομένου των profile routes. */}
            <div className="user-content">
                <Routes>
                    <Route index element={<User />} />
                    {/* Reports */}
                    <Route path="reports" element={<Reports />} />
                    {/* <Route path="reports/create" element={<CreateReport />} /> */}
                    {/* <Route path="reports/:id" element={<ReportDetails />} /> */}
                    {/* <Route path="reports/:id/edit" element={<EditReport />} /> */}

                    {/* Dashboard */}
                    <Route path="dashboard" element={<FrontDashboard />} />


                </Routes>
            </div>
        </div>
    );
};

export default ProfilePage;