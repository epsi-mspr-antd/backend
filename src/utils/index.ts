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
