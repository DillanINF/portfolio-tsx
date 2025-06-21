import AceTernityLogo from "@/components/logos/aceternity";
import SlideShow from "@/components/slide-show";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/ui/typography";
import { ArrowUpRight, ExternalLink, Link2, MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { RiNextjsFill, RiNodejsFill, RiReactjsFill } from "react-icons/ri";
import {
  SiChakraui,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiJavascript,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReactquery,
  SiSanity,
  SiShadcnui,
  SiSocketdotio,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";
import { FaHtml5, FaCss3 } from "react-icons/fa6";
const BASE_PATH = "/assets/projects-screenshots";

const ProjectsLinks = ({ live, repo }: { live: string; repo?: string }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-start gap-3 my-3 mb-8">
      <Link
        className="font-mono underline flex gap-2"
        rel="noopener"
        target="_new"
        href={live}
      >
        <Button variant={"default"} size={"sm"}>
          Visit Website
          <ArrowUpRight className="ml-3 w-5 h-5" />
        </Button>
      </Link>
      {repo && (
        <Link
          className="font-mono underline flex gap-2"
          rel="noopener"
          target="_new"
          href={repo}
        >
          <Button variant={"default"} size={"sm"}>
            Github
            <ArrowUpRight className="ml-3 w-5 h-5" />
          </Button>
        </Link>
      )}
    </div>
  );
};

export type Skill = {
  title: string;
  bg: string;
  fg: string;
  icon: ReactNode;
};
const PROJECT_SKILLS = {
  next: {
    title: "Next.js",
    bg: "black",
    fg: "white",
    icon: <RiNextjsFill />,
  },
  chakra: {
    title: "Chakra UI",
    bg: "black",
    fg: "white",
    icon: <SiChakraui />,
  },
  node: {
    title: "Node.js",
    bg: "black",
    fg: "white",
    icon: <RiNodejsFill />,
  },
  python: {
    title: "Python",
    bg: "black",
    fg: "white",
    icon: <SiPython />,
  },
  prisma: {
    title: "prisma",
    bg: "black",
    fg: "white",
    icon: <SiPrisma />,
  },
  postgres: {
    title: "PostgreSQL",
    bg: "black",
    fg: "white",
    icon: <SiPostgresql />,
  },
  mongo: {
    title: "MongoDB",
    bg: "black",
    fg: "white",
    icon: <SiMongodb />,
  },
  express: {
    title: "Express",
    bg: "black",
    fg: "white",
    icon: <SiExpress />,
  },
  reactQuery: {
    title: "React Query",
    bg: "black",
    fg: "white",
    icon: <SiReactquery />,
  },
  shadcn: {
    title: "ShanCN UI",
    bg: "black",
    fg: "white",
    icon: <SiShadcnui />,
  },
  aceternity: {
    title: "Aceternity",
    bg: "black",
    fg: "white",
    icon: <AceTernityLogo />,
  },
  tailwind: {
    title: "Tailwind",
    bg: "black",
    fg: "white",
    icon: <SiTailwindcss />,
  },
  docker: {
    title: "Docker",
    bg: "black",
    fg: "white",
    icon: <SiDocker />,
  },
  yjs: {
    title: "Y.js",
    bg: "black",
    fg: "white",
    icon: (
      <span>
        <strong>Y</strong>js
      </span>
    ),
  },
  firebase: {
    title: "Firebase",
    bg: "black",
    fg: "white",
    icon: <SiFirebase />,
  },
  sockerio: {
    title: "Socket.io",
    bg: "black",
    fg: "white",
    icon: <SiSocketdotio />,
  },
  js: {
    title: "JavaScript",
    bg: "black",
    fg: "white",
    icon: <SiJavascript />,
  },
  ts: {
    title: "TypeScript",
    bg: "black",
    fg: "white",
    icon: <SiTypescript />,
  },
  vue: {
    title: "Vue.js",
    bg: "black",
    fg: "white",
    icon: <SiVuedotjs />,
  },
  react: {
    title: "React.js",
    bg: "black",
    fg: "white",
    icon: <RiReactjsFill />,
  },
  sanity: {
    title: "Sanity",
    bg: "black",
    fg: "white",
    icon: <SiSanity />,
  },
  spline: {
    title: "Spline",
    bg: "black",
    fg: "white",
    icon: <SiThreedotjs />,
  },
  gsap: {
    title: "GSAP",
    bg: "black",
    fg: "white",
    icon: null,
  },
  framerMotion: {
    title: "Framer Motion",
    bg: "black",
    fg: "white",
    icon: <TbBrandFramerMotion />,
  },
  supabase: {
    title: "Supabase",
    bg: "black",
    fg: "white",
    icon: <SiSupabase />,
  },
  phpNative: {
    title: "PHP Native",
    bg: "black",
    fg: "white",
    icon: null,
  },
  tilt: {
    title: "Tilt.js",
    bg: "black",
    fg: "white",
    icon: null,
  },
  mitAppInventor: {
    title: "MIT App Inventor",
    bg: "black",
    fg: "white",
    icon: null,
  },
  html: {
    title: "HTML",
    bg: "black",
    fg: "white",
    icon: <FaHtml5 />,
  },
  css: {
    title: "CSS",
    bg: "black",
    fg: "white",
    icon: <FaCss3 />,
  },
};
export type Project = {
  id: string;
  category: string;
  title: string;
  src: string;
  screenshots: string[];
  skills: { frontend: Skill[]; backend: Skill[] };
  content: React.ReactNode | any;
  github?: string;
  live: string;
};
const projects: Project[] = [
  {
    id: "website-mie-ayam",
    category: "Website",
    title: "Website Mie Ayam",
    src: `${BASE_PATH}/1.png`,
    screenshots: ["1.png"],
    skills: { frontend: [PROJECT_SKILLS.phpNative], backend: [] },
    content: (
      <p>
        Website mie ayam sederhana yang dibangun menggunakan PHP Native.
      </p>
    ),
    live: "",
    github: "",
  },
  {
    id: "aplikasi-sekolah",
    category: "Website",
    title: "Aplikasi Sekolah",
    src: `${BASE_PATH}/2.png`,
    screenshots: ["2.png"],
    skills: {
      frontend: [
        PROJECT_SKILLS.html,
        PROJECT_SKILLS.css,
        PROJECT_SKILLS.js,
        PROJECT_SKILLS.tilt,
        PROJECT_SKILLS.tailwind,
        PROJECT_SKILLS.gsap,
      ],
      backend: [],
    },
    content: (
      <p>
        Aplikasi sekolah dengan antarmuka dinamis menggunakan HTML, CSS,
        JavaScript, serta library Tilt, Tailwind CSS, dan GSAP.
      </p>
    ),
    live: "",
    github: "",
  },
  {
    id: "aplikasi-data-gaji-karyawan",
    category: "Desktop",
    title: "Aplikasi Data Gaji Karyawan",
    src: `${BASE_PATH}/3.png`,
    screenshots: ["3.png"],
    skills: { frontend: [], backend: [PROJECT_SKILLS.python] },
    content: (
      <p>
        Aplikasi desktop untuk mengelola data gaji karyawan yang dikembangkan
        dengan Python.
      </p>
    ),
    live: "",
    github: "",
  },
  {
    id: "aplikasi-portfolio-ini",
    category: "Website",
    title: "Aplikasi Portofolio Ini",
    src: `${BASE_PATH}/4.png`,
    screenshots: ["4.png"],
    skills: { frontend: [PROJECT_SKILLS.next, PROJECT_SKILLS.react, PROJECT_SKILLS.ts, PROJECT_SKILLS.tailwind], backend: [] },
    content: (
      <p>
        Aplikasi portofolio pribadi ini sendiri, menampilkan proyek-proyek saya.
      </p>
    ),
    live: "",
    github: "",
  },
  {
    id: "aplikasi-kalkulator",
    category: "Mobile",
    title: "Aplikasi Kalkulator",
    src: `${BASE_PATH}/5.png`,
    screenshots: ["5.png"],
    skills: { frontend: [PROJECT_SKILLS.mitAppInventor], backend: [] },
    content: (
      <p>
        Aplikasi kalkulator sederhana yang dibuat menggunakan MIT App Inventor.
      </p>
    ),
    live: "",
    github: "",
  },
  {
    id: "aplikasi-penghitung-berat-badan-ideal",
    category: "Mobile",
    title: "Aplikasi Penghitung Berat Badan Ideal",
    src: `${BASE_PATH}/6.png`,
    screenshots: ["6.png"],
    skills: { frontend: [PROJECT_SKILLS.mitAppInventor], backend: [] },
    content: (
      <p>
        Aplikasi mobile untuk menghitung berat badan ideal, dikembangkan dengan
        MIT App Inventor.
      </p>
    ),
    live: "",
    github: "",
  },
];
export default projects;
