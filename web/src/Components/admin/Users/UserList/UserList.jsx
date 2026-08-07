import { useEffect, useMemo, useState } from "react";

// Notifications
import { toast } from "react-toastify";

// Assets
import defaultUserImage from "../../Users/img1.jpg";

// API
import { getAllUsers, updateUser } from "../../../common/Users/api/UsersApi";

// Components
import AppStatus from "../../../common/components/Alerts/AppStatus";
import SidePanel from "../../../common/components/SidePanel/SidePanel";
import UserEditForm from "../../../common/Users/Forms/UserEditForm";

// CSS
import "./UserList.css";


//  Λίστα διαχείρισης χρηστών για το admin panel.
//
//  Αναλαμβάνει:
//  - φόρτωση χρηστών
//  - φιλτράρισμα ανά ρόλο και ημερομηνία
//  - εμφάνιση loading, error και empty states
//  - επεξεργασία χρήστη μέσω SidePanel

const UserList = ({
  token,
  roleFilter = "",
  createdFilter = ""
}) => {
  // Λίστα χρηστών.
  const [users, setUsers] = useState([]);

  // Κατάσταση φόρτωσης λίστας.
  const [loading, setLoading] = useState(true);

  // Σφάλμα φόρτωσης λίστας.
  const [error, setError] = useState("");

  // Χρήστης που επεξεργάζεται ο admin.
  const [selectedUser, setSelectedUser] = useState(null);

  // Κατάσταση αποθήκευσης χρήστη.
  const [savingUser, setSavingUser] = useState(false);

  // Φορτώνει όλους τους χρήστες όταν υπάρχει token.
  useEffect(() => {
    if (!token) {
      setUsers([]);
      setLoading(false);
      setError("Δεν βρέθηκε admin token.");
      return;
    }

    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllUsers(token);

        // console.log("USERS:", data);

        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        setUsers([]);

        setError(
          error?.message ||
          "Σφάλμα φόρτωσης χρηστών."
        );
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);


  // Ανοίγει το SidePanel για επεξεργασία χρήστη.
  const handleEditUser = (user) => {
    if (!user) {
      return;
    }

    setSelectedUser(user);
  };

  // Κλείνει το SidePanel μόνο όταν δεν εκτελείται αποθήκευση.
  const handleClosePanel = () => {
    if (savingUser) {
      return;
    }

    setSelectedUser(null);
  };

  // Ενημερώνει τον χρήστη στο API και στο local state.
  const handleSaveUser = async (id, data) => {
    if (!id) {
      return;
    }

    try {
      setSavingUser(true);

      const updatedUser =
        await updateUser(token, id, data);

      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          String(user.id) === String(id)
            ? {
              ...user,
              ...updatedUser,
            }
            : user
        )
      );

      setSelectedUser(null);

      toast.success(
        "Ο χρήστης ενημερώθηκε."
      );
    } catch (requestError) {
      toast.error(
        requestError?.message ||
        "Σφάλμα ενημέρωσης χρήστη."
      );
    } finally {
      setSavingUser(false);
    }
  };

  // Εφαρμόζει τα φίλτρα role και created από τα query parameters.
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        !roleFilter ||
        user.role === roleFilter;


      const matchesCreated =
        createdFilter !== "30" ||
        (
          user.created_at &&
          new Date(user.created_at) >=
          new Date(
            Date.now() -
            30 * 24 * 60 * 60 * 1000
          )
        );
      return matchesRole && matchesCreated;
    });
  }, [users, roleFilter, createdFilter]);

  return (
    <div
      className={`with-side-panel ${selectedUser ? "has-panel" : ""}`}
      style={{ "--side-panel-width": "420px" }}
    >
      <section className="user-list-section">
        <AppStatus
          loading={loading}
          error={error}
          empty={
            !loading &&
            !error &&
            filteredUsers.length === 0
          }
          loadingMessage="Φόρτωση χρηστών..."
          emptyMessage="Δεν βρέθηκαν χρήστες."
          center
        />

        <div className="user-table-wrapper scrollable-x  scrollable-y">
          <table className="user-table ">
            <thead>
              <tr>
                <th>Χρήστης</th>
                <th>Email</th>
                <th>Ρόλος</th>
                <th>Κατάσταση</th>
                <th>Ημερομηνία</th>
                <th>Ενέργειες</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((user) => {
                const isAdmin =
                  user.role === "admin";

                const isActive =
                  user.status === "active";

                return (
                  <tr key={user.id}>
                    <td>
                      <div className="user-detail">
                        <div className="user-avatar">
                          <img
                            src={
                              user.avatar ||
                              defaultUserImage
                            }
                            alt={
                              user.name ||
                              "Χρήστης"
                            }
                          />
                        </div>

                        <span className="user-name">
                          {user.name ||
                            "Χωρίς όνομα"}
                        </span>
                      </div>
                    </td>

                    <td className="user-email">
                      {user.email || "—"}
                    </td>

                    <td>
                      <span
                        className={`user-role ${isAdmin
                          ? "admin-role"
                          : ""
                          }`}
                      >
                        {isAdmin
                          ? "Admin"
                          : "User"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`user-status ${isActive
                          ? "status-active"
                          : "status-inactive"
                          }`}
                      >
                        {isActive
                          ? "Ενεργός"
                          : "Ανενεργός"}
                      </span>
                    </td>

                    <td>
                      {user.created_at
                        ? new Date(
                          user.created_at
                        ).toLocaleDateString(
                          "el-GR"
                        )
                        : "—"}
                    </td>

                    <td>
                      <div className="table-actions">
                        <button
                          type="button"
                          className="btn-action btn-edit"
                          onClick={() =>
                            handleEditUser(
                              user
                            )
                          }
                        >
                          Επεξεργασία
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SidePanel Edit */}
      <SidePanel
        open={Boolean(selectedUser)}
        title="Επεξεργασία Χρήστη"
        subtitle={selectedUser?.email || ""}
        onClose={handleClosePanel}
      >
        {selectedUser && (
          <UserEditForm
            user={selectedUser}
            saving={savingUser}
            onSave={handleSaveUser}
            onCancel={handleClosePanel}
          />
        )}
      </SidePanel>
    </div>
  );
};

export default UserList;