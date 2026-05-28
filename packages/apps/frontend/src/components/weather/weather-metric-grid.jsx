import { cn } from '@/lib/utils'

export function WeatherMetricGrid({ className, metrics }) {
  return (
    <div className={cn('grid gap-3 md:grid-cols-3', className)}>
      {metrics.map((metric) => (
        <article key={metric.label} className="rounded-md border bg-background p-4">
          <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-normal">{metric.value}</p>
        </article>
      ))}
    </div>
  )
}
