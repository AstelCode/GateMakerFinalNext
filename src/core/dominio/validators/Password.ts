// Regex para: 1 mayúscula, 1 minúscula, 1 número, 1 carácter especial, min 8 caracteres
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export function isValidPassword(password?: string) {
  if (!password) return false;
  return passwordRegex.test(password);
}
