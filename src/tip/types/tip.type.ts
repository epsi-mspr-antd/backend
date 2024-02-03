interface TipI {
  id: number;

  description: string;

  createdAt: Date;

  updatedAt: Date;
}

export interface TipRO {
  data: TipI;
}

export interface TipsRO {
  data: TipI[];
}
