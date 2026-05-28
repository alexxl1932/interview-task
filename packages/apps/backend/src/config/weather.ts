export const LANGUAGES = ['tc', 'sc', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

export const JP_AREA_CODE = {
  TOKYO: '130000',
  OSAKA: '270000',
  KYOTO: '260000',
  HOKKAIDO: '016000',
  FUKUOKA: '400000',
  OKINAWA: '471000',
} as const;

export const DEFAULT_JP_AREA_CODE = JP_AREA_CODE.TOKYO;

function getSingaporeDateTime(date = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Singapore',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
    .format(date)
    .replace(' ', 'T');
}

export const REGION_WEATHER_API = {
  HK: {
    name: 'Hong Kong',
    source: 'Hong Kong Observatory',
    defaultLang: 'tc',

    url: () => 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php',
  
    params: (lang?: Language) => ({
      dataType: 'rhrread',
      lang: lang ?? 'tc',
    }),
  },
  JP: {
    name: 'Japan',
    source: 'Japan Meteorological Agency',
    areaCode: JP_AREA_CODE,
    url: () =>
      `https://www.jma.go.jp/bosai/forecast/data/forecast/${DEFAULT_JP_AREA_CODE}.json`,
    params: () => ({}),
  },
  SG: {
    name: 'Singapore',
    source: 'National Environment Agency / data.gov.sg',
    url: () => 'https://api-open.data.gov.sg/v2/real-time/api/air-temperature',
    params: () => ({
      date: getSingaporeDateTime(),
    }),
  },
} as const;

export type Region = keyof typeof REGION_WEATHER_API;

export function isRegion(value: unknown): value is Region {
  return typeof value === 'string' && value in REGION_WEATHER_API;
}

export function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && LANGUAGES.includes(value as Language);
}
