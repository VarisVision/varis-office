"use client"

import { Slider } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [brightness, setBrightness] = useState(0);

  const handleBrightnessValue = async (event: Event, value: number | number[]) => {
    const brightness = Array.isArray(value) ? value[0] : value;
    setBrightness(brightness);
    await fetch(`http://localhost:8000/brightness/${brightness}`, {
      method: "PUT"
    })
  }
  return (
    <div className="varis-container">
      <h1 className="mb-4">Hello from Raspberry Pi</h1>
      <div className="flex justify-center w-1/6">
        <Slider
          className="varis-slider"
          value={brightness}
          onChange={handleBrightnessValue}
          min={0}
          max={100}
        />
      </div>
    </div>
  );
}
