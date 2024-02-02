interface User {
  id: number;

  email: string;

  roles: string[];
}

export interface UserRO {
  data: User;
}

export interface UsersRO {
  data: User[];
}
