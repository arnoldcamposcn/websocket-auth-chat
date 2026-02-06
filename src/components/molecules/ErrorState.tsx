// src/components/molecules/ErrorState.tsx
import { Button } from '../atoms/Button'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export const ErrorState = ({ 
  title = 'Error',
  message, 
  onRetry,
  retryLabel = 'Intentar de nuevo',
  className = ''
}: ErrorStateProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-8 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="card-purple rounded-2xl shadow-lg p-8">
          <div className="text-center py-12">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            {onRetry && (
              <Button
                variant="purple"
                onClick={onRetry}
              >
                {retryLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

