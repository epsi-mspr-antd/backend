type User = {
  id: number;

  email: string;

  roles: string[];
};

export type UserRO = {
  data: User;
};

export type UsersRO = {
  data: User[];
};
