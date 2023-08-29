import * as React from "react";
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView  } from "react-native";
import { Button } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";

const Auth = ({navigation}) => {
  return (
    <LinearGradient
      style={styles.authContainer}
      locations={[0, 1]}
      colors={["#490092", "#fff"]}
      useAngle={true}
      angle={161.41}
    >
         <StatusBar
        animated={true}
        backgroundColor="#490092"
       
      />
     
      <View style={styles.logoContainer}>
        <SplashLogo/>
        <Text style={styles.logoContainerText}>
             Video Highlights with a Tap
        </Text>
      </View>
      <View style={styles.navContainer}>
     
       <Button  mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => navigation.navigate('Register')}>
            Register
        </Button>
        <Button  mode="outlined" style={styles.signInWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => navigation.navigate('Login')}>
            Sign In
        </Button>
        {/* <Button  mode="text" onPress={() => navigation.navigate('CaptureInfo')} style={{marginTop:10}}>
    Skip for Now
  </Button> */}
       
      </View>
    </LinearGradient>
  );
};

export default Auth;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        paddingHorizontal:10
      },
      navContainer:{
          flex:1,
          justifyContent:'flex-end',
          paddingBottom:20
        //   alignItems:'center',
      },
 
      buttonWrapperContent: {
   height:50,
 
  },
  fontStyle: {
    fontSize: FontSizeStyle.size_base,
   fontFamily: FontFamily.sFProMedium,
//    fontWeight: "500",
    // width: '100%',
    // borderRadius: Border.br_3xs,
    letterSpacing: 1,
  },
 
  logoContainer:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      justifyContent:'flex-end',
  },

  logoContainerText: {
    fontSize: 20,
    color: "#000",
    fontFamily: FontFamily.sFProMedium,
    fontWeight: "500",
    letterSpacing: 1,
   marginTop:20
  },
  register: {
    color: "#fff",
  },
  ButtonWrapper: {
   
    backgroundColor: Color.purple,
    borderRadius: Border.br_3xs,
  },
  signIn: {
    color: Color.purple,
  },
  signInWrapper: {
    
    borderColor: "#7636b7",
    borderRadius: Border.br_3xs,
    marginTop:15
  },
  
});


