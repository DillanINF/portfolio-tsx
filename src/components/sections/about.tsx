import React from "react";
import { BlurIn } from "../reveal-animations";
import { cn } from "../../lib/utils";

const AboutSection = () => {
  return (
    <section id="about" className="w-full min-h-screen py-20">
      <div className="container mx-auto px-4 md:px-[50px] xl:px-[200px]">
        <BlurIn className="mb-10">
          <h2
            className={cn(
              "bg-clip-text text-4xl text-center text-transparent md:text-7xl pt-16",
              "bg-gradient-to-b from-black/80 to-black/50",
              "dark:bg-gradient-to-b dark:from-white/80 dark:to-white/20 dark:bg-opacity-50"
            )}
          >
            About Me
          </h2>
        </BlurIn>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <BlurIn delay={0.2}>
            <div className="space-y-6">
              <p className="text-lg text-zinc-400">
                Halo! Saya DILLAN ILKHAM NUR FAZRY, seorang siswa sekolah menengah yang memiliki passion dalam pengembangan web front-end.
              </p>
              <p className="text-lg text-zinc-400">
                Saya sangat antusias dalam mempelajari teknologi web terbaru dan menciptakan pengalaman digital yang menarik dan fungsional.
              </p>
              <p className="text-lg text-zinc-400">
                Dengan fokus pada pengembangan front-end, saya terus mengasah keterampilan dalam HTML, CSS, JavaScript, dan berbagai framework modern seperti React dan Next.js.
              </p>
              <p className="text-lg text-zinc-400">
                Saya percaya bahwa kombinasi antara kreativitas dan keterampilan teknis adalah kunci untuk menciptakan solusi web yang efektif dan menarik.
              </p>
            </div>
          </BlurIn>

          <BlurIn delay={0.4}>
            <div className="bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700">
              <h3 className="text-2xl font-semibold mb-6">Personal Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Nama:</span>
                  <span>DILLAN ILKHAM NUR FAZRY</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Tanggal Lahir:</span>
                  <span>28 November 2007</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Umur:</span>
                  <span>17 Tahun</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Alamat:</span>
                  <span>Bekasi, Tambun Selatan</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Email:</span>
                  <span>dilaninf6@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">WhatsApp:</span>
                  <span>081386924636</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Lokasi:</span>
                  <span>Indonesia</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">Status:</span>
                  <span>Pelajar</span>
                </div>
              </div>
            </div>
          </BlurIn>
        </div>

        <BlurIn delay={0.6}>
          <div className="bg-zinc-800/50 p-8 rounded-2xl border border-zinc-700 mt-10">
            <h3 className="text-2xl font-semibold mb-6">Education</h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-lg font-medium">SD MI YAPINK 02</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium">SMP YAPINA NUR EL-ARAFAH</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium">SMK TELEKOMUNIKASI TELESANDI BEKASI</span>
              </div>
            </div>
          </div>
        </BlurIn>

      </div>
    </section>
  );
};

export default AboutSection; 