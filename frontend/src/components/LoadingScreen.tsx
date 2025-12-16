import { TbLoader3 } from "react-icons/tb";

export default function LoadingScreen() {
  return (
    <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="flex items-center gap-3 text-white">
        <TbLoader3 className="text-4xl md:text-5xl animate-spin text-cyan-500" />
        <p className="text-2xl md:text-3xl font-black">Loading...</p>
      </div>
    </div>
  );
}
