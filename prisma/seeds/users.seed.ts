import { Roles } from '../../src/users/types/roles.type';

export const users = [
  {
    email: 'owner@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Roles.Owner,
        },
      ],
    },
  },
  {
    email: 'botanist@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Roles.Owner,
        },
        {
          name: Roles.Botanist,
        },
      ],
    },
  },
  {
    email: 'gardian@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Roles.Owner,
        },
        {
          name: Roles.Gardian,
        },
      ],
    },
  },
  {
    email: 'test@test.fr',
    password: 'Test123/',
    roles: {
      create: [
        {
          name: Roles.Owner,
        },
        {
          name: Roles.Botanist,
        },
        {
          name: Roles.Gardian,
        },
      ],
    },
  },
];
