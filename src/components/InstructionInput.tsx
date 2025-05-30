import React, { useState } from "react";

interface InstructionInputProps {
  onLoad: (instructions: number[]) => void;
}

export const InstructionInput: React.FC<InstructionInputProps> = ({ onLoad }) => {
  const [input, setInput] = useState("");

  const handleLoad = () => {
    const lines = input.split("\n");
    const instructions = lines
      .map(line => line.trim())
      .filter(Boolean)
      .map(bin => parseInt(bin, 2));
    onLoad(instructions);
  };

  return (
    <div className="border p-4 rounded bg-white shadow">
      <h2 className="font-bold mb-2 text-center">Ingreso de Instrucciones</h2>
      <textarea
        className="w-full h-32 border rounded p-1 mb-2"
        placeholder="Ej: 00000001\n00100010"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        onClick={handleLoad}
      >
        Cargar Instrucciones
      </button>
    </div>
  );
};
