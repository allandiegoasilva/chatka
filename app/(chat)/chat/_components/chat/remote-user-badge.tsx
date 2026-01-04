"use client";

import { UserGender } from "@/backend/user/enum/user-gender.enum";
import { cn } from "@/lib/utils";
import { User, UserCircle, Users } from "lucide-react";

type RemoteUserBadgeProps = {
  username: string;
  gender: UserGender;
  countryCode: string | null;
  state: string | null;
};

function getCountryFlagUrl(countryCode: string | null): string | null {
  if (!countryCode) return null;
  // Usa flagcdn.com - CDN gratuito para bandeiras
  return `https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`;
}

function getGenderIcon(gender: UserGender) {
  switch (gender) {
    case UserGender.MALE:
      return <User className="size-3.5 text-blue-400" strokeWidth={2.5} />;
    case UserGender.FEMALE:
      return <UserCircle className="size-3.5 text-pink-400" strokeWidth={2} />;
    case UserGender.COUPLE:
      return <Users className="size-3.5 text-purple-400" strokeWidth={2.5} />;
  }
}

export function RemoteUserBadge({
  username,
  gender,
  countryCode,
  state,
}: RemoteUserBadgeProps) {
  const flagUrl = getCountryFlagUrl(countryCode);
  const genderIcon = getGenderIcon(gender);

  return (
    <div
      className={cn(
        "absolute top-4 left-4 z-20",
        "px-2 py-1.5 rounded-full",
        "bg-black/60 backdrop-blur-sm border border-white/10",
        "flex items-center gap-1.5",
      )}
    >
      {/* Bandeira do país */}
      {flagUrl ? (
        <img
          src={flagUrl}
          alt={countryCode || "Country"}
          className="w-4 h-3 object-cover rounded-sm"
          loading="lazy"
        />
      ) : (
        <span className="text-xs leading-none">🌍</span>
      )}

      {/* Ícone do gênero */}
      {genderIcon}

      {/* Nickname */}
      <span className="text-xs font-medium text-white leading-none">
        {username}
      </span>
    </div>
  );
}
