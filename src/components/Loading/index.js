// Loading component

import React from "react";

import * as C from "./styles";
import { FaTruckLoading } from "react-icons/fa";

export const Loading = () => {
    return (
        <C.Container>
            <FaTruckLoading size={50} />
        </C.Container>
    );
};