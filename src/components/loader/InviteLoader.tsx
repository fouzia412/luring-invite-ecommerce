// src/components/loader/InviteLoader.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useLoader } from "@/lib/loader-context";

type ServiceType = "wedding" | "birthday" | "anniversary" | "housewarming";

const SERVICE: ServiceType = "wedding";

// 🔹 FLAP IMAGES (replace with your real invite images)
const LEFT_FLAP_IMAGE = "/assets/left.jpeg";

const RIGHT_FLAP_IMAGE = "/assets/right.jpeg";

const THEMES: Record<
  ServiceType,
  { bg: string; accent: string; label: string }
> = {
  wedding: {
    bg: "from-[#f7f1fb] to-[#fff]",
    accent: "#a86dcd",
    label: "Together with their families",
  },
  birthday: {
    bg: "from-[#fff4e6] to-[#fff]",
    accent: "#ff8c42",
    label: "Join us for a celebration",
  },
  anniversary: {
    bg: "from-[#f3f4f6] to-[#fff]",
    accent: "#6b7280",
    label: "Celebrating love & memories",
  },
  housewarming: {
    bg: "from-[#ecfdf5] to-[#fff]",
    accent: "#10b981",
    label: "Warmly invites you home",
  },
};

const InviteLoader = () => {
  const { done, finish } = useLoader();
  const theme = useMemo(() => THEMES[SERVICE], []);

  useEffect(() => {
    if (done) return;
    const timer = setTimeout(finish, 4800);
    return () => clearTimeout(timer);
  }, [done, finish]);

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-hidden bg-[#fdfbff]"
        exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeOut" } }}
      >
        <div className="relative w-full h-full perspective-[1200px] md:perspective-[1800px]">
          {/* Background / Revealed Inner Page */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.bg}`}>
            {/* Subtle paper texture */}
            <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[radial-gradient(circle_at_25%_25%,#000_1px,transparent_1px)] [background-size:8px_8px]" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
              className="relative z-10 flex h-full flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12"
            >
              <motion.img
                layoutId="site-logo"
                src="https://res.cloudinary.com/drdotym31/image/upload/v1750078130/main-logo-1-1024x795_lfasd5.webp"
                className="h-20 w-auto max-h-[18vh] sm:h-28 md:h-32 drop-shadow-2xl"
                alt="Luring Invite Logo"
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
              />

              <h1
                className="mt-5 sm:mt-6 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #caa44d, #f6e27a, #caa44d)",
                }}
              >
                Luring Invite
              </h1>

              <p className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base md:text-lg max-w-xs sm:max-w-md">
                {theme.label}
              </p>

              <div className="mt-8 w-48 sm:w-64 md:w-80 h-1.5 sm:h-2 bg-white/25 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.2, ease: "easeInOut", delay: 1.2 }}
                  style={{
                    transformOrigin: "left",
                    backgroundColor: theme.accent,
                  }}
                  className="h-full rounded-full"
                />
              </div>
            </motion.div>
          </div>

          {/* LEFT FLAP */}
          <motion.div
            className="absolute inset-0 origin-right will-change-transform shadow-[inset_30px_0_60px_rgba(0,0,0,0.08)]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -90 }}
            transition={{
              duration: 2.4,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0">
              <img
                src={LEFT_FLAP_IMAGE}
                alt="Invite Left Flap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </motion.div>

          {/* RIGHT FLAP */}
          <motion.div
            className="absolute inset-0 origin-left will-change-transform shadow-[-30px_0_60px_rgba(0,0,0,0.08)]"
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 90 }}
            transition={{
              duration: 2.4,
              delay: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="absolute inset-0">
              <img
                src={RIGHT_FLAP_IMAGE}
                alt="Invite Right Flap"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </motion.div>

          {/* Center seam */}
          <div className="absolute left-1/2 top-0 h-full w-1 sm:w-2 bg-gradient-to-b from-transparent via-black/8 to-transparent transform -translate-x-1/2 pointer-events-none z-20" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InviteLoader;

// "use client";

// import React, { useEffect, useMemo } from "react";
// import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
// import { useLoader } from "@/lib/loader-context";

// type ServiceType = "wedding" | "birthday" | "anniversary" | "housewarming";

// const SERVICE: ServiceType = "wedding";

// // Replace with your images
// const LEFT_FLAP_IMAGE = "/assets/left.jpeg";
// const RIGHT_FLAP_IMAGE = "/assets/right.jpeg";

// const THEMES: Record<ServiceType, { bg: string; accent: string; label: string }> = {
//   wedding: {
//     bg: "from-[#f7f1fb] via-[#fff] to-[#fbf7ff]",
//     accent: "#a86dcd",
//     label: "Together with their families",
//   },
//   birthday: {
//     bg: "from-[#fff4e6] via-[#fff] to-[#fff8f0]",
//     accent: "#ff8c42",
//     label: "Join us for a celebration",
//   },
//   anniversary: {
//     bg: "from-[#f3f4f6] via-[#fff] to-[#f7f7f7]",
//     accent: "#6b7280",
//     label: "Celebrating love & memories",
//   },
//   housewarming: {
//     bg: "from-[#ecfdf5] via-[#fff] to-[#f0fffa]",
//     accent: "#10b981",
//     label: "Warmly invites you home",
//   },
// };

// function cx(...classes: Array<string | false | null | undefined>) {
//   return classes.filter(Boolean).join(" ");
// }

// const InviteLoader = () => {
//   const { done, finish } = useLoader();
//   const prefersReducedMotion = useReducedMotion();

//   const theme = useMemo(() => THEMES[SERVICE], []);

//   useEffect(() => {
//     if (done) return;
//     const timer = setTimeout(finish, 4800);
//     return () => clearTimeout(timer);
//   }, [done, finish]);

//   if (done) return null;

//   const flapDuration = prefersReducedMotion ? 0.001 : 2.35;
//   const flapDelay = prefersReducedMotion ? 0 : 0.55;

//   return (
//     <AnimatePresence>
//       <motion.div
//         className="fixed inset-0 z-[9999] overflow-hidden bg-[#fdfbff]"
//         initial={{ opacity: 1 }}
//         exit={{ opacity: 0, transition: { duration: prefersReducedMotion ? 0.2 : 0.7, ease: "easeOut" } }}
//       >
//         {/* BACKDROP (premium vignette + bloom) */}
//         <div className="absolute inset-0">
//           <div className={cx("absolute inset-0 bg-gradient-to-br", theme.bg)} />
//           <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.65)_0%,rgba(255,255,255,0.25)_35%,rgba(0,0,0,0.18)_100%)]" />
//           <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[radial-gradient(circle_at_20%_15%,#000_1px,transparent_1px)] [background-size:10px_10px]" />
//           <div className="absolute inset-0 pointer-events-none opacity-[0.12] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] blur-2xl" />
//         </div>

//         {/* SCENE (3D book) */}
//         <div className="relative w-full h-full [perspective:1200px] md:[perspective:1800px] flex items-center justify-center">
//           {/* Center stage sizing responsive */}
//           <div className="relative w-[92vw] max-w-[980px] h-[72vh] max-h-[720px] md:h-[78vh] md:max-h-[760px]">
//             {/* INNER REVEALED PAGE */}
//             <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.25)]">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-white/85" />
//               <div className="absolute inset-0 pointer-events-none opacity-[0.10] bg-[radial-gradient(circle_at_30%_25%,rgba(0,0,0,0.18)_1px,transparent_1px)] [background-size:12px_12px]" />

//               {/* Premium edge highlight */}
//               <div className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl ring-1 ring-black/5" />
//               <div
//                 className="absolute inset-0 pointer-events-none rounded-2xl md:rounded-3xl"
//                 style={{
//                   boxShadow:
//                     "inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -30px 80px rgba(0,0,0,0.10)",
//                 }}
//               />

//               {/* CONTENT */}
//               <motion.div
//                 initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: prefersReducedMotion ? 0 : 1.6, duration: prefersReducedMotion ? 0.2 : 0.9, ease: "easeOut" }}
//                 className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-5 sm:px-8 md:px-12"
//               >
//                 {/* Floating particles (subtle) */}
//                 {!prefersReducedMotion && (
//                   <div className="absolute inset-0 pointer-events-none overflow-hidden">
//                     {Array.from({ length: 14 }).map((_, i) => (
//                       <motion.span
//                         key={i}
//                         className="absolute block rounded-full bg-black/10"
//                         style={{
//                           width: 3 + (i % 3),
//                           height: 3 + (i % 3),
//                           left: `${(i * 7 + 13) % 100}%`,
//                           top: `${(i * 11 + 9) % 100}%`,
//                           filter: "blur(0.2px)",
//                           opacity: 0.35,
//                         }}
//                         animate={{
//                           y: [0, -14, 0],
//                           x: [0, (i % 2 ? 6 : -6), 0],
//                           opacity: [0.18, 0.45, 0.18],
//                         }}
//                         transition={{
//                           duration: 4.6 + (i % 5) * 0.5,
//                           repeat: Infinity,
//                           ease: "easeInOut",
//                           delay: i * 0.08,
//                         }}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Logo */}
//                 <motion.img
//                   src="https://res.cloudinary.com/drdotym31/image/upload/v1750078130/main-logo-1-1024x795_lfasd5.webp"
//                   className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.18)]"
//                   alt="Luring Invite Logo"
//                   initial={{ scale: prefersReducedMotion ? 1 : 0.92, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: prefersReducedMotion ? 0 : 1.8, duration: prefersReducedMotion ? 0.2 : 0.9, ease: "easeOut" }}
//                   draggable={false}
//                 />

//                 {/* Brand title with shimmer */}
//                 <div className="relative mt-4 sm:mt-5">
//                   <h1
//                     className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wider bg-clip-text text-transparent"
//                     style={{
//                       backgroundImage:
//                         "linear-gradient(120deg, #b8892b, #f6e27a, #b8892b)",
//                     }}
//                   >
//                     Luring Invite
//                   </h1>

//                   {!prefersReducedMotion && (
//                     <motion.div
//                       className="absolute inset-0 pointer-events-none"
//                       style={{
//                         background:
//                           "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
//                         mixBlendMode: "soft-light",
//                         filter: "blur(1px)",
//                       }}
//                       animate={{ x: ["-45%", "145%"] }}
//                       transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
//                     />
//                   )}
//                 </div>

//                 <p className="mt-2 sm:mt-3 text-gray-700 text-sm sm:text-base md:text-lg max-w-[22rem] sm:max-w-[28rem]">
//                   {theme.label}
//                 </p>

//                 {/* Accent divider */}
//                 <div className="mt-5 sm:mt-6 flex items-center gap-3">
//                   <span className="h-[1px] w-10 sm:w-14 bg-black/15" />
//                   <span
//                     className="h-2 w-2 rounded-full"
//                     style={{ backgroundColor: theme.accent }}
//                   />
//                   <span className="h-[1px] w-10 sm:w-14 bg-black/15" />
//                 </div>

//                 {/* Progress */}
//                 <div className="mt-7 sm:mt-8 w-52 sm:w-64 md:w-80 h-2 bg-black/10 rounded-full overflow-hidden shadow-inner">
//                   <motion.div
//                     initial={{ scaleX: 0 }}
//                     animate={{ scaleX: 1 }}
//                     transition={{
//                       duration: prefersReducedMotion ? 0.2 : 3.2,
//                       ease: "easeInOut",
//                       delay: prefersReducedMotion ? 0 : 1.05,
//                     }}
//                     style={{
//                       transformOrigin: "left",
//                       backgroundColor: theme.accent,
//                     }}
//                     className="h-full rounded-full relative"
//                   >
//                     {/* glossy highlight */}
//                     <div className="absolute inset-0 opacity-60 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),transparent)]" />
//                   </motion.div>
//                 </div>

//                 <motion.p
//                   className="mt-3 text-[11px] sm:text-xs text-gray-500 tracking-[0.22em] uppercase"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: prefersReducedMotion ? 0 : 2.1, duration: prefersReducedMotion ? 0.2 : 0.7 }}
//                 >
//                   Preparing your invite experience
//                 </motion.p>
//               </motion.div>
//             </div>

//             {/* FLAPS (book opening) */}
//             {/* LEFT FLAP */}
//             <motion.div
//               className="absolute inset-0 origin-right will-change-transform"
//               initial={{ rotateY: 0 }}
//               animate={{ rotateY: -92 }}
//               transition={{
//                 duration: flapDuration,
//                 delay: flapDelay,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               style={{
//                 transformStyle: "preserve-3d",
//                 backfaceVisibility: "hidden",
//               }}
//             >
//               <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
//                 <img
//                   src={LEFT_FLAP_IMAGE}
//                   alt="Invite Left Flap"
//                   className="w-full h-full object-cover"
//                   draggable={false}
//                 />
//                 {/* paper sheen + shadows */}
//                 <div className="absolute inset-0 bg-black/10" />
//                 <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.18),transparent_40%)]" />
//                 <div className="absolute inset-0 shadow-[inset_38px_0_70px_rgba(0,0,0,0.18)]" />
//               </div>
//             </motion.div>

//             {/* RIGHT FLAP */}
//             <motion.div
//               className="absolute inset-0 origin-left will-change-transform"
//               initial={{ rotateY: 0 }}
//               animate={{ rotateY: 92 }}
//               transition={{
//                 duration: flapDuration,
//                 delay: flapDelay,
//                 ease: [0.16, 1, 0.3, 1],
//               }}
//               style={{
//                 transformStyle: "preserve-3d",
//                 backfaceVisibility: "hidden",
//               }}
//             >
//               <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden">
//                 <img
//                   src={RIGHT_FLAP_IMAGE}
//                   alt="Invite Right Flap"
//                   className="w-full h-full object-cover"
//                   draggable={false}
//                 />
//                 <div className="absolute inset-0 bg-black/10" />
//                 <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(255,255,255,0.18),transparent_40%)]" />
//                 <div className="absolute inset-0 shadow-[inset_-38px_0_70px_rgba(0,0,0,0.18)]" />
//               </div>
//             </motion.div>

//             {/* CENTER SEAM + accent glow */}
//             <div className="absolute left-1/2 top-0 h-full w-[2px] sm:w-[3px] -translate-x-1/2 pointer-events-none z-30">
//               <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent" />
//               <div
//                 className="absolute inset-0 blur-md opacity-60"
//                 style={{
//                   background: `linear-gradient(to bottom, rgba(168,109,205,0), ${theme.accent}55, rgba(168,109,205,0))`,
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default InviteLoader;
