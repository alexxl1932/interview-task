import { HongKongWeather } from './countries/hong-kong-weather'
import { JapanWeather } from './countries/japan-weather'
import { SingaporeWeather } from './countries/singapore-weather'

export function WeatherByRegion({ error, isLoading, rawWeather, region }) {
  if (error) {
    return (
      <section className="rounded-lg border bg-card p-5">
        <p className="text-sm font-medium text-destructive">Failed to load weather</p>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </section>
    )
  }

  if (isLoading || !rawWeather) {
    return (
      <section className="rounded-lg border bg-card p-5">
        <p className="text-sm font-medium text-muted-foreground">{region.name}</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-normal">Loading weather data</h2>
      </section>
    )
  }

  switch (region.code) {
    case 'HK':
      return <HongKongWeather rawWeather={rawWeather} region={region} />
    case 'JP':
      return <JapanWeather rawWeather={rawWeather} region={region} />
    case 'SG':
      return <SingaporeWeather rawWeather={rawWeather} region={region} />
    default:
      return null
  }
}
