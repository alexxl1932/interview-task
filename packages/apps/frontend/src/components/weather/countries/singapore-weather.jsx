import { WeatherAreaList } from '../weather-area-list'

function normalizeSingaporeWeather(rawWeather) {
  const reading = rawWeather.data?.readings?.[0]
  const stationReading = reading?.data?.[0]
  const station = rawWeather.data?.stations?.find((item) => item.id === stationReading?.stationId)

  return {
    title: stationReading ? `${stationReading.value} C` : '-',
    unit: rawWeather.data?.readingUnit ?? 'deg C',
    updatedAt: reading?.timestamp ?? '-',
    metrics: [
      { label: 'Station', value: station?.name ?? stationReading?.stationId ?? '-' },
      { label: 'Station count', value: rawWeather.data?.stations?.length ?? 0 },
      { label: 'Reading count', value: reading?.data?.length ?? 0 },
    ],
    stations:
      reading?.data?.map((item) => {
        const currentStation = rawWeather.data?.stations?.find(
          (stationItem) => stationItem.id === item.stationId,
        )

        return {
          id: item.stationId,
          name: currentStation?.name ?? item.stationId,
          value: `${item.value} C`,
          description: currentStation
            ? `${currentStation.location.latitude}, ${currentStation.location.longitude}`
            : undefined,
        }
      }) ?? [],
  }
}

export function SingaporeWeather({ rawWeather, region }) {
  const weather = normalizeSingaporeWeather(rawWeather)

  return (
    <section className="rounded-lg border bg-card p-5">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{region.name}</p>
          <h2 className="mt-2 text-5xl font-semibold tracking-normal">{weather.title}</h2>
          <p className="mt-3 text-sm text-muted-foreground">Updated: {weather.updatedAt}</p>
        </div>
        <div className="rounded-md border bg-muted px-3 py-2 text-sm font-medium">
          Air temperature
        </div>
      </div>

      <WeatherAreaList items={weather.stations} title={`Station readings (${weather.unit})`} />
    </section>
  )
}
