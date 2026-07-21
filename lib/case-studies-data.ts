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
  coverVideo?: string;
  available: boolean;
  sections: CaseStudySection[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "voiced",
    title: "Voiced: a voice-first conversation app",
    client: "Sounding",
    product: "Voiced",
    platform: "iOS",
    year: "2025",
    readTime: "4 min read",
    description:
      "Owning product design end to end, from system prompt to shipped App Store product.",
    coverVideo: "https://res.cloudinary.com/dcewfztrv/video/upload/v1784398182/voiced-voice-mode-chat_upbhjc.mp4",
    available: true,
    sections: [],
  },
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
          "Design a privacy-centric browser that redefines the way users interact with the web, by allowing users to adjust the intensity of tracking prevention, so they can strike the ideal balance between privacy and functionality. Additionally, add a panel that displays the invasive threats that the browser is blocking in real time – from ads to trackers to cookies – ensuring user's feeling of online safety.",
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
          "The present flowchart displays all user flows that the privacy panel contains. By visually describing the relationships between pages/screens and show all interactive possibilities the collaboration with all stakeholders improved considerably.",
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
              "When a user who sat their preference to No blocking is browsing the web and intends to activate the privacy panel, it becomes imperative that the privacy panel's toggle remains perpetually accessible, since it's a critical event.",
          },
          {
            alt: "Desktop privacy panel confirmation state",
            caption:
              "Once the user turns ON the toggle, this juncture becomes opportune to inquire whether they wish to reconsider their chosen blocking level.",
          },
          {
            alt: "Desktop privacy panel settings reminder state",
            caption:
              "If the user chooses not to make any adjustments, they are alerted that they can update their blocking level on settings.",
          },
          {
            alt: "Desktop privacy panel repeated prompt state",
            caption:
              "A subsequent prompt will be presented on the tenth occasion they activate the privacy panel. This time, allowing the user to dismiss the inquiry permanently.",
          },
          {
            alt: "Desktop privacy panel updated settings state",
            caption:
              "Should they opt for a modification, they are provided confirmation of the changes made and their settings are updated in the background.",
          },
        ],
      },
      {
        type: "text",
        heading: "Blocking Level",
        content:
          "An example where the design team effectively enhanced both user experience and upheld the company's core objectives revolved around refining the process of activating the privacy panel when the user's blocking level is set to No Blocking.",
      },
      {
        type: "image",
        alt: "Blocking level settings UI",
        width: 840,
        height: 736,
      },
    ],
  },
];
