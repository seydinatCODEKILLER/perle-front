import { MEMBER_ROLES, MEMBER_STATUS } from "../constants/member.constants";

/**
 * Formater les données d'un membre pour l'affichage
 */
export const formatMember = (member) => {
  return {
    ...member,
    fullName: `${member.user?.prenom || ''} ${member.user?.nom || ''}`.trim(),
    formattedRole: formatRole(member.role),
    formattedStatus: formatStatus(member.status),
    joinDate: member.joinDate ? new Date(member.joinDate).toLocaleDateString('fr-FR') : '-',
    contributionsCount: member._count?.contributions || 0,
    debtsCount: member._count?.debts || 0,
  };
};

/**
 * Formater le rôle pour l'affichage
 */
export const formatRole = (role) => {
  const roles = {
    [MEMBER_ROLES.ADMIN]: "Administrateur",
    [MEMBER_ROLES.FINANCIAL_MANAGER]: "Responsable Financier",
    [MEMBER_ROLES.MEMBER]: "Membre",
  };
  return roles[role] || role;
};

/**
 * Formater le statut pour l'affichage
 */
export const formatStatus = (status) => {
  const statuses = {
    [MEMBER_STATUS.ACTIVE]: "Actif",
    [MEMBER_STATUS.INACTIVE]: "Inactif",
    [MEMBER_STATUS.SUSPENDED]: "Suspendu",
  };
  return statuses[status] || status;
};

/**
 * Générer les badges de rôle et statut
 */
export const getRoleBadgeVariant = (role) => {
  switch (role) {
    case MEMBER_ROLES.ADMIN:
      return "default";
    case MEMBER_ROLES.FINANCIAL_MANAGER:
      return "secondary";
    default:
      return "outline";
  }
};

export const getStatusBadgeVariant = (status) => {
  switch (status) {
    case MEMBER_STATUS.ACTIVE:
      return "default";
    case MEMBER_STATUS.INACTIVE:
      return "secondary";
    case MEMBER_STATUS.SUSPENDED:
      return "destructive";
    default:
      return "outline";
  }
};