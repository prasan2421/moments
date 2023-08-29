import React, { useEffect, useState, useRef, } from "react";
import { View, Text, BackHandler, TouchableOpacity, Image, Button } from "react-native";
import { IconButton, TextInput, Checkbox, Card } from 'react-native-paper';
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { MMKV } from 'react-native-mmkv'
import { useAppSelector, useAppDispatch } from '../../src/app/hooks'
import { signIn, signOut } from '../../src/features/auth/authSlice'
import { onboardingIn, onboardingOut } from '../../src/features/onboarding/onboardingSlice'
import SplashScreen from "../SplashScreen/SplashScreen";
import CaptureScreen from "../capture";
import CaptureInfoScreen from "../Capture/CaptureInfo";
import PermissionsPageScreen from "../Capture/PermissionsPage";
// import LoginScreen from "../Login";
import HighlightsScreen from "../Highlights/Highlights";
import AddHighlightsScreen from "../Highlights/AddHighlights";
import LibraryScreen from "../Library/Library";
import VideoDisplayScreen from "../Library/VideoDisplay";
import AuthScreen from "../Auth/Auth";
import RegisterScreen from "../Auth/Register";
import LoginScreen from "../Auth/Login";
import SettingsScreen from "../Settings/Settings";
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const storage = new MMKV()

const getIsSignedIn = () => {
 const email = storage.getString('profile.email');
 console.log(`email:${email}`)
   if(email != null){
    return true;
   }
   else{
     return false;
   }
  
};

const getOnboarding = () => {
  const onboarding = storage.getBoolean('profile.onboarding');
  console.log(`onboarding:${onboarding}`)
    if(onboarding == undefined){
      storage.set('profile.onboarding', false);
     return false;
    }
    else{
      return onboarding;
    }
   
 };

function AppNavigator(): React.ReactElement | null {


   // The `state` arg is correctly typed as `RootState` already
   const isSignedIn = useAppSelector((state) => state.auth.value)
   const isOnboarded = useAppSelector((state) => state.onboarding.value)
   const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = React.useState(true);
  // const [isSignedIn, setIsSignedIn] = React.useState(false);
  
  const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
  const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  useEffect(() => {
    Camera.getCameraPermissionStatus().then(setCameraPermission);
    Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
  }, []);



  const getUserStatus = async () => {

    const SignedStatus = getIsSignedIn();
    const onboardingStatus = getOnboarding();
    // setIsSignedIn(isSignedIn)
    dispatch(SignedStatus?signIn():signOut())
    dispatch(onboardingStatus?onboardingIn():onboardingOut())
    // testing purposes
    function sleep(seconds: number): Promise<void> {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    }

    try {
      // custom logic
      await sleep(2);
      
    } finally {
      setIsLoading(false);
    }
  };
  
  React.useEffect(() => {
    getUserStatus();

   
  }, []);


  const CustomHeaderHighlight = () => {
    
    return (
      <IconButton
        icon="plus"
        iconColor={'black'}
        size={28}
        onPress={() => navigation.navigate('AddHighlights')}
      />
    )


  }

  const CustomHeaderLibrary = () => {
    const navigation = useNavigation();

    return (
      <IconButton
        icon="dots-vertical"
        iconColor={'black'}
        size={28}
      // onPress={() => navigation.navigate('AddHighlights')}
      />
    )
  }

  const CustomHeaderVideoDisplay = () => {
    const navigation = useNavigation();

    return (
      <IconButton
        icon="heart-outline"
        iconColor={'#00BFFF'}
        size={28}
      // onPress={() => navigation.navigate('AddHighlights')}
      />
    )
  }

  if (cameraPermission == null || microphonePermission == null) {
    // still loading
    return null;
  }
  
  const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';



  if (isLoading) {
    // We haven't finished checking for the token yet
    return <SplashScreen />;
  }
  
  return (
   
    <Stack.Navigator>
      {/* <Stack.Group screenOptions={{
        presentation: 'modal', // Optional: For consistent behavior on Android
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false, presentation: 'modal' }} />
      </Stack.Group> */}

      {!isSignedIn ? (
      <Stack.Group
      // screenOptions={{ headerBackVisible:true,presentation: 'modal', }}
      // screenOptions={{ presentation: 'modal' }}
      // initialRouteName={showPermissionsPage ? 'PermissionsPage' : 'CameraPage'}
      >
        <Stack.Screen name="Auth" options={{ headerShown: false, presentation: 'modal' }} component={AuthScreen} />
        <Stack.Screen name="Login" options={{  headerTransparent: true, headerTitle: "Sign In" }} component={LoginScreen} />
        <Stack.Screen name="Register" options={{ headerTransparent: true, headerTitle: "Create a new account" }} component={RegisterScreen} />

      </Stack.Group>
      ):(
        <Stack.Group
      
        // screenOptions={{ presentation: 'modal', }}
        // navigationKey={showPermissionsPage ? 'PermissionsPage' : 'PermissionsPage'}
      >
        {!isOnboarded && <Stack.Screen name="CaptureInfo" options={{ headerShown: false, }} component={CaptureInfoScreen} />}
        
        {/* <Stack.Screen name="PermissionsPage" options={{ headerShown: false, }} component={PermissionsPageScreen} /> */}
        <Stack.Screen name="Home" options={{ headerShown: false, }}  component={CaptureScreen} />
        <Stack.Screen name="Highlights" component={HighlightsScreen} options={{
          headerRight: () => <CustomHeaderHighlight />
        }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AddHighlights" options={{ headerTitle: "Add highlight" }} component={AddHighlightsScreen} />
        <Stack.Screen name="Library" options={{ headerTitle: "Library", headerShadowVisible: false, headerRight: () => <CustomHeaderLibrary /> }} component={LibraryScreen} />
        <Stack.Screen name="VideoDisplay" options={{
          headerTitle: "Today", headerShadowVisible: false, headerStyle: {
            backgroundColor: '#1A1B1C',
          }, headerTintColor: '#00BFFF', headerRight: () => <CustomHeaderVideoDisplay />
        }} component={VideoDisplayScreen} />

      </Stack.Group>
      )}
     
    </Stack.Navigator>
   
  );
}

export default AppNavigator;
