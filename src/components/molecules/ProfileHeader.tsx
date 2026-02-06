// src/components/molecules/ProfileHeader.tsx
import { Avatar } from '../atoms/Avatar'
import { UserProfile } from '../../models/user/types/user'

interface ProfileHeaderProps {
  user: Pick<UserProfile, 'avatar' | 'displayName' | 'username' | 'email' | 'isOnline' | 'emailVerified' | 'bio'>
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <div className="card-purple rounded-2xl shadow-lg overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-purple-400 to-indigo-400"></div>
      
      <div className="px-6 pb-6 -mt-16">
        <div className="flex items-end gap-4 mb-4">
          <Avatar user={user} size="lg" showStatus={true} />
          
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.displayName || user.username || 'Sin nombre'}
              </h2>
              {user.emailVerified && (
                <span className="text-blue-500" title="Email verificado">
                  ✓
                </span>
              )}
            </div>
            {user.username && (
              <p className="text-gray-500 text-sm">@{user.username}</p>
            )}
            <p className="text-gray-600 text-sm mt-1">{user.email}</p>
          </div>
        </div>

        {user.bio && (
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <p className="text-gray-700 whitespace-pre-line">{user.bio}</p>
          </div>
        )}
      </div>
    </div>
  )
}