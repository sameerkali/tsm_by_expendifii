import apiClient from './client';

interface CloudinarySignature {
  timestamp: number;
  signature: string;
  api_key: string;
  cloud_name: string;
  folder: string;
}

interface CloudinarySignatureResponse {
  success: boolean;
  data: CloudinarySignature;
}

interface CloudinaryUploadResponse {
  secure_url: string;
}

const MAX_LOGO_SIZE_BYTES = 2 * 1024 * 1024;
const ALLOWED_LOGO_TYPES = ['image/png', 'image/jpeg'];

function validateLogoFile(file: File) {
  if (!ALLOWED_LOGO_TYPES.includes(file.type)) {
    throw new Error('Please upload a PNG or JPG logo.');
  }

  if (file.size > MAX_LOGO_SIZE_BYTES) {
    throw new Error('Logo must be 2MB or smaller.');
  }
}

export const cloudinaryApi = {
  getUploadSignature: async (): Promise<CloudinarySignatureResponse> => {
    return apiClient.get('/cloudinary/signature') as unknown as CloudinarySignatureResponse;
  },

  uploadCompanyLogo: async (file: File): Promise<string> => {
    validateLogoFile(file);

    const { data } = await cloudinaryApi.getUploadSignature();
    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', data.api_key);
    formData.append('timestamp', String(data.timestamp));
    formData.append('signature', data.signature);
    formData.append('folder', data.folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${data.cloud_name}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('Logo upload failed. Please try again.');
    }

    const uploaded = (await response.json()) as CloudinaryUploadResponse;
    return uploaded.secure_url;
  },
};

export default cloudinaryApi;
