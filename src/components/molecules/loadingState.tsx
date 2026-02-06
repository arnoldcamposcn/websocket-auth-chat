// src/components/molecules/LoadingState.tsx
interface LoadingStateProps {
  message?: string
  className?: string
}

export const LoadingState = ({ 
  message = 'Cargando...',
  className = ''
}: LoadingStateProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-8 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="card-purple rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}