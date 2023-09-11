export function validateEmailAndPassword(email, password) {
  const email_respose = validateEmail(email);
  const password_respose = validatePassword(password);

  return {
    status: email_respose.status && password_respose.status,
    errors: [...email_respose.errors, ...password_respose.errors],
  };
}

export function validateEmailAndPasswordAndRepaet(
  email,
  password,
  repeat_password
) {
  const email_respose = validateEmail(email);
  const password_respose = validatePassword(password);
  const repeat_password_respose = validateRepeatPassword(
    password,
    repeat_password
  );

  return {
    status:
      email_respose.status &&
      password_respose.status &&
      repeat_password_respose.status,
    errors: [
      ...email_respose.errors,
      ...password_respose.errors,
      ...repeat_password_respose.errors,
    ],
  };
}

export function validateEmail(email) {
  const errors = [];
  console.log(email);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.match(emailRegex)) {
    errors.push("El correo electrónico no es válido");
  }

  const isValid = errors.length === 0;

  return {
    status: isValid,
    errors,
  };
}

export function validatePassword(password) {
  const errors = [];

  if (password.length < 6) {
    errors.push("La contraseña debe tener al menos 6 caracteres");
  }

  const isValid = errors.length === 0;

  return {
    status: isValid,
    errors,
  };
}

export function validateRepeatPassword(password, repeat_password) {
  const errors = [];

  if (password !== repeat_password) {
    errors.push("Las contraseñas deben ser iguales!");
  }

  const isValid = errors.length === 0;

  return {
    status: isValid,
    errors,
  };
}