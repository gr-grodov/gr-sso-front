import type { OAuth2Session } from "@/shared/api/dto/response";
import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { OAuth2SessionService } from "@/shared/service/oauth2-session.service";
import { useCallback, useEffect, useState } from "react";

export function useOAuth2Session(): [
  OAuth2Session[], OAuth2Session[], boolean, () => Promise<void>, (sid: string) => Promise<void>
] {
  const [sessions, setSessions] = useState<OAuth2Session[]>([]);
  const [currDeviceSessions, setCurrDeviceSessions] = useState<OAuth2Session[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const response = await OAuth2SessionService.list();
      
      const sessionList = [];
      const currDeviceSessionList = [];
      for (const session of response.data) {
        if (session.isCurrentDevice) {
          currDeviceSessionList.push(session);
        } else {
          sessionList.push(session);
        }
      }
      
      setSessions(sessionList);
      setCurrDeviceSessions(currDeviceSessionList)
    } catch (err) {
      setCurrDeviceSessions([]);
      setSessions([]);
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
    } finally {
      setLoading(false);
    } 
  }, [])


  const deleteSession = useCallback(async (sid: string) => {
    try {
      await OAuth2SessionService.delete(sid);
      setSessions((sessions) => sessions?.filter(session => session.sid !== sid));
      setCurrDeviceSessions((sessions) => sessions?.filter(session => session.sid !== sid))
    } catch (err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
    }
  }, [])


  useEffect(() => {
    refresh();
  }, [refresh])


  return [sessions, currDeviceSessions, loading, refresh, deleteSession];
}