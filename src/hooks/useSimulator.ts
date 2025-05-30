// src/hooks/useSimulador.ts
import { useState } from "react";
import { CPU } from "../core/cpu/CPU";
import { BusSistema } from "../core/bus/BusSistema";
import { MemoriaPrincipal } from "../core/memoria/MemoriaPrincipal";
import { DispositivosIO } from "../core/io/DispositivosIO";
import { ManejadorInterrupciones } from "../core/interruptions/ManejadorInterrupciones";

export function useSimulador(memorySize = 32) {
  // Instanciar solo una vez (por sesión)
  const [memoria] = useState(() => new MemoriaPrincipal(memorySize))
  const [io] = useState(() => new DispositivosIO())
  const [bus] = useState(() => new BusSistema())
  const [interrupciones] = useState(() => new ManejadorInterrupciones())
  const [cpu] = useState(() => new CPU(memoria, io, bus, interrupciones))
  const [refresh, setRefresh] = useState(0)

  const [instructions, setInstructions] = useState<string[]>([])
  const [currentInstructionIdx, setCurrentInstructionIdx] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [executionTime, setExecutionTime] = useState(0)

  // Carga instrucciones en binario directamente en memoria
  const cargarPrograma = (lines: string[]) => {
    lines.forEach((inst, idx) => memoria.escribir(idx, parseInt(inst, 2)))
    cpu.reset()
    setInstructions(lines)
    setCurrentInstructionIdx(0)
    setExecutionTime(0)
    setRefresh(x => x + 1)
  }

  const ejecutarCiclo = () => {
    if (currentInstructionIdx < instructions.length && !cpu.halted) {
      cpu.cicloFetchDecodeExecute()
      setExecutionTime(e => e + 1)
      setCurrentInstructionIdx(i => i + 1)
      setRefresh(x => x + 1)
    }
  }

  const reset = () => {
    cpu.reset()
    memoria.memoria.fill(0)
    setInstructions([])
    setCurrentInstructionIdx(0)
    setExecutionTime(0)
    setIsRunning(false)
    setRefresh(x => x + 1)
  }

  return {
    cpu,
    memoria,
    bus,
    instrucciones: instructions,
    currentInstructionIdx,
    executionTime,
    isRunning,
    setIsRunning,
    cargarPrograma,
    ejecutarCiclo,
    reset,
    setInstructions,
    setCurrentInstructionIdx
  }
}
