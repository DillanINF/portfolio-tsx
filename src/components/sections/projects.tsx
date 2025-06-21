"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

import projects, { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const ProjectsSection = () => {
  return (
    <section id="projects" className="max-w-7xl mx-auto md:h-[130vh]">
      <Link href={"#projects"}>
        <div>
          <h2
            className={cn(
              "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
              "bg-gradient-to-b from-black/80 to-black/50",
              "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50 mb-32"
            )}
          >
            Projects
          </h2>
        </div>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.src} className="flex items-center justify-center">
            <div
              className="relative w-[400px] h-auto rounded-lg overflow-hidden"
              style={{ aspectRatio: "3/2" }}
            >
              <Image
                className="absolute w-full h-full top-0 left-0 transition-all"
                src={project.src}
                alt={project.title}
                width={300}
                height={300}
              />
              <div className="absolute w-full h-1/2 bottom-0 left-0 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none">
                <div className="flex flex-col h-full items-start justify-end p-6">
                  <div className="text-lg text-left">{project.title}</div>
                  <div className="text-xs bg-white text-black rounded-lg w-fit px-2">
                    {project.category}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
