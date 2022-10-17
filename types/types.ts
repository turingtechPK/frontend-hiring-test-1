export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>

export type Require<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>
