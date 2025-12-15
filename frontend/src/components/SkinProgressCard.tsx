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
      className={`w-full p-5 flex justify-between gap-5 items-center rounded-lg ${bgColor}`}
    >
      <div className="flex items-center gap-1">
        {icon}
        <p className="font-semibold">{title}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className={`text-3xl font-bold ${valueColor}`}>{value}</h1>
        <p className="text-sm font-light">{valueDesc}</p>
      </div>
    </div>
  );
}
