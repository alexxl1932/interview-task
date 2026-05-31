import { RegionControls } from './region-controls'
import { WeatherByRegion } from './weather-by-region'
import { ProviderPanel } from './provider-panel'

export function WeatherShell({
  error,
  isLoading,
  language,
  rawWeather,
  region,
  regions,
  onLanguageChange,
  onRegionChange,
  onRetry,
}) {
  return (
    <main className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b pb-5 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Regional weather</p>
            <h1 className="text-3xl font-semibold tracking-normal md:text-4xl">
              Official weather dashboard
            </h1>
          </div>
          <RegionControls
            language={language}
            region={region}
            regions={regions}
            onLanguageChange={onLanguageChange}
            onRegionChange={onRegionChange}
          />
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <WeatherByRegion
            error={error}
            isLoading={isLoading}
            language={language}
            rawWeather={rawWeather}
            region={region}
            onRetry={onRetry}
          />
          <ProviderPanel region={region} />
        </section>
      </div>
    </main>
  )
}
