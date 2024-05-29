import { PrismaClient } from '@prisma/client';
import { users } from './users.seed';
import * as bcrypt from 'bcrypt';
import { plantSpecies } from './plant-species';
import { plantStatuses } from './plant-statuses';
import { plant } from './plant';
import { address } from './address';
import { tip } from './tip';

const prisma = new PrismaClient();

load();

async function load() {
  try {
    for (const item of users) {
      await prisma.user.create({
        data: {
          ...item,
          password: await bcrypt.hash(item.password, 10),
        },
      });
    }

    for (const item of plantSpecies) {
      await prisma.plantSpecies.create({
        data: item,
      });
    }

    for (const item of plantStatuses) {
      await prisma.plantStatus.create({
        data: item,
      });
    }

    for (const item of address) {
      await prisma.address.create({
        data: item,
      });
    }

    for (const item of plant) {
      await prisma.plant.create({
        data: item,
      });
    }

    for (const item of tip) {
      await prisma.tip.create({
        data: item,
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
