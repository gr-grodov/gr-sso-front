import { api } from "./config/api";
import type { AttachmentUploadResponse } from "./dto/response";

export class AttachmentApi {

  static async upload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<AttachmentUploadResponse>(
      "/api/attachments/upload",
      formData
    );
  }
}