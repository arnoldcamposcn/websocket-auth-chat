// src/api/config/endpoints.ts
const AUTH_BASE = "/auth";
const USERS_BASE = "/users";
const CHAT_BASE = "/chat";
const ADMIN_BASE = "/users/admin";

export const API_ENDPOINTS = {
  AUTH: {
    BASE: AUTH_BASE,
    LOGIN: `${AUTH_BASE}/login`,
    REGISTER: `${AUTH_BASE}/register`,
    REFRESH: `${AUTH_BASE}/refresh`,
    LOGOUT: `${AUTH_BASE}/logout`,
    FORGOT_PASSWORD: `${AUTH_BASE}/forgot-password`,
    CREATE_NEW_PASSWORD: `${AUTH_BASE}/reset-password`,
    VERIFY_EMAIL: `${AUTH_BASE}/verify-email`,
    RESEND_VERIFICATION_EMAIL: `${AUTH_BASE}/resend-verification`,
    GOOGLE_AUTH: `${AUTH_BASE}/google`,
    GOOGLE_CALLBACK: `${AUTH_BASE}/google/callback`,
  },
  
  USERS: {
    BASE: USERS_BASE,
    ME: `${USERS_BASE}/me`,
    UPDATE_ME: `${USERS_BASE}/me`,
    SEARCH: `${USERS_BASE}/search`,
    BY_ID: (id: number) => `${USERS_BASE}/${id}`,
  },
  
  CHAT: {
    BASE: CHAT_BASE,
    CONVERSATIONS: `${CHAT_BASE}/conversations`,
    MESSAGES: (conversationId: number) => `${CHAT_BASE}/conversations/${conversationId}/messages`,
    HISTORY: (conversationId: number) => `${CHAT_BASE}/conversations/${conversationId}/history`,
  },
  
  ADMIN: {
    BASE: ADMIN_BASE,
    ALL_USERS: `${ADMIN_BASE}/all`,
    UPDATE_ROLE: (id: number) => `${ADMIN_BASE}/${id}/role`,
    DELETE_USER: (id: number) => `${ADMIN_BASE}/${id}`,
    STATS: `${ADMIN_BASE}/stats`,
  },
} as const;