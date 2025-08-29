"use client";

import { useState } from "react";
import { ControlsIcon } from "./controlsIcon";
import PowerControls from "../PowerControls";
import "./options.scss";

interface OptionsProps {
  powerOn: boolean;
  power27On: boolean;
  power21On: boolean;
  power20On: boolean;
  handlePowerToggle: (pin: string, event?: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleMasterToggle: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function Options({
  powerOn,
  power27On,
  power21On,
  power20On,
  handlePowerToggle,
  handleMasterToggle
}: OptionsProps) {
  const [showPowerControls, setShowPowerControls] = useState(false);

  const togglePowerControls = () => {
    setShowPowerControls(!showPowerControls);
  };

  return (
    <div className={`varis-office__options`}>
      <div 
        className="options-icon power-controls"
        onClick={togglePowerControls}
      >
        <ControlsIcon/>
      </div>
      <div className={`varis-office__power-controls ${showPowerControls ? 'show' : ''}`}>
        <PowerControls
          powerOn={powerOn}
          power27On={power27On}
          power21On={power21On}
          power20On={power20On}
          handlePowerToggle={handlePowerToggle}
          handleMasterToggle={handleMasterToggle}
        />
      </div>
    </div>
  );
}