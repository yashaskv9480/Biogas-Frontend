
let role = 'user'

export const useAuth = () => {
    return role;
};

export const setRole = (newRole) => {
  role = newRole;
};
