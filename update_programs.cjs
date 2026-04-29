const fs = require('fs');

const data = JSON.parse(fs.readFileSync('src/lib/programs.json', 'utf8'));

// Augment each program with some mock exercises and days
const enriched = data.map(p => ({
  ...p,
  insight: `Based on your CNS recovery metrics and sleep quality, today is optimized for ${p.tag}. Focus on tempo and mind-muscle connection.`,
  days: [
    { day: 1, title: p.tag === 'HYPERTROPHY' ? 'Push & Core' : (p.tag === 'STRENGTH' ? 'Heavy Squat' : 'Full Body'), isToday: true, isEmpty: false },
    { day: 2, title: p.tag === 'MOBILITY' ? 'Active Recovery' : 'Pull & Arms', isToday: false, isEmpty: false },
    { day: 3, title: 'Legs', isToday: false, isEmpty: false },
    { day: 4, title: 'Conditioning', isToday: false, isEmpty: false },
    { day: 5, title: '', isToday: false, isEmpty: true },
  ],
  exercises: [
    {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80&auto=format&fit=crop",
      name: `Primary ${p.tag} Move`,
      target: "Primary Movers • Tempo 3-1-1",
      sets: "4 × 8-10",
      rpe: 8.5
    },
    {
       image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=100&q=80&auto=format&fit=crop",
       name: `Secondary ${p.tag} Drill`,
       target: "Secondary • 2s Squeeze",
       sets: "3 × AMRAP",
       rpe: 9.0
    },
    {
       image: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=100&q=80&auto=format&fit=crop",
       name: `Accessory Hold`,
       target: "Support • Hold",
       sets: "4 × 12",
       rpe: 8.0
    }
  ]
}));

// Let's also add Metabolic Conditioning 2.0 to the list so its Hero button points somewhere valid
enriched.unshift({
    title: "Metabolic Conditioning 2.0",
    tag: "CONDITIONING",
    image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&q=80&w=1200",
    description: "The flagship engine optimization program for advanced endurance and fat oxidation.",
    level: "ELITE",
    duration: "12 WKS",
    progress: 25,
    insight: "High output required today. Ensure glycogen layers are fully fueled.",
    days: [
        { day: 1, title: 'Anaerobic Threshold', isToday: true, isEmpty: false },
        { day: 2, title: 'Zone 2 Base', isToday: false, isEmpty: false },
        { day: 3, title: 'Active Recovery', isToday: false, isEmpty: false },
        { day: 4, title: 'VO2 Max Intervals', isToday: false, isEmpty: false },
        { day: 5, title: '', isToday: false, isEmpty: true }
    ],
    exercises: [
        {
          image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?w=100&q=80&auto=format&fit=crop",
          name: "Assault Bike Sprints",
          target: "Full Body • Max Wattage",
          sets: "10 × 30s",
          rpe: 9.5
        },
        {
          image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80&auto=format&fit=crop",
          name: "Kettlebell Swings",
          target: "Posterior Chain",
          sets: "4 × 25",
          rpe: 8.0
        }
    ]
});

fs.writeFileSync('src/lib/programs.json', JSON.stringify(enriched, null, 2));

console.log('Updated programs.json');
