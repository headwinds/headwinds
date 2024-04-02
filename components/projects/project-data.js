/*
client must be 1 one word for some reason?!
*/

const identity = {
  name: 'headwinds',
  link: 'https://www.headwinds.net',
  slogan: '',
  works: {
    name: 'works',
    link: 'https://www.headwinds.net/works'
  },
  about: {
    name: 'about',
    link: 'https://www.headwinds.net/about'
  },
  contact: {
    name: 'contact',
    link: 'https://www.headwinds.net/contact'
  },
  projects: [
    {
      name: 'US Wind Turbines',
      description:
        'Frontend Developer,UI Design & Data Visualization',
      client: 'Energy',
      company: 'Kaggle',
      tags: 'security,file sharing, messaging',
      vertical: "Brandon Flowers",
      duration: 25,
      team: 1,
      role: 'Lead UI',
      tech: 'Python',
      year: 2018,
      localized: false,
      locked: false,
      route: "/budding-data-scientist",
      id: 1
    },
    {
      name: 'TodaQ Financial',
      description:
        'Frontend Developer,UI Design & Data Visualization',
      client: 'TodaQ',
      company: 'TodaQ',
      tags: 'security,file sharing, messaging',
      vertical: "Financial",
      duration: 25,
      team: 1,
      role: 'Lead UI',
      tech: 'ClojureScript',
      year: 2018,
      localized: false,
      locked: false,
      route: "/toda",
      id: 2
    },
    {
      name: 'Brandon Flowers',
      description:
        'Frontend Developer,UI Design & Data Visualization',
      client: 'Headwinds',
      company: 'QoC Health',
      tags: 'security,file sharing, messaging',
      vertical: "Brandon Flowers",
      duration: 25,
      team: 1,
      role: 'Lead UI',
      tech: 'React 16 & Redux',
      year: 2003,
      localized: false,
      locked: false,
      route: "/bio",
      id: 3
    },
    {
      name: 'Patient Network',
      description:
        'The Trioova Patient Network enables patients to connect with care-givers and other providers. Patients can form their own connected care circle and engage in private or team chat. They can also upload and share files as well as search a marketplace to connect with providers across the country',
      client: 'Trioova',
      company: 'QoC',
      tags: 'security,file sharing, messaging',
      vertical: "Health",
      duration: 4,
      team: 4,
      role: 'Lead UI',
      tech: 'React 16 & Redux',
      year: 2018,
      localized: false,
      locked: false,
      route: "/trioova",
      id: 4
    },
    {
      name: 'Thought Spot',
      description:
        'Thought Spot is a responsive (desktop & mobile) web app for CAMH. It talks to both the Google Places and Mapbox APIs as well as performs full text and geolocation proximity search through the HIPAA-compliant QoC API.',
      client: 'CAMH',
      company: 'QoC Health',
      tags: 'security,experience,game,world',
      vertical: "Health",
      duration: 4,
      team: 4,
      role: 'Frontend',
      localized: false,
      tech: '',
      year: 2017,
      locked: false,
      route: "/camh",
      id: 5
    },
    {
      name: 'ML Tools',
      description:
        'Agents were required to manually tag thousands of lines of chat data. Natural Language Processing and Machine Learning alorigthms can now automatically tag the vast majority of this text reducing human involment down to much more manageable results. Inspired by an excel-like interface that talks to ML services, this tool allows an agent to quickly review problematic tags and reduced the time it takes to develop a model for the Data Science team down from 3 months to 1 week.',
      client: '247',
      company: '247 AI',
      vertical: "Customer Service",
      tags: 'security,experience,game,world',
      duration: 4,
      team: 4,
      role: 'Fullstack',
      tech: '',
      year: 2016,
      localized: true,
      locked: false,
      route: "/247",
      id: 6
    },
    {
      name: 'Predictive Suggestions',
      description:
        'A chatbot component which provides up to 3 quick answers from a machine learning service that update as the user types.',
      client: 'Ada',
      company: 'Ada Support247 ai',
      vertical: "Customer Service",
      tags: 'security,conversation,ML,NLP',
      duration: 4,
      team: 4,
      role: 'Frontend',
      tech: 'React/Redux',
      year: 2019,
      localized: true,
      locked: false,
      route: "/ada",
      id: 65
    },
    {
      name: 'Total Drama Avatar Builder',
      description:
        'Inspired by a monster maker, kids can use this tool to build their own total drama avatar by selecting a head, body, feet, and background, and then share them with their friends.',
      client: 'Corus',
      company: 'Zincroe',
      tags: 'security,experience,game,world',
      duration: 4,
      vertical: "Entertainment",
      team: 4,
      role: 'UI',
      tech: 'Flash AS3',
      localized: false,
      year: 2010,
      locked: false,
      route: "/totaldrama",
      id: 7
    },
    {
      name: 'Lancer Earth',
      description: 'An around the world tour featuring the Mitsubishi Lancer. This experience site won my first and only FWA award and showcased incredible 3D video from one of artists behind the movie The Matrix',
      client: 'Mitsubishi',
      tags: 'security,experience,game,world',
      duration: 4,
      team: 4,
      role: 'UI',
      tech: 'Flash AS3',
      vertical: "Automotive",
      localized: true,
      year: 2007,
      locked: false,
      route: "/mitsubishi",
      id: 8
    },
    {
      name: 'World Tour',
      description:
        'In order to promote version 2 of the MSN search toolbar, we developed a global guiz contest that would be played out in real-time over the course of 4 weeks and may involve as many as 12 million users. I helped the team of designers and developers assemble the game assests, and developed the game logic that relies on Flash/XML communication with ASP.NET. We also did some sha-256 encryption to protect our users, and produced two versions in French and English.',
      client: 'Microsoft',
      tags: 'security,experience,game,world',
      duration: 4,
      team: 4,
      role: 'UI',
      tech: 'Flash AS2',
      vertical: "Entertainment",
      localized: true,
      year: 2005,
      locked: false,
      route: "/microsoft",
      id: 9
    },
    {
      name: 'BMW Car Configurator',
      description:
        'Being able to pick and choose parts of your new beamer and the have car instantly change to reflect to your personal style is a compelling experience. Once the car is set to your liking, the configuration will be sent to a database to find appropriate dealer if the car exists or a manufacturer if he needs to be built.',
      client: 'BMW',
      company: 'Blast Radius',
      tags: 'experience,automotive,configuration',
      duration: 4,
      vertical: "Automotive",
      team: 4,
      role: 'UI',
      tech: 'Javascript Backbone',
      api: 'None',
      year: 2017,
      locked: false,
      route: "/bmw",
      id: 10
    },
    {
      name: 'Bacardi 360 Video',
      description:
        'This after party experience invites the viewer into a massive manhattan apartment. From a first person prespective, the user can scroll around in full 360 video and look anywhere in the room. As they explore, they will discover mini games and novelty items that pulls content from their Facebook profile and feed.',
      client: 'Bacardi',
      tags: 'experience',
      duration: 4,
      team: 4,
      role: 'UI',
      tech: 'Flash As3',
      vertical: "Lifestyle",
      api: 'Facebook',
      year: 2013,
      locked: false,
      route: "/bacardi",
      id: 11
    },
    {
      name: 'Wii Fitness',
      description:
        'Wii Fitness combined a console game with a physical device. We built an instructional video-based website to teach players a series of excercises and then track their progress.',
      client: 'Nintendo',
      company: 'Blast Radius',
      tags: 'experience',
      duration: 4,
      team: 4,
      role: 'Fullstack',
      vertical: "Entertainment",
      tech: '',
      api: 'None',
      year: 2010,
      locked: false,
      route: "/nintendo",
      id: 12
    },
    {
      name: 'Labatt Wolf Pack',
      description:
        'I designed and developer a loyalty program app for Labatt to monitor beer drinkers and reward them with events and special prizes',
      client: 'Labatt',
      tags: 'security,experience,game,world',
      duration: 4,
      vertical: "Lifestyle",
      team: 4,
      role: 'UI',
      tech: 'Flash AS2',
      year: 2006,
      locked: false,
      route: "/labatt",
      id: 13
    }
  ]
};

export default identity;
