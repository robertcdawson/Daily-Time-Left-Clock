// Define the times (using Date objects)
let wakeTime = new Date('2025-02-06T07:00:00');
let sleepTime = new Date('2025-02-06T23:00:00');
let currentTime = new Date('2025-02-06T15:00:00');

// Calculate the elapsed time and total awake time in milliseconds
let elapsedTime = currentTime - wakeTime;
let totalTime = sleepTime - wakeTime;

// Compute the fraction of the day that has passed
let fraction = elapsedTime / totalTime;  // 8 hours / 16 hours = 0.5

// Calculate the angle (in degrees)
let angle = fraction * 360;  // 0.5 * 360 = 180

console.log('Fraction of day elapsed:', fraction);  // 0.5
console.log('Angle for the sun:', angle);            // 180 degrees