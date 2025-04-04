import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { ChangeEvent } from "react";
import { Loader2 } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  className?: string;
  onSearch: (value: string) => void;
  isLoading?: boolean;
};

export const SearchBar = ({ placeholder, className, onSearch, isLoading }: SearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className={cn("w-full max-w-xl relative", className)}>
      <Input
        type="text"
        placeholder={placeholder}
        className="border-mosuda-green-light focus-visible:border-mosuda-green-dark pr-10"
        onChange={handleChange}
        disabled={isLoading}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="h-4 w-4 animate-spin text-mosuda-green-dark" />
        </div>
      )}
    </div>
  );
};
