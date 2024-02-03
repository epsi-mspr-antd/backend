import { PlantSpeciesI } from 'src/plant-species/types';
import { PlantStatusI } from 'src/plant-status/types';

interface PlantI {
  id: number;

  name: string;

  species: PlantSpeciesI;

  status: PlantStatusI;
}

export interface PlantRO {
  data: PlantI;
}

export interface PlantsRO {
  data: PlantI[];
}
