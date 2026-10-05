export type PlaceholderMedia = {
  key: string;
  label: string;
  category: string;
  description: string;
  asset: string | null;
  alt?: string;
  caption?: string;
  objectPosition?: string;
};

export const placeholderMedia = {
  campus: {
    key: "campus",
    label: "Campus perspective",
    category: "Future school photograph",
    description: "Reserved for an approved campus or school exterior photograph.",
    asset: null,
  },
  classrooms: {
    key: "classrooms",
    label: "Classroom moment",
    category: "Future school photograph",
    description: "Reserved for an approved spacious classroom photograph.",
    asset: null,
  },
  playground: {
    key: "playground",
    label: "Playground perspective",
    category: "Future school photograph",
    description: "Reserved for an approved playground photograph.",
    asset: null,
  },
  smartClass: {
    key: "smart-class",
    label: "Smart learning moment",
    category: "Future school photograph",
    description: "Reserved for an approved smart-class learning photograph.",
    asset: null,
  },
  activities: {
    key: "activities",
    label: "Creative activity moment",
    category: "Future school photograph",
    description: "Reserved for approved art, craft, or team activity photography.",
    asset: null,
  },
  studentLife: {
    key: "student-life",
    label: "Student life moment",
    category: "Future school photograph",
    description: "Reserved for approved school-life and celebration photography.",
    asset: null,
  },
} satisfies Record<string, PlaceholderMedia>;

export const admissionRibbonItems = [
  "Admissions Open",
  "Nursery to Class 8",
  "CBSE Pattern",
  "Hindi & English Medium",
  "Padhar, Betul",
] as const;

export const schoolGlanceItems = [
  {
    number: "01",
    label: "CBSE Pattern",
    description: "A clear academic foundation designed to support steady learning.",
  },
  {
    number: "02",
    label: "Hindi & English Medium",
    description: "Learning and expression supported across two familiar languages.",
  },
  {
    number: "03",
    label: "Nursery to Class 8",
    description: "A connected school journey from the early years through middle school.",
  },
  {
    number: "04",
    label: "Padhar, Betul",
    description: "A school experience rooted in its local community and surroundings.",
  },
  {
    number: "05",
    label: "Smart Learning",
    description: "Thoughtful use of smart-class learning within everyday teaching.",
  },
  {
    number: "06",
    label: "Nurturing Environment",
    description: "Child-focused support that encourages curiosity, confidence, and growth.",
  },
] as const;

export const aboutHighlights = [
  "Spacious classrooms",
  "Large playground",
  "Smart-class learning",
  "Supportive staff",
  "Child-focused learning environment",
] as const;

export const visionMission = [
  {
    number: "01",
    label: "Vision",
    title: "A bright future, shaped with care.",
    copy: "Nurture confident, responsible and compassionate learners prepared for a bright future.",
  },
  {
    number: "02",
    label: "Mission",
    title: "Learning with purpose and possibility.",
    copy: "Create quality learning through strong academics, creativity, discipline, values, communication and holistic development.",
  },
] as const;

export const editableValueThemes = [
  "Learning",
  "Respect",
  "Confidence",
  "Creativity",
  "Discipline",
  "Growth",
] as const;

export const whySchoolItems = [
  {
    number: "01",
    title: "Child-Centered Learning",
    description: "A learning environment that keeps each child’s growth and participation in view.",
    media: placeholderMedia.activities,
  },
  {
    number: "02",
    title: "Supportive Teachers & Staff",
    description: "A supportive school community that helps children feel encouraged each day.",
    media: placeholderMedia.campus,
  },
  {
    number: "03",
    title: "Smart Learning",
    description: "Smart-class learning integrated as a thoughtful support for understanding.",
    media: placeholderMedia.smartClass,
  },
  {
    number: "04",
    title: "Spacious Classrooms",
    description: "Room to learn, participate, and build good learning habits together.",
    media: placeholderMedia.classrooms,
  },
  {
    number: "05",
    title: "Sports & Playground",
    description: "Space for movement, play, teamwork, and healthy routines.",
    media: placeholderMedia.playground,
  },
  {
    number: "06",
    title: "Hindi & English Medium",
    description: "Language support that helps children communicate with greater confidence.",
    media: placeholderMedia.activities,
  },
  {
    number: "07",
    title: "Safe Learning Environment",
    description: "A caring day-to-day setting where children can focus on learning and belonging.",
    media: placeholderMedia.campus,
  },
  {
    number: "08",
    title: "Holistic Development",
    description: "Learning shaped alongside creativity, values, communication, and teamwork.",
    media: placeholderMedia.studentLife,
  },
] as const;

