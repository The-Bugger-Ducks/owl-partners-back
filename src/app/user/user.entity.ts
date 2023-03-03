import { randomUUID } from "node:crypto";
import { Replace } from "src/utils/Replace";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export class UserEntity {
  private readonly _id: string;
  private readonly props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date }>,
    id?: string
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.name;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get email() {
    return this.email;
  }

  public set email(email: string) {
    this.props.email = email;
  }


  public get password() {
    return this.password;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get createdAt() {
    return this.createdAt;
  }
}