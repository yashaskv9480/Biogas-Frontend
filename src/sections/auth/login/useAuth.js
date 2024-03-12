import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = Cookies.get('token');
  let uid = null;
  let role = "user";
  let isAdmin = false;
  let isManager = false;
  let isUser = false;
  let user = null;

  if (token) {
    user = jwtDecode(token);
    uid = user.id;
    role = user.type;

    if (role === 'admin') {
      isAdmin = true;
    } else if (role === 'manager') {
      isManager = true;
    }
    else if (role === 'user'){
      isUser = true
    }
    return { role, user, isAdmin, isManager,isUser, uid };

  }

  return { role, isAdmin, isManager,isUser };
};

export default useAuth;
