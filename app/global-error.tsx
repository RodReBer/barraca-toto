"use client"

import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="container flex flex-col items-center justify-center min-h-screen py-16 text-center">
          <h1 className="text-6xl font-bold text-yellow-500 mb-4">Error</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Algo salió mal</h2>
          <p className="text-gray-600 max-w-md mb-8">Lo sentimos, ha ocurrido un error inesperado.</p>
          <div className="flex gap-4">
            <button
              onClick={() => reset()}
              className="px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Intentar de nuevo
            </button>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 rounded-md bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}

