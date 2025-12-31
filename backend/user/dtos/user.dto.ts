import { UserType } from "../enum/user-type.enum";

export type UserDto = {
  id: string;
  username: string;
  isOnline: boolean;
  type: UserType;
  socketId: string;
  createdAt: Date;
  updatedAt: Date;
};
