import bcryptjs from "bcryptjs";

// Hash text using bcrypt
export const hashTextGeneration = async (text: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(text, salt);
};

// Compare hash (will be needed for login)
export const compareHash = async (text: string, hash: string): Promise<boolean> => {
  return await bcryptjs.compare(text, hash);
};