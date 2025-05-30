export const ModoDireccionamiento = {
    DIRECT: 0,
    INDIRECT: 1,
    IMMEDIATE: 2,
    REGISTER: 3
} as const;


export type ModoDireccionamiento = typeof ModoDireccionamiento[keyof typeof ModoDireccionamiento];