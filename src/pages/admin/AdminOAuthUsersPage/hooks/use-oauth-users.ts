import { useDebounce } from "@/hooks/use-debounce";
import type { UserOAuth2Session } from "@/shared/api/dto/response";
import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { UserOAuth2SessionService } from "@/shared/service/user-oauth2-session.service";
import { useCallback, useEffect, useState } from "react";

export function useOAuthUsers() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [search, setSearch] = useState<string | null>(null);
  const debounceSearch = useDebounce(search, 500);

  const [totalPages, setTotalPages] = useState<number>(-1);
  const [usersCount, setUsersCount] = useState<number | null>(null);
  const [users, setUsers] = useState<UserOAuth2Session[]>([]);

  const [reloadKey, setReloadKey] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const showLoading = useDebounce(loading, 300);


  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await UserOAuth2SessionService.search(
          currentPage,
          debounceSearch,
          size,
        );

        setTotalPages(response.data.totalPage);
        setUsersCount(response.data.countUsers);
        setUsers(response.data.users);
      } catch (err) {
        const error = await ErrorUtils.getErrorResponse(err);
        applyApiErrorToToast(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debounceSearch, size, reloadKey]);

  const refresh = useCallback(() => {
    setReloadKey((value) => value + 1);
  }, []);

  const deleteClientSessions = useCallback(async (userId: string, clientId: string) => {
    try {
      //await UserOAuth2SessionService.deleteSession({userId: userId, clientId: clientId});
      setUsers(users => users.map((user) => {
        if (user.userId !== userId) {
          return user;
        }

        return {
          ...user,
          clients: user.clients.filter(client => client.clientId !== clientId)
        };
      }));
    } catch(err) {
      const error = await ErrorUtils.getErrorResponse(err);
      applyApiErrorToToast(error);
    }
  }, [])

  const changeSearch = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(0);
  }, []);

  const changeSize = useCallback((value: number) => {
    setSize(value);
    setCurrentPage(0);
  }, []);

  return {
    users,
    usersCount,
    totalPages,

    currentPage,
    setCurrentPage,

    changeSearch,
    changeSize,

    showLoading,

    refresh,
    deleteClientSessions,
  };
}