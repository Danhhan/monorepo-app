const isAuthenticated: () => Boolean = () => {
  const token = localStorage.getItem('token');

  return Boolean(token);
};

export default isAuthenticated;
