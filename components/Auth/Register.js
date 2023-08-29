import * as React from "react";
import 'react-native-get-random-values'
import {BSON, ObjectId} from 'realm';
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView,ScrollView  } from "react-native";
import { Button, TextInput, Checkbox,HelperText } from 'react-native-paper';
import { useAppSelector, useAppDispatch } from '../../src/app/hooks'
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";
import Icon from 'react-native-vector-icons/FontAwesome';
import { signIn, signOut } from '../../src/features/auth/authSlice'
// import { ScrollView } from "react-native-gesture-handler";
import { useHeaderHeight } from '@react-navigation/elements';
import { realmContext, Highlight} from "../../lib/RealmSchema";
import {  Realm } from '@realm/react';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()
const {useRealm, useQuery} = realmContext;

const Register = ({navigation}) => {
  const realm = useRealm();
  const dispatch = useAppDispatch()
  // const myTask = useQuery(Highlight);

  const [email, setEmail] = React.useState("admin");
  const [password, setPassword] = React.useState("admin");
  const [checked, setChecked] = React.useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const headerHeight = useHeaderHeight();
  const hasEmailErrors = () => {
    return email=="";
  };
  const hasPasswordErrors = () => {
    return password=="";
  };

    const register=async()=>{
      if(!hasEmailErrors() && !hasPasswordErrors()){
        try {
          
          realm.write(() => {
            realm.create('Profile', {_id: new BSON.ObjectId(),email: email, password: password})
            // realm.deleteAll()
            
          });

          storage.set('profile.email', email)
          storage.set('profile.onboarding', true)
          
       
          console.log('Login data saved successfully!');
          dispatch(signIn())
            // navigation.navigate('CaptureInfo')
          
        } catch (error) {
          console.error('Error saving login data:', error);
        }
        
      }
      
    }
  return (
    <SafeAreaView
    style={styles.authContainer}
    >
         <ScrollView
    style={{marginTop:headerHeight}}
    >
         <StatusBar
        animated={true}
        backgroundColor="#490092"
       
      />
     
      <View style={styles.logoContainer}>
      <View>
          <Text style={{color:'black'}}>Email</Text>
      <TextInput
    //   label="Email"
    placeholder="Enter your email"
    // left={'aa'}
    outlineStyle={{borderRadius:15}}
      value={email}
      mode="outlined"
      error={hasEmailErrors()}
      onChangeText={text => setEmail(text)}
    />
    <HelperText type="error" visible={hasEmailErrors()}>
        Email address is invalid!
      </HelperText>
          </View>
          <View>
          <Text style={{color:'black', marginTop:20}}>Password</Text>
      <TextInput
    //   label="Email"
    secureTextEntry={secureTextEntry}
    placeholder="Enter your password"
    // left={'aa'}
    error={hasPasswordErrors()}
    right={<TextInput.Icon forceTextInputFocus={false} icon={secureTextEntry?"eye":"eye-off"}  onPress={() => {
      setSecureTextEntry(!secureTextEntry);
      
    }}/>
    
     
    }
    outlineStyle={{borderRadius:15}}
      value={password}
      mode="outlined"
      onChangeText={text => setPassword(text)}
    />
    <HelperText type="error" visible={hasPasswordErrors()}>
        Password is invalid!
      </HelperText>
          </View>
          <View style={{ flexDirection:'row', alignItems:'center', marginTop:10,marginBottom:25}}>
          <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!checked);
      }}
    /> 
    <Text style={{color:'black',}}>Remember me</Text>
          </View>
          <View>
     
     <Button disabled={hasEmailErrors() && hasPasswordErrors()}  mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle}  onPress={()=>register()}>
          Register
      </Button>
     
     
    </View>
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
      >
        <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />

        <View>
          <Text style={{ textAlign: 'center', color:'gray', paddingHorizontal:20, paddingVertical:30}}>or</Text>
        </View>

        <View style={{flex: 1, height: 1, backgroundColor: 'gray'}} />
      </View>
      <View style={styles.navContainer}>
     
       <Button icon="google"  mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => console.log('Pressed')}>
            Register with Google
        </Button>
        <Button icon="facebook" mode="contained" style={styles.signInWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => console.log('Pressed')}>
        Register with Facebook
        </Button>
        <Button icon="apple" mode="contained" style={styles.signInWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => console.log('Pressed')}>
        Register with Apple
        </Button>
       
       
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
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


