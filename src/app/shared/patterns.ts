interface Pattern {
  emailValidatorRegex: string;
}
export const pattern: Pattern = {
  emailValidatorRegex: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
};
