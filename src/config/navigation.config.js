export const NAVIGATION_CONFIG = {
  MEMBER: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
      { label: "Historique", path: "me/history", icon: "History" },
    ],
  },
  FINANCIAL_MANAGER: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
      { label: "Historique", path: "me/history", icon: "History" },
    ],
    management: [
      { label: "Dashboard", path: "dashboard", icon: "LayoutDashboard" },
      { label: "Cotisations", path: "contributions", icon: "Coins" },
      { label: "Transactions", path: "transactions", icon: "ArrowLeftRight" },
      { label: "Dettes", path: "debts", icon: "CreditCard" },
    ],
  },
  ADMIN: {
    personal: [
      { label: "Mon dashboard", path: "me/dashboard", icon: "LayoutDashboard" },
      { label: "Mes cotisations", path: "me/contributions", icon: "Coins" },
      { label: "Mes dettes", path: "me/debts", icon: "CreditCard" },
      { label: "Historique", path: "me/history", icon: "History" },
    ],
    management: [
      { label: "Dashboard", path: "dashboard", icon: "LayoutDashboard" },
      { label: "Membres", path: "members", icon: "Users" },
      { label: "Cotisations", path: "contributions", icon: "Coins" },
      { label: "Transactions", path: "transactions", icon: "ArrowLeftRight" },
      { label: "Dettes", path: "debts", icon: "CreditCard" },
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