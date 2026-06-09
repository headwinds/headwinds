export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectDetail {
  paragraphs: string[];
  links?: ProjectLink[];
}

const projectDetails: Record<string, ProjectDetail> = {
  "/validere": {
    paragraphs: [
      "While searching through datasets on Kaggle, I discovered a fresh dataset covering over 20 years of US Wind Turbine production, and was pleasantly surprised to be the first to dive into this rich dataset.",
      "Instead of predicting future production like I have done in other competitions, I wanted to explore production at the state level and discover if any states were approaching 100% self sufficiency similar to Scotland's tremendous achievement.",
    ],
    links: [
      {
        label: "Data Visualization",
        href: "https://www.kaggle.com/headwinds/us-wind-turbines",
      },
    ],
  },
  "/toda": {
    paragraphs: [
      "Toda is a blockchain service which, along with a currency, can produce many secure file types like identities, art or virtual items. With a Toda file, you have full control over who can access that file and who you can share it with.",
      "As a decentralized network, Toda makes it easier to share and track files than a centralized database, which is attracting many different verticals that struggle with this problem.",
      "I was brought in on a 6-month contract to design and build their enterprise portal. Developers could sign up for the Toda service and register their accounts and tokens. We built in access control so that non-technical admins could also manage all the accounts.",
    ],
    links: [
      {
        label: "Hassan Khan",
        href: "https://www.youtube.com/watch?v=nGo2wnVGr1E",
      },
      {
        label: "Dann Toliver",
        href: "https://www.youtube.com/watch?v=JpAhj8SJY-Y",
      },
    ],
  },
  "/bio": {
    paragraphs: [
      "I'm primarily a product-focused Frontend developer with more than 10 years of experience who works on complex UI problems that provide the best possible UX across multiple desktops and devices.",
      "I consider myself \"pear-shaped\" since I'm strong on the frontend and weaker on the backend. I'm typically paired with a backend developer and seldom get to use the fullstack professionally, but for all my personal projects, I use either PostgreSQL or MongoDB depending on the task.",
      "Today, I'm using the React/Redux ecosystem that I first picked up in 2016, and have since added React Native, TypeScript and Next.js into my development workflow. On the backend, I'm focusing on building Python APIs leveraging Flask.",
      "As a budding data scientist, I've also branched out into Machine Learning and can assemble a basic ML pipeline to perform predictions or recommendations. I'm fascinated by Natural Language Processing and produced several D3 and Python notebook data visualizations of customer intents and journey.",
    ],
  },
  "/trioova": {
    paragraphs: [
      "QoC Health is an agency for health care clients. I joined as a senior developer and was promoted to team lead reporting to the CTO and mentoring a mix of 5 junior to intermediate developers.",
      "Trioova was a secure marketplace for patients to assemble a team of care givers and communicate with them through individual and group chat services.",
      "Along with chat, they could purchase services from providers via the Stripe integration.",
    ],
    links: [
      { label: "QoC Health", href: "https://www.qochealth.com" },
      {
        label: "Trioova",
        href: "https://www.folio.ca/ualberta-startup-takes-courageous-step-in-face-of-imminent-business-failure/",
      },
    ],
  },
  "/camh": {
    paragraphs: [
      "QoC Health is an agency for health care clients. I joined as a senior developer and was promoted to team lead reporting to the CTO and mentoring a mix of 5 junior to intermediate developers.",
      "Thoughtspot was one of several projects we worked on. It launched as a responsive web app that worked on both desktop and mobile devices. The native apps were produced by wrapping the app in a web view.",
      "The app allowed students from across Toronto to discover locations within the city and share them with their friends. It leveraged Mapbox for the UI, both Mapbox and Google Maps API to populate location info, and we did our own custom geolocation search services with MSSQL.",
    ],
    links: [
      { label: "QoC Health", href: "https://www.qochealth.com" },
      { label: "Thoughtspot", href: "https://mythoughtspot.ca/" },
    ],
  },
  "/247": {
    paragraphs: [
      "I had an incredible 5 years building 3 major products at 24-7 ai.",
      "Voices visualizes and tracks the customer journey across the omnichannel.",
      "Offers was a product that matched financial services to questions, and dramatically increased the likelihood that a customer would engage with the service by over 2000%.",
      "ML Tools is a suite of apps used by both Data Scientists and non-technical staff. They significantly reduce the time to prepare models from 3 months to 2 weeks. Over 95% of conversations that are not too complex are now annotated by machines while only the most difficult text is left for human comprehension.",
    ],
    links: [
      { label: "24-7 ai", href: "https://www.247.ai/" },
      { label: "Voices", href: "https://www.youtube.com/watch?v=5KZofZX3XaY" },
    ],
  },
  "/ada": {
    paragraphs: [
      "Ada Support's mission is to blend human and AI collaboration.",
      "I worked on their chatbot UI producing an NLP-based feature called Predictive Suggestions that provides up to 3 quick answers from a machine learning service that update as the user types.",
      "I developed a decision tree data visualization to present customer flows and show where they are having difficulty.",
      "As part of the Machine Learning team, I saw opportunities to help the data scientists reduce the time it takes to audit conversations. I built an annotation tool which vastly improved the labelling, comparisons, and the model's overall ability to separate \"clarification\" from \"not understood\" answers.",
    ],
    links: [
      { label: "Ada Support", href: "https://www.ada.support" },
      {
        label: "Predictive Suggestions",
        href: "https://www.youtube.com/watch?v=57e8OR_ZMrc",
      },
    ],
  },
  "/totaldrama": {
    paragraphs: [
      "In the Total Drama Avatar Builder, each character is completely customizable.",
      "I decided to leverage a finite state machine design pattern to handle all the various states and transitions. It has garnered over 40K YouTube hits, and I still get emails from kids wanting to play it today.",
      "During the course of this project, I had the pleasure of collaborating with Jason Krogh of SagoSago.",
    ],
    links: [
      {
        label: "Total Drama Avatar Builder",
        href: "https://www.youtube.com/watch?v=wa0ToGv_QTw&t=43s",
      },
      { label: "Jason Krogh", href: "http://heythere.ca/interview/jason-krogh/" },
    ],
  },
  "/mitsubishi": {
    paragraphs: [
      "Mitsubishi Lancer Earth earned my first and only FWA.",
      "At the time, I held the position of Technical Director and I got to convince our executive team to take a chance on ActionScript 3 which was new at the time and introduced a Typed language.",
      "I managed a group of super talented developers and together we delivered an exceptional experience that moved users through 9 different timezones and showcased the new Mitsubishi Lancer in various interactive settings.",
    ],
    links: [
      { label: "FWA", href: "https://thefwa.com/cases/lancer-earth" },
    ],
  },
  "/microsoft": {
    paragraphs: [
      "In order to promote version 2 of the MSN search toolbar, we developed a quiz contest that would be played out in real-time over the course of 4 weeks.",
      "As their lead front-end architect, I worked with a team of designers and developers, and was mainly responsible for programming the game logic that relied on Flash/XML communication with ASP.NET. We also did some complex 1024-bit encryption to protect our users, and produced two versions in French and English.",
    ],
  },
  "/bmw": {
    paragraphs: [
      "Blast Radius was an excellent home for me. I was there over 4 years and enjoyed collaborating with some amazing people who remain titans of the industry today.",
      "We worked on many large, experiential campaigns for clients like Nike, Nintendo, Bacardi and BMW.",
      "Along with a data visualization tool to demonstrate how far a beamer could travel on a tank of diesel, we also built a BMW car configurator that allows customers to customize their car to their liking.",
      "BMW is certainly an innovative company and it's exciting to see what they are working on next.",
    ],
    links: [
      { label: "Blast Radius", href: "https://www.blastradius.com" },
      {
        label: "BMW Vision iNext",
        href: "https://design-milk.com/la-auto-show-bmw-vision-inext",
      },
    ],
  },
  "/bacardi": {
    paragraphs: [
      "Bacardi Unwrap the Night is a 360 video experience where you visit a penthouse party that is filled with surprises from your social media accounts. As you move through the room, you can spin the camera in any direction.",
      "All the art on the walls has your photos with style transfers to make them look like a Warhol or Van Gogh.",
      "You can stop and order a drink which has your friends' names added to them, or you become the DJ and mix between two tracks. Finally, you exit the party onto the balcony and see a personalized fireworks show.",
    ],
    links: [
      {
        label: "Bacardi Unwrap the Night",
        href: "https://www.youtube.com/watch?v=HbNDDQ7YB6s",
      },
    ],
  },
  "/nintendo": {
    paragraphs: [
      "I was pleasantly surprised to work on Wii Fit and built an interactive user guide and video gallery to teach customers how to use this neat fitness product.",
      "It would also track sessions and encourage you to complete each course as well as compete with your friends.",
    ],
    links: [
      {
        label: "Wii Fit",
        href: "https://www.youtube.com/watch?v=-Taruqvk30E",
      },
    ],
  },
  "/labatt": {
    paragraphs: [
      "I designed and developed this loyalty program for Labatt Call Centre Representatives who handle clients across the country.",
      "The system tracks their business goals and will remind them of their next steps and offer rewards based on their progress. I have been involved in three versions of this application moving it through Interaction Design cycles to a fully functional CRM.",
    ],
  },
};

export default projectDetails;
