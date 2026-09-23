"use client";

import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Check, ChevronDown, Globe, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type CountryOption = {
  code: string;
  name: string;
};

type Props = {
  value: string;
  countries: CountryOption[];
  placeholder: string;
  searchPlaceholder: string;
  onChange: (code: string) => void;
  className?: string;
  worldLabel?: string;
  onWorld?: () => void;
  worldSelected?: boolean;
  compact?: boolean;
};

export function countryFlagUrl(code: string) {
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
}

export function CountryFlag({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  return (
    <img
      src={countryFlagUrl(code)}
      alt=""
      className={cn("h-4 w-5 rounded-[3px] object-cover", className)}
    />
  );
}

function CountryRow({
  country,
  selected,
  compact,
  onSelect,
}: {
  country: CountryOption;
  selected: boolean;
  compact?: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 text-left text-sm",
        compact ? "rounded-md px-3 py-2 hover:bg-muted" : "px-5 py-3.5",
        selected
          ? compact
            ? "bg-muted"
            : "bg-muted"
          : compact
            ? ""
            : "active:bg-muted/70",
      )}
    >
      <CountryFlag code={country.code} className={compact ? "h-4 w-6" : "h-5 w-7"} />
      <span className="flex-1 truncate">{country.name}</span>
      <span className="text-xs text-muted-foreground">{country.code}</span>
      {selected && <Check className="size-4 shrink-0 text-primary" />}
    </button>
  );
}

export function CountryPicker({
  value,
  countries,
  placeholder,
  searchPlaceholder,
  onChange,
  className,
  worldLabel,
  onWorld,
  worldSelected,
  compact,
}: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const dragControls = useDragControls();

  const selected = countries.find((country) => country.code === value);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return countries;
    }

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term),
    );
  }, [countries, query]);

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      searchRef.current?.focus();
    }, 80);

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  function pick(code: string) {
    onChange(code);
    close();
  }

  const list = (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
      {worldLabel && onWorld && !query.trim() && (
        <button
          type="button"
          onClick={() => {
            onWorld();
            close();
          }}
          className={cn(
            "flex w-full items-center gap-3 text-left text-sm",
            isDesktop ? "rounded-none px-3 py-2 hover:bg-muted" : "px-5 py-3.5",
            worldSelected ? "bg-muted" : "",
          )}
        >
          <Globe className="size-4 text-muted-foreground" />
          <span className="flex-1 truncate">{worldLabel}</span>
          {worldSelected && <Check className="size-4 shrink-0 text-primary" />}
        </button>
      )}
      {filtered.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          {t.connect.countryEmpty}
        </p>
      ) : (
        filtered.map((country) => (
          <CountryRow
            key={country.code}
            country={country}
            selected={country.code === value}
            compact={isDesktop}
            onSelect={() => pick(country.code)}
          />
        ))
      )}
    </div>
  );

  const sheet = (
    <AnimatePresence>
      {open && !isDesktop && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            className="relative z-10 flex w-full max-h-[86vh] flex-col overflow-hidden rounded-t-3xl bg-background pb-[env(safe-area-inset-bottom)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.9 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.55 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 90 || info.velocity.y > 650) {
                close();
              }
            }}
          >
            <div
              className="flex shrink-0 cursor-grab touch-none flex-col items-center pb-2 pt-3 active:cursor-grabbing"
              onPointerDown={(event) => dragControls.start(event)}
            >
              <span className="h-1.5 w-12 rounded-full bg-foreground/30" />
            </div>
            <div className="shrink-0 px-4 pb-3 pt-2">
              <Input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </div>
            {list}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const dialog = (
    <AnimatePresence>
      {open && isDesktop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.connect.countryLabel}
            className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-xl border bg-background shadow-xl"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
              <p className="text-sm font-medium">{t.connect.countryLabel}</p>
              <button
                type="button"
                onClick={close}
                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="relative shrink-0 border-b px-5 py-3">
              <Search className="pointer-events-none absolute left-8 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={searchRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-10 pl-9"
              />
            </div>
            <div className="max-h-[24rem]">{list}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className={cn("inline-flex min-w-0", !compact && "w-full")}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          compact
            ? "flex h-10 w-10 items-center justify-center rounded-lg border"
            : "flex h-11 w-full items-center gap-3 rounded-md border border-input bg-background px-3 text-sm",
          "outline-none focus-visible:border-ring",
          className,
        )}
      >
        {compact ? (
          selected ? (
            <CountryFlag code={selected.code} className="h-4 w-6" />
          ) : (
            <Globe className="size-4 text-muted-foreground" />
          )
        ) : selected ? (
          <>
            <CountryFlag code={selected.code} />
            <span className="flex-1 text-left">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            {placeholder}
          </span>
        )}
        {!compact && <ChevronDown className="size-4 text-muted-foreground" />}
      </button>
      {mounted ? createPortal(
        <>
          {sheet}
          {dialog}
        </>,
        document.body,
      ) : null}
    </div>
  );
}
