export enum PasswordHint {
  MinLength = 0,
  Uppercase = 1,
  Lowercase = 2,
  SpecialChar = 3,
  Number = 4,
}

export interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'f' | 'm' | 'u';
  email: string;
  password: string;
}
