import { registerDecorator } from 'class-validator';

const ERROR_MESSAGE =
  "the password doesn't conform to the specified constraints";

const VALIDATE = (value: string): boolean => {
  const PASSWORD_PATTERN =
    /(?=(.*[a-z]){2,})(?=(.*[A-Z]){2,})(?=(.*\d){2,})(?=(.*[@#$%^&*]){2,}).{12,32}/;

  return PASSWORD_PATTERN.test(value);
};

export function IsPasswordValid(): (
  object: object,
  propertyName: string,
) => void {
  return (object: object, propertyName: string): void => {
    registerDecorator({
      name: 'isPasswordValid',
      target: object.constructor,
      propertyName,
      options: {
        message: ERROR_MESSAGE,
      },
      validator: {
        validate: VALIDATE,
      },
    });
  };
}
