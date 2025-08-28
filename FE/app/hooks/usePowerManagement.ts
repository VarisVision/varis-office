import { useState } from "react";

export function usePowerManagement() {
  const [powerOn, setPowerOn] = useState(false);
  const [power27On, setPower27On] = useState(false);
  const [power21On, setPower21On] = useState(false);
  const [power20On, setPower20On] = useState(false);

  const handlePowerToggle = async (
    pin: string, 
    event?: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newPowerState = false;
    
    if (event) {
      newPowerState = event.target.checked;
    } else {
      if (pin === '17') {
        newPowerState = !powerOn;
      } else if (pin === '27') {
        newPowerState = !power27On;
      } else if (pin === '21') {
        newPowerState = !power21On;
      } else if (pin === '20') {
        newPowerState = !power20On;
      }
    }
    
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

  return {
    powerOn,
    power27On,
    power21On,
    power20On,
    handlePowerToggle,
    handleMasterToggle
  };
}
