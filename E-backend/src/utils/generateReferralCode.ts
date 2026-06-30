export const generateReferralCode = (name: string): string => {
  // Remove spaces and take first 5 characters
  const prefix = name.replace(/\s+/g, "").substring(0, 5).toUpperCase();

  // Generate random 4-character code
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${prefix}${random}`;
};
