export const SESSION_TOKEN_KEY = 'qbounce_session_token'
export const SIGNOUT_URL = 'https://prod.api.qbouncepro.com/api/signout'

/** Backend API base URL (no trailing slash). Same as sign-in/confirm-otp host. */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://prod.api.qbouncepro.com/api'
