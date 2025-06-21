"use client";
import React, { useEffect, useState } from "react";
import { DiMongodb, DiNginx, DiNpm, DiPostgresql, DiVim } from "react-icons/di";
import { config } from "@/data/config";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaEnvelope,
  FaGit,
  FaGithub,
  FaHtml5,
  FaLinkedin,
  FaLinux,
  FaNodeJs,
  FaPhone,
  FaReact,
  FaVuejs,
  FaYarn,
} from "react-icons/fa6";
import {
  RiFirebaseFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiJavascript,
  SiKubuntu,
  SiPm2,
  SiPrettier,
  SiTypescript,
  SiVercel,
  SiVisualstudiocode,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { TbTerminal2 } from "react-icons/tb";
import Link from "next/link";

const CONTACT_LINKS = [
  {
    name: "Email",
    content: "dilaninf6@gmail.com",
    href: "mailto:dilaninf6@gmail.com",
    icon: <FaEnvelope height={"50px"} />,
  },
  {
    name: "WhatsApp",
    content: "081386924636",
    href: "https://wa.me/6281386924636",
    icon: <FaPhone height={"50px"} />,
  },
  {
    name: "LinkedIn",
    href: config.social.linkedin,
    content: config.social.linkedin.replace("https://www.linkedin.com/in/", "/"),
    icon: <FaLinkedin height={"50px"} />,
  },
  {
    name: "GitHub",
    href: config.social.github,
    content: config.social.github.replace("https://github.com/", "/"),
    icon: <FaGithub height={"50px"} />,
  },
];

const TOOLS = [
  {
    name: "JavaScript",
    content: "JavaScript is a high-level, interpreted programming language",
    icon: <SiJavascript size={"50px"} color={"#f0db4f"} />,
    color: "#f0db4f",
  },
  {
    name: "TypeScript",
    content: "TypeScript is a superset of JavaScript that compiles to plain JS",
    icon: <SiTypescript size={"50px"} color={"#007acc"} />,
    color: "#007acc",
  },
  {
    name: "HTML",
    content: "Next.js is a React framework for production",
    icon: <FaHtml5 size={"50px"} color="#e34c26" />,
    color: "#e34c26",
  },
  {
    name: "CSS",
    content: "Next.js is a React framework for production",
    icon: <FaCss3 size={"50px"} color="#563d7c" />,
    color: "#563d7c",
  },
  {
    name: "Nodejs",
    content: "Next.js is a React framework for production",
    icon: <FaNodeJs size={"50px"} color="#6cc24a" />,
    color: "#6cc24a",
  },
  {
    name: "React.js",
    content: "Next.js is a React framework for production",
    icon: <FaReact size={"50px"} color="#61dafb" />,
    color: "#61dafb",
  },
  {
    name: "Docker",
    content: "Next.js is a React framework for production",
    icon: <FaDocker size={"50px"} color="#2496ed" />,
    color: "#2496ed",
  },
  {
    name: "NginX",
    content: "Next.js is a React framework for production",
    icon: <DiNginx size={"50px"} color="#008000" />,
    color: "#008000",
  },
  {
    name: "Vue.js",
    content: "Next.js is a React framework for production",
    icon: <FaVuejs size={"50px"} color="#41b883" />,
    color: "#41b883",
  },
  {
    name: "Express.js",
    content: "Next.js is a React framework for production",
    icon: <SiExpress size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "PostgreSQL",
    content: "Next.js is a React framework for production",
    icon: <DiPostgresql size={"50px"} color="#336791" />,
    color: "#336791",
  },
  {
    name: "MongoDB",
    content: "Next.js is a React framework for production",
    icon: <DiMongodb size={"50px"} color="#4db33d" />,
    color: "#4db33d",
  },
  {
    name: "Tailwind CSS",
    content: "Next.js is a React framework for production",
    icon: <RiTailwindCssFill size={"50px"} color="#06b6d4" />,
    color: "#06b6d4",
  },
  {
    name: "Firebase",
    content: "Next.js is a React framework for production",
    icon: <RiFirebaseFill size={"50px"} color="#FFCA28" />,
    color: "#FFCA28",
  },
  {
    name: "Git",
    content: "Next.js is a React framework for production",
    icon: <FaGit size={"50px"} color="#f05032" />,
    color: "#f05032",
  },
  {
    name: "GitHub",
    content: "Next.js is a React framework for production",
    icon: <FaGithub size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "VS Code",
    content: "Next.js is a React framework for production",
    icon: <SiVisualstudiocode size={"50px"} color="#007acc" />,
    color: "#007acc",
  },
  {
    name: "VIM",
    content: "Next.js is a React framework for production",
    icon: <DiVim size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Prettier",
    content: "Next.js is a React framework for production",
    icon: <SiPrettier size={"50px"} color="#f7b93c" />,
    color: "#f7b93c",
  },
  {
    name: "NPM",
    content: "Next.js is a React framework for production",
    icon: <DiNpm size={"50px"} color="#CB3837" />,
    color: "#CB3837",
  },
  {
    name: "Yarn",
    content: "Next.js is a React framework for production",
    icon: <FaYarn size={"50px"} color="#2C8EBB" />,
    color: "#2C8EBB",
  },
  {
    name: "Vercel",
    content: "Next.js is a React framework for production",
    icon: <SiVercel size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Linux",
    content: "Next.js is a React framework for production",
    icon: <FaLinux size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "Kubuntu",
    content: "Next.js is a React framework for production",
    // give me correct color for  kubuntu
    icon: <SiKubuntu size={"50px"} color="#0077C4" />,
    color: "#000000",
  },
  {
    name: "Terminal",
    content: "Next.js is a React framework for production",
    icon: <TbTerminal2 size={"50px"} color="#fff" />,
    color: "#000000",
  },
  {
    name: "AWS",
    content: "Next.js is a React framework for production",
    icon: <FaAws size={"50px"} color="#3f51b5" />,
    color: "#000000",
  },
];

function Page() {
  const [toolsLoaded, setToolsLoaded] = useState(false);
  useEffect(() => {
    setToolsLoaded(true);
  }, []);
  return (
    <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px] text-zinc-300 pt-20 pb-20">
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full md:basis-1/4">
          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <div className="flex flex-row lg:flex-col items-center">
              <div className="flex justify-center items-center lg:w-full lg:aspect-square bg-zinc-800 rounded-xl lg:mb-5">
                <img
                  className="rounded-full p-4 lg:p-10 w-[100px] md:w-[150px] lg:w-[200px] aspect-square  bg-zinc-800"
                  alt="me"
                  src="/assets/me.jpg"
                />
              </div>
              <div className="flex flex-col gap-3 lg:items-center ml-10 md:ml-20 lg:ml-0">
                <p className="text-center text-xl">DILLAN ILKHAM NUR FAZRY</p>
                <div className="text-xs bg-zinc-700 w-fit px-3 py-1 rounded-full">
                  FRONT END DEVELOPER
                </div>
              </div>
            </div>

            <div className="grid gap-3 mt-10">
              {CONTACT_LINKS.map((link) => (
                <div className="flex gap-3 items-center" key={link.name}>
                  <p>{link.icon}</p>
                  <Link href={link.href} target="_blank">
                    <p className="text-sm text-zinc-400 dark:hover:text-zinc-50 transition-colors duration-200">
                      {link.content}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
        <main className="w-full lg:basis-3/4">
          <div className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600 bg-zinc-900 overflow-hidden">
            <div className="flex justify-between items-center bg-zinc-800 p-2 rounded-t-lg">
              <div className="flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>
              <p className="text-sm text-zinc-400 font-mono">DILAN@terminal: ~</p>
              <div></div>
            </div>
            <div className="p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              <p><span className="text-green-400">user@DILAN-PC</span>:<span className="text-blue-400">~</span>$ cat about_me.txt</p>
              <p>Halo! Saya DILLAN ILKHAM NUR FAZRY.</p>
              <p>Saya seorang siswa sekolah menengah yang antusias dengan pengembangan web front-end.</p>
              <p>Saya suka belajar hal-hal baru di dunia teknologi dan menciptakan pengalaman web yang menarik.</p>
              <p>Keterampilan saya meliputi HTML, CSS, JavaScript, dan framework seperti React dan Next.js.</p>
              <p>Saya selalu mencari peluang untuk belajar dan berkontribusi pada proyek-proyek menarik.</p>
              <p>Terima kasih sudah mengunjungi portofolio saya!</p>
              <p><span className="text-green-400">user@DILAN-PC</span>:<span className="text-blue-400">~</span>$ _</p>
            </div>
          </div>

          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600 mt-5"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <h2 className="text-2xl font-bold mb-5">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {toolsLoaded &&
                TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-800 border-[.5px] border-zinc-700 aspect-square"
                  >
                    {tool.icon}
                    <p className="mt-2 text-xs text-zinc-400">{tool.name}</p>
                  </div>
                ))}
            </div>
          </div>

          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600 mt-5"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <h2 className="text-2xl font-bold mb-5">Education</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Nama Sekolah Anda</p>
                <p className="text-sm text-zinc-400">Tahun Mulai - Tahun Lulus</p>
              </div>
              <p className="text-zinc-400">Jurusan/Program Studi Anda</p>
              <ul className="list-disc list-inside text-zinc-400 ml-4">
                <li>Pencapaian atau mata pelajaran penting (opsional)</li>
              </ul>
            </div>
          </div>

          <div
            className="p-4 md:p-8 lg:p-10 rounded-2xl border-[.5px] border-zinc-600 mt-5"
            style={{
              backdropFilter: "blur(2px)",
            }}
          >
            <h2 className="text-2xl font-bold mb-5">Experience</h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Nama Perusahaan/Organisasi (jika ada magang/sukarela)</p>
                <p className="text-sm text-zinc-400">Bulan Tahun Mulai - Bulan Tahun Selesai</p>
              </div>
              <p className="text-zinc-400">Posisi/Peran Anda</p>
              <ul className="list-disc list-inside text-zinc-400 ml-4">
                <li>Tanggung jawab atau pencapaian utama</li>
              </ul>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Page;
