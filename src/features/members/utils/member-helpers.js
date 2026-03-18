
import { MEMBER_ROLES, MEMBER_STATUS } from "../constants/member.constants";

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

export const formatRole = (role) => {
  const roles = {
    [MEMBER_ROLES.SUPER_ADMIN]: "Super Administrateur",
    [MEMBER_ROLES.FINANCIAL_MANAGER]: "Responsable Financier",
    [MEMBER_ROLES.ADMIN]: "Administrateur",
    [MEMBER_ROLES.PRESIDENT]: "Président",
    [MEMBER_ROLES.VICE_PRESIDENT]: "Vice-Président",
    [MEMBER_ROLES.SECRETARY_GENERAL]: "Secrétaire Général",
    [MEMBER_ROLES.ORGANIZER]: "Organisateur",
    [MEMBER_ROLES.MEMBER]: "Membre",
  };
  return roles[role] || role;
};

export const formatStatus = (status) => {
  const statuses = {
    [MEMBER_STATUS.ACTIVE]: "Actif",
    [MEMBER_STATUS.INACTIVE]: "Inactif",
    [MEMBER_STATUS.SUSPENDED]: "Suspendu",
    [MEMBER_STATUS.PENDING]: "En attente",
  };
  return statuses[status] || status;
};

export const getRoleBadgeVariant = (role) => {
  switch (role) {
    case MEMBER_ROLES.SUPER_ADMIN:
      return "default";
    case MEMBER_ROLES.ADMIN:
      return "default";
    case MEMBER_ROLES.FINANCIAL_MANAGER:
      return "primary";
    case MEMBER_ROLES.PRESIDENT:
      return "default";
    case MEMBER_ROLES.VICE_PRESIDENT:
      return "secondary";
    case MEMBER_ROLES.SECRETARY_GENERAL:
      return "success";
    case MEMBER_ROLES.ORGANIZER:
      return "outline";
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