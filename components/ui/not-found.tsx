"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { useI18n } from "@/lib/i18n/provider";

export function NotFound() {
  const { t } = useI18n();

  return (
    <div className="flex w-full min-h-[60vh] justify-center items-center p-6">
      <div className="flex flex-col items-center text-center max-w-md w-full gap-5">
        <p className="text-6xl font-semibold tracking-tight">404</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">{t.notFound.title}</h1>
          <p className="text-sm text-muted-foreground">{t.notFound.description}</p>
        </div>
        <Button asChild>
          <Link href="/" className="gap-2">
            <Home className="size-4" />
            {t.notFound.back}
          </Link>
        </Button>
      </div>
    </div>
  );
}
