export const COUNTRY_CODES = [
  "AR",
  "AT",
  "AU",
  "BE",
  "BO",
  "BR",
  "CA",
  "CH",
  "CL",
  "CO",
  "CR",
  "CZ",
  "DE",
  "DK",
  "EC",
  "ES",
  "FI",
  "FR",
  "GB",
  "GR",
  "GT",
  "HN",
  "IE",
  "IT",
  "JP",
  "KR",
  "MX",
  "NL",
  "NO",
  "NZ",
  "PA",
  "PE",
  "PL",
  "PT",
  "PY",
  "RO",
  "SE",
  "SV",
  "UA",
  "US",
  "UY",
  "VE",
] as const;

export function countryLabel(code: string, locale: string) {
  try {
    return new Intl.DisplayNames([locale], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function listCountries(locale: string) {
  return COUNTRY_CODES.map((code) => ({
    code,
    name: countryLabel(code, locale),
  })).sort((a, b) => a.name.localeCompare(b.name, locale));
}
