import { Button } from '@/components/ui/button'
import { HongKongWeather } from './countries/hong-kong-weather'
import { JapanWeather } from './countries/japan-weather'
import { SingaporeWeather } from './countries/singapore-weather'

function getErrorLabel(status) {
  if (status === 0) return 'Connection Error'
  if (status >= 500) return 'Server Error'
  if (status === 404) return 'Not Found'
  if (status >= 400) return 'Request Error'
  return 'Error'
}

export function WeatherByRegion({ error, isLoading, onRetry, rawWeather, region }) {
  if (error) {
    return (
      <section className="rounded-lg border bg-card p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-destructive">
              {getErrorLabel(error.status)}
            </p>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </div>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Retry
          </Button>
        </div>
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
