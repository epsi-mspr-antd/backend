interface UserI {
  id: number;

  email: string;

  roles: string[];
}

export interface UserRO {
  data: UserI;
}

export interface UsersRO {
  data: UserI[];
}
