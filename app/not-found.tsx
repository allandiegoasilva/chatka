import { NotFound } from "@/components/ui/not-found";
import { metadataSEO } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = metadataSEO;

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <NotFound />
    </div>
  );
}
