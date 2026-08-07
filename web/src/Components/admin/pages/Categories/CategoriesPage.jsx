import { useState } from "react";

// Layout
import PagesLayout from "../pages-layout/pages-layout";

// Components
import Tabs from "../../../common/components/Tabs/Tabs";
import CategoriesTable from "./CategoriesTable.jsx";

// API-Reports
import {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory as deleteCategoryApi,
} from "../../../common/Categories/api/reportsCategories.jsx";

// API-Posts
import {
    fetchPostCategories,
    createPostCategory,
    updatePostCategory,
    deletePostCategory,
} from "../../../common/Categories/api/postCategories.jsx";

// Hooks
import { useAuth } from "../../../common/Auth/provider/AuthProvider.jsx"; //Token

// CSS
import "./CategoriesPage.css";


//  Σελίδα διαχείρισης κατηγοριών.
//
//  Εμφανίζει:
//  - κατηγορίες αιτημάτων
//  - κατηγορίες άρθρων
//  - κοινό UI δημιουργίας, επεξεργασίας και διαγραφής
//
//  Το CategoriesTable επαναχρησιμοποιείται με διαφορετικά
//  API functions ανάλογα με το ενεργό tab.

// Διαθέσιμα tabs κατηγοριών.
const categoryTabs = [
    {
        label: "Κατηγορίες Αιτημάτων",
        value: "reports",
    },
    {
        label: "Κατηγορίες Άρθρων",
        value: "posts",
    },
];

const CategoriesPage = () => {
    // Token του συνδεδεμένου admin.
    const { token } = useAuth();

    // Ενεργό tab κατηγοριών.
    const [activeTab, setActiveTab] =
        useState("reports");

    return (
        <PagesLayout
            title="Κατηγορίες"
            showSearch={false}
            showNotification={false}
        >
            <div className="categories-page">
                {/* Επιλογή τύπου κατηγορίας. */}
                <div className="categories-page-tabs">
                    <Tabs
                        tabs={categoryTabs}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                    />
                </div>

                {/* Περιεχόμενο ενεργού tab. */}
                <div className="categories-page-content">
                    {activeTab === "reports" && (
                        <CategoriesTable
                            token={token}
                            emptyText="Δεν υπάρχουν κατηγορίες αιτημάτων."
                            fetchItems={fetchCategories}
                            createItem={createCategory}
                            updateItem={updateCategory}
                            deleteItem={deleteCategoryApi}
                        />
                    )}

                    {activeTab === "posts" && (
                        <CategoriesTable
                            token={token}
                            emptyText="Δεν υπάρχουν κατηγορίες άρθρων."
                            fetchItems={fetchPostCategories}
                            createItem={createPostCategory}
                            updateItem={updatePostCategory}
                            deleteItem={deletePostCategory}
                        />
                    )}
                </div>
            </div>
        </PagesLayout>
    );
};

export default CategoriesPage;