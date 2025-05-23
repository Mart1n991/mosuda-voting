import { Accordion as ShadcnAccordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type AccordionProps = {
  items: {
    title: string;
    content: string;
  }[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  return (
    <ShadcnAccordion type="single" collapsible className={cn("w-full", className)}>
      {items.map((item) => (
        <AccordionItem key={item.title} value={item.title}>
          <AccordionTrigger className="font-bold">{item.title}</AccordionTrigger>
          <AccordionContent className="whitespace-pre-line">{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </ShadcnAccordion>
  );
}
