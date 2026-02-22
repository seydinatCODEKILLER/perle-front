// constants/dashboard.constants.js

export const DASHBOARD_CONSTANTS = {
  ICONS: {
    MEMBERS: "👥",
    MONEY: "💰",
    PENDING: "⏳",
    DEBT: "⚠️",
    OVERDUE: "📅",
    WALLET: "💼", // ✅ NOUVEAU
    EXPENSE: "💸", // ✅ NOUVEAU
    BALANCE: "⚖️", // ✅ NOUVEAU
  },
  
  COLORS: {
    CHART_1: "oklch(0.646 0.222 41.116)",
    CHART_2: "oklch(0.6 0.118 184.704)",
    CHART_3: "oklch(0.398 0.07 227.392)",
    CHART_4: "oklch(0.828 0.189 84.429)",
    CHART_5: "oklch(0.769 0.188 70.08)",
  },
  
  CURRENCIES: {
    XOF: "F CFA",
    EUR: "€",
    USD: "$",
  },

  // ✅ NOUVEAU : Statuts de santé du wallet
  WALLET_HEALTH: {
    HEALTHY: { label: "Sain", color: "bg-green-500", icon: "✓" },
    WARNING: { label: "Attention", color: "bg-amber-500", icon: "⚠" },
    CRITICAL: { label: "Critique", color: "bg-red-500", icon: "✗" },
    UNKNOWN: { label: "Inconnu", color: "bg-gray-500", icon: "?" },
  },

  // ✅ NOUVEAU : Statuts des dépenses
  EXPENSE_STATUS: {
    PENDING: { label: "En attente", color: "bg-blue-500" },
    APPROVED: { label: "Approuvé", color: "bg-green-500" },
    REJECTED: { label: "Rejeté", color: "bg-red-500" },
    PAID: { label: "Payé", color: "bg-emerald-500" },
    CANCELLED: { label: "Annulé", color: "bg-gray-500" },
  },
};

export const DASHBOARD_ROLES = {
  ADMIN: "ADMIN",
  FINANCIAL_MANAGER: "FINANCIAL_MANAGER",
  MEMBER: "MEMBER",
};

export const MEMBER_STATUS = {
  ACTIVE: { label: "Actif", color: "bg-green-500" },
  INACTIVE: { label: "Inactif", color: "bg-gray-500" },
  SUSPENDED: { label: "Suspendu", color: "bg-yellow-500" },
  PENDING: { label: "En attente", color: "bg-blue-500" },
};