export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-700 border-t-white" />

        <p className="text-sm text-neutral-400">
          Loading...
        </p>
      </div>
    </div>
  );
}