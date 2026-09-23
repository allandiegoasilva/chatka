"use client";

import { MatchType } from "@/backend/match/match-type.enum";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { UserGender } from "@/backend/user/enum/user-gender.enum";
import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { CountryPicker } from "@/components/country-picker";
import { ReactionBar } from "./reaction-bar";
import { listCountries } from "@/lib/countries";
import { localeHtml } from "@/lib/i18n/messages";
import { useI18n } from "@/lib/i18n/provider";
import { getSocket } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { Mars, Transgender, Users, Venus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export function MatchFilters() {
  const { t, locale } = useI18n();
  const { metadata, filters, setFilters } = useChat();
  const [genderOpen, setGenderOpen] = useState(false);
  const genderRef = useRef<HTMLDivElement>(null);
  const countries = useMemo(() => listCountries(localeHtml[locale]), [locale]);
  const isWorld = filters.matchType === MatchType.WORLD;

  const genderOptions = [
    { value: null, label: t.chat.any, icon: Users },
    { value: UserGender.MALE, label: t.connect.male, icon: Mars },
    { value: UserGender.FEMALE, label: t.connect.female, icon: Venus },
    { value: UserGender.OTHER, label: t.connect.other, icon: Transgender },
  ] as const;

  const currentGender =
    genderOptions.find((option) => option.value === filters.filterGender) ??
    genderOptions[0];
  const CurrentIcon = currentGender.icon;

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!genderRef.current?.contains(event.target as Node)) {
        setGenderOpen(false);
      }
    }

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  async function apply(next: {
    filterGender?: UserGender | null;
    matchType?: MatchType;
    filterCountry?: string | null;
  }) {
    const updated = {
      filterGender:
        next.filterGender !== undefined ? next.filterGender : filters.filterGender,
      matchType: next.matchType ?? filters.matchType,
      filterCountry:
        next.filterCountry !== undefined ? next.filterCountry : filters.filterCountry,
    };

    setFilters(updated);

    await userSaveAction({
      matchType: updated.matchType,
      filterCountry: updated.filterCountry,
      filterGender: updated.filterGender,
    });

    if (metadata.status !== ChatStatus.WAITING) {
      return;
    }

    getSocket()?.emit("queue:join", updated);
  }

  return (
    <div className="flex w-full items-center justify-between rounded-xl border bg-card p-2">
      {metadata.status === ChatStatus.CONNECTED ? <ReactionBar /> : <span />}
      <div className="flex items-center gap-1.5">
        <div ref={genderRef} className="relative">
          <button
            type="button"
            onClick={() => setGenderOpen((open) => !open)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg border",
              filters.filterGender
                ? "border-primary bg-primary/10 text-foreground"
                : "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <CurrentIcon className="size-4" />
          </button>
          {genderOpen && (
            <div className="absolute bottom-[calc(100%+6px)] right-0 z-50 min-w-36 overflow-hidden rounded-lg border bg-background py-1 shadow-lg">
              {genderOptions.map((option) => {
                const Icon = option.icon;
                const selected = option.value === filters.filterGender;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => {
                      apply({ filterGender: option.value });
                      setGenderOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 px-3 py-2 text-sm",
                      selected
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <CountryPicker
          compact
          value={isWorld ? "" : filters.filterCountry || ""}
          countries={countries}
          placeholder={t.connect.world}
          searchPlaceholder={t.connect.countrySearch}
          worldLabel={t.connect.world}
          worldSelected={isWorld}
          onWorld={() =>
            apply({
              matchType: MatchType.WORLD,
              filterCountry: null,
            })
          }
          onChange={(code) =>
            apply({
              matchType: MatchType.COUNTRY,
              filterCountry: code,
            })
          }
          className={cn(
            isWorld
              ? "border-transparent bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
              : "border-primary bg-primary/10",
          )}
        />
      </div>
    </div>
  );
}
