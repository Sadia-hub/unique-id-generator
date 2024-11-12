/**
 * Twitter's Snowflake ID Generator
 * 
 * A distributed unique ID generator inspired by Twitter's Snowflake system.
 * Generates 64-bit time-based, k-ordered unique identifiers suitable for distributed systems.
 * 
 * The generated IDs have the following structure (from left to right):
 * - 1 bit: Always 0 (reserved for future use/sign bit)
 * - 42 bits: Timestamp in milliseconds since custom epoch
 * - 5 bits: Datacenter ID (0-31)
 * - 5 bits: Machine/Worker ID (0-31)
 * - 12 bits: Sequence number (0-4095)
 * 
 * This structure allows for:
 * - 69 years of unique timestamps (with custom epoch)
 * - 32 datacenters
 * - 32 machines per datacenter
 * - 4096 unique IDs per millisecond per machine
 */

/** 
 * 5-bit datacenter identifier (0-31)
 * Used to identify different physical or logical datacenters
 */
const datacenterId: string = "00001";

/** 
 * 5-bit machine/worker identifier (0-31)
 * Used to identify different machines/processes within a datacenter
 */
const machineId: string = "00001";

/** 
 * 12-bit sequence number for IDs generated in the same millisecond
 * Allows for 4096 unique IDs per millisecond per machine
 */
let sequence: string = "000000000000";

/** 
 * Custom epoch timestamp (in milliseconds)
 * All timestamps are measured relative to this epoch
 * Current value represents: 2024-11-12T19:29:28.672Z
 */
const epochMilliseconds: number = 1731439768672;

/** 
 * Tracks the last processed second for sequence management
 * Used to reset sequence counter when moving to a new second
 */
let previousSecond: number = Math.floor(Date.now() / 1000);

/** 
 * Current sequence number within the same second
 * Increments for each ID generated within the same second
 */
let currentSequence: number = 0;

/**
 * Generates a unique Snowflake ID
 * 
 * The function:
 * 1. Calculates milliseconds since custom epoch
 * 2. Manages sequence numbers for IDs generated in the same millisecond
 * 3. Combines components into a binary string representation
 * 
 * @returns {string} A unique ID in the format "0-timestamp-datacenterId-machineId-sequence"
 * @example
 * // Returns something like: "0-000101011101011101010101-00001-00001-000000000001"
 * const id = generateId();
 * 
 * @throws {Error} Implicitly if sequence number overflows (resets to 0)
 */
function generateId(): string {
    // Step 1: Get the current time in milliseconds since the custom epoch
    const timestamp: number = Date.now() - epochMilliseconds;

    // Step 2: Get the current second (floor to second precision)
    const currentSecond: number = Math.floor(Date.now() / 1000);

    // Step 3: Check if the second has changed
    if (currentSecond !== previousSecond) {
        console.log("Second has changed");
        // Reset the sequence if the second has changed
        currentSequence = 0;
        previousSecond = currentSecond;
    } else {
        // Increment the sequence number (if within the same second)
        currentSequence++;
        if (currentSequence >= 4096) {
            // If sequence exceeds 12 bits (4095), reset or handle overflow
            currentSequence = 0; // Or other handling for overflow
        }
    }

    // Step 4: Convert the timestamp to binary (42 bits)
    const timestampBinary: string = (timestamp).toString(2).padStart(42, "0");

    // Step 5: Convert the sequence to binary (12 bits)
    const sequenceBinary: string = currentSequence.toString(2).padStart(12, "0");

    // Return the generated ID in the format "0-timestamp-datacenterId-machineId-sequence"
    return `0-${timestampBinary}-${datacenterId}-${machineId}-${sequenceBinary}`;
}

// Example usage of generating IDs
setInterval(() => {
    const id: string = generateId();
    console.log(id);
}, 100); // Generate a new ID every 100 ms (for testing)
