"use client"

import { Switch } from "@mui/material";
import "./power-controls.scss";

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

  const powerControls = [
    { id: '17', label: 'RIGHT MONITOR', state: powerOn, setState: powerOn },
    { id: '27', label: 'LEFT MONITOR', state: power27On, setState: power27On },
    { id: '21', label: 'WALL LIGHTS', state: power21On, setState: power21On },
    { id: '20', label: 'DESK LAMP', state: power20On, setState: power20On }
  ];

  return (
    <div>
      <h1>Power Controls</h1>
      <div className="controls-container">
        <div className="master-control">
          <span className="master-label">{allLightsOn ? "ALL LIGHTS ON" : "ALL LIGHTS OFF"}</span>
          <Switch
            checked={allLightsOn}
            onChange={handleMasterToggle}
            size="medium"
            color="primary"
          />
        </div>
        {powerControls.map((control) => (
          <div key={control.id} className="power-control">
            <span className="control-label">{control.state ? `${control.label} ON` : `${control.label} OFF`}</span>
            <Switch
              checked={control.state}
              onChange={(event) => handlePowerToggle(control.id, event)}
              size="medium"
              color="primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
