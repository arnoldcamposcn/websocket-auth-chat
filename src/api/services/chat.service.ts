// // src/api/services/users.service.ts
// import { api } from "../config/axios.instance";
// import { API_ENDPOINTS } from "../config/api.endpoints";
// import { UserProfile, UpdateProfileDto, PublicUserProfile } from "../../types/user";

// export const usersService = {
//   // Obtener perfil del usuario autenticado
//   getMyProfile: async (): Promise<UserProfile> => {
//     const { data } = await api.get<UserProfile>(API_ENDPOINTS.USERS.ME);
//     return data;
//   },

//   // Actualizar perfil del usuario autenticado
//   updateMyProfile: async (payload: UpdateProfileDto): Promise<UserProfile> => {
//     const { data } = await api.patch<UserProfile>(
//       API_ENDPOINTS.USERS.UPDATE_ME,
//       payload
//     );
//     return data;
//   },

//   // Buscar usuarios
//   searchUsers: async (query: string, limit = 20): Promise<PublicUserProfile[]> => {
//     const { data } = await api.get<PublicUserProfile[]>(
//       API_ENDPOINTS.USERS.SEARCH,
//       { params: { q: query, limit } }
//     );
//     return data;
//   },

//   // Obtener perfil público de otro usuario
//   getPublicProfile: async (userId: number): Promise<PublicUserProfile> => {
//     const { data } = await api.get<PublicUserProfile>(
//       API_ENDPOINTS.USERS.BY_ID(userId)
//     );
//     return data;
//   },
// };