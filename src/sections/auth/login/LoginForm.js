import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Checkbox, IconButton, InputAdornment, Link, Stack, TextField } from '@mui/material';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
// components
import Iconify from '../../../components/iconify';
import Biogasapi from '../../../pages/apis/Biogasapi';

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async() => {
    try {
      const response = await Biogasapi.post("/login", { email, password });
    
      if (response.status === 200) {
        const jsonData = response.data;
    
        if (jsonData.token) {
          Cookies.set('token', jsonData.token, { expires: 1 });
          const role = jwtDecode(jsonData.token)
          console.log(role)
          navigate('/dashboard/app', { replace: true });
        }
      }  else {
        alert("Wrong email and password");
      }

    } catch (err) {
      alert("Wrong email and password! Please contact admin")
      console.error("Error during login:", err.message);
    }
  }
    
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const onWebLoad =async() => {
    const token = Cookies.get('token');
    console.log(token)
    if (token) {
      const response = await Biogasapi.get("/authenticate", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      console.log(response);

      if (response.status === 200) {
        navigate('/dashboard/app', { replace: true });
      }
    }
  }
  useEffect(()=>{
    onWebLoad();
  },[])

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" value={email} onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
