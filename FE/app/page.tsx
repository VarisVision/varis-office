"use client"

import Options from "./components/Options";
import ClickableAreas from "./components/ClickableAreas";
import { usePowerManagement } from "./hooks/usePowerManagement";

export default function Home() {
  const {
    powerOn,
    power27On,
    power21On,
    power20On,
    handlePowerToggle,
    handleMasterToggle
  } = usePowerManagement();

  return (
    <div className="varis-office__main-container">
      <ClickableAreas
        powerOn={powerOn}
        power27On={power27On}
        power21On={power21On}
        power20On={power20On}
        handlePowerToggle={handlePowerToggle}
      />

      <Options
        powerOn={powerOn}
        power27On={power27On}
        power21On={power21On}
        power20On={power20On}
        handlePowerToggle={handlePowerToggle}
        handleMasterToggle={handleMasterToggle}
      />
    </div>
  );
}
