
import { AdminContentBlock } from "@/shared/widgets/AdminContentBlock";
import { useTranslation } from "react-i18next";
import { AdminOAuthUsersPagination } from "./components/AdminOAuthUsersPagination";
import { AdminOAuthUsersSearch } from "./components/AdminOAuthUsersSearch";
import { useOAuthUsers } from "./hooks/use-oauth-users";
import { OAuthUsersActionsProvider } from "./widgets/OAuthUsersContext";
import OAuthUsersContent from "./widgets/OAuthUsersContent";

export function AdminOAuthUsersPage() {
  const {t} = useTranslation("admin", {keyPrefix: "oauth_users"});
  const {
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
  } = useOAuthUsers();

  return (
    <AdminContentBlock
      title={t("title")} 
      subtitle={t("subtitle.active_users", {count: usersCount})}
    >
      <AdminOAuthUsersSearch
        onChangeSearch={changeSearch}
        onChangeSize={changeSize}
      />

      <div className="flex flex-1 flex-col justify-between gap-4">
        <OAuthUsersActionsProvider 
          deleteClientSessions={deleteClientSessions}
          refresh={refresh} >
          <OAuthUsersContent loading={showLoading} users={users}/>
        </OAuthUsersActionsProvider>

        <div className="mt-auto">
          <AdminOAuthUsersPagination
            page={currentPage}
            totalPages={totalPages}
            onChangePage={setCurrentPage}
          />
        </div>
      </div>

    </AdminContentBlock>
  )
}
