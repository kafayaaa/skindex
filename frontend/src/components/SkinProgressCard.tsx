"use client";

interface Props {
  title: string;
  value: number;
  bgColor: string;
  valueColor: string;
  valueDesc: string;
  icon: React.ReactNode;
}

export default function SkinProgressCard({
  title,
  value,
  bgColor,
  valueColor,
  valueDesc,
  icon,
}: Props) {
  return (
    <div
      className={`relative overflow-clip p-3 w-full flex justify-between gap-2 items-center rounded-lg ${bgColor}`}
    >
      <div className=" flex items-center gap-1">
        <div className="absolute top-0 left-0 opacity-15">{icon}</div>
        <p className="font-extrabold text-base">{title}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className={`text-3xl font-extrabold ${valueColor}`}>{value}</h1>
        <p className="text-xs md:text-sm font-light">{valueDesc}</p>
      </div>
    </div>
  );
}
