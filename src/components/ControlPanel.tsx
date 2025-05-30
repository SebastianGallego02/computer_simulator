import React from "react";

interface ControlPanelProps {
  onStep: () => void;
  halted: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onStep, halted }) => (
  <div className="flex flex-col items-center">
    <button
      className="bg-green-600 text-white px-6 py-3 rounded text-lg shadow-lg"
      onClick={onStep}
      disabled={halted}
    >
      Ejecutar ciclo
    </button>
    {halted && <div className="mt-2 text-red-600 font-bold">Programa Finalizado (HALT)</div>}
  </div>
);
