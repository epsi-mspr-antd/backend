import { Roles } from '../../src/user/types/roles.type';

export const users = [
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
];
