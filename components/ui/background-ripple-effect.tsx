// "use client"
// import { cn } from "@/lib/utils"

// export const BackgroundRippleEffect = ({
//   rows = 20,
//   cols = 27,
//   cellSize = 56,
// }: {
//   rows?: number
//   cols?: number
//   cellSize?: number
// }) => {
//   return (
//     <div
//       className={cn(
//         "absolute inset-0 h-full w-full",
//         "[--cell-border-color:rgba(147,197,253,0.3)] [--cell-fill-color:rgba(96,165,250,0.3)] [--cell-shadow-color:rgba(59,130,246,0.4)]",
//         "dark:[--cell-border-color:rgba(147,197,253,0.4)] dark:[--cell-fill-color:rgba(96,165,250,0.3)] dark:[--cell-shadow-color:rgba(59,130,246,0.4)]",
//       )}
//     >
//       <div className="relative h-full w-full overflow-hidden">
//         {/* top and bottom gradient masks remain; mesh removed */}
//         <div className="pointer-events-none absolute inset-x-0 top-0 h-28 z-[2] bg-gradient-to-b from-slate-900/60 to-transparent" />
//         <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 z-[2] bg-gradient-to-t from-slate-900/60 to-transparent" />
//       </div>
//     </div>
//   )
// }
