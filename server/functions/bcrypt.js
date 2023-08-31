import bcryptjs from "bcryptjs";

export const SifrarPassword = (password) => {
  const saltRounds = 10;
  const hashedPassword = bcryptjs.hashSync(password, saltRounds);

  return {
    password_hash: hashedPassword.slice(0, 20),
    salt: saltRounds,
  };
};

export const ComprobarPassword = (password , oldpassword) => {
  let valor = undefined;
  bcryptjs.compare(password , oldpassword, function (err, result) {
    if (err) throw err;
    valor = result;
  });

  return valor;
};
