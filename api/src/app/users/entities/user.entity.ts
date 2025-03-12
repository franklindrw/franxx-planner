export class IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  picture: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  picture: string;
  googleId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.picture = user.picture;
    this.googleId = user.googleId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
