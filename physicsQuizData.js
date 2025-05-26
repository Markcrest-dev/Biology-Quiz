const physicsQuizData = {
  easy: [
    {
      question: "What is the SI unit of force?",
      options: ["Newton", "Joule", "Watt", "Pascal"],
      correct: 0
    },
    {
      question: "Which type of energy does a moving object have?",
      options: ["Kinetic Energy", "Potential Energy", "Thermal Energy", "Chemical Energy"],
      correct: 0
    },
    {
      question: "What force pulls objects towards the Earth's center?",
      options: ["Gravity", "Friction", "Magnetic Force", "Electric Force"],
      correct: 0
    },
    {
      question: "What is speed?",
      options: ["Distance/Time", "Mass/Volume", "Force/Area", "Work/Time"],
      correct: 0
    },
    {
      question: "Which state of matter has a fixed volume but no fixed shape?",
      options: ["Liquid", "Solid", "Gas", "Plasma"],
      correct: 0
    },
    {
      question: "What type of energy is stored in objects due to their position?",
      options: ["Potential Energy", "Kinetic Energy", "Nuclear Energy", "Sound Energy"],
      correct: 0
    },
    {
      question: "What is the basic unit of electric current?",
      options: ["Ampere", "Volt", "Watt", "Ohm"],
      correct: 0
    },
    {
      question: "Which force opposes motion between surfaces?",
      options: ["Friction", "Gravity", "Tension", "Normal Force"],
      correct: 0
    },
    {
      question: "What is the SI unit of power?",
      options: ["Watt", "Joule", "Newton", "Pascal"],
      correct: 0
    },
    {
      question: "What happens to light when it hits a mirror?",
      options: ["Reflection", "Refraction", "Absorption", "Diffraction"],
      correct: 0
    }
  ],
  medium: [
    {
      question: "What is Newton's First Law also called?",
      options: ["Law of Inertia", "Law of Action-Reaction", "Law of Acceleration", "Law of Motion"],
      correct: 0
    },
    {
      question: "What is the formula for work?",
      options: ["Force × Distance", "Mass × Acceleration", "Mass × Velocity", "Force × Time"],
      correct: 0
    },
    {
      question: "Which wave type needs a medium to travel?",
      options: ["Mechanical Waves", "Light Waves", "Radio Waves", "X-rays"],
      correct: 0
    },
    {
      question: "What is the unit of electric potential difference?",
      options: ["Volt", "Ampere", "Ohm", "Watt"],
      correct: 0
    },
    {
      question: "What happens to pressure as depth increases in a fluid?",
      options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
      correct: 0
    },
    {
      question: "What is the principle behind a floating object?",
      options: ["Buoyancy", "Gravity", "Friction", "Tension"],
      correct: 0
    },
    {
      question: "What is the relationship between current and voltage in Ohm's Law?",
      options: ["V = IR", "P = IV", "F = ma", "E = mc²"],
      correct: 0
    },
    {
      question: "What type of lens is used to correct far-sightedness?",
      options: ["Convex", "Concave", "Plane", "Cylindrical"],
      correct: 0
    },
    {
      question: "What is the SI unit of frequency?",
      options: ["Hertz", "Second", "Meter", "Joule"],
      correct: 0
    },
    {
      question: "What is the principle of conservation of energy?",
      options: ["Energy cannot be created or destroyed", "Energy can be created", "Energy can be destroyed", "Energy remains constant"],
      correct: 0
    }
  ],
  hard: [
    {
      question: "What is the equation for Einstein's mass-energy equivalence?",
      options: ["E = mc²", "F = ma", "P = mv", "K = ½mv²"],
      correct: 0
    },
    {
      question: "What is the Heisenberg Uncertainty Principle about?",
      options: ["Position and momentum precision", "Mass and energy", "Time and space", "Force and acceleration"],
      correct: 0
    },
    {
      question: "What is the First Law of Thermodynamics?",
      options: ["Conservation of energy", "Entropy increases", "Heat flows", "Work done"],
      correct: 0
    },
    {
      question: "What is quantum entanglement?",
      options: ["Particles linked regardless of distance", "Particle spin", "Wave function", "Energy levels"],
      correct: 0
    },
    {
      question: "What is the Doppler Effect?",
      options: ["Change in wave frequency due to motion", "Light bending", "Sound absorption", "Wave interference"],
      correct: 0
    },
    {
      question: "What is Coulomb's Law about?",
      options: ["Electric force between charges", "Magnetic force", "Gravitational force", "Nuclear force"],
      correct: 0
    },
    {
      question: "What is the principle behind nuclear fusion?",
      options: ["Light nuclei combining", "Heavy nuclei splitting", "Electron capture", "Beta decay"],
      correct: 0
    },
    {
      question: "What is the significance of Planck's constant?",
      options: ["Quantum of action", "Speed of light", "Gravitational constant", "Electric charge"],
      correct: 0
    },
    {
      question: "What is the concept of wave-particle duality?",
      options: ["Matter exhibits both wave and particle properties", "Light reflection", "Sound propagation", "Heat transfer"],
      correct: 0
    },
    {
      question: "What is dark matter?",
      options: ["Invisible matter affecting gravity", "Black holes", "Empty space", "Star dust"],
      correct: 0
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { physicsQuizData };
}