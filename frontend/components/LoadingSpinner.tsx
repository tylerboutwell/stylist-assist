export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-neutral-200 border-t-rose-500" />
        <p className="text-sm text-neutral-500">Loading…</p>
      </div>
    </div>
  );
}