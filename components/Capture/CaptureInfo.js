import * as React from "react";
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView,FlatList  } from "react-native";
import { Button } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import MobileImage from "../../assets/Svg/Mobile";

const Auth = ({navigation}) => {
  return (
    <SafeAreaView
      style={styles.authContainer}
     
    >
         <StatusBar
        animated={true}
        backgroundColor="#490092"
       
      />
     
      <View style={styles.logoContainer}>
        <MobileImage/>
        <Text style={styles.logoContainerText}>
            Tap to Highlight
        </Text>
        <View style={{marginTop:25}}>
     
        <Text style={styles.logoContainerDescriptionList}>
        {`◉ ${'Capture video moments using pre-configured highlights!'}`}
        </Text>
        <Text style={styles.logoContainerDescriptionList}>
        {`◉ ${'Instantly save, share, extract, analyze, compare or delete.'}`}
            
        </Text>
        </View>
        
      </View>
      <View style={styles.navContainer}>
     
       <Button  mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => navigation.navigate('Home')}>
            Let's start recording!
        </Button>
        
       
      </View>
    </SafeAreaView>
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
    //   flex:1,
    marginTop:14,
      justifyContent:'center',
      alignItems:'center',
      justifyContent:'flex-end',
  },

  logoContainerText: {
    fontSize: 20,
    color: "#000",
    fontFamily: FontFamily.sFProMedium,
    fontWeight: "bold",
    letterSpacing: 1,
   marginTop:20
  },
  logoContainerDescriptionList: {
      paddingVertical:5,
      textAlign:'justify',
    fontSize: 16,
    color: "gray",
    fontFamily: FontFamily.sFProMedium,
   paddingHorizontal:25,
    letterSpacing: 1,
   
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


