"use client";

import { SettingsIcon } from "./settingsIcon";
import "./nav-settings.scss";
import { useState } from "react";

export default function Settings() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <div className={`varis-menu ${settingsOpen ? "active" : ""}`}>
      <SettingsIcon onClick={toggleSettings}/>
    </div>
  );
}