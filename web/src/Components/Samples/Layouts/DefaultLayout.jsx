import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function DefaultLayout({ user }) {
    return (
        <>
            <Navbar user={user} />
            <Outlet />
            <Footer />
        </>
    );
}
