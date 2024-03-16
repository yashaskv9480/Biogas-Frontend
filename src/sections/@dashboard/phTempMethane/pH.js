import { Card, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import ReactSpeedometer from "react-d3-speedometer";
import Iconify from "../../../components/iconify"; // Assuming you have an Iconify component
import Biogasapi from "../../../pages/apis/Biogasapi";

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(10),
  height: theme.spacing(10),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${theme.alpha(theme.palette.primary.dark, 0)} 0%, ${theme.alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`,
}));

const getPhColor = (ph) => {
  if (ph >= 12) {
    return "#red";
  }
  if (ph >= 10) {
    return "#orangered";
  }
  if (ph >= 8) {
    return "#darkorange";
  }
  if (ph >= 6) {
    return "#khaki";
  }
  return "#lightgoldenrodyellow";
};

const PhComponent = ({keys,deviceId}) => {
   const [ph,setph] = useState(0.0)
  const [value, setValue] = useState(0.5);


  // Simulate live data updates
  useEffect(() => {
    const fetchrecentvalues = async () => {
      try {
        const response = await Biogasapi.get(`/dashboard/${keys}/${deviceId}`);
  
          if (!response.error) {

            const firstSensorValue = response.data;

            // Update only the 'r' value in the state
            setph(firstSensorValue.value ? firstSensorValue.value : 0.0);            
        //    console.log(firstSensorValue.r)

          }
      } catch (err) {
          console.error(err.message);
      } 
  };

    const interval = setInterval(() => {
      fetchrecentvalues();
  //    console.log(r)

    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
//    console.log(r); // You can remove or modify this line
    setValue(ph);
    // Reset the popping effect after a short delay
    setTimeout(() => {
    }, 300);
  }, [ph]);

  return (
    <Card
      sx={{
        width: "100%",
        height: 350,
        margin: 0,
        marginTop:2,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        boxShadow: 20,
        color: "white",
        bgcolor: "lightgrey", // Dark background color
      }}
    >
      <div
        style={{
          background: "#708090",
          padding: "10px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

        }}
      >
        <Typography variant="subtitle1"><h4>pH Level</h4></Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"PhIcon"} width={24} height={24} />
      </StyledIcon>

      <ReactSpeedometer
        maxValue={14}
        minValue={0}
        height={190}
        width={290}
        value={value}
        needleTransition="easeQuadIn"
        needleTransitionDuration={1000}
        needleColor="White"
        startColor={getPhColor(value)}
        endColor="#red"   
        segments={10} 
        segmentColors={[ "#FFD700", // Gold
        "#FFD300", // Dark Goldenrod
        "#FFC800", // Goldenrod
        "#FFBF00", // Dark Orange
        "#FFA500", // Orange
        "#FF8C00", // Dark Orange
        "#FF7F50", // Coral
        "#FF6347", // Tomato
        "#FF4500", // Red-Orange
        "#DC143C", // Crimson
      ]}
        hideText={1}
        valueTextFontSize="0" 
      />


      <div
        style={{
          background: "#708090",
          padding: "20px",
          textAlign: "center",

        }}
      >
        <Typography variant="h5">{`${value.toFixed(2)} pH`}</Typography>
      </div>
    </Card>
  );
};

export default PhComponent;
