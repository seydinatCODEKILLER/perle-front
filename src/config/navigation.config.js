export const NAVIGATION_CONFIG = {
  MEMBER: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
    ],
  },
  FINANCIAL_MANAGER: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
      {
        label: "Mes Transactions",
        path: "me/transactions",
        icon: "CreditCard",
      },
    ],
    management: [
      {
        label: "Dashboard Financier",
        path: "dashboard",
        icon: "DollarSign",
      },
      {
        label: "Mes plans de cotisations",
        path: "contribution-plans",
        icon: "FileText",
      },
      { label: "Cotisations", path: "contributions", icon: "Coins" },
      { label: "Transactions", path: "transactions", icon: "ArrowLeftRight" },
      { label: "Dettes", path: "debts", icon: "CreditCard" },
      { label: "Dépenses", path: "expenses", icon: "Receipt" },
    ],
  },
  ADMIN: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
      {
        label: "Mes Transactions",
        path: "me/transactions",
        icon: "CreditCard",
      },
    ],
    management: [
      { label: "Dashboard", path: "dashboard", icon: "LayoutDashboard" },
      { label: "Membres", path: "members", icon: "Users" },
      {
        label: "Mes plans de cotisations",
        path: "contribution-plans",
        icon: "FileText",
      },
      { label: "Cotisations", path: "contributions", icon: "Coins" },
      { label: "Transactions", path: "transactions", icon: "ArrowLeftRight" },
      { label: "Dettes", path: "debts", icon: "CreditCard" },
      { label: "Dépenses", path: "expenses", icon: "Receipt" },
      { label: "Paramètres", path: "settings", icon: "Settings" },
    ],
  },
};

// Rôles disponibles
export const ROLES = {
  MEMBER: "MEMBER",
  FINANCIAL_MANAGER: "FINANCIAL_MANAGER",
  ADMIN: "ADMIN",
};

// Espaces disponibles
export const SPACES = {
  PERSONAL: "personal",
  MANAGEMENT: "management",
};

export const hasManagementAccess = (role) => {
  return role === ROLES.ADMIN || role === ROLES.FINANCIAL_MANAGER;
};

export const getDefaultDashboard = (role) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.FINANCIAL_MANAGER:
      return "dashboard";
    case ROLES.MEMBER:
    default:
      return "me/dashboard";
  }
};
