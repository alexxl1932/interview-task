import { WeatherMetricGrid } from '../weather-metric-grid'
import { WeatherAreaList } from '../weather-area-list'

function normalizeJapanWeather(rawWeather) {
  const report = rawWeather[0]
  const area = report?.timeSeries?.[0]?.areas?.[0]

  return {
    title: area?.weathers?.[0] ?? '-',
    updatedAt: report?.reportDatetime ?? '-',
    metrics: [
      { label: 'Area', value: area?.area?.name ?? '-' },
      { label: 'Area code', value: area?.area?.code ?? '-' },
      { label: 'Wind', value: area?.winds?.[0] ?? '-' },
    ],
    areas:
      report?.timeSeries?.[0]?.areas?.map((item) => ({
        id: item.area.code,
        name: item.area.name,
        value: item.weatherCodes?.[0] ?? '-',
        description: item.weathers?.[0] ?? '-',
      })) ?? [],
  }
}

export function JapanWeather({ rawWeather, region }) {
  const weather = normalizeJapanWeather(rawWeather)

  return (
    <section className="rounded-lg border bg-card p-5">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{region.name}</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-normal">{weather.title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">Updated: {weather.updatedAt}</p>
      </div>

      <WeatherMetricGrid className="mt-6" metrics={weather.metrics} />
      <WeatherAreaList items={weather.areas} title="Forecast areas" />
    </section>
  )
}
