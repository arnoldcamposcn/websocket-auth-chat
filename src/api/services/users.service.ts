// src/api/services/users.service.ts
import { api } from "../config/axios.instance";
import { API_ENDPOINTS } from "../config/api.endpoints";
import { UserProfile } from "../../models/user/types/user";

export const usersService = {

  getMyProfile: async (): Promise<UserProfile> => {
    const { data } = await api.get<UserProfile>(API_ENDPOINTS.USERS.ME);
    return data;
  },

  updateMyProfile: async (payload: Partial<UserProfile>): Promise<UserProfile> => {
    const { data } = await api.patch<UserProfile>(
      API_ENDPOINTS.USERS.ME,
      payload
    );
    return data;
  }
  
  
};