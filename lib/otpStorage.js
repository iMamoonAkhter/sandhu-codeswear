// lib/otpStorage.js
const otpStorage = new Map();

export const storeOtp = (email, data) => {
  otpStorage.set(email, data);
};

export const getOtp = (email) => {
  return otpStorage.get(email);
};

export const deleteOtp = (email) => {
  otpStorage.delete(email);
};

