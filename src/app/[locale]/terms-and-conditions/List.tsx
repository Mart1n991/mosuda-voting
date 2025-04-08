import { cn } from "@/lib/utils";

type ListProps = {
  number: number;
  children: React.ReactNode;
  className?: string;
};

export const List = ({ number, children, className }: ListProps) => {
  return (
    <div className={cn("flex items-start gap-2 md:gap-6", className)}>
      <p className="text-2xl md:text-3xl xl:text-5xl text-mosuda-green-light font-bold">{number}.</p>
      <p className="text-xs md:text-sm xl:text-base text-stone-700 pt-1">{children}</p>
    </div>
  );
};
