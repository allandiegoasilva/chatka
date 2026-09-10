"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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
  onSelect,
}: {
  country: CountryOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm",
        selected ? "bg-muted" : "active:bg-muted/70",
      )}
    >
      <CountryFlag code={country.code} className="h-5 w-7" />
      <span className="flex-1">{country.name}</span>
      {selected && <Check className="size-4 text-primary" />}
    </button>
  );
}

export function CountryPicker({
  value,
  countries,
  placeholder,
  searchPlaceholder,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
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
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  function pick(code: string) {
    onChange(code);
    close();
  }

  const sheet = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
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
            className="relative z-10 flex w-full max-h-[86vh] flex-col overflow-hidden rounded-t-3xl bg-background pb-[env(safe-area-inset-bottom)] md:max-w-md md:rounded-2xl md:border"
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
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
              />
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {filtered.map((country) => (
                <CountryRow
                  key={country.code}
                  country={country}
                  selected={country.code === value}
                  onSelect={() => pick(country.code)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-11 w-full items-center gap-3 rounded-md border border-input bg-background px-3 text-sm",
          "outline-none focus-visible:border-ring",
        )}
      >
        {selected ? (
          <>
            <CountryFlag code={selected.code} />
            <span className="flex-1 text-left">{selected.name}</span>
          </>
        ) : (
          <span className="flex-1 text-left text-muted-foreground">
            {placeholder}
          </span>
        )}
        <ChevronDown className="size-4 text-muted-foreground" />
      </button>
      {mounted ? createPortal(sheet, document.body) : null}
    </div>
  );
}
