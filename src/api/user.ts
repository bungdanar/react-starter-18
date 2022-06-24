import { CurrentUser, UserLoginPayload } from '../data-types/user'
import { request } from '../utils/handle-request'

const API_BASE_URL = '/api/user'

export const userApi = {
  login: (payload: UserLoginPayload) =>
    request.post<CurrentUser>(`${API_BASE_URL}/login`, payload),

  currentUser: () => request.get<CurrentUser>(`${API_BASE_URL}/currentUser`),

  logout: () => request.post(`${API_BASE_URL}/logout`),
}
