import {
  BiHome,
  BiSolidReport,
  BiStats,
  BiCog,
  BiUser,
  BiCategory,
  BiImage,
} from "react-icons/bi";

import SidebarMenu from "../../common/Sidebar/SidebarMenu";

const adminSidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <BiHome />,
  },
  {
    id: "content",
    label: "Content",
    path: "/admin/dashboard/content",
    icon: <BiSolidReport />,
  },
  {
    id: "reports",
    label: "Reports",
    path: "/admin/dashboard/reports",
    icon: <BiSolidReport />,
    activeType: "startsWith",
  },
  {
    id: "categories",
    label: "Categories",
    path: "/admin/dashboard/categories",
    icon: <BiCategory />,
    activeType: "startsWith",
  },
  {
    id: "media",
    label: "Media",
    path: "/admin/dashboard/media",
    icon: <BiImage />,
  },
  {
    id: "users",
    label: "Users",
    path: "/admin/dashboard/users",
    icon: <BiUser />,
  },
  {
    id: "stats",
    label: "Stats",
    path: "/admin/dashboard/stats",
    icon: <BiStats />,
  },
  {
    id: "settings",
    label: "Settings",
    path: "/admin/dashboard/settings",
    icon: <BiCog />,
  },
];

// Sidebar του admin panel.
//
// Παίρνει το state ανοίγματος και τους handlers
// από το AdminLayout και τους περνά στο κοινό SidebarMenu.
const Sidebar = ({
  sidebarOpen = false,
  onNavigate,
}) => {
  return (
    <SidebarMenu
      variant="admin"
      title="Admin Panel"
      items={adminSidebarItems}
      sidebarOpen={sidebarOpen}
      onNavigate={onNavigate}
    />
  );
};

export default Sidebar;