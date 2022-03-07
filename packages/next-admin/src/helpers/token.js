const TOKEN_KEY = '__sessionToken__';

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}
