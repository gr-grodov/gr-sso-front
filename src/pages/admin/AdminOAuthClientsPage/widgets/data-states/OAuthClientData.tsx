import type { OAuthClient } from "@/shared/api/dto/response"
import { OAuthClientItem } from "./OAuthClientItem"

interface OAuthClientsDataProps {
  clients: OAuthClient[]
}

export function OAuthClientsData({clients}: OAuthClientsDataProps) {
  return (
    <div className="flex flex-col gap-1">
      {clients.map((client) => <OAuthClientItem client={client}/>)}
    </div>
  )
}