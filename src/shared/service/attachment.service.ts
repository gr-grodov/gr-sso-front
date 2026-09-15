import { AttachmentApi } from "../api/attachment.api";
import { env } from "@/shared/config/env";

export class AttachmentService {
  static async upload(file: File) {
    return AttachmentApi.upload(file);
  }

  static getResourceURI(attachmentId: string) {
    return `${env.apiUrl}/api/attachments/${attachmentId}`;
  }
}