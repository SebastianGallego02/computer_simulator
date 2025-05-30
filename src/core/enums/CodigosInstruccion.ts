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