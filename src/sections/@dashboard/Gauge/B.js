import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";
import { Card, Typography, styled } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Iconify from "../../../components/iconify"; // Assuming you have an Iconify component

const StyledIcon = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(10), // Increase the width of the icon
  height: theme.spacing(10), // Increase the height of the icon
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  backgroundImage: (theme) =>
    `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
      theme.palette.primary.dark,
      0.24
    )} 100%)`,
}));

const B = () => {
  const [value, setValue] = useState(0.5); // Initial value

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = Math.random(); // Generate a random value between 0 and 1
      setValue(newValue);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      sx={{
        width: 400, height: 350, // Change the width as needed
        margin: 2,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        boxShadow: 20,
        color: "white",
        bgcolor: "#74c0fc", // Blue background color
      }}
    >
      <div
        style={{
          background: "#3498db", // Darker background for header (similar to blue)
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="subtitle1">Blue</Typography>
      </div>

      <StyledIcon>
        <Iconify icon={"Blue"} width={24} height={24} />
      </StyledIcon>


      <GaugeChart
        id="gauge-chart3"
        style={{ height: 150, margin: 'auto', marginBottom: 50 }}
        nrOfLevels={20}
        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
        colors={["#E6F7FF", "#BBE3FF", "#A2D4FF", "#88C1FF", "#6DB3FF"]}
        arcPadding={0.02}
        textColor="white"
        percent={value}
        label="B"
        hideText={1}
      />

      <div
        style={{
          background: "#3498db", // Darker background for footer (similar to blue)
          padding: "10px",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{`${(value * 100).toFixed(2)}  Watts`}</Typography>
      </div>
    </Card>
  );
};

export default B;
