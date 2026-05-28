export function RegionControls({
  language,
  region,
  regions,
  onLanguageChange,
  onRegionChange,
}) {
  const languages = region.languages ?? []

  return (
    <section className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row">
      <label className="grid gap-2 text-sm font-medium">
        Region
        <select
          className="h-9 min-w-40 rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          value={region.code}
          onChange={(event) => onRegionChange(event.target.value)}
        >
          {regions.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </label>

      {languages.length > 0 && (
        <label className="grid gap-2 text-sm font-medium">
          Language
          <select
            className="h-9 min-w-40 rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      )}
    </section>
  )
}
