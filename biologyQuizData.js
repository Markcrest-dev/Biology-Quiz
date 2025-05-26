// Quiz questions database with emojis
const quizData = {
  easy: [
    {
      question: "🔬 What is the basic unit of life?",
      options: ["Cell", "Atom", "Molecule", "Tissue"],
      correct: 0,
      emoji: "🦠"
    },
    {
      question: "🌱 What do plants need for photosynthesis?",
      options: ["Sunlight and water", "Darkness and water", "Just water", "Just sunlight"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🦁 Which group do lions belong to?",
      options: ["Mammals", "Reptiles", "Birds", "Fish"],
      correct: 0,
      emoji: "🦁"
    },
    {
      question: "🌿 Which organisms need oxygen to survive?",
      options: ["Both plants and animals", "Only animals", "Only plants", "Neither plants nor animals"],
      correct: 0,
      emoji: "🫁"
    },
    {
      question: "🌱 Where does photosynthesis occur in plants?",
      options: ["Chloroplasts", "Nucleus", "Mitochondria", "Vacuole"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🦠 What do cells need to produce energy?",
      options: ["Nutrients and oxygen", "Only water", "Only sunlight", "Only carbon dioxide"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🔬 Which part of the cell contains genetic material?",
      options: ["Nucleus", "Cell membrane", "Cytoplasm", "Vacuole"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🌱 What color light is best for photosynthesis?",
      options: ["Red light", "Green light", "Blue light", "Yellow light"],
      correct: 0,
      emoji: "🌞"
    },
    {
      question: "🦠 What protects the cell and controls what enters and exits?",
      options: ["Cell membrane", "Cell wall", "Nucleus", "Cytoplasm"],
      correct: 0,
      emoji: "🛡️"
    },
    {
      question: "🌿 What gas do plants take in during photosynthesis?",
      options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      correct: 0,
      emoji: "💨"
    }
  ],
  medium: [
    {
      question: "🧬 Which organelle contains DNA?",
      options: ["Nucleus", "Vacuole", "Ribosome", "Golgi body"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🌿 What gas do plants release during photosynthesis?",
      options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      correct: 0,
      emoji: "🌱"
    },
    {
      question: "🦠 What type of organism is bacteria?",
      options: ["Prokaryote", "Eukaryote", "Virus", "Fungus"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🧬 Where are photosynthetic pigments located in chloroplasts?",
      options: ["Thylakoids", "Cell wall", "Matrix", "Envelope"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "⚡ What organelle is responsible for cellular respiration?",
      options: ["Mitochondria", "Chloroplast", "Ribosome", "Golgi body"],
      correct: 0,
      emoji: "🔋"
    },
    {
      question: "🔬 What is the main function of chloroplasts?",
      options: ["Photosynthesis", "Protein synthesis", "Energy storage", "Waste removal"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "🧬 Which structure produces proteins in the cell?",
      options: ["Ribosomes", "Nucleus", "Mitochondria", "Vacuole"],
      correct: 0,
      emoji: "🏭"
    },
    {
      question: "🦠 What is the main difference between plant and animal cells?",
      options: ["Cell wall presence", "Nucleus presence", "DNA presence", "Membrane presence"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🌿 What happens during the light-dependent reactions of photosynthesis?",
      options: ["Water splits into H+ and O2", "Glucose is produced", "CO2 is fixed", "ATP is broken down"],
      correct: 0,
      emoji: "☀️"
    },
    {
      question: "🧬 What is the function of the cell membrane?",
      options: ["Selective transport", "Energy production", "Protein synthesis", "Waste storage"],
      correct: 0,
      emoji: "🚪"
    }
  ],
  hard: [
    {
      question: "🧬 What is the process of DNA replication?",
      options: ["Semi-conservative", "Conservative", "Dispersive", "Random"],
      correct: 0,
      emoji: "🧬"
    },
    {
      question: "🔬 Which phase of mitosis comes first?",
      options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
      correct: 0,
      emoji: "🔬"
    },
    {
      question: "🦠 What is the function of ATP synthase?",
      options: ["Energy production", "Protein synthesis", "Cell division", "DNA replication"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🧬 What is the role of enzymes in photosynthesis?",
      options: ["Catalyze reactions", "Store energy", "Transport minerals", "Produce oxygen"],
      correct: 0,
      emoji: "⚗️"
    },
    {
      question: "🔬 What happens during the Calvin cycle?",
      options: ["CO2 fixation", "O2 production", "Water splitting", "ATP synthesis"],
      correct: 0,
      emoji: "🌿"
    },
    {
      question: "⚡ What is the electron transport chain's function?",
      options: ["ATP synthesis", "Glucose breakdown", "Protein synthesis", "DNA replication"],
      correct: 0,
      emoji: "⛓️"
    },
    {
      question: "🧬 What is the role of NADPH in photosynthesis?",
      options: ["Electron carrier", "Energy storage", "Oxygen transport", "Carbon fixation"],
      correct: 0,
      emoji: "🔋"
    },
    {
      question: "🔬 What is the function of thylakoid membranes?",
      options: ["Light absorption", "Sugar storage", "Protein synthesis", "Waste removal"],
      correct: 0,
      emoji: "📡"
    },
    {
      question: "🦠 What is the chemiosmotic theory?",
      options: ["Proton gradient drives ATP synthesis", "DNA replication method", "Cell division process", "Protein folding mechanism"],
      correct: 0,
      emoji: "⚡"
    },
    {
      question: "🧬 What is the role of rubisco enzyme?",
      options: ["CO2 fixation", "O2 production", "ATP synthesis", "Glucose breakdown"],
      correct: 0,
      emoji: "🌿"
    }
  ]
};

// Expose quiz data for subjectQuiz.js
window.biologyQuizData = quizData;