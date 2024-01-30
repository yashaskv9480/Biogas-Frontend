// ----------------------------------------------------------------------
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const token = Cookies.get("token")
const user = token ? jwtDecode(token) : undefined ;

const account = {
  
  displayName: user ? user.name : undefined,
  email: user ? user.email : undefined
};

export default account;
