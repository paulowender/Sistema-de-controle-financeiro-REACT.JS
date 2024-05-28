import { FaHome } from "react-icons/fa";
import { tr } from "../lang";
import Dashboard from "../pages/dashboard/Dashboard";

const Modules = [
    {
        name: tr("dashboard"),
        icon: <FaHome />,
        path: "/dashboard",
        component: Dashboard
    }
]

export default Modules