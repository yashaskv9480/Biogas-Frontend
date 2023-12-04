import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
import { useState, useEffect, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import Loader from '../components/loading/Loading';

// components
import Iconify from '../components/iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
import BCard from '../sections/@dashboard/EnergyMeter/BCard';
import RCard from '../sections/@dashboard/EnergyMeter/RCard';
import YCard from '../sections/@dashboard/EnergyMeter/YCard';
import Frequency from '../sections/@dashboard/EnergyMeter/Frequency';
import Weight from '../sections/@dashboard/phTempMethane/Weight';
import Temp from '../sections/@dashboard/phTempMethane/Temp';
import PhComponent from '../sections/@dashboard/phTempMethane/pH';
import Biogasapi from './apis/Biogasapi';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [recentvalue,setrecentvalue] = useState([])

  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  const authenticate = async () => {
    // try {
    //   // get Cookie
    //   const value = Cookies.get('token');
    //   if (value) {
    //     const response = await fetch('http://localhost:4001/api/authenticate', {
    //       method: "GET",
    //       headers: { "Content-Type": "application/json", "Authorization": value },
    //     })


    //     if (response.status !== 200) {
    //       setLoading(false)
    //       // alert("Session expired! Please provide login details again")
    //       // navigate('/login', { replace: true });
    //     } else {
    //       setLoading(false)
    //       setIsValid(true)
    //     }
    //   } else {
    //     setLoading(false)
    //     navigate('/login', { replace: true });
    //   }
    // } catch (err) {
    //   console.log(err.message);
    // }
    
    setLoading()
    setIsValid(true)
  }
 
  useEffect(() => { 
   authenticate();
  },[] )
  
  
  
console.log(recentvalue)

// Use these variables in your component logic


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
            {/* <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome 
            </Typography> */}

            <Grid container spacing={3}>
              {/* <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Add Users" total={100} icon={'mdi:user'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Add Tenants" total={5} color="info" icon={'mdi:user'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="Add Devices" total={1000} color="warning" icon={'solar:devices-outline'} />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary title="View Reports" total={234} color="error" icon={'mdi:report-box'} />
              </Grid> */}

              <Grid item xs={14} sm={8} md={4}>
                <Temp/>
              </Grid>
                
              <Grid item xs={14} sm={8} md={4}>
                <Weight/>
              </Grid>
                
                <Grid item xs={14} sm={8} md={4}>
                <PhComponent/>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
             <RCard/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
              <YCard/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
              <BCard/>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
              <Frequency/>
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
