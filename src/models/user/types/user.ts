export interface UserProfile {
    id: number;
    email: string;
    username: string | null;
    displayName: string | null;
    avatar: string | null;
    bio: string | null;
    phone: string | null;
    location: string | null;
    website: string | null;
    isOnline: boolean;
    lastSeen: Date | null;
    emailVerified: boolean;
    role?: "user" | "admin";
    createdAt?: Date;
}
  
  export interface PublicUserProfile {
    id: number; 
    username: string | null;
    displayName: string | null;
    avatar: string | null;
    bio: string | null;
    isOnline: boolean;
}
  
  export interface UpdateProfileDto {
    username?: string;
    displayName?: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    location?: string;
    website?: string;
  }

