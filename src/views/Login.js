import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Typography, TextField } from '@mui/material';

// import elements
import Button from '../components/elements/Button'
import Image from '../components/elements/Image'
import Logo from '../assets/images/norgesLogo.png';
import Background from '../assets/images/background.png'

const sectionStyle = {
  height: "100vh",
  backgroundImage: `url(${Background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: "#F2F8FA"
};

const inputProps = {
  backgroundColor: "#F2F8FA", 
  borderBottom: "0px", 
  height: "20px"
}

const Login = () => {

  return (
    <Box style={sectionStyle}>
      {/* <Box> */}
        <Image src={Logo} width="200px" component={Link} to="/"  style={{ position: "relative", top: "30%", margin: "0 auto"}}/>
        <Card sx={{ maxWidth: 350, p: 1, mt: 3, boxShadow: 0, borderRadius: 0 }}  style={{ position: "relative", top: "33%", margin: "0 auto"}}>
          <CardContent>
              <Typography variant="h6" sx={{ fontSize: 18, textAlign: "center" }} gutterBottom>
                  LOGIN
              </Typography>
              <Box
                component="form"
                sx={{
                '& .MuiTextField-root': { mb: 3, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                  <TextField
                    required
                    id="outlined-size-small"
                    label="Username"
                    variant="filled"
                    size="small"
                    inputProps={{ style: inputProps }}
                    InputLabelProps={{ style: { fontSize: "14px" } }}
                  />
                  <TextField
                    required
                    id="outlined-required"
                    label="Password"
                    variant="filled"
                    size="small"
                    inputProps={{ style: inputProps }}
                    InputLabelProps={{ style: { fontSize: "14px" } }}
                  />
              
                <Button component={Link} type="button" to="/dashboard" className="button button-primary button-wide-mobile" wide>LOGIN</Button>
                <Typography component={Link} to="/forgot-password" className="primary-color" variant="p" sx={{ mb: 1.5, mt: 3, fontSize: 14, fontWeight: "bold" }} color="text.secondary">
                    Forgot password
                </Typography>
              </Box>
          </CardContent>
        </Card>
      {/* </Box> */}
      
    </Box>
  );
}

export default Login;