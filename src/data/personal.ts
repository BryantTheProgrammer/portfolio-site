export type PersonalCategory = "robotics" | "music" | "teaching";

export type PersonalMedia = {
  type: "image" | "youtube" | "link";
  src: string;
  alt: string;
  caption: string;
  thumbnail?: string;
};

export type PersonalEntry = {
  id: string;
  title: string;
  era: string;
  years: string;
  category: PersonalCategory;
  summary: string;
  tags: string[];
  media: PersonalMedia[];
  featured: boolean;
};

export type CubeStoryMoment = {
  id?: string;
  era: string;
  years: string;
  summary: string;
  link?: string;
  linkLabel?: string;
};

export const labName = "[LAB NAME]";

export const cubeStory: CubeStoryMoment[] = [
  {
    era: "Middle school",
    years: "Middle school",
    summary:
      "I learned to solve a 3x3 Rubik's Cube when I was 12 and took part in competitions. I also built a solving robot with a LEGO NXT kit.",
    link: "https://www.worldcubeassociation.org/persons/2015HAYD02",
    linkLabel: "View my World Cube Association profile",
  },
  {
    era: "8th grade",
    years: "8th grade",
    summary: "I started and taught my first Rubik's Cube club.",
  },
  {
    era: "High school",
    years: "High school",
    summary: "I taught a recurring Rubik's Cube class at an elementary school.",
  },
  {
    era: "Eastern Oregon University",
    years: "2022 to 2024",
    summary:
      "I designed and built an autonomous 3x3 Rubik's Cube solver. I modeled the frame and robotic arms in Autodesk Inventor, 3D printed the parts, and built a Raspberry Pi system with two USB cameras, three motor-controller boards, and six stepper motors. Python software detects the cube's colors, computes a solution, and drives the arms to turn it. I documented the build and bill of materials so future students could extend it.",
    link: "#robotics-rubiks-bot",
    linkLabel: "See the robot build",
  },
  {
    era: "Senior Symposium",
    years: "2024",
    summary: "I presented the robot at Eastern Oregon University's Senior Symposium.",
    link: "#teaching-eou-symposium",
    linkLabel: "About the presentation",
  },
  {
    id: "robotics-lab",
    era: "After the project",
    years: "After",
    summary:
      "My project helped inspire the next generation of robotics teaching at Eastern Oregon University.",
  },
  {
    era: "Guest speaker",
    years: "January 2027",
    summary: "I am returning to Eastern Oregon University as a guest speaker.",
    link: "#teaching-eou-symposium",
    linkLabel: "About the return visit",
  },
];

