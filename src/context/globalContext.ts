import React from "react";
import { ACRONYM_LANGUAGE_MAP } from "../common/constants";

export const GlobalContext = React.createContext<keyof typeof ACRONYM_LANGUAGE_MAP>('en');