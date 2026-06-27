export type CaseStudySection =
  | { type: "text"; heading: string; content: string }
  | { type: "image"; src?: string; alt: string; width: number; height: number; caption?: string }
  | {
      type: "image-grid";
      items: Array<{ src?: string; alt: string; caption: string }>;
    };

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  product: string;
  platform: string;
  year: string;
  readTime: string;
  description: string;
  coverImage?: string;
  available: boolean;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "tempest-browser-privacy-panel",
    title: "Tempest Browser Privacy Panel",
    client: "Tempest",
    product: "Tempest Browser",
    platform: "iOS and Desktop",
    year: "2023",
    readTime: "2 min read",
    description:
      "A privacy-focused browser experience for balancing tracking protection and usability.",
    coverImage: "/assets/tempest/hero.jpg",
    available: true,
    sections: [
      {
        type: "text",
        heading: "Overview",
        content:
          "Tempest Browser is a privacy-centric browser that redefines the way users interact with the web, by allowing users to adjust the intensity of tracking prevention, so they can strike the ideal balance between privacy and functionality.",
      },
      {
        type: "image",
        src: "/assets/tempest/hero.jpg",
        alt: "Tempest Browser Privacy Panel hero",
        width: 840,
        height: 560,
      },
      {
        type: "text",
        heading: "Background",
        content:
          "The rapid expansion of online tracking, aggressive advertising, and data harvesting practices has raised significant privacy issues for internet users. Conventional browsers lack transparency in displaying the extent of invasive content being blocked, leaving users in the dark about the true impact of their privacy settings.",
      },
      {
        type: "text",
        heading: "Problem",
        content:
          "How can we strike a balance between fortifying users' online safety and providing a seamless browsing experience?",
      },
      {
        type: "text",
        heading: "Solution",
        content:
          "Design a privacy-centric browser that redefines the way users interact with the web, by allowing users to adjust the intensity of tracking prevention, so they can strike the ideal balance between privacy and functionality. Additionally, add a panel that displays the invasive threats that the browser is blocking in real time, from ads to trackers to cookies, ensuring users feel safer online.",
      },
      {
        type: "text",
        heading: "Achievement",
        content:
          "Successfully launched the browser, creating an impactful, privacy-first experience for users. Additionally, developed processes that paved the way for a new business unit at Tempest, Infinity Browsers, now producing white-label browsers for brands like Ecosia and Startpage.",
      },
      {
        type: "image",
        src: "/assets/tempest/comparison.jpg",
        alt: "Privacy Panel OFF vs ON comparison",
        width: 840,
        height: 442,
      },
      {
        type: "text",
        heading: "Flowchart",
        content:
          "The flowchart displayed all user flows that the privacy panel contained. By visually describing the relationships between pages, screens, and interactive possibilities, collaboration with stakeholders improved considerably.",
      },
      {
        type: "image",
        alt: "User flow flowchart for Tempest Privacy Panel",
        width: 840,
        height: 1131,
      },
      {
        type: "text",
        heading: "iOS App",
        content:
          "Designed Tempest browser for iOS, confronting technical limitations while upholding our commitment to a positive user experience.",
      },
      {
        type: "image",
        src: "/assets/tempest/ios.png",
        alt: "Tempest Browser iOS app",
        width: 840,
        height: 618,
      },
      {
        type: "text",
        heading: "Desktop",
        content:
          "Designed the privacy panel for the desktop app built on Chromium, harnessing its robust foundation while tailoring it to our vision.",
      },
      {
        type: "image-grid",
        items: [
          {
            alt: "Desktop privacy panel state",
            caption:
              "When a user with No Blocking selected intends to activate the privacy panel, the toggle remains accessible because it is a critical event.",
          },
          {
            alt: "Desktop privacy panel confirmation state",
            caption:
              "Once the user turns on the toggle, this moment becomes an opportunity to ask whether they want to reconsider their chosen blocking level.",
          },
          {
            alt: "Desktop privacy panel settings reminder state",
            caption:
              "If the user chooses not to make adjustments, they are reminded that they can update their blocking level in settings.",
          },
          {
            alt: "Desktop privacy panel repeated prompt state",
            caption:
              "A subsequent prompt appears on the tenth activation, allowing the user to dismiss the inquiry permanently.",
          },
          {
            alt: "Desktop privacy panel updated settings state",
            caption:
              "If the user opts for a modification, they receive confirmation while settings update in the background.",
          },
        ],
      },
      {
        type: "text",
        heading: "Blocking Level",
        content:
          "An example where the design team enhanced both user experience and company objectives involved refining the process of activating the privacy panel when the user's blocking level is set to No Blocking.",
      },
      {
        type: "image",
        alt: "Blocking level settings UI",
        width: 840,
        height: 736,
      },
    ],
  },
  {
    slug: "second-case-study",
    title: "Second Case Study",
    client: "Coming soon",
    product: "Protected work",
    platform: "TBD",
    year: "2026",
    readTime: "Coming soon",
    description: "A protected case study placeholder coming soon.",
    available: false,
    sections: [],
  },
];
