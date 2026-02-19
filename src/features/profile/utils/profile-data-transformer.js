import { prepareMultipartData } from "@/shared/utils/form-data.utils";

/**
 * Transformer les données de profil pour l'API
 * @param {Object} data - { prenom, nom, phone, avatarFile }
 * @returns {FormData}
 */
export const transformProfileData = (data) => {
  const { avatarFile, ...otherData } = data;

  // Mapper avatarFile si présent
  const apiData = {
    ...otherData,
    ...(avatarFile && { avatarFile }),
  };

  return prepareMultipartData(apiData, ['avatarFile']);
};