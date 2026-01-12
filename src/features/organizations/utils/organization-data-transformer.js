import { prepareMultipartData } from "@/shared/utils/form-data.utils";

export const transformOrganizationData = (data) => {
  const { logo, ...otherData } = data;

  const apiData = {
    ...otherData,
    ...(logo && { logo }),
  };

  return prepareMultipartData(apiData, ['logo']);
};

/**
 * Prépare les données d'organisation pour la mise à jour (FormData)
 * @param {object} data - Données du formulaire
 * @param {File | null | undefined} existingLogo - Logo existant
 * @returns {FormData}
 */
// eslint-disable-next-line no-unused-vars
export const prepareUpdateFormData = (data, existingLogo) => {
  // Si l'utilisateur n'a pas changé de logo, on ne l'envoie pas
  const logoToSend = data.logo ?? undefined;

  const apiData = {
    ...data,
    ...(logoToSend && { logo: logoToSend }),
  };

  return prepareMultipartData(apiData, ["logo"]);
};
