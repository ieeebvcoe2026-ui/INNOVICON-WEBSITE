import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
