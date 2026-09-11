export type Sdg = { n: number; name: string; color: string; blurb: string };

export const SDGS: Sdg[] = [
  { n: 1, name: "No Poverty", color: "#e5243b", blurb: "End poverty in all its forms everywhere." },
  { n: 2, name: "Zero Hunger", color: "#dda63a", blurb: "End hunger and achieve food security for all." },
  {
    n: 3,
    name: "Good Health and Well-Being",
    color: "#4c9f38",
    blurb: "Developing affordable point-of-care diagnostics for underserved communities.",
  },
  { n: 4, name: "Quality Education", color: "#c5192d", blurb: "Ensure inclusive and equitable quality education." },
  { n: 5, name: "Gender Equality", color: "#ff3a21", blurb: "Achieve gender equality and empower all women and girls." },
  { n: 6, name: "Clean Water and Sanitation", color: "#26bde2", blurb: "Ensure availability of water and sanitation for all." },
  { n: 7, name: "Affordable and Clean Energy", color: "#fcc30b", blurb: "Ensure access to affordable, sustainable energy." },
  { n: 8, name: "Decent Work and Economic Growth", color: "#a21942", blurb: "Promote inclusive growth and decent work for all." },
  { n: 9, name: "Industry, Innovation and Infrastructure", color: "#fd6925", blurb: "Build resilient infrastructure and foster innovation." },
  { n: 10, name: "Reduced Inequalities", color: "#dd1367", blurb: "Reduce inequality within and among countries." },
  { n: 11, name: "Sustainable Cities and Communities", color: "#fd9d24", blurb: "Make cities inclusive, safe, resilient and sustainable." },
  { n: 12, name: "Responsible Consumption and Production", color: "#bf8b2e", blurb: "Ensure sustainable consumption and production patterns." },
  { n: 13, name: "Climate Action", color: "#3f7e44", blurb: "Take urgent action to combat climate change." },
  { n: 14, name: "Life Below Water", color: "#0a97d9", blurb: "Conserve and sustainably use the oceans and marine resources." },
  { n: 15, name: "Life on Land", color: "#56c02b", blurb: "Protect and restore terrestrial ecosystems." },
  { n: 16, name: "Peace, Justice and Strong Institutions", color: "#00689d", blurb: "Promote peaceful, inclusive societies and strong institutions." },
  { n: 17, name: "Partnerships for the Goals", color: "#19486a", blurb: "Strengthen global partnerships for sustainable development." },
];

export const byN = (n: number) => SDGS.find((s) => s.n === n)!;

export const pad = (n: number) => String(n).padStart(2, "0");

export const VENUE = {
  name: "Bharati Vidyapeeth's College of Engineering",
  address: "A-4, Paschim Vihar, New Delhi, Delhi 110063",
  lat: 28.6758656,
  lng: 77.1132069,
  mapsUrl: "https://maps.app.goo.gl/tASMteHCXAYmXECB7",
};

export interface ContactPerson {
  name: string;
  phone: string;
  role?: string;
}

export const CHAIRPERSONS: ContactPerson[] = [
  { name: "Vivek Suryavanshi", phone: "+91 7676301135", role: "Chairperson" },
  { name: "Ayush", phone: "+91 8700582127", role: "Vice-Chairperson" },
];

export const EVENT_MANAGERS: ContactPerson[] = [
  { name: "Ansh Jain", phone: "+91 81308 53875", role: "Event Manager" },
  { name: "Priyanshi Singh", phone: "+91 98182 90330", role: "Event Manager" },
  { name: "Chestha Khurana", phone: "+91 83070 11553", role: "Event Manager" },
  { name: "Ayush Bindal", phone: "+91 93548 47076", role: "Event Manager" },
  { name: "Abhipsita Sarkar", phone: "+91 81308 05947", role: "Event Manager" },
];

export const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Journey", href: "#projects" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

/** 06 Oct 2026, 09:00 IST — kickoff of Innovicon 4.0. */
export const TARGET = new Date("2026-10-06T09:00:00+05:30").getTime();

export interface SdgHotspot {
  id: string;
  n: number;
  x: number;
  y: number;
  arc: "left" | "right";
}

export const ALL_HOTSPOTS: SdgHotspot[] = [
  // --- LEFT ARC ---
  { id: "l-4", n: 4, x: 32.9, y: 10.1, arc: "left" },
  { id: "l-12", n: 12, x: 37.7, y: 19.6, arc: "left" },
  { id: "l-14", n: 14, x: 26.0, y: 23.8, arc: "left" },
  { id: "l-8", n: 8, x: 13.7, y: 23.8, arc: "left" },
  { id: "l-15", n: 15, x: 28.1, y: 34.3, arc: "left" },
  { id: "l-7", n: 7, x: 17.8, y: 34.3, arc: "left" },
  { id: "l-1", n: 1, x: 24.0, y: 40.7, arc: "left" },
  { id: "l-6", n: 6, x: 8.3, y: 41.7, arc: "left" },
  { id: "l-2", n: 2, x: 14.4, y: 43.8, arc: "left" },
  { id: "l-5", n: 5, x: 22.6, y: 45.9, arc: "left" },
  { id: "l-9", n: 9, x: 13.1, y: 50.1, arc: "left" },
  { id: "l-11", n: 11, x: 24.0, y: 56.4, arc: "left" },
  { id: "l-3", n: 3, x: 9.6, y: 58.5, arc: "left" },
  { id: "l-13", n: 13, x: 14.4, y: 67.0, arc: "left" },
  { id: "l-16", n: 16, x: 30.8, y: 68.0, arc: "left" },
  { id: "l-10", n: 10, x: 28.8, y: 79.6, arc: "left" },
  { id: "l-17", n: 17, x: 37.7, y: 88.0, arc: "left" },
  // --- RIGHT ARC ---
  { id: "r-4", n: 4, x: 67.1, y: 89.9, arc: "right" },
  { id: "r-12", n: 12, x: 62.3, y: 80.4, arc: "right" },
  { id: "r-14", n: 14, x: 74.0, y: 76.2, arc: "right" },
  { id: "r-8", n: 8, x: 86.3, y: 76.2, arc: "right" },
  { id: "r-15", n: 15, x: 71.9, y: 65.7, arc: "right" },
  { id: "r-7", n: 7, x: 82.2, y: 65.7, arc: "right" },
  { id: "r-1", n: 1, x: 76.0, y: 59.3, arc: "right" },
  { id: "r-6", n: 6, x: 91.7, y: 58.3, arc: "right" },
  { id: "r-2", n: 2, x: 85.6, y: 56.2, arc: "right" },
  { id: "r-5", n: 5, x: 77.4, y: 54.1, arc: "right" },
  { id: "r-9", n: 9, x: 86.9, y: 49.9, arc: "right" },
  { id: "r-11", n: 11, x: 76.0, y: 43.6, arc: "right" },
  { id: "r-3", n: 3, x: 90.4, y: 41.5, arc: "right" },
  { id: "r-13", n: 13, x: 85.6, y: 33.0, arc: "right" },
  { id: "r-16", n: 16, x: 69.2, y: 32.0, arc: "right" },
  { id: "r-10", n: 10, x: 71.2, y: 20.4, arc: "right" },
  { id: "r-17", n: 17, x: 62.3, y: 12.0, arc: "right" },
];
