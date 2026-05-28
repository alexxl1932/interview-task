import { WeatherMetricGrid } from '../weather-metric-grid'
import { WeatherAreaList } from '../weather-area-list'

function normalizeHongKongWeather(rawWeather) {
  const temperature = rawWeather.temperature?.data?.[0]
  const humidity = rawWeather.humidity?.data?.[0]
  const rainfall = rawWeather.rainfall?.data?.[0]
  const iconCode = rawWeather.icon?.[0]

  return {
    title: temperature ? `${temperature.value} ${temperature.unit}` : '-',
    iconCode,
    iconUrl: getHkoWeatherIcon(iconCode),
    updatedAt: rawWeather.updateTime ?? '-',
    metrics: [
      { label: 'Humidity', value: humidity ? `${humidity.value}%` : '-' },
      { label: 'Rainfall', value: rainfall ? `${rainfall.max} ${rainfall.unit}` : '-' },
      { label: 'Station', value: temperature?.place ?? '-' },
    ],
    temperatureAreas:
      rawWeather.temperature?.data?.map((item) => ({
        id: `temperature-${item.place}`,
        name: item.place,
        value: `${item.value} ${item.unit}`,
      })) ?? [],
    rainfallAreas:
      rawWeather.rainfall?.data?.map((item) => ({
        id: `rainfall-${item.place}`,
        name: item.place,
        value: `${item.max} ${item.unit}`,
      })) ?? [],
    warnings: rawWeather.warningMessage ?? [],
  }
}

function getHkoWeatherIcon(picNumber) {
  if (!picNumber) {
    return null
  }

  return `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${picNumber}.png`
}

export function HongKongWeather({rawWeather, region }) {
  const weather = normalizeHongKongWeather(rawWeather)

  return (
    <section className="rounded-lg border bg-card p-5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{region.name}</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-normal">{weather.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">Updated: {weather.updatedAt}</p>
        </div>
        <div className="grid gap-2 text-sm">
          {weather.iconUrl && (
            <div className="flex items-center justify-center rounded-md border bg-muted p-3">
              <img
                alt={`Hong Kong Observatory weather icon ${weather.iconCode}`}
                className="size-24"
                src={weather.iconUrl}
              />
            </div>
          )}
        </div>
      </div>

      <WeatherMetricGrid className="mt-6" metrics={weather.metrics} />
      {weather.warnings.length > 0 && (
        <div className="mt-6 rounded-md border bg-muted p-4">
          <p className="text-sm font-semibold">Warning</p>
          <p className="mt-2 text-sm text-muted-foreground">{weather.warnings[0]}</p>
        </div>
      )}
      <WeatherAreaList items={weather.temperatureAreas} title="Temperature by station" />
      <WeatherAreaList items={weather.rainfallAreas} title="Rainfall by district" />
    </section>
  )
}
