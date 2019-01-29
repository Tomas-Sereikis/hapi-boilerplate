/**
 * @see https://stackoverflow.com/questions/48215950/exclude-property-from-type
 */
export type Omit<T, K extends keyof T> = Pick<T, ({ [P in keyof T]: P } & { [P in K]: never })[keyof T]>
