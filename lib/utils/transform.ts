/**
 * Utilities for transforming object keys between snake_case and camelCase
 * Useful for converting API responses (snake_case) to frontend format (camelCase)
 */

/**
 * Type helper to convert snake_case string to camelCase
 */
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

/**
 * Type helper to convert camelCase string to snake_case
 */
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? T extends Capitalize<T>
    ? `_${Lowercase<T>}${CamelToSnakeCase<U>}`
    : `${T}${CamelToSnakeCase<U>}`
  : S;

/**
 * Type helper to recursively convert object keys from snake_case to camelCase
 */
export type CamelCaseKeys<T> =
  T extends Array<infer U>
    ? Array<CamelCaseKeys<U>>
    : T extends object
      ? {
          [K in keyof T as K extends string ? SnakeToCamelCase<K> : K]: CamelCaseKeys<T[K]>;
        }
      : T;

/**
 * Type helper to recursively convert object keys from camelCase to snake_case
 */
export type SnakeCaseKeys<T> =
  T extends Array<infer U>
    ? Array<SnakeCaseKeys<U>>
    : T extends object
      ? {
          [K in keyof T as K extends string ? CamelToSnakeCase<K> : K]: SnakeCaseKeys<T[K]>;
        }
      : T;

/**
 * Convert a snake_case string to camelCase
 * @param str - The snake_case string to convert
 * @returns The camelCase version of the string
 *
 * @example
 * toCamelCase("hello_world") // "helloWorld"
 * toCamelCase("user_first_name") // "userFirstName"
 */
export function toCamelCase(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

/**
 * Convert a camelCase string to snake_case
 * @param str - The camelCase string to convert
 * @returns The snake_case version of the string
 *
 * @example
 * toSnakeCase("helloWorld") // "hello_world"
 * toSnakeCase("userFirstName") // "user_first_name"
 */
export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

/**
 * Check if a value is a plain object (not null, array, Date, etc.)
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof RegExp)
  );
}

/**
 * Recursively transform all keys in an object using a transformer function
 * @param obj - The object to transform
 * @param transformer - The function to apply to each key
 * @returns A new object with transformed keys
 *
 * @example
 * transformKeys({ user_name: "John" }, toCamelCase)
 * // { userName: "John" }
 */
export function transformKeys<T>(obj: T, transformer: (key: string) => string): T {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeys(item, transformer)) as T;
  }

  if (!isPlainObject(obj)) {
    return obj;
  }

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const transformedKey = transformer(key);
    result[transformedKey] = transformKeys(value, transformer);
  }

  return result as T;
}

/**
 * Convert all keys in an object from snake_case to camelCase (recursively)
 * @param obj - The object with snake_case keys
 * @returns A new object with camelCase keys
 *
 * @example
 * snakeToCamel({ user_name: "John", created_at: "2024-01-01" })
 * // { userName: "John", createdAt: "2024-01-01" }
 */
export function snakeToCamel<T>(obj: T): CamelCaseKeys<T> {
  return transformKeys(obj, toCamelCase) as CamelCaseKeys<T>;
}

/**
 * Convert all keys in an object from camelCase to snake_case (recursively)
 * @param obj - The object with camelCase keys
 * @returns A new object with snake_case keys
 *
 * @example
 * camelToSnake({ userName: "John", createdAt: "2024-01-01" })
 * // { user_name: "John", created_at: "2024-01-01" }
 */
export function camelToSnake<T>(obj: T): SnakeCaseKeys<T> {
  return transformKeys(obj, toSnakeCase) as SnakeCaseKeys<T>;
}
