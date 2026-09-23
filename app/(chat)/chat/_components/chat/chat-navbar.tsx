"use client";

import { BrandLogo } from "@/components/brand-logo";
import Link from "next/link";
import { OnlineStatus } from "../begin-chat-button/online-status";

export function ChatNavbar() {
  return (
    <nav className="flex h-14 shrink-0 items-center justify-between border-b px-4">
      <Link href="/" className="rounded-md bg-neutral-950 px-2 py-1">
        <BrandLogo priority imageClassName="h-7" />
      </Link>
      <OnlineStatus />
    </nav>
  );
}
