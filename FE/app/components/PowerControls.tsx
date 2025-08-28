"use client"

import { Switch } from "@mui/material";

interface PowerControlsProps {
  powerOn: boolean;
  power27On: boolean;
  power21On: boolean;
  power20On: boolean;
  handlePowerToggle: (pin: string, event?: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleMasterToggle: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function PowerControls({
  powerOn,
  power27On,
  power21On,
  power20On,
  handlePowerToggle,
  handleMasterToggle
}: PowerControlsProps) {
  const allLightsOn = powerOn && power27On && power21On && power20On;

  return (
    <div className="controls-panel">
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
