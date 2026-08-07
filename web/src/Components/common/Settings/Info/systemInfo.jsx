import {
    BiShield,
    BiGitBranch,
    BiServer,
    BiLogoReact,
    BiData,
    BiCheckCircle,
    BiTimeFive,
    BiWifi,
} from "react-icons/bi";

export const getSystemInfo = ({ connected, checkedAt }) => [
    {
        label: "Όνομα Εφαρμογής",
        value: "ServiceKit",
        icon: <BiShield />,
        type: "blue",
    },
    {
        label: "Τελευταία Ενημέρωση",
        value: checkedAt
            ? new Date(checkedAt).toLocaleString("el-GR")
            : "—",
        icon: <BiTimeFive />,
        type: connected ? "green" : "red",
    },
    {
        label: "Έκδοση",
        value: "1.0.0",
        icon: <BiGitBranch />,
        type: "blue",
    },
    {
        label: "Backend",
        value: "Laravel API",
        icon: <BiServer />,
        type: "blue",
    },
    {
        label: "API Status",
        value: connected ? "Connected" : "Offline",
        icon: <BiWifi />,
        type: connected ? "green" : "red",
        badge: true,
    },
    {
        label: "Database",
        value: "MySQL",
        icon: <BiData />,
        type: "blue",
    },
    {
        label: "Frontend",
        value: "React",
        icon: <BiLogoReact />,
        type: "blue",
    },
    {
        label: "Κατάσταση Συστήματος",
        value: connected ? "Ενεργό" : "Πρόβλημα",
        icon: <BiCheckCircle />,
        type: connected ? "green" : "red",
        badge: true,
    },
];