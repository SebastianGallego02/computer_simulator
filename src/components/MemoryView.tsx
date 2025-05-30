import React from "react";

interface MemoryViewProps {
  memoria: number[];
}

export const MemoryView: React.FC<MemoryViewProps> = ({ memoria }) => (
  <div className="border p-4 rounded bg-white shadow w-80 overflow-auto">
    <h2 className="font-bold mb-2 text-center">Memoria de Datos</h2>
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th>Posición</th>
          <th>Dato (bin)</th>
          <th>Dato (dec)</th>
        </tr>
      </thead>
      <tbody>
        {memoria.map((dato, idx) => (
          <tr key={idx} className="text-center">
            <td>{idx.toString().padStart(2, "0")}</td>
            <td>{dato.toString(2).padStart(8, "0")}</td>
            <td>{dato}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
