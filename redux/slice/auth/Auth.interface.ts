import { User } from "../../../services/user"

export interface AuthStore {
  access_token?: string
  refresh_token?: string
  user?: User
}
