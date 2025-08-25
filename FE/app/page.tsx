"use client"

import { Switch } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [powerOn, setPowerOn] = useState(false);
  const [power27On, setPower27On] = useState(false);
  const [power21On, setPower21On] = useState(false);
  const [power20On, setPower20On] = useState(false);

  const handlePowerToggle = async (pin: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newPowerState = event.target.checked;
    
    try {
      await fetch(`https://varis-office-api.webbyvaris.com/power${pin}/${newPowerState ? "on" : "off"}`, {
        method: "PUT"
      });
      
      if (pin === '17') {
        setPowerOn(newPowerState);
      } else if (pin === '27') {
        setPower27On(newPowerState);
      } else if (pin === '21') {
        setPower21On(newPowerState);
      } else if (pin === '20') {
        setPower20On(newPowerState);
      }
    } catch (error) {
      console.error(`Failed to toggle power ${pin}:`, error);
    }
  };

  const handleMasterToggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPowerState = event.target.checked;
    
    try {
      await Promise.all([
        fetch(`https://varis-office-api.webbyvaris.com/power17/${newPowerState ? "on" : "off"}`, { method: "PUT" }),
        fetch(`https://varis-office-api.webbyvaris.com/power27/${newPowerState ? "on" : "off"}`, { method: "PUT" }),
        fetch(`https://varis-office-api.webbyvaris.com/power21/${newPowerState ? "on" : "off"}`, { method: "PUT" }),
        fetch(`https://varis-office-api.webbyvaris.com/power20/${newPowerState ? "on" : "off"}`, { method: "PUT" })
      ]);
      
      setPowerOn(newPowerState);
      setPower27On(newPowerState);
      setPower21On(newPowerState);
      setPower20On(newPowerState);
    } catch (error) {
      console.error("Failed to toggle all lights:", error);
    }
  };

  const allLightsOn = powerOn && power27On && power21On && power20On;

  return (
    <div className="varis-container">
      <h1 className="mb-12 text-5xl font-bold">Smart Office</h1>
      <div className="flex flex-col gap-6 items-center w-full">
        <div className="flex flex-row items-center gap-10 w-[300px] border-b pb-4">
          <span className="text-sm font-medium">{allLightsOn ? "ALL LIGHTS ON" : "ALL LIGHTS OFF"}</span>
          <Switch
            checked={allLightsOn}
            onChange={handleMasterToggle}
            size="medium"
            color="primary"
          />
        </div>
        <div className="flex flex-row items-center gap-10 w-[300px]">
        <span className="text-sm">{powerOn ? "RIGHT MONITOR ON" : "RIGHT MONITOR OFF"}</span>
          <Switch
            checked={powerOn}
            onChange={(event) => handlePowerToggle('17', event)}
            size="medium"
            color="primary"
          />
        </div>
        <div className="flex flex-row items-center gap-10 w-[300px]">
          <span className="text-sm">{power27On ? "LEFT MONITOR ON" : "LEFT MONITOR OFF"}</span>
          <Switch
            checked={power27On}
            onChange={(event) => handlePowerToggle('27', event)}
            size="medium"
            color="primary"
          />
        </div>
        <div className="flex flex-row items-center gap-10 w-[300px]">
          <span className="text-sm">{power21On ? "WALL LIGHTS ON" : "WALL LIGHTS OFF"}</span>
          <Switch
            checked={power21On}
            onChange={(event) => handlePowerToggle('21', event)}
            size="medium"
            color="primary"
          />
        </div>
        <div className="flex flex-row items-center gap-10 w-[300px]">
          <span className="text-sm">{power20On ? "DESK LAMP ON" : "DESK LAMP OFF"}</span>
          <Switch
            checked={power20On}
            onChange={(event) => handlePowerToggle('20', event)}
            size="medium"
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}
