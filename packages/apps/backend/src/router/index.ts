import { Router } from "express";
import { errorMiddlewareHandler } from "../middlewares/error.middleware";

import {
  LANGUAGES,
  REGION_WEATHER_API,
  isLanguage,
  isRegion,
} from '../config/weather';

function createUrl(url: string, params: Record<string, string>) {
  const fullUrl = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    fullUrl.searchParams.set(key, value);
  });

  return fullUrl;
}


const apiRouter = Router()


apiRouter.get('/api/weather', async (req, res) => {
  const region = req.query.region ?? 'HK';

  if (!isRegion(region)) {
    res.status(400).json({
      message: 'Invalid region',
      options: Object.keys(REGION_WEATHER_API),
    });
    return;
  }

  const api = REGION_WEATHER_API[region];
  const supportsLanguage = 'defaultLang' in api;
  const lang = req.query.lang ?? (supportsLanguage ? api.defaultLang : undefined);

  if (!isLanguage(lang)) {
    if (supportsLanguage) {
      res.status(400).json({
        message: 'Invalid language',
        options: LANGUAGES,
      });
      return;
    }
  }

  const params = isLanguage(lang) ? api.params(lang) : api.params();
  const response = await fetch(createUrl(api.url(), params));

  if (!response.ok) {
    res.status(502).json({
      message: 'Weather API request failed',
      status: response.status,
    });
    return;
  }

  const contentType = response.headers.get('content-type') ?? '';
  const weather = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  res.json({
    region,
    lang: isLanguage(lang) ? lang : undefined,
    location: api.name,
    source: api.source,
    weather,
  });
});

apiRouter.use(errorMiddlewareHandler);


export default apiRouter