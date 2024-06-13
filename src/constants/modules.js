import { DashboardOutlined, PeopleOutline } from "@mui/icons-material";
import { FaHome } from "react-icons/fa";
import { tr } from "../lang";
import Dashboard from "../pages/dashboard/Dashboard";
import LandingPage from "../pages/landing_page";

const Modules = [
    {
        name: tr("home"),
        icon: <FaHome />,
        path: "/",
        menu: false,
        page: LandingPage
    },
    {
        name: tr("dashboard"),
        icon: <DashboardOutlined />,
        path: "/dashboard",
        menu: true,
        page: Dashboard
    },
    {
        name: tr("users"),
        icon: <PeopleOutline />,
        path: "/users",
        menu: true,
        page: () => <div>NotFound</div>
    }
]

export default Modules