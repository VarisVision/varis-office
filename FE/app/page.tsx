"use client"

import Settings from "./components/settings/page";
import PowerControls from "./components/PowerControls";
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
    <div className="varis-container">
      <ClickableAreas
        powerOn={powerOn}
        power27On={power27On}
        power21On={power21On}
        power20On={power20On}
        handlePowerToggle={handlePowerToggle}
      />

      <PowerControls
        powerOn={powerOn}
        power27On={power27On}
        power21On={power21On}
        power20On={power20On}
        handlePowerToggle={handlePowerToggle}
        handleMasterToggle={handleMasterToggle}
      />
      <Settings/>
    </div>
  );
}
