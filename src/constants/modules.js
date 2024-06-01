import { DashboardOutlined } from "@mui/icons-material";
import { FaHome } from "react-icons/fa";
import { tr } from "../lang";
import Dashboard from "../pages/dashboard/Dashboard";
import LandingPage from "../pages/landing_page";

const Modules = [
    {
        name: tr("home"),
        icon: <FaHome />,
        path: "/",
        page: LandingPage
    },
    {
        name: tr("dashboard"),
        icon: <DashboardOutlined />,
        path: "/dashboard",
        page: Dashboard
    }
]

export default Modules