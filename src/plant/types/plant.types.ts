import { PlantSpeciesI } from 'src/plant-species/types';
import { PlantStatusI } from 'src/plant-status/types';

interface GuardI {
  id: number;
  email: string;
  pseudo: string;
}

interface PlantI {
  id: number;

  name: string;

  species: PlantSpeciesI;

  status: PlantStatusI;

  guard?: GuardI;
}

export interface PlantRO {
  data: PlantI;
}

export interface PlantsRO {
  data: PlantI[];
}
