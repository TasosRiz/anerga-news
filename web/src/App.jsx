// Κεντρικό component δρομολόγησης της εφαρμογής.

// Διαχειρίζεται τα frontend και admin routes, τον έλεγχο πρόσβασης,
// καθώς και τα κοινά states των frontend menus.


import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Providers
import { useAuth } from "./Components/common/Auth/provider/AuthProvider.jsx";
import { OrganizationInfoProvider } from "./Components/common/OrganizationInfo/Context/OrganizationInfoContext";

// Authentication
import AdminLogin from "./Components/admin/Auth/AdminAuth";

// Frontend
import FrontendLayout from "./Components/frontend/FrontendLayout";
import About from "./Components/frontend/About/About";
import ProfilePage from "./Components/frontend/Profile/layout/profile-layout";
import PostsPage from "./Components/frontend/Posts/PostsPage";
import PostsViewPage from "./Components/frontend/Posts/Actions/PostViewPage";

// Admin
import AdminLayout from "./Components/admin/AdminLayout";
import Users from "./Components/admin/Users/Users";
import AdminDashboard from "./Components/admin/pages/Dashboard/AdminDashboard";
import PagesContent from "./Components/admin/pages/Content/PagesContent";
import Reports from "./Components/admin/pages/Reports/AdminReportsPage";
import CategoriesPage from "./Components/admin/pages/Categories/CategoriesPage";
import ShowMedia from "./Components/admin/pages/Media/Media";
import Stats from "./Components/admin/pages/Stats/Stats";

// Settings
import Settings from "./Components/common/Settings/Settings";
import UserAuth from "./Components/frontend/Auth/UserAuth";
import RequireAdmin from "./Components/common/Auth/guards/RequireAdmin.jsx";


function App() {
  // Παίρνει τα δεδομένα και τις λειτουργίες authentication
  // από τον κεντρικό AuthProvider
  const { token, user, isAdmin, logout } = useAuth();

  const navigate = useNavigate();

  // Κοινό state για το frontend mobile menu και το profile sidebar.
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Εκτελεί logout μέσω του AuthProvider και
  // επιστρέφει τον χρήστη στην αρχική σελίδα.
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <OrganizationInfoProvider>
      <Routes>
        {/* FRONTEND */}
        <Route
          element={
            <FrontendLayout
              user={user}
              onLogout={handleLogout}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        >
          {/* Home-Posts */}
          <Route path="/" element={<PostsPage />} />
          <Route path="/events/:id" element={<PostsViewPage />} />

          <Route path="/about" element={<About />} />

          {/* Posts */}

          {/* User login */}
          {/* Αν ο χρήστης είναι ήδη συνδεδεμένος,
              δεν μπορεί να επιστρέψει στη σελίδα login. */}
          <Route
            path="/login"
            element={
              token ? (
                <Navigate to="/" replace />
              ) : (
                <UserAuth />
              )
            }
          />

          {/* Profile */}
          {/* Προστατευμένο profile route.
              Επιτρέπεται μόνο σε συνδεδεμένους χρήστες. */}
          <Route
            path="/profile/*"
            element={
              token ? (
                <ProfilePage
                  onLogout={handleLogout}
                  menuOpen={menuOpen}
                  setMenuOpen={setMenuOpen}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Route>

        {/* ADMIN LOGIN */}
        <Route
          path="/admin/login"
          element={
            token && isAdmin ? (
              <Navigate to="/admin/dashboard" replace />
            ) : token ? (
              <Navigate to="/" replace />
            ) : (
              <AdminLogin />
            )
          }
        />

        {/* ADMIN PROTECTED ROUTES */}
        {/* Προστατευμένα admin routes.
            Όλες οι εσωτερικές admin σελίδες περνούν από το RequireAdmin. */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout onLogout={handleLogout} />
            </RequireAdmin>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard">
            <Route
              index
              element={<AdminDashboard />}
            />

            <Route path="users" element={<Users />} />

            <Route
              path="content"
              element={<PagesContent />}
            />

            <Route
              path="reports"
              element={<Reports />}
            />

            <Route
              path="categories"
              element={<CategoriesPage />}
            />

            <Route
              path="media"
              element={<ShowMedia />}
            />

            <Route
              path="stats"
              element={<Stats />}
            />

            <Route
              path="settings"
              element={
                <Settings
                  variant="admin"
                />
              }
            />
          </Route>
        </Route>

        {/* NOT FOUND */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </OrganizationInfoProvider >
  );
}

export default App;