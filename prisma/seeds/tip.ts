export const tip = [
    // Un tip pour le premier utilisateur (user 1)
    {
      description: "Arrosez la rose deux fois par semaine pour maintenir le sol humide.",
      plant: { connect: { id: 1 } },
      user: { connect: { id: 1 } },
    },
    // Aucun tip pour le deuxième utilisateur (user 2)
    // Plusieurs tips pour le troisième utilisateur (user 3)
    {
      description: "Le tournesol a besoin de beaucoup de soleil et d'espace pour grandir.",
      plant: { connect: { id: 3 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "Taillez les marguerites régulièrement pour encourager une nouvelle floraison.",
      plant: { connect: { id: 4 } },
      user: { connect: { id: 3 } },
    },
    // Plusieurs tips pour le quatrième utilisateur (user 4)
    {
      description: "Les lys préfèrent un sol légèrement acide et bien drainé.",
      plant: { connect: { id: 5 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Les orchidées nécessitent une humidité élevée et une lumière indirecte.",
      plant: { connect: { id: 6 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "La lavande doit être taillée après la floraison pour maintenir une forme compacte.",
      plant: { connect: { id: 7 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Plantez les soucis dans un endroit ensoleillé avec un sol bien drainé.",
      plant: { connect: { id: 8 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Les pivoines doivent être plantées dans un endroit ensoleillé et à l'abri du vent.",
      plant: { connect: { id: 9 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Les chrysanthèmes nécessitent une lumière vive et un sol riche en matière organique.",
      plant: { connect: { id: 10 } },
      user: { connect: { id: 4 } },
    },
    // Plantes avec plusieurs tips
    {
      description: "Les roses ont besoin d'une taille régulière pour fleurir abondamment.",
      plant: { connect: { id: 1 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "Utilisez de l'engrais spécifique pour les tournesols pour de meilleures floraisons.",
      plant: { connect: { id: 3 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Les lys bénéficient d'une fertilisation légère au début du printemps.",
      plant: { connect: { id: 5 } },
      user: { connect: { id: 4 } },
    },
    {
      description: "Les orchidées doivent être rempotées tous les deux ans pour éviter la pourriture des racines.",
      plant: { connect: { id: 6 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "La lavande attire les pollinisateurs, idéale pour un jardin biodiverse.",
      plant: { connect: { id: 7 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "Les soucis éloignent certains parasites du jardin, plantés comme bordure.",
      plant: { connect: { id: 8 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "Paillez les pivoines pour conserver l'humidité et réduire les mauvaises herbes.",
      plant: { connect: { id: 9 } },
      user: { connect: { id: 3 } },
    },
    {
      description: "Les chrysanthèmes préfèrent un sol légèrement acide et bien drainé.",
      plant: { connect: { id: 10 } },
      user: { connect: { id: 3 } },
    },
  ];
  