export const TipoOperacion = {
  ADD: "ADD",
  SUB: "SUB",
  AND: "AND",
  OR: "OR",
  XOR: "XOR",
  NOT: "NOT",
  INC: "INC",
  DEC: "DEC"
} as const;

export type TipoOperacion = typeof TipoOperacion[keyof typeof TipoOperacion];
