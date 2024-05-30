type RelationShip = {
  connect: {
    id: number;
  };
};

export function getRelationUpdate(
  id: number | undefined,
): RelationShip | undefined {
  return id ? { connect: { id } } : undefined;
}

export function transformToInt(value: any) {
  return typeof value === 'string' ? parseFloat(value) : value;
}
