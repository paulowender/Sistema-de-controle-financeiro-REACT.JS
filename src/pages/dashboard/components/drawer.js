import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import Modules from "../../../constants/modules";

const AppDrawer = () => {
    return (
        <List component="nav">
            {Modules.map((module) => (
                <DrawerItem key={module.name} module={module} />
            ))}
        </List>
    );
}

const DrawerItem = (props) => {
    const { name, icon, path } = props.module;
    return (
        <ListItemButton LinkComponent={"a"} to={path}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={name} />
        </ListItemButton>
    )
}


export default AppDrawer;