import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/molecules/PageHeader'
import { Button } from '../components/atoms'
import { LoadingState, ErrorState } from '../components/molecules'
import { useUserStore } from '../store/user.store'
import { formatDate } from '../utils/date.utils'

export const PageProfile = () => {
  const navigate = useNavigate()
  const { user, loading, error, fetchProfile } = useUserStore()

  useEffect(() => {
    if (!user) {
      fetchProfile()
    }
  }, [user, fetchProfile])

  if (loading) {
    return <LoadingState message="Cargando tu perfil..." />
  }

  if (error) {
    return (
      <ErrorState
        title="Error al cargar el perfil"
        message={error}
        onRetry={() => fetchProfile()}
      />
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">


        <div className="flex items-center justify-between">
          <PageHeader
            title="Mi Perfil"
            description="Información de tu cuenta"
          />
          <Button
            variant="purple"
            onClick={() => navigate('/profile/edit')}
          >
            Editar Perfil
          </Button>
        </div>

        <div className="card-purple rounded-sm border border-purple-200 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-purple-400 to-indigo-400"></div>

          <div className="px-6 pb-6 -mt-16">
            <div className="flex items-end gap-4 mb-4">
              <div className="relative">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.displayName || user.username || 'Avatar'}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.username || user.email)}&background=8b5cf6&color=fff&size=128`
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold">
                    {(user.displayName || user.username || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                {user.isOnline && (
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                )}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.displayName || user.username || 'Sin nombre'}
                  </h2>
                </div>
              </div>
            </div>

            {user.bio && (
              <div className="bg-purple-50 rounded-lg p-4 mb-4 text-left">
                <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="card-purple rounded-sm border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Información Personal
            </h3>
            <div className="space-y-4 text-left">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nombre de usuario</p>
                <p className="text-gray-900 font-medium">
                  {user.username || <span className="text-gray-400">No definido</span>}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Nombre para mostrar</p>
                <p className="text-gray-900 font-medium">
                  {user.displayName || <span className="text-gray-400">No definido</span>}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-medium break-all">{user.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Estado</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${user.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  <p className="text-gray-900 font-medium">
                    {user.isOnline ? 'En línea' : user.lastSeen ? `Última vez: ${formatDate(user.lastSeen)}` : 'Desconocido'}
                  </p>
                </div>
              </div>
            </div>
          </div>


          <div className="card-purple rounded-sm border border-purple-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Información de Contacto
            </h3>
            <div className="space-y-4 text-left">
              <div>
                <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                {user.phone ? (
                  <a
                    href={`tel:${user.phone}`}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    {user.phone}
                  </a>
                ) : (
                  <p className="text-gray-400">No definido</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Ubicación</p>
                {user.location ? (
                  <p className="text-gray-900 font-medium flex items-center gap-1">
                    {user.location}
                  </p>
                ) : (
                  <p className="text-gray-400">No definida</p>
                )}
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Sitio web</p>
                {user.website ? (
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:underline font-medium break-all flex items-center gap-1"
                  >
                    {user.website}
                  </a>
                ) : (
                  <p className="text-gray-400">No definido</p>
                )}
              </div>
            </div>
          </div>
        </div>


        {user.avatar && (
          <div className="card-purple rounded-sm border border-purple-200 p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              Foto de Perfil
            </h3>
            <a
              href={user.avatar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline break-all text-sm"
            >
              {user.avatar}
            </a>
          </div>
        )}


        <div className="card-purple rounded-sm border border-purple-200 p-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            Información de Cuenta
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Email verificado</p>
              <p className={`font-medium ${user.emailVerified ? 'text-green-600' : 'text-red-600'}`}>
                {user.emailVerified ? 'Verificado' : 'No verificado'}
              </p>

              <p className="text-gray-900 font-medium capitalize">
                {user.role || 'Usuario'}
              </p>
              <p className="text-gray-900 font-medium">
                {formatDate(user.createdAt)}
              </p>
            </div>
            <div>

            </div>

          </div>
        </div>

      </div>
    </div>
  )
}