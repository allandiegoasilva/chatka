import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  className?: string
  imageClassName?: string
  priority?: boolean
};

export function BrandLogo({ className, imageClassName, priority }: Props) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="Chatka"
        width={480}
        height={360}
        priority={priority}
        className={cn("h-8 w-auto", imageClassName)}
      />
    </span>
  );
}
