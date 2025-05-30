"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card"
import { Button } from "../components/Button"
import { Badge } from "../components/Badge"
import { Separator } from "../components/Separator"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"
import { useSimulador } from "../hooks/useSimulator"

export default function SimulatorPage() {
  const {
    cpu,
    memoria,
    bus,
    instrucciones,
    currentInstructionIdx,
    executionTime,
    isRunning,
    setIsRunning,
    cargarPrograma,
    ejecutarCiclo,
    reset,
    setInstructions,
    setCurrentInstructionIdx
  } = useSimulador(32)

  const [programInput, setProgramInput] = useState("00000001\n00100010\n01000011\n11100000") // ejemplo: LOAD, ADD, STORE, HALT

  // Auto ejecución
  useEffect(() => {
    if (!isRunning) return
    if (currentInstructionIdx >= instrucciones.length || cpu.halted) {
      setIsRunning(false)
      return
    }
    const interval = setInterval(() => ejecutarCiclo(), 700)
    return () => clearInterval(interval)
  }, [isRunning, currentInstructionIdx, instrucciones.length, cpu.halted])

  // Cargar instrucciones desde textarea
  const handleLoadProgram = () => {
    const lines = programInput.split("\n").map(x => x.trim()).filter(Boolean)
    setInstructions(lines)
    cargarPrograma(lines)
  }

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Simulador de Computador - Arquitectura de Von Neumann
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CPU Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Unidad Central de Procesamiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Unidad Aritmética Lógica</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-600 p-2 rounded text-center">
                      <div className="text-xs text-slate-300">Últ. Operación</div>
                      <div className="text-green-400 font-mono">
                        {/* Aquí podrías mostrar el último opcode ejecutado */}
                        {cpu.ir.valor.toString(2).padStart(8, "0").slice(0,3)}
                      </div>
                    </div>
                    <div className="bg-slate-600 p-2 rounded text-center">
                      <div className="text-xs text-slate-300">Estado</div>
                      <div className="text-green-400 font-mono">{!cpu.halted && isRunning ? "ACTIVA" : "IDLE"}</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-300 mb-1">Acumulador (Reg 0)</div>
                    <div className="text-cyan-400 font-mono text-sm">{cpu.registros.leer(0).toString(2).padStart(8, "0")}</div>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-300 mb-1">Contador (PC)</div>
                    <div className="text-cyan-400 font-mono text-sm">{cpu.pc.valor.toString(2).padStart(8, "0")}</div>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-300 mb-1">Unidad de Control</div>
                  <div className="text-purple-400 font-mono text-sm">
                    IR: {cpu.ir.valor.toString(2).padStart(8, "0")}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-300 mb-1">MAR</div>
                    <div className="text-cyan-400 font-mono text-sm">{cpu.mar.valor.toString(2).padStart(8, "0")}</div>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-300 mb-1">MBR</div>
                    <div className="text-cyan-400 font-mono text-sm">{cpu.mbr.valor.toString(2).padStart(8, "0")}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Bus */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-yellow-400">Bus del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-300 mb-1">Bus de Datos</div>
                  <div className="text-yellow-400 font-mono text-sm">{bus.dato.toString(2).padStart(8, "0")}</div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-300 mb-1">Bus de Direcciones</div>
                  <div className="text-yellow-400 font-mono text-sm">{bus.direccion.toString(2).padStart(8, "0")}</div>
                </div>
                {/* El bus de control puede ser más complejo, agrega aquí si lo modelas */}
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <div className="text-xs text-slate-300 mb-1">Bus de Control</div>
                  <div className="text-yellow-400 font-mono text-sm">---</div>
                </div>
              </CardContent>
            </Card>

            {/* Main Memory */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-green-400">Memoria Principal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-700/30 p-4 rounded-lg h-32 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-slate-400 text-sm mb-2">Espacio de Memoria</div>
                    <div className="text-green-400 font-mono">{memoria.memoria.length} celdas × 8 bits</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Memory and Instructions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Data Memory */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-blue-400">Memoria de Datos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="font-semibold text-slate-300 p-2">Posición</div>
                      <div className="font-semibold text-slate-300 p-2">Dato</div>
                      {memoria.memoria.slice(0, 16).map((dato, index) => (
                        <div key={index} className="contents">
                          <div className="p-2 bg-slate-700/30 rounded font-mono text-slate-400">
                            {index.toString(2).padStart(8, "0")}
                          </div>
                          <div className="p-2 bg-slate-700/30 rounded font-mono text-blue-400">
                            {dato.toString(2).padStart(8, "0")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-orange-400">Ingreso de Instrucciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full mb-4 bg-slate-900/60 rounded p-2 text-xs text-orange-200 font-mono"
                    rows={4}
                    placeholder="Ej: 00000001&#10;00100010&#10;01000011&#10;11100000"
                    value={programInput}
                    onChange={e => setProgramInput(e.target.value)}
                    disabled={isRunning}
                  />
                  <Button className="w-full mb-2 bg-blue-700" onClick={handleLoadProgram} disabled={isRunning}>
                    Cargar Programa
                  </Button>
                  <Separator className="my-2" />
                  <div className="space-y-2 mb-4">
                    {instrucciones.map((instruction, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded font-mono text-sm ${
                          index === currentInstructionIdx - 1 ? "bg-orange-500/20 border border-orange-500" : "bg-slate-700/30"
                        }`}
                      >
                        <Badge variant="outline" className="mr-2 text-xs">
                          {index}
                        </Badge>
                        <span className="text-orange-300">{instruction}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <div className="text-xs text-slate-300 mb-1">Instrucción Actual</div>
                    <div className="text-orange-400 font-mono">
                      {instrucciones[currentInstructionIdx - 1] || "Ninguna"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Execution Timeline & Controls */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-pink-400">Tiempo de Ejecución</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: 11 }, (_, i) => (
                      <div key={i} className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-mono ${
                            i <= executionTime
                              ? "bg-pink-500 border-pink-500 text-white"
                              : "border-slate-600 text-slate-400"
                          }`}
                        >
                          {i}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator className="my-4" />

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setIsRunning(!isRunning)}
                      disabled={currentInstructionIdx >= instrucciones.length || cpu.halted}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isRunning ? "Pausar" : "Ejecutar"}
                    </Button>

                    <Button
                      onClick={ejecutarCiclo}
                      disabled={isRunning || currentInstructionIdx >= instrucciones.length || cpu.halted}
                      variant="outline"
                    >
                      Paso a Paso
                    </Button>

                    <Button
                      onClick={reset}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <div className="text-right">
                    <div className="text-sm text-slate-400">Ciclos: {executionTime}</div>
                    <div className="text-sm text-slate-400">
                      Instrucción: {currentInstructionIdx}/{instrucciones.length}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