export const personalEntries: PersonalEntry[] = [
  {
    id: "robotics-lego-elementary",
    title: "LEGO robotics",
    era: "4th and 5th grade",
    years: "",
    category: "robotics",
    summary: "I first explored team robotics by building and experimenting with LEGO robots.",
    tags: ["LEGO", "Team robotics", "Exploration"],
    media: [],
    featured: false,
  },
  {
    id: "robotics-home-kit",
    title: "Home LEGO robotics kit",
    era: "Middle school",
    years: "",
    category: "robotics",
    summary:
      "I kept building on my own with a home kit, including a LEGO NXT Rubik's Cube solver.",
    tags: ["LEGO NXT", "Robotics", "Independent building"],
    media: [],
    featured: false,
  },
  {
    id: "robotics-middle-school",
    title: "Middle school LEGO robotics",
    era: "Middle school",
    years: "",
    category: "robotics",
    summary:
      "I moved into more competitive robotics, designing and programming under rules and deadlines.",
    tags: ["LEGO", "Design", "Programming"],
    media: [],
    featured: false,
  },
  {
    id: "robotics-first-tech-challenge",
    title: "FIRST Tech Challenge",
    era: "Newberg High School",
    years: "2016 to 2018",
    category: "robotics",
    summary:
      "I learned to program in a real language with Java and Android Studio. I wrote autonomous and driver-controlled code, then debugged it at competitions.",
    tags: ["FIRST Tech Challenge", "Java", "Android Studio"],
    media: [],
    featured: false,
  },
  {
    id: "robotics-stirling-engine",
    title: "Stirling engine",
    era: "High school",
    years: "",
    category: "robotics",
    summary:
      "I designed a Stirling engine in CAD, machined the parts, and built it into a functioning engine.",
    tags: ["CAD", "Machining", "Mechanical systems"],
    media: [
      {
        type: "youtube",
        src: "Dj0UR080PRE",
        alt: "Stirling engine running",
        caption: "Functional engine test",
      },
      {
        type: "youtube",
        src: "HJgJ5IBwwfw",
        alt: "Stirling engine CAD and build",
        caption: "CAD and build process",
      },
    ],
    featured: true,
  },
  {
    id: "robotics-makerspace",
    title: "Makerspace R&D Assistant",
    era: "Pacific University",
    years: "2020 to 2022",
    category: "robotics",
    summary:
      "I helped turn engineering design challenge ideas into manufacturable prototypes. One was an early glove-retainer prototype intended to help someone with limited dexterity put on a medical glove in a sterile environment. We explored a trolley moving along a rail over a vacuum chamber to stretch the glove, then reviewed the first printed design and worked through questions about fit, friction, travel, and how to move the trolley.",
    tags: ["Prototyping", "Manufacturing", "CAD", "Design iteration"],
    media: [],
    featured: false,
  },
  {
    id: "robotics-future-class-presentation",
    title: "The Future of Robotics",
    era: "Class assignment",
    years: "November 11, 2023",
    category: "robotics",
    summary:
      "I gave this presentation for a class assignment. It captures ideas I was exploring at the time, rather than a fixed or current position on the future of robotics.",
    tags: ["Robotics", "Class presentation"],
    media: [
      {
        type: "youtube",
        src: "6Ua2Oi0WubY",
        alt: "Bryant Hayden presenting a class assignment on the future of robotics",
        caption: "Class presentation, November 11, 2023",
      },
    ],
    featured: false,
  },
  {
    id: "robotics-rubiks-bot",
    title: "Autonomous Rubik's Cube solving bot",
    era: "Eastern Oregon University",
    years: "2022 to 2024",
    category: "robotics",
    summary:
      "I designed and built an autonomous 3x3 Rubik's Cube solver. A Raspberry Pi uses two USB cameras to capture the cube, Python software detects its colors and computes a solution, and six stepper motors drive the robotic arms. I designed the frame and arms in Autodesk Inventor, 3D printed the parts, and documented the build and bill of materials so future students could extend the project.",
    tags: ["Python", "Computer vision", "Raspberry Pi", "Autodesk Inventor", "3D printing", "Stepper motors"],
    media: [
      {
        type: "youtube",
        src: "_tdodO76_XQ",
        alt: "Autonomous Rubik's Cube solving robot demonstration",
        caption: "Robot solving demonstration",
      },
      {
        type: "link",
        src: "/images/Cube%20Solving%20Bot.pdf",
        alt: "Rubik's Cube Solving Robot project poster thumbnail",
        caption: "View the project poster",
        thumbnail: "/images/cube-solving-bot-poster.png",
      },
    ],
    featured: true,
  },
  {
    id: "music-cello",
    title: "Cello",
    era: "Middle school",
    years: "",
    category: "music",
    summary: "I played cello in my middle school orchestra.",
    tags: ["Cello", "Orchestra"],
    media: [],
    featured: false,
  },
  {
    id: "music-double-bass",
    title: "Double bass",
    era: "High school",
    years: "",
    category: "music",
    summary:
      "I played double bass in jazz band, concert band, orchestra, and two musicals.",
    tags: ["Double bass", "Jazz band", "Concert band", "Orchestra"],
    media: [],
    featured: false,
  },
  {
    id: "music-double-bass-jury",
    title: "Double bass jury performance",
    era: "End-of-semester assessment",
    years: "December 13, 2021",
    category: "music",
    summary:
      "I performed this graded end-of-semester double bass jury on December 13, 2021.",
    tags: ["Double bass", "Jury", "Performance"],
    media: [
      {
        type: "youtube",
        src: "cO4q0t3lMwU",
        alt: "Bryant Hayden performing a double bass jury",
        caption: "Double bass jury performance",
      },
    ],
    featured: true,
  },
  {
    id: "music-all-state",
    title: "All-State Wind Ensemble",
    era: "Double bassist",
    years: "2020",
    category: "music",
    summary: "I performed as a double bassist with the All-State Wind Ensemble.",
    tags: ["Double bass", "Wind ensemble"],
    media: [],
    featured: false,
  },
  {
    id: "music-portland-youth-philharmonic",
    title: "Portland Youth Philharmonic",
    era: "Double bass",
    years: "2020",
    category: "music",
    summary: "I played double bass with Portland Youth Philharmonic.",
    tags: ["Double bass", "Orchestra"],
    media: [],
    featured: false,
  },
  {
    id: "music-pacific-orchestra",
    title: "Pacific University orchestra",
    era: "Pacific University",
    years: "",
    category: "music",
    summary: "I took part in the orchestra's digital performance of Beethoven in the Stars.",
    tags: ["Orchestra", "Digital performance", "Beethoven in the Stars"],
    media: [
      {
        type: "link",
        src: "https://elsewhereensemble.com/works/beethoven-in-the-stars/",
        alt: "Read about Beethoven in the Stars by The Elsewhere Ensemble",
        caption: "About Beethoven in the Stars",
      },
      {
        type: "youtube",
        src: "r_6QjuPVnls",
        alt: "Pacific University orchestra performance of Beethoven in the Stars",
        caption: "Watch the performance",
      },
    ],
    featured: false,
  },
  {
    id: "teaching-rubiks-club",
    title: "Rubik's Cube club and class",
    era: "8th grade and high school",
    years: "",
    category: "teaching",
    summary:
      "I started and taught a Rubik's Cube club in 8th grade, then taught a recurring class at an elementary school in high school.",
    tags: ["Teaching", "Rubik's Cube", "STEM"],
    media: [
      {
        type: "link",
        src: "#cube-story",
        alt: "Read the Rubik's Cube story",
        caption: "Follow the Rubik's Cube thread",
      },
    ],
    featured: true,
  },
  {
    id: "teaching-string-project",
    title: "Pacific University String Project",
    era: "Pacific University",
    years: "2020 to 2022",
    category: "teaching",
    summary:
      "I taught violin, cello, and double bass to community students in group classes and one-on-one private lessons. When COVID moved instruction online, I taught over Zoom.",
    tags: ["Violin", "Cello", "Double bass", "Online teaching"],
    media: [],
    featured: false,
  },
  {
    id: "teaching-asta",
    title: "ASTA National Conference: String Project Best Practices",
    era: "Atlanta",
    years: "2022",
    category: "teaching",
    summary:
      "I co-presented with violinist and music educator Jonathan New at the Pacific University String Project's National String Project Consortium Best Practices session. We shared bow exercises for beginning, intermediate, and advanced students.",
    tags: ["ASTA", "String Project", "Bow exercises", "String education"],
    media: [],
    featured: false,
  },
  {
    id: "teaching-lego-instructor",
    title: "LEGO Robotics Instructor",
    era: "Robotics instruction",
    years: "2022 to 2023",
    category: "teaching",
    summary:
      "I led student teams through project-based robotics, providing technical guidance and keeping the classroom running safely.",
    tags: ["LEGO", "Robotics", "Classroom"],
    media: [],
    featured: false,
  },
  {
    id: "teaching-eou-symposium",
    title: "Eastern Oregon University Senior Symposium",
    era: "Speaker and returning guest speaker",
    years: "2024 and January 2027",
    category: "teaching",
    summary:
      "I presented my Rubik's Cube robot at the 2024 Senior Symposium and am returning to EOU as a guest speaker in January 2027.",
    tags: ["Guest speaker", "Robotics", "Teaching"],
    media: [
      {
        type: "link",
        src: "#cube-story",
        alt: "Read the Rubik's Cube story",
        caption: "See the project timeline",
      },
    ],
    featured: true,
  },
];
