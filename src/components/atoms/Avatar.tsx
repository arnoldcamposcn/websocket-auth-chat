import { UserProfile } from '../../models/user/types/user'

interface AvatarProps {
  user: Pick<UserProfile, 'avatar' | 'displayName' | 'username' | 'email' | 'isOnline'>
  size?: 'sm' | 'md' | 'lg'
  showStatus?: boolean
}

const sizeClasses = {
  sm: 'w-12 h-12 text-xl',
  md: 'w-16 h-16 text-2xl',
  lg: 'w-24 h-24 text-3xl'
}

export const Avatar = ({ user, size = 'lg', showStatus = true }: AvatarProps) => {
  const sizeClass = sizeClasses[size]
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.username || user.email || 'U')}&background=8b5cf6&color=fff&size=128`
  const initials = (user.displayName || user.username || user.email || 'U').charAt(0).toUpperCase()

  return (
    <div className="relative">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.displayName || user.username || 'Avatar'}
          className={`${sizeClass} rounded-full border-4 border-white shadow-lg object-cover`}
          onError={(e) => {
            e.currentTarget.src = fallbackUrl
          }}
        />
      ) : (
        <div className={`${sizeClass} rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white font-bold`}>
          {initials}
        </div>
      )}
      {showStatus && user.isOnline && (
        <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
      )}
    </div>
  )
}