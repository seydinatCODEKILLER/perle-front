/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} [avatar]
 * @property {string} [role]
 * @property {string} nom
 * @property {string} prenom
 * @property {string} phone
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