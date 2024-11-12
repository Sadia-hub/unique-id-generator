"use strict";
console.log("Twitter's snowflake id generator");
// Datacenter and Machine IDs (can be set dynamically)
const datacenterId = "00001";
const machineId = "00001";
// Sequence (12-bit binary number), initialized to 0
let sequence = "000000000000";
// My custom epoch (timestamp in milliseconds)
const epochMilliseconds = 1731439768672; // UTC Time: 2024-11-12T19:29:28.672Z
// Track the previous second and the current sequence value
let previousSecond = Math.floor(Date.now() / 1000);
let currentSequence = 0;
function generateId() {
    // Step 1: Get the current time in milliseconds since the custom epoch
    const timestamp = Date.now() - epochMilliseconds;
    // Step 2: Get the current second (floor to second precision)
    const currentSecond = Math.floor(Date.now() / 1000);
    // Step 3: Check if the second has changed
    if (currentSecond !== previousSecond) {
        console.log("Second has changed");
        // Reset the sequence if the second has changed
        currentSequence = 0;
        previousSecond = currentSecond;
    }
    else {
        // Increment the sequence number (if within the same second)
        currentSequence++;
        if (currentSequence >= 4096) {
            // If sequence exceeds 12 bits (4095), reset or handle overflow
            currentSequence = 0; // Or other handling for overflow
        }
    }
    // Step 4: Convert the timestamp to binary (42 bits)
    const timestampBinary = (timestamp).toString(2).padStart(42, "0");
    // Step 5: Convert the sequence to binary (12 bits)
    const sequenceBinary = currentSequence.toString(2).padStart(12, "0");
    // Return the generated ID in the format "0-timestamp-datacenterId-machineId-sequence"
    return `0-${timestampBinary}-${datacenterId}-${machineId}-${sequenceBinary}`;
}
// Example usage of generating IDs
setInterval(() => {
    const id = generateId();
    console.log(id);
}, 100); // Generate a new ID every 100 ms (for testing)
