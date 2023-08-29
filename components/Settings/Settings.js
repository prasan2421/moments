import * as React from "react";
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView, ScrollView } from "react-native";
import { Button, TextInput, Checkbox,Card, IconButton } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAppSelector, useAppDispatch } from '../../src/app/hooks'
import { signIn, signOut } from '../../src/features/auth/authSlice'
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

const Register = ({navigation,route}) => {
  const dispatch = useAppDispatch()
    const [text, setText] = React.useState("");
    const [checked, setChecked] = React.useState(false);


    // return (
    //     return (
    //         <View style={{justifyContent:'center', flex:1, alignItems:'center' }}>
    //       <Text style={{color:'gray',}}>Add more highlights by pressing "plus" icon.</Text>
    //       </View> 
    //      )
    // )
  return (
    <ScrollView
    style={styles.authContainer}
    >
        <StatusBar
        animated={true}
        backgroundColor="#000"
       
      />
     {/* <View style={{position:'absolute', top:500 }}>
     <Text style={{color:'gray',}}>Add more highlights by pressing "plus" icon.</Text>
     </View> */}
<Button mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={()=>{
       storage.delete('profile.email'); 
       storage.delete('profile.onboarding'); 
       
       dispatch(signOut())}
       } >
     Sign Out
      </Button>
      
 
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        // paddingHorizontal:10,
       marginTop:10,
       paddingHorizontal:10
      },
      navContainer:{
          flex:1,
          justifyContent:'flex-start',
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
      flex:1.2,
    //   justifyContent:'center',
   
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


