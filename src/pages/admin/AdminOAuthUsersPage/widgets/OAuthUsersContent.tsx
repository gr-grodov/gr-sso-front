import type { UserOAuth2Session } from "@/shared/api/dto/response"
import OAuthUsersLoading from "./data-states/OAuthUsersLoading"
import OAuthUsersEmpty from "./data-states/OAuthUsersEmpty"
import OAuthUsersData from "./data-states/OAuthUsersData"

interface OAuthUsersContentProps {
  loading: boolean,
  users: UserOAuth2Session[]
}

export default function OAuthUsersContent({
  loading,
  users
}: OAuthUsersContentProps) {
  return (
    <>
      {loading ? <OAuthUsersLoading/> : users.length === 0 
        ? <OAuthUsersEmpty/>
        : <OAuthUsersData users={users}/>
      }
    </>
  )
}
