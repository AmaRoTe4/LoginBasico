import bcryptjs from "bcryptjs";

export const SifrarPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcryptjs.hash(password, saltRounds);

  return {
    password_hash: hashedPassword,
    salt: saltRounds,
  };
};

export const ComprobarPassword = async (password, oldpassword) => {
  try{
    return await bcryptjs.compare(password, oldpassword);
  }  catch (error) {
    console.log(error)
    return false;
  }

};
