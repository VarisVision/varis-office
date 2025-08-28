"use client"

import Image from "next/image";

interface ClickableAreasProps {
  powerOn: boolean;
  power27On: boolean;
  power21On: boolean;
  power20On: boolean;
  handlePowerToggle: (pin: string) => Promise<void>;
}

export default function ClickableAreas({
  powerOn,
  power27On,
  power21On,
  power20On,
  handlePowerToggle
}: ClickableAreasProps) {
  return (
    <>
      <div className="background-container">
        <Image 
          src="/pcsetup.JPEG" 
          alt="Office Setup" 
          fill
          className="background-image"
          priority
          quality={100}
        />
      </div>
      
      <div 
        className={`clickable-area monitor-right ${powerOn ? 'active' : ''}`}
        onClick={() => handlePowerToggle('17')}
        title="Right Monitor"
      />
      <div 
        className={`clickable-area monitor-left ${power27On ? 'active' : ''}`}
        onClick={() => handlePowerToggle('27')}
        title="Left Monitor"
      />
      <div 
        className={`clickable-area wall-lights ${power21On ? 'active' : ''}`}
        onClick={() => handlePowerToggle('21')}
        title="Wall Lights"
      />
      <div 
        className={`clickable-area desk-lamp ${power20On ? 'active' : ''}`}
        onClick={() => handlePowerToggle('20')}
        title="Desk Lamp"
      />
    </>
  );
}
