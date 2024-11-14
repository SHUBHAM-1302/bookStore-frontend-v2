
/**
 * Enum to hold different log levels
 * @export
 * @enum {number}
 */


export enum LogLevel {
    Off = 0,        // 000000
    Debug = 1,      // 000001
    Info = 1 << 1,  // 000010
    Warn = 1 << 2,  // 000100
    Error = 1 << 3, // 001000
    Fatal = 1 << 4,  // 010000
    All = Debug + Info + Warn + Error + Fatal
}