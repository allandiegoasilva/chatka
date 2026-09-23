"use client";

import { MatchType } from "@/backend/match/match-type.enum";
import { userSaveAction } from "@/backend/user/actions/user-save.action";
import { UserGender } from "@/backend/user/enum/user-gender.enum";
import { ChatStatus, useChat } from "@/components/chat/chat.provider";
import { CountryPicker } from "@/components/country-picker";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { countryLabel, listCountries } from "@/lib/countries";
import { localeHtml } from "@/lib/i18n/messages";
import { useI18n } from "@/lib/i18n/provider";
import { requestUserMedia } from "@/lib/media";
import { socketConnect } from "@/lib/socket-client";
import { cn } from "@/lib/utils";
import { Mars, Transgender, Venus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LocationData = {
  countryCode: string | null;
  state: string | null;
  ip: string | null;
};

type PermissionError = "denied" | "missing" | "busy" | "insecure" | "unknown" | null;

async function getUserLocation(): Promise<LocationData> {
  try {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();

    return {
      countryCode: (data.country_code || data.country || null)?.toUpperCase() ?? null,
      state: data.region || data.region_code || null,
      ip: data.ip || null,
    };
  } catch {
    try {
      const fallbackResponse = await fetch("http://ip-api.com/json/");
      const fallbackData = await fallbackResponse.json();

      return {
        countryCode:
          (fallbackData.countryCode || fallbackData.country || null)?.toUpperCase() ??
          null,
        state: fallbackData.regionName || fallbackData.region || null,
        ip: fallbackData.query || fallbackData.ip || null,
      };
    } catch {
      return {
        countryCode: null,
        state: null,
        ip: null,
      };
    }
  }
}

export function StartButton() {
  const { t, locale } = useI18n();
  const { changeChat, setFilters, setLocalMedia } = useChat();
  const [gender, setGender] = useState<UserGender | null>(null);
  const [matchType, setMatchType] = useState<MatchType>(MatchType.WORLD);
  const [filterCountry, setFilterCountry] = useState("");
  const [location, setLocation] = useState<LocationData>({
    countryCode: null,
    state: null,
    ip: null,
  });
  const [permissionError, setPermissionError] = useState<PermissionError>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const countries = useMemo(() => {
    const items = listCountries(localeHtml[locale]);
    if (
      location.countryCode &&
      !items.some((item) => item.code === location.countryCode)
    ) {
      items.push({
        code: location.countryCode,
        name: countryLabel(location.countryCode, localeHtml[locale]),
      });
    }
    return items;
  }, [locale, location.countryCode]);

  useEffect(() => {
    getUserLocation().then((data) => {
      setLocation(data);
      if (data.countryCode) {
        setFilterCountry((current) => current || data.countryCode || "");
      }
    });
  }, []);

  const canStart =
    Boolean(gender) &&
    (matchType === MatchType.WORLD || Boolean(filterCountry)) &&
    isAdult &&
    acceptedTerms;

  function permissionMessage(error: PermissionError) {
    if (error === "denied") {
      return t.connect.denied;
    }
    if (error === "insecure") {
      return t.connect.insecure;
    }
    if (error === "missing") {
      return t.connect.missing;
    }
    if (error === "busy") {
      return t.connect.busy;
    }
    if (error === "unknown") {
      return t.connect.unknown;
    }
    return null;
  }

  async function requestPermissions(force = false) {
    if (!canStart || !gender) {
      return false;
    }

    setIsRequesting(true);
    setPermissionError(null);

    try {
      const stream = await requestUserMedia({ force });
      setLocalMedia(stream);

      const currentLocation = location.countryCode
        ? location
        : await getUserLocation();

      const selectedCountry =
        matchType === MatchType.COUNTRY ? filterCountry : null;

      await userSaveAction({
        gender,
        countryCode: currentLocation.countryCode,
        state: currentLocation.state,
        ip: currentLocation.ip,
        matchType,
        filterCountry: selectedCountry,
        filterGender: null,
      });

      setFilters({
        filterGender: null,
        matchType,
        filterCountry: selectedCountry,
      });

      const socket = await socketConnect();
      socket?.emit("queue:join", {
        matchType,
        filterCountry: selectedCountry,
        filterGender: null,
      });

      changeChat({
        status: ChatStatus.WAITING,
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "SecurityError") {
          setPermissionError("insecure");
        } else if (error.name === "NotAllowedError") {
          setPermissionError("denied");
        } else if (error.name === "NotFoundError") {
          setPermissionError("missing");
        } else if (error.name === "NotReadableError") {
          setPermissionError("busy");
        } else {
          setPermissionError("unknown");
        }
      } else {
        setPermissionError("unknown");
      }

      return false;
    } finally {
      setIsRequesting(false);
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{t.connect.gender}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              value: UserGender.MALE,
              label: t.connect.male,
              icon: Mars,
            },
            {
              value: UserGender.FEMALE,
              label: t.connect.female,
              icon: Venus,
            },
            {
              value: UserGender.OTHER,
              label: t.connect.other,
              icon: Transgender,
            },
          ].map((option) => {
            const selected = gender === option.value;
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setGender(option.value)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1.5 rounded-md border px-2 py-3 text-xs",
                  selected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-input bg-background text-muted-foreground hover:border-ring hover:text-foreground",
                )}
              >
                <Icon className="size-5" strokeWidth={2} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">{t.connect.matchType}</p>
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={matchType === MatchType.WORLD ? "default" : "outline"}
            onClick={() => setMatchType(MatchType.WORLD)}
          >
            {t.connect.world}
          </Button>
          <Button
            type="button"
            variant={matchType === MatchType.COUNTRY ? "default" : "outline"}
            onClick={() => setMatchType(MatchType.COUNTRY)}
          >
            {t.connect.country}
          </Button>
        </div>
      </div>

      {matchType === MatchType.COUNTRY && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="country-select"
            className="text-sm text-muted-foreground"
          >
            {t.connect.countryLabel}
          </label>
          <CountryPicker
            value={filterCountry}
            countries={countries}
            placeholder={t.connect.countryPlaceholder}
            searchPlaceholder={t.connect.countrySearch}
            onChange={setFilterCountry}
          />
        </div>
      )}

      {permissionError && (
        <p className="text-sm text-muted-foreground">
          {permissionMessage(permissionError)}
        </p>
      )}

      <div className="space-y-2.5">
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={isAdult}
            onChange={(event) => setIsAdult(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span>{t.connect.ageConfirm}</span>
        </label>
        <label className="flex items-start gap-2.5 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(event) => setAcceptedTerms(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          <span>
            {t.connect.termsConfirm}{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-foreground underline underline-offset-2"
            >
              {t.connect.termsLink}
            </Link>
          </span>
        </label>
      </div>

      <div className="space-y-2">
        <ShimmerButton
          type="button"
          disabled={!canStart || isRequesting}
          className="w-full h-11 disabled:opacity-50"
          background="oklch(0.586 0.253 17.585)"
          borderRadius="8px"
          onClick={() => requestPermissions()}
        >
          {isRequesting ? t.connect.requesting : t.connect.start}
        </ShimmerButton>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={!canStart || isRequesting}
          onClick={() => requestPermissions(true)}
        >
          {t.connect.requestAgain}
        </Button>
      </div>
    </div>
  );
}
