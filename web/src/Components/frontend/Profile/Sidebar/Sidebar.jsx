// Επιλογές πλοήγησης του sidebar για την περιοχή προφίλ.


import React from "react";
import {
  BiHome,
  BiSolidReport,
  BiListPlus,
  BiBell,
} from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { GiBigGear } from "react-icons/gi";
import SidebarMenu from "../../../common/Sidebar/SidebarMenu";

//  Επιλογές πλοήγησης του sidebar για την περιοχή προφίλ.
//  Κάθε επιλογή περιλαμβάνει μοναδικό id, τίτλο,
//  διαδρομή πλοήγησης και εικονίδιο.
const userSidebarItems = [
  {
    id: "dashboard",
    label: "Γενικά",
    path: "/profile/dashboard",
    icon: <BiHome />,
  },
  {
    id: "reports",
    label: "Τα γεγονότα μου",
    path: "/profile/reports",
    icon: <BiSolidReport />,
  },

  {
    id: "profile",
    label: "Ο Λογαριασμός μου",
    path: "/profile",
    icon: <BsFilePerson />,
  },

];

// Sidebar της περιοχής προφίλ του χρήστη.

// Χρησιμοποιεί το κοινό SidebarMenu και του περνά
// τις επιλογές πλοήγησης και τη λειτουργία ανοίγματος/κλεισίματος.
const UserSidebar = ({
  sidebarOpen,
  setSidebarOpen,
  onNavigate,
}) => {
  return (
    <SidebarMenu
      variant="user"
      title="Ο Λογαριασμός μου"
      items={userSidebarItems}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      onNavigate={onNavigate}
    />
  );
};

export default UserSidebar;