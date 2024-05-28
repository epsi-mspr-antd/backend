import { Roles } from '../../src/user/types/roles.type';

export const users = [
  {
    pseudo: 'test',
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
    pseudo: 'botanist',
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
    pseudo: 'gardian',
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
    pseudo: 'owner',
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
