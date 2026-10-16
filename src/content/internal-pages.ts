import { placeholderMedia } from "@/content/homepage";

export const internalPageFacts = {
  school: [
    { label: "Location", value: "Padhar, District Betul" },
    { label: "Academic pattern", value: "CBSE Pattern" },
    { label: "Medium", value: "Hindi & English Medium" },
    { label: "Classes", value: "Nursery to Class 8" },
  ],
  academics: [
    { label: "Classes", value: "Nursery to Class 8" },
    { label: "Medium", value: "Hindi & English Medium" },
    { label: "Pattern", value: "CBSE Pattern" },
  ],
} as const;

export const internalAcademicStages = [
  {
    id: "early-years",
    number: "01",
    label: "Early Years",
    classes: ["Nursery", "LKG", "UKG"],
    title: "Curiosity gets a welcoming start.",
    description: "A foundational stage shaped around exploration, early language and numeracy, creativity, communication, and growing confidence.",
    focus: ["Exploration", "Foundational language", "Numeracy", "Creativity", "Communication", "Confidence"],
    media: placeholderMedia.activities,
  },
  {
    id: "primary",
    number: "02",
    label: "Primary",
    classes: ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5"],
    title: "Foundations take shape through participation.",
    description: "A stage that supports academic foundations alongside communication, conceptual learning, creativity, and collaboration.",
    focus: ["Academic foundations", "Communication", "Conceptual learning", "Creativity", "Collaboration"],
    media: placeholderMedia.classrooms,
  },
  {
    id: "middle-school",
    number: "03",
    label: "Middle School",
    classes: ["Class 6", "Class 7", "Class 8"],
    title: "Learning habits become more independent.",
    description: "A steady next stage for building stronger subject understanding, independent learning habits, communication, problem solving, and responsibility.",
    focus: ["Subject understanding", "Independent learning", "Communication", "Problem solving", "Responsibility"],
    media: placeholderMedia.smartClass,
  },
] as const;

export const internalLearningApproach = [
  "Concept-Based Learning",
  "Smart Classroom Learning",
  "Communication Skills",
  "Creative Activities",
  "Art & Craft",
  "Sports",
  "Team Activities",
  "Moral / Value Education",
  "Cultural Activities",
  "Personality Development",
] as const;

export const internalStudentLifeMoments = [
  {
    number: "01",
    label: "Learning",
    description: "Everyday classroom experiences that make room for participation, questions, and shared understanding.",
    media: placeholderMedia.classrooms,
  },
  {
    number: "02",
    label: "Art & Creativity",
    description: "Creative expression as part of a balanced school experience.",
    media: placeholderMedia.activities,
  },
  {
    number: "03",
    label: "Sports",
    description: "Movement, play, and teamwork alongside academic learning.",
    media: placeholderMedia.playground,
  },
  {
    number: "04",
    label: "Celebrations",
    description: "Shared school moments that bring students together with care.",
    media: placeholderMedia.studentLife,
  },
  {
    number: "05",
    label: "Cultural Activities",
    description: "Opportunities for cultural expression in the rhythm of school life.",
    media: placeholderMedia.activities,
  },
  {
    number: "06",
    label: "Teamwork",
    description: "Collaborative experiences that encourage listening, contribution, and connection.",
    media: placeholderMedia.studentLife,
  },
  {
    number: "07",
    label: "Competitions",
    description: "Positive opportunities to participate, practise, and build confidence.",
    media: placeholderMedia.studentLife,
  },
] as const;
