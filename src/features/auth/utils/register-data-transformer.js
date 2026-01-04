import { prepareMultipartData } from "@/shared/utils/form-data.utils";

/**
 * Transformer les données d'inscription pour l'API
 * @param {Object} data
 * @returns {FormData}
 */
export const transformRegisterData = (data) => {
  const { avatar, ...otherData } = data;

  // Mapper le champ avatar vers avatarFile (comme attendu par le backend)
  const apiData = {
    ...otherData,
    ...(avatar && { avatar }),
  };

  return prepareMultipartData(apiData, ['avatar']);
};