import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import Modules from "../../../constants/modules";

const AppDrawer = () => {
    const currentPath = window.location.pathname;
    const modules = Modules.filter((module) => module.path.includes(currentPath));

    return (
        <List component="nav">
            {modules.map((module) => (
                <DrawerItem
                    key={module.name}
                    module={module}
                    active={module.path === currentPath}
                />
            ))}
        </List>
    );
}

const DrawerItem = (props) => {
    const { name, icon, path } = props.module;

    const active = props.active;
    return (
        <ListItemButton LinkComponent={"a"} to={path} selected={active}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    )
}


export default AppDrawer;