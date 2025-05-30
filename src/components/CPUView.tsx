import React from "react";

interface CPUViewProps {
  pc: number;
  acc: number;
  ir: number;
}

export const CPUView: React.FC<CPUViewProps> = ({ pc, acc, ir }) => (
  <div className="border p-4 rounded bg-white shadow w-72">
    <h2 className="font-bold mb-2 text-center">Unidad Central de Procesamiento</h2>
    <div className="flex flex-col gap-2">
      <div>
        <b>Acumulador:</b> {acc}
      </div>
      <div>
        <b>Contador (PC):</b> {pc}
      </div>
      <div>
        <b>Registro de Instrucción (IR):</b> {ir.toString(2).padStart(8, "0")}
      </div>
    </div>
  </div>
);
