export function WeatherAreaList({ items, title }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
      <div className="mt-3 grid max-h-96 gap-3 overflow-auto pr-1 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-md border bg-background p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{item.name}</p>
              </div>
              <p className="shrink-0 text-lg font-semibold tracking-normal">{item.value}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
