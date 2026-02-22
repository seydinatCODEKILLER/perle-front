import { prepareMultipartData } from "@/shared/utils/form-data.utils";

/**
 * Transformer les données d'organisation pour la création
 * @param {Object} data - Données du formulaire
 * @returns {FormData}
 */
export const transformOrganizationData = (data) => {
  const { logo, wallet, settings, ...otherData } = data;

  // Préparer les données pour l'API
  const apiData = {
    ...otherData,
    ...(logo && { logo }),
  };

  // ✅ NOUVEAU : Ajouter wallet.initialBalance en tant que champ plat pour FormData
  if (wallet?.initialBalance !== undefined) {
    apiData["wallet.initialBalance"] = wallet.initialBalance;
  }

  // ✅ NOUVEAU : Ajouter settings en tant que champs plats pour FormData
  if (settings) {
    if (settings.allowPartialPayments !== undefined) {
      apiData["settings.allowPartialPayments"] = settings.allowPartialPayments;
    }
    if (settings.autoReminders !== undefined) {
      apiData["settings.autoReminders"] = settings.autoReminders;
    }
    if (settings.reminderDays !== undefined) {
      apiData["settings.reminderDays"] = settings.reminderDays.join(",");
    }
    if (settings.emailNotifications !== undefined) {
      apiData["settings.emailNotifications"] = settings.emailNotifications;
    }
    if (settings.smsNotifications !== undefined) {
      apiData["settings.smsNotifications"] = settings.smsNotifications;
    }
    if (settings.whatsappNotifications !== undefined) {
      apiData["settings.whatsappNotifications"] =
        settings.whatsappNotifications;
    }
    if (settings.sessionTimeout !== undefined) {
      apiData["settings.sessionTimeout"] = settings.sessionTimeout;
    }
  }

  return prepareMultipartData(apiData, ["logo"]);
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
