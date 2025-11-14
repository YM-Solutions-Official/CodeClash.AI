// /utils/regex.js

/**
 * @description Regular expression for validating names (letters and spaces only).
 */
export const nameRegex = /^[a-zA-Z\s]+$/;

/**
 * @description Regular expression for validating a 10-digit mobile number.
 */
export const mobileRegex = /^\d{10}$/;

/**
 * @description Regular expression for validating URLs.
 * This fixes the `no-useless-escape` error.
 */
export const urlRegex = /^(https?:\/\/)?([\w-])+\.([a-zA-Z]{2,63})([/\w-.]*)*\/?$/;
