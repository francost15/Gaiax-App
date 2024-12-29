export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length > 6) strength += 20;
  if (password.match(/[a-z]+/)) strength += 20;
  if (password.match(/[A-Z]+/)) strength += 20;
  if (password.match(/[0-9]+/)) strength += 20;
  if (password.match(/[$@#&!]+/)) strength += 20;
  return strength;
};
