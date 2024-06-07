import { Roles } from '../../src/user/types/roles.type';

export const users = [
  {
    pseudo: 'MegaModerator',
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
    pseudo: 'GreenThumb',
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
    pseudo: 'PetalProtector',
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
    pseudo: 'GiggleMuffin',
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
