import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Input, Button } from '../components/atoms'
import { Textarea } from '../components/atoms/Textarea'
import { PageHeader } from '../components/molecules/PageHeader'
import { LoadingState } from '../components/molecules'
import { useUserStore } from '../store/user.store'
import { UpdateProfileFormData, updateProfileSchema } from '../models/user/schema/userSChema'
import { handleError } from '../utils/errorHandler'

export const PageProfileEdit = () => {
  const navigate = useNavigate()

  const { user, loading, updateProfile, fetchProfile } = useUserStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      username: '',
      displayName: '',
      email: '',
      avatar: '',
      bio: '',
      phone: '',
      location: '',
      website: '',
    },
  })

  const bioValue = watch('bio') || ''
  const bioLength = bioValue.length
  const avatarValue = watch('avatar') || user?.avatar || ''
  const displayNameValue = watch('displayName') || user?.displayName || user?.username || ''

  useEffect(() => {

    if (!user) {
      fetchProfile()
    }
  }, [user, fetchProfile])


  useEffect(() => {
    if (user) {
      reset({
        username: user.username || '',
        displayName: user.displayName || '',
        email: user.email || '',
        avatar: user.avatar || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
        website: user.website || '',
      })
    }
  }, [user, reset])

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {

      const payload: Partial<UpdateProfileFormData> = {}
      if (data.username) payload.username = data.username
      if (data.displayName) payload.displayName = data.displayName
      if (data.email) payload.email = data.email
      if (data.avatar) payload.avatar = data.avatar
      if (data.bio) payload.bio = data.bio
      if (data.phone) payload.phone = data.phone
      if (data.location) payload.location = data.location
      if (data.website) payload.website = data.website


      await updateProfile(payload)

      toast.success('Perfil actualizado correctamente')

      setTimeout(() => {
        navigate('/profile')
      }, 1000)
    } catch (error) {
      handleError(error)
    }
  }

  const onCancel = () => {
    navigate('/profile')
  }

  if (loading && !user) {
    return <LoadingState message="Cargando perfil..." />
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <PageHeader
          title="Editar Perfil"
          description="Actualiza tu información personal"
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">

            <div className="card-purple rounded-sm border border-purple-200 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-purple-400 to-indigo-400"></div>

              <div className="px-6 pb-6 -mt-16">
                <div className="flex items-end gap-4 mb-4">
                  <div className="relative">
                    {avatarValue ? (
                      <img
                        src={avatarValue}
                        alt={displayNameValue || 'Avatar'}
                        className="w-24 h-24 rounded-full border-4 border-white object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayNameValue || user?.email || 'U')}&background=8b5cf6&color=fff&size=128`
                        }}
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white text-3xl font-bold">
                        {(displayNameValue || user?.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-bold text-gray-800">
                        {displayNameValue || user?.username || 'Sin nombre'}
                      </h2>
                    </div>
                  </div>
                </div>


                <div className="mb-4">
                  <Input
                    type='url'
                    label='URL del avatar'
                    placeholder='https://example.com/avatar.jpg'
                    className='input-purple'
                    {...register('avatar')}
                    error={errors.avatar}
                  />
                </div>


                <div>
                  <Textarea
                    label='Biografía'
                    rows={4}
                    placeholder='Cuéntanos sobre ti...'
                    maxLength={500}
                    className='input-purple'
                    {...register('bio')}
                    error={errors.bio}
                    characterCount={{
                      current: bioLength,
                      max: 500,
                    }}
                  />
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información Personal */}
              <div className="card-purple rounded-sm border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Información Personal
                </h3>
                <div className="space-y-4 text-left">
                  <div>
                    <Input
                      type='text'
                      label='Nombre de usuario'
                      placeholder='johndoe'
                      className='input-purple'
                      {...register('username')}
                      error={errors.username}
                    />
                  </div>
                  <div>
                    <Input
                      type='text'
                      label='Nombre para mostrar'
                      placeholder='John Doe'
                      className='input-purple'
                      {...register('displayName')}
                      error={errors.displayName}
                    />
                  </div>
                  <div>
                    <Input
                      type='email'
                      label='Email'
                      placeholder='johndoe@example.com'
                      className='input-purple'
                      {...register('email')}
                      error={errors.email}
                    />
                  </div>
                </div>
              </div>

              <div className="card-purple rounded-sm border border-purple-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Información de Contacto
                </h3>
                <div className="space-y-4 text-left">
                  <div>
                    <Input
                      type='tel'
                      label='Teléfono'
                      placeholder='+1234567890'
                      className='input-purple'
                      {...register('phone')}
                      error={errors.phone}
                    />
                  </div>
                  <div>
                    <Input
                      type='text'
                      label='Ubicación'
                      placeholder='Madrid, España'
                      className='input-purple'
                      {...register('location')}
                      error={errors.location}
                    />
                  </div>
                  <div>
                    <Input
                      type='url'
                      label='Sitio web'
                      placeholder='https://johndoe.com'
                      className='input-purple'
                      {...register('website')}
                      error={errors.website}
                    />
                  </div>
                </div>
              </div>
            </div>

            {avatarValue && (
              <div className="card-purple rounded-sm border border-purple-200 p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  Foto de Perfil
                </h3>
                <a
                  href={avatarValue}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:underline break-all text-sm"
                >
                  {avatarValue}
                </a>
              </div>
            )}

            {/* Botones */}
            <div className='flex flex-col sm:flex-row gap-3'>
              <Button
                type='submit'
                variant='purple'
                fullWidth
                isLoading={isSubmitting}
                loadingText="Guardando..."
                disabled={isSubmitting}
              >
                Guardar Cambios
              </Button>

              <Button
                type='button'
                variant='secondary'
                fullWidth
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}