import { genSalt, hash, compare } from "bcrypt";

export const hashPassword = async (plainTextPassword: string) => {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Hashing password failed");
  }
};

export const comparePassword = async (input: {
  plainTestPassword: string;
  hashedPassword: string;
}) => {
    
    console.log("input.hashedPassword", input.hashedPassword);
    console.log( "input.plainTestPassword", input.plainTestPassword);
  const isCompared = await compare(
    input.plainTestPassword,
    input.hashedPassword
   
  );
  console.log("isCompared", isCompared);
  return isCompared;
};
