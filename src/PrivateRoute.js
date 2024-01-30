import { Navigate, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

// PrivateRoute component to protect routes
export function PrivateRoute({ path, element }) {
  const token = Cookies.get('token');

  // If token is present, render the specified element, otherwise redirect to the login page
  return token ? <Route path={path} element={element} /> : <Navigate to="/" replace />;
}
