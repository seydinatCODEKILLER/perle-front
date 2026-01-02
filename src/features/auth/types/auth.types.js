/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} name
 * @property {string} [avatar]
 * @property {string} [role]
 */

/**
 * @typedef {Object} AuthState
 * @property {User|null} user
 * @property {string|null} token
 * @property {boolean} isAuthenticated
 * @property {boolean} isLoading
 * @property {boolean} isInitialized
 */

/**
 * @typedef {Object} AuthActions
 * @property {(data: {user: User, token: string}) => void} setUser
 * @property {(reason?: string) => void} logout
 * @property {() => Promise<void>} initializeAuth
 * @property {(userData: Partial<User>) => void} updateUser
 * @property {() => void} clearError
 */

/**
 * @typedef {AuthState & AuthActions} AuthStore
 */