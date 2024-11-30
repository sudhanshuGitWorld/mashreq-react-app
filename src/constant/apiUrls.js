const BASE_URL = 'http://localhost:8080';
export const WITH_CREDENTIALS = { withCredentials: true };
export const STATUS_CODE = {
    SUCCESS: 200,
    UNAUTHRIZED: 401,
}

export const LOGIN_API = `${BASE_URL}/login`;
export const SIGNUP_API = `${BASE_URL}/signup`;
export const LOGOUT_API = `${BASE_URL}/logout`;
