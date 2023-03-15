import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PrismaService } from "src/database";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {

  constructor(private readonly prisma: PrismaService) { }

  async validate(value: any, validationArguments?: ValidationArguments) {
    return this.prisma.user
      .findFirst({ where: { email: value } })
      .then((user) => {
        if (user) {
          throw new UnprocessableEntityException('O e-mail informado já existe.');
        } else {
          return true;
        }
      });
  }
}

export const EmailIsUnique = (validationOptions: ValidationOptions) => {
  return (object: Object, prop: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: prop,
      options: validationOptions,
      constraints: [],
      validator: EmailIsUniqueValidator
    })
  }
}