export const academicLevels = [
  {
    id: "early-years",
    label: "Early Years",
    classes: "Nursery / LKG / UKG",
    focus: "A welcoming first school experience built around curiosity, routine, communication, and joyful participation.",
    approach: ["Child-focused learning", "Creative activities", "Communication skills"],
    skills: "Confidence, expression, foundational habits",
  },
  {
    id: "primary",
    label: "Primary",
    classes: "Class 1–5",
    focus: "Growing learning habits through clear concepts, regular practice, creativity, and active participation.",
    approach: ["Concept-based learning", "Smart classroom learning", "Team activities"],
    skills: "Understanding, collaboration, communication",
  },
  {
    id: "middle-school",
    label: "Middle School",
    classes: "Class 6–8",
    focus: "A steady next stage that supports responsibility, stronger communication, and thoughtful learning.",
    approach: ["Concept-based learning", "Personality development", "Moral / value education"],
    skills: "Independence, discipline, confidence",
  },
] as const;

export const learningApproachItems = [
  "Concept-Based Learning",
  "Smart Classroom Learning",
  "Communication Skills",
  "Creative Activities",
  "Sports",
  "Art & Craft",
  "Moral / Value Education",
  "Team Activities",
  "Personality Development",
  "Cultural Activities",
] as const;

export const facilities = [
  {
    number: "01",
    title: "Smart Classrooms",
    description: "Technology-supported learning spaces designed to make concepts more engaging and accessible.",
    media: placeholderMedia.smartClass,
  },
  {
    number: "02",
    title: "Spacious Classrooms",
    description: "Comfortable classrooms that give children room to listen, participate, and learn together.",
    media: placeholderMedia.classrooms,
  },
  {
    number: "03",
    title: "Playground",
    description: "An open space for sports, movement, teamwork, and active school-day experiences.",
    media: placeholderMedia.playground,
  },
  {
    number: "04",
    title: "Activity Areas",
    description: "Flexible settings for creative activities, cultural expression, and collaborative learning.",
    media: placeholderMedia.activities,
  },
  {
    number: "05",
    title: "Learning Resources",
    description: "Everyday learning supports that help children explore, understand, and practise new ideas.",
    media: placeholderMedia.classrooms,
  },
  {
    number: "06",
    title: "Supportive Staff",
    description: "A caring school environment supported by staff who encourage children’s progress and wellbeing.",
    media: placeholderMedia.campus,
  },
  {
    number: "07",
    title: "Clean Learning Environment",
    description: "A considered school setting that helps children feel settled and ready to learn.",
    media: placeholderMedia.campus,
  },
] as const;

export const studentLifeMoments = [
  { number: "01", label: "Learning", media: placeholderMedia.classrooms },
  { number: "02", label: "Art & Creativity", media: placeholderMedia.activities },
  { number: "03", label: "Sports", media: placeholderMedia.playground },
  { number: "04", label: "Celebrations", media: placeholderMedia.studentLife },
  { number: "05", label: "Cultural Activities", media: placeholderMedia.activities },
  { number: "06", label: "Teamwork", media: placeholderMedia.studentLife },
  { number: "07", label: "Competitions", media: placeholderMedia.studentLife },
] as const;
