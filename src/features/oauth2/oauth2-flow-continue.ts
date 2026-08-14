import { applyApiErrorToToast } from "@/shared/api/utils/apply-errors-toast";
import { ErrorUtils } from "@/shared/api/utils/error-utils";
import { OAuth2FlowService } from "@/shared/service";

export async function oauth2FlowContinue(defaultNavigate: () => void) {
  try {
    const response = await OAuth2FlowService.continue();

    if (!response.data.redirectURI) {
      defaultNavigate();
      return;
    }

    window.location.href = response.data.redirectURI;
  } catch (err) {
    const error = await ErrorUtils.getErrorResponse(err);
    applyApiErrorToToast(error);
    defaultNavigate();
  }
}