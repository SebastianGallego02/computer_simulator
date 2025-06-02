export const CodigosInstruccion = {
    LOAD: "LOAD",
    STORE: "STORE",
    ADD: "ADD",
    SUB: "SUB",
    JMP: "JMP",
    JZ: "JZ",
    JNZ: "JNZ",
    NOP: "NOP",
    HALT: "HALT"
} as const;

export type CodigosInstruccion = typeof CodigosInstruccion[keyof typeof CodigosInstruccion];


export const opcodeToInstruction: CodigosInstruccion[] = [
  CodigosInstruccion.NOP,   // 0 - 000
  CodigosInstruccion.LOAD,  // 1 - 001
  CodigosInstruccion.STORE, // 2 - 010
  CodigosInstruccion.ADD,   // 3 - 011
  CodigosInstruccion.SUB,   // 4 - 100
  CodigosInstruccion.JMP,   // 5 - 101
  CodigosInstruccion.JZ,    // 6 - 110
  CodigosInstruccion.HALT,  // 7 - 111
]
