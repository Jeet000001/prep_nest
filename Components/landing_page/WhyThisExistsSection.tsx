// "use client";

// import { Check } from "lucide-react";

// const points = [
//   "Open access",
//   "No noise",
//   "Real practice",
// ];

// const WhyThisExists = () => {
//   return (
//     <section className="relative overflow-hidden bg-[#0B0907] py-24 sm:py-28 lg:py-32">
//       {/* Background Glow */}
//       <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#F6DAA0]/5 blur-[130px]" />

//       {/* Decorative Circle */}
//       <div className="pointer-events-none absolute -bottom-80 -left-80 hidden h-[600px] w-[600px] rounded-full border border-[#F6DAA0]/5 sm:block">
//         <div className="absolute inset-16 rounded-full border border-[#F6DAA0]/5" />
//         <div className="absolute inset-32 rounded-full border border-[#F6DAA0]/5" />
//       </div>

//       <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
//         <div className="grid gap-12 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16 xl:grid-cols-[0.6fr_1.4fr] xl:gap-24">
//           {/* Left Label */}
//           <div className="lg:pt-2">
//             <div className="flex items-center gap-3">
//               <span className="h-px w-7 bg-[#F6DAA0]" />

//               <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[#F6DAA0] sm:text-xs">
//                 Why this exists
//               </span>
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="max-w-4xl">
//             {/* Heading */}
//             <h2 className="font-mono text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
//               Early interview prep is lonely enough.
//               <br className="hidden lg:block" />{" "}
//               <span className="text-[#F6DAA0]">
//                 It doesn&apos;t need to be messy too.
//               </span>
//             </h2>

//             {/* Description */}
//             <p className="mt-7 max-w-3xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8 lg:text-lg">
//               Most &quot;help&quot; still asks you to follow, comment, join
//               something, and wait for a roadmap that may or may not arrive.
//               This site exists to remove that friction. Open it, study,
//               practice, and leave when you&apos;re ready.
//             </p>

//             {/* Points */}
//             <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 lg:mt-10 lg:gap-x-10">
//               {points.map((point) => (
//                 <div
//                   key={point}
//                   className="group flex items-center gap-3"
//                 >
//                   {/* Check */}
//                   <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F6DAA0]/20 bg-[#F6DAA0]/5 transition-all duration-300 group-hover:border-[#F6DAA0]/50 group-hover:bg-[#F6DAA0]/10">
//                     <Check
//                       size={14}
//                       strokeWidth={2}
//                       className="text-[#F6DAA0]"
//                     />
//                   </div>

//                   {/* Text */}
//                   <span className="font-mono text-xs text-neutral-400 transition-colors duration-300 group-hover:text-white sm:text-sm">
//                     {point}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyThisExists;