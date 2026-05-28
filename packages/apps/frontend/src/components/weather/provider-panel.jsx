export function ProviderPanel({ region }) {
  return (
    <aside className="rounded-lg border bg-card p-5">
      <p className="text-sm font-medium text-muted-foreground">Provider</p>
      <h2 className="mt-2 text-xl font-semibold tracking-normal">{region.source}</h2>
      <dl className="mt-6 grid gap-3 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Region code</dt>
          <dd className="font-medium">{region.code}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Language API</dt>
          <dd className="font-medium">{region.languages?.length ? 'Supported' : 'Not supported'}</dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="text-muted-foreground">Status</dt>
          <dd className="font-medium">Mock data</dd>
        </div>
      </dl>
    </aside>
  )
}
