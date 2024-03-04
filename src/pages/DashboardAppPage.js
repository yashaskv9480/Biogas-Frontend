import { Container, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/loading/Loading';
import Biogasapi from './apis/Biogasapi';

// components
// sections
import BCard from '../sections/@dashboard/EnergyMeter/BCard';
import Frequency from '../sections/@dashboard/EnergyMeter/Frequency';
import RCard from '../sections/@dashboard/EnergyMeter/RCard';
import YCard from '../sections/@dashboard/EnergyMeter/YCard';
import Temp from '../sections/@dashboard/phTempMethane/Temp';
import Weight from '../sections/@dashboard/phTempMethane/Weight';
import WeightWithButton from '../sections/@dashboard/phTempMethane/WeightLoggerButtons';
import PhComponent from '../sections/@dashboard/phTempMethane/pH';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const {deviceId} = useParams();
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);
  
  const authenticate = async () => {
    try {

      const value = Cookies.get('token');
      if (value) {
        const response = await Biogasapi.get("/authenticate", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": value,
          },
        })
     if (response.status !== 200) {
          setLoading(false)
        } else {
          setLoading(false)
          setIsValid(true)
        }  
      } else {
        setLoading(false)
        navigate('/login', { replace: true });
      }
    } catch (err) {
      console.log(err.message);
    }

    setLoading()
    setIsValid(true)
  }

  useEffect(() => {
  authenticate();
  },[] )
  console.log(deviceId);
  return (
    <>
      {loading
        ?
        <Loader />
        :
          isValid?
        <>
          <Helmet>
            <title> Biogas | Dashboard </title>
          </Helmet>
         
          <Container maxWidth="xl">

          <Grid
                container
                item
                xs={12}
                justifyContent="center"
                sx={{  marginLeft: '70px' }}
              >
                <Grid item xs={12} sm={6} md={3}>
                  <WeightWithButton deviceId={deviceId} />
                </Grid>
              </Grid>
            <Grid container spacing={3}>


              <Grid item xs={14} sm={8} md={4}>
                <Temp deviceId={deviceId}/>
              </Grid>

              <Grid item xs={14} sm={8} md={4}>
                <Weight deviceId={deviceId}/>
              </Grid>

              <Grid item xs={14} sm={8} md={4}>
                <PhComponent deviceId={deviceId}/>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <RCard deviceId={deviceId}/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <YCard deviceId={deviceId}/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <BCard deviceId={deviceId}/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Frequency deviceId={deviceId}/>
              </Grid>

                
               </Grid>
          </Container>
        </>
        :
        <h2>Session expired! <Link to="/login">Return to Login page </Link></h2>
        }
      </>
  );
}
