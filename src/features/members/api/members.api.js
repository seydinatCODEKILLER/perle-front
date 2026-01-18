import { api, createApiWithExtraction } from "@/shared/services/api";

/**
 * API pour la gestion des membres
 */
const rawMembersApi = {
  /**
   * Récupérer tous les membres d'une organisation
   * @param {string} organizationId
   * @param {Object} params - Filtres et pagination
   */
  getOrganizationMembers: async (organizationId, params = {}) => 
    await api.get(`/membership/${organizationId}/members`, { params }),

  /**
   * Récupérer un membre spécifique
   * @param {string} organizationId
   * @param {string} membershipId
   */
  getMember: async (organizationId, membershipId) => 
    await api.get(`/membership/${organizationId}/members/${membershipId}`),

  /**
   * Ajouter un nouveau membre
   * @param {string} organizationId
   * @param {Object} memberData
   */
  createMember: async (organizationId, memberData) => 
    await api.post(`/membership/${organizationId}/members`, memberData),

  /**
   * Mettre à jour un membre
   * @param {string} organizationId
   * @param {string} membershipId
   * @param {Object} updateData
   */
  updateMember: async (organizationId, membershipId, updateData) => 
    await api.put(`/membership/${organizationId}/members/${membershipId}`, updateData),

  /**
   * Mettre à jour le statut d'un membre
   * @param {string} organizationId
   * @param {string} membershipId
   * @param {Object} statusData
   */
  updateMemberStatus: async (organizationId, membershipId, statusData) => 
    await api.patch(`/membership/${organizationId}/members/${membershipId}/status`, statusData),

  /**
   * Mettre à jour le rôle d'un membre
   * @param {string} organizationId
   * @param {string} membershipId
   * @param {Object} roleData
   */
  updateMemberRole: async (organizationId, membershipId, roleData) => 
    await api.patch(`/membership/${organizationId}/members/${membershipId}/role`, roleData),

  /**
   * Supprimer un membre
   * @param {string} organizationId
   * @param {string} membershipId
   */
  deleteMember: async (organizationId, membershipId) => 
    await api.delete(`/membership/${organizationId}/members/${membershipId}`),
};

export const membersApi = createApiWithExtraction(rawMembersApi);