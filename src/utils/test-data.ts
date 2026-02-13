import { faker } from '@faker-js/faker';
import type { RegistrationData } from '@app-types/index';

export function generateRegistrationData(
  overrides?: Partial<RegistrationData>,
): RegistrationData {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date
      .birthdate({ min: 18, max: 65, mode: 'age' })
      .toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    gender: faker.helpers.arrayElement(['f', 'm', 'u'] as const),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 12, prefix: 'A1!' }),
    ...overrides,
  };
}
