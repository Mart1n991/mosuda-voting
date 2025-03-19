import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type NavItemProps = {
  href: string;
  label: string;
  className?: string;
  isActive?: boolean;
};

export const NavItem = ({ href, label, className, isActive = false }: NavItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "text-md font-bold hover:bg-mosuda-green-light",
        isActive && "bg-mosuda-green-light",
        className
      )}
    >
      {label}
    </Link>
  );
};
