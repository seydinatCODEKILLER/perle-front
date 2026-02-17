export { useAuthStore } from "./store/auth.store";

// Selectors
export { authSelectors } from "./store/selectors/auth.selectors";

// Hooks
export {
  useAuth,
  useIsAuthenticated,
  useCurrentUser,
  useAuthToken,
  useAuthLoading,
  useUserName,
  useUserRole,
  useAuthInitialized,
  useMemberships,
  useCurrentMembership,
  useCurrentMembershipId,
  useOrganizationRole,
  useIsOrganizationAdmin,
} from "./hooks/useAuth";

// Login Hook
export { useLogin } from "./hooks/useLogin";
export { useRegister } from "./hooks/useRegister";

// Components
export { LoginPage } from "./pages/LoginPage";
export { RegisterPage } from "./pages/RegisterPage";

// Constants
export { AUTH_CONFIG, AUTH_MESSAGES } from "./constants/auth.constants";

// Validators
export { loginSchema, phoneValidators } from "./validators/login.schema";
export { registerSchema } from "./validators/register.schema";

// API
export { authApi } from "./api/auth.api";
