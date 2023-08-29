import {
    CameraDeviceFormat,
    CameraRuntimeError,
    // FrameProcessorPerformanceSuggestion,
    PhotoFile,
    sortFormats,
    useCameraDevices,
    // useFrameProcessor,
    VideoFile,
    Camera,
    frameRateIncluded, CameraPermissionStatus
  } from 'react-native-vision-camera';
  import BottomSheet, { BottomSheetFlatList , BottomSheetBackdrop,useBottomSheet} from '@gorhom/bottom-sheet';
  import { IconButton, MD3Colors, Button, Modal, Portal, PaperProvider,Divider,   } from 'react-native-paper';
  import { useIsFocused } from '@react-navigation/native';
  const RNFS = require('react-native-fs');
  import moment from 'moment';
  import { FFmpegKit } from 'ffmpeg-kit-react-native';
  import {check, PERMISSIONS, RESULTS, request, requestMultiple} from 'react-native-permissions';
  import React, { useEffect, useState, useRef,useCallback, useMemo  } from 'react';
  import { View,Platform, Text, BackHandler, TouchableOpacity, Image, StyleSheet, PermissionsAndroid, ActivityIndicator,StatusBar,TouchableWithoutFeedback, Alert,Dimensions } from 'react-native';
  import { useAppSelector, useAppDispatch } from '../src/app/hooks'
  import { MMKV } from 'react-native-mmkv'
  import { realmContext, Highlight, Category} from "../lib/RealmSchema";
  import DefaultCategory from "../utils/DefaultCategory";
  import Stopwatch from './counter/counter';

  import { FlatList } from 'react-native-gesture-handler';
  
  const {useRealm, useQuery, useObject} = realmContext;

export const storage = new MMKV()

  function Capture({navigation}) {
     // hooks
     const myCategory = useQuery(Category);

  const sheetRef = useRef(null);
    const [infoVisible, setInfoVisible] = React.useState(false);
    const [running, setRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const isOnboarded = useAppSelector((state) => state.onboarding.value)
    const showInfoModal = () => setInfoVisible(true);

    const hideInfoModal = () => {
      
      setInfoVisible(true);
        storage.set('profile.onboarding', true)}

    const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

    const [showCamera, setShowCamera] = useState(false);
    const [cameraPosition, setCameraPosition] = useState('back');
    const [flash, setFlash] = useState('off');
    const [bottomSheetStatus, setBottomSheetStatus] = useState(null);
    const [imageSource, setImageSource] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordStartTime, setRecordStartTime] = useState(null);
    const [captureTimeData, setCaptureTimeData] = useState([]);
    const [videoData, setVideoData] = useState(null);
    const [captureButtonMute, setCaptureButtonMute]  = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [categories, setCategories] = React.useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedCat, setSelectedCat] = useState(DefaultCategory[0]);
    const cameraRef = useRef(null);
    
    const devices = useCameraDevices();
    const device = devices[cameraPosition];
    const supportsFlash = device?.hasFlash ?? false;
    const isFocused = useIsFocused()

    const handleStartPause = () => {
     
      if (running) {
       
        setRunning(false);
      } else {
       
        setRunning(true);
      }
    };
  
    const handleReset = () => {
      setRunning(false);
      setElapsedTime(0);
    };
  

    const requestPermissions = async () => {
      // Get camera permission

      if(Platform.OS === 'ios'){
        requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.MEDIA_LIBRARY]).then((statuses) => {
          console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
          // console.log('FaceID', statuses[PERMISSIONS.IOS.FACE_ID]);
          setShowCamera(true);
        })
      }
      else{
        try {
          const cameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'SPOIQ App Camera Permission',
              message:
                'SPOIQ App needs access to your camera ' +
                'so you can take awesome videos.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
              setShowCamera(true);
             
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
          
   
          const audioPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            {
              title: 'SPOIQ App Audio Permission',
              message:
                'SPOIQ App needs access to your Audio ' +
                'so you can take awesome audio.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (audioPermission === PermissionsAndroid.RESULTS.GRANTED) {
           
              
             
            console.log('You can use the audio');
          } else {
            console.log('Audio permission denied');
          }
   
          const filePermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'SPOIQ App File Permission',
              message:
                'SPOIQ App needs access to your File system ' +
                'so you can display your videos.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (filePermission === PermissionsAndroid.RESULTS.GRANTED) {
             
            console.log('You can use the video');
          } else {
            console.log('Audio permission denied');
          }
   
        } catch (err) {
          console.warn(err);
        }
      }
    
     

  
 }

 const checkPermissions = async () => {
  await check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)   
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        requestPermissions();
        console.log('The permission has not been requested / is denied but requestable');
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        setShowCamera(true);
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    // …
  });
 }

 useEffect(() => {
  setCategories(myCategory)
  console.log(`categories new:${JSON.stringify(myCategory)}`)
    
    }, [selectedCat]);
  
    useEffect(() => {
         checkPermissions();
      // requestPermissions();devices
      console.log(`Show camera: ${showCamera}`)
     
    }, [showCamera]);

    useEffect(() => {
      
   console.log(`camera devices: ${JSON.stringify(devices)}`)
  
 }, [devices]);

    useEffect(() => {
     
      setInfoVisible(isOnboarded);
   console.log(`Show profile onboard: ${isOnboarded}`)
  
 }, []);

 useEffect(() => {
 
console.log(`bottom sheet: ${JSON.stringify(sheetRef.current)}`)

}, [sheetRef]);

 
    useEffect(() => {
        if (captureTimeData.length!==null || recordStartTime!==null ){
            // console.log(`capturedTime: ${captureTimeData}, recordStartTime: ${recordStartTime}`)
            saveFile(videoData)
        }else{
            console.log(`Lets get Started`)
        }
    
      }, [videoData]);

      useEffect(() => {
       
        console.log(`captchaaa time:` + JSON.stringify(captureTimeData));

      }, [captureTimeData]);

    // useEffect(() => {
    //     console.log(`capturedTime: ${capturedTime}, recordStartTime: ${recordStartTime}`)
    //   }, [capturedTime, recordStartTime]);
  

    const captureButtonMuteFn =async (item) =>{
      setCaptureButtonMute(true)
      console.log(`time: ${item.total-item.backtrace}`)
      setTimeout(() => {
      setCaptureButtonMute(false)
    }, (item.total-item.backtrace)* 1000);
    }

    const captureVideo = (item) => {
      captureButtonMuteFn(item)
      let highlight = { ...item, capturedTime: moment() }; // Add 'capturedTime' property using moment()
      let newArray = [...captureTimeData, highlight];
      setCaptureTimeData(newArray);
     
    };

    const saveFullVideo = async (video) =>{
      const capturedTimeNew = moment().format('x');
      const videoPathNew = video && video.path.replace('file://', '');
      const capturedTimeNewidk = 0;
      const endTime = video && video.duration;
      
      const savedVideoPath = `${RNFS.PicturesDirectoryPath}/spoiq/myvideo${capturedTimeNew}.mp4`;

      try{
         FFmpegKit.execute(`-i ${videoPathNew} -ss ${capturedTimeNewidk} -t ${endTime} -c:v copy -c:a copy ${savedVideoPath}`);
        console.log('Video saved to:', savedVideoPath);
        setImageSource(savedVideoPath);
        setIsProcessing(false);
        setCaptureTimeData([])
      }
      catch(error) {
 console.log('Error trimming video:', error);
 setIsProcessing(false)
      }
    }

    const saveRecordedVideo = (video) =>{

       // console.log(`Duration:` + JSON.stringify(video));return;
      // Save the video file to local storage  //
      if(captureTimeData.length>0 ){

        console.log(`savedata: ${JSON.stringify(captureTimeData)}`);

        saveFullVideo(video)

        captureTimeData.map((item,index)=>{

          console.log(`Finalllll: ${JSON.stringify(item)}`)
          
          const capturedTimeNew = moment(item.capturedTime).subtract(item.backtrace, 'seconds');
          const recordStartTimeNew = moment(recordStartTime);
          const videoPathNew = video.path.replace('file://', '');
    
          const duration = moment.duration(capturedTimeNew.diff(recordStartTimeNew));
          const hours = duration.hours().toString().padStart(2, '0');
          const minutes = duration.minutes().toString().padStart(2, '0');
          const seconds = duration.seconds().toString().padStart(2, '0');
      
          const capturedTimeNewidk = `${hours}:${minutes}:${seconds}`;
      
          // // const capturedTimeNewidk = timeDifference(capturedTime, recordStartTime)
      
          // const capturedTimeNew = '00:00:02'
          console.log(` diff Time new once more:${capturedTimeNewidk}`);
      
          // const endTime = video.duration;
          const endTime = item.total;
          const savedVideoPath = `${RNFS.PicturesDirectoryPath}/spoiq/myvideo${item.capturedTime}.mp4`;
    
          try{
             FFmpegKit.execute(`-i ${videoPathNew} -ss ${duration <=0? 0: capturedTimeNewidk} -t ${endTime} -c:v copy -c:a copy ${savedVideoPath}`);
            console.log('Video saved to:', savedVideoPath);
            setImageSource(savedVideoPath);
            setIsProcessing(false);
            setCaptureTimeData([])
          }
          catch(error) {
     console.log('Error trimming video:', error);
     setIsProcessing(false)
          }
      
          // await RNFS.moveFile(videoPathNew, savedVideoPath);
      })

     
    
    }

    else{
    
      const capturedTimeNew = moment().format('x');
      const videoPathNew = video && video.path.replace('file://', '');
      const capturedTimeNewidk = 0;
      const endTime = video && video.duration;

      
      const savedVideoPath = `${RNFS.PicturesDirectoryPath}/spoiq/myvideo${capturedTimeNew}.mp4`;

      try{
         FFmpegKit.execute(`-i ${videoPathNew} -ss ${capturedTimeNewidk} -t ${endTime} -c:v copy -c:a copy ${savedVideoPath}`);
        console.log('Video saved to:', savedVideoPath);
        setImageSource(savedVideoPath);
        setIsProcessing(false);
        setCaptureTimeData([])
      }
      catch(error) {
 console.log('Error trimming video:', error);
 setIsProcessing(false)
      }
  
      // await RNFS.moveFile(videoPathNew, savedVideoPath);

    }

    }
  
    const saveFile = async (video) => {

      const filePath = RNFS.PicturesDirectoryPath + '/spoiq';

RNFS.exists(filePath)
  .then((exists) => {
    if (exists) {
      saveRecordedVideo(video)
    } else {
      RNFS.readDir(RNFS.PicturesDirectoryPath ) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                    .then((result) => {
                 //
                 let appFolder = 'spoiq'
                 let path = RNFS.PicturesDirectoryPath+'/'+appFolder;
                 RNFS.mkdir(path).catch((error)=>{console.log(error)})

                 saveRecordedVideo(video)
           
             }).catch((err) => {
           console.log(err.message, err.code);
            });
    
        //END OF DOING SOMETHINGS
    }
  })
  .catch((error) => {
    console.log(error);
  });


    
    };
  

  
    const recordVideo = async () => {
      setRecordStartTime(moment());
      handleStartPause()
      cameraRef.current.startRecording({
        quality: 'high',
        flash:flash,
        onRecordingFinished: (video) => {
            setIsProcessing(true)
            setVideoData(video);
          
        },
        onRecordingError: (error) => console.error(`What error? :${error}`),
      });

      setIsRecording(true);
      console.log('Recording started');
  
    };
  
    const stopRecordVideo = async () => {
      try {
        await cameraRef.current.stopRecording();
    
        setIsRecording(false);
        
        handleStartPause()
        console.log('stopped video');
      } catch (error) {
        console.log('Error capturing video:', error);
      }
    };

    const onFlipCameraPressed = useCallback(() => {
      setCameraPosition((p) => (p === 'back' ? 'front' : 'back'));
    }, []);

    const onFlashPressed = useCallback(() => {
      setFlash((f) => (f === 'off' ? 'on' : 'off'));
    }, []);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["20", "50%"], []);

 // render
 
 const renderItem = 
  ({ item ,index}) => (
    <>
    <TouchableOpacity style={{flexDirection:'row',paddingHorizontal:20, justifyContent:'space-between', alignItems:'center'}} onPress={()=>setSelectedCat(item)}>
      <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>{item.name}</Text>
      
    {selectedCat._id==(item._id).toString()?<IconButton  icon="check" iconColor={'gray'}/>:<IconButton  iconColor={'gray'}/>}
    </TouchableOpacity>
    {index==0?  <Divider />:null}
    </>
  );

  const closeBottomSheet = () => {
    // Alert.alert(JSON.stringify(useBottomSheet))
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setBottomSheetStatus(index)
  }, []);

const handleSnapPress = useCallback((index) => {
  sheetRef.current?.snapToIndex(index);
}, []);
const handleClosePress = useCallback(() => {
  sheetRef.current?.close();
}, []);

const screenWidth = Dimensions.get('window').width;
const aspectRatio = 16 / 9;
const adjustedHeight = screenWidth * aspectRatio;
  
    // if (device == null ) {
    //   return (
    //   <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
    //     <Text style={{ color: 'black',  }}>Camera Not Available!!</Text>
    //     </View>); 
    // }
  
    return (
      
      <TouchableWithoutFeedback disabled={bottomSheetStatus==null || bottomSheetStatus==-1?true:false} onPress={closeBottomSheet}>
        <View style={{ flex: 1, backgroundColor:'black', paddingHorizontal:5 }} >
         <StatusBar
        animated={true}
        backgroundColor="#000"
       
      />
      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        style={{zIndex:100}}
        // backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        // contentHeight={true}
        // footerComponent={filtersFooter}
        // onChange={handleSheetChange}
      >
        <View>
        <View style={{zIndex:100}}>
    <View style={{flex:1, alignItems:'center'}}>
 
  </View>
    <TouchableOpacity style={{flexDirection:'row',paddingHorizontal:20, justifyContent:'space-between', alignItems:'center'}} onPress={()=>{navigation.navigate('Highlights');hideModal()}}>
      <Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>Highlight categories</Text>
      
    <IconButton  icon="pencil" iconColor={'gray'}/>
    </TouchableOpacity>
<Divider />
<Text style={{color:'gray', textAlign:'center',fontSize:16, marginTop:10 }}>Category</Text>

   <View style={{display:'flex'}}>
   <FlatList
          data={(categories.concat(DefaultCategory)).slice().reverse()}
          // keyExtractor={(i) => i}
          renderItem={renderItem}
          // renderItem={({item,id}) => renderItem(item,id)}
          showsHorizontalScrollIndicator={true}
          style={{height:'78%',}}
          // contentContainerStyle={{backgroundColor:'white', }}
          ListEmptyComponent={()=><Text style={{color:'gray', textAlign:'center'}}>No category to display..</Text>}
        />
   </View>
    
      

</View>
        </View>
       
      </BottomSheet>
     <Portal>
        <Modal dismissable={false} dismissableBackButton={false} visible={!infoVisible} onDismiss={hideInfoModal} contentContainerStyle={{backgroundColor:'#003366', padding:20, margin:20, borderRadius:15}}>
          <Text style={{color:'#9bddff', fontSize:16, fontWeight:'bold'}}>Welcometo SpoIQ! Your 14-day trial starts now.</Text>
          <Text style={{color:'white',fontWeight:'bold', paddingTop:10}}>Completely free for 14 days.</Text>
          <Text style={{color:'white',fontWeight:'bold', paddingTop:10}}>Unlimited access during your trial.</Text>
          <Text style={{color:'white',fontWeight:'bold', paddingTop:10}}>No need to cancel. You will not be charged unless you choose a subscription plan!</Text>
          {/* <Text style={{color:'white'}}>{string}</Text> */}
        
          <Button mode="outlined" style={{marginTop: 30, borderRadius:15, borderColor:'#9bddff',}} labelStyle={{color:'#9bddff'}} onPress={hideInfoModal} >
        Close
      </Button>
        </Modal>
        
      </Portal>
      {/* Modal Pop up */}
      

      <View style={{  flexDirection:'row',  justifyContent:'space-between'}}>
        <View >
        {supportsFlash && (
      <IconButton
    icon={flash === 'on' ? 'flash' : 'flash-off'}
    iconColor={'white'}
    size={20}
    onPress={onFlashPressed}
  />)}
  </View>
  <View style={{justifyContent:'center'}}>
    <View style={{color:'white'}}>  
    <Stopwatch
        running={running}
        // onStartPause={handleStartPause}
        // onReset={handleReset}
        elapsedTime={elapsedTime}
      /></View>
      {/* <View >
        <TouchableOpacity
          onPress={handleStartPause}
          >
          <Text >{running ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReset} >
          <Text >Reset</Text>
        </TouchableOpacity>
      </View> */}
  </View>
  <View >
  <IconButton
    icon="cog"
    iconColor={'white'}
    size={20}
    onPress={() => navigation.navigate('Settings')}
  />
  </View>
      </View>
      <View style={{ overflow:'hidden', flex: 1, justifyContent:'center',zIndex:-1}}>
        {/* Camera module */}
        <View style={{borderRadius:15,overflow:'hidden',position:'relative', backgroundColor:'gray'}} >
        {/* <Camera 
        ref={cameraRef} 
        // flash={flash ? device.hasFlash?? true : device.hasFlash?? false}
        // zoom
        
        enableZoomGesture={true} 
        style={{  width: '100%',
        height: adjustedHeight,}} 
        containerStyle={{borderRadius:15, }}
        device={ device} 
        isActive={showCamera && isFocused} 
        video={true} 
        fps={60}
        videoStabilizationMode={true}
        audio={true}/> */}
        <View  style={{  width: '100%',
        height: adjustedHeight,}} ></View>
      
          <View style={{position:'absolute', bottom:0, width:'100%'}}>
  {isProcessing==false?
  <>
  {!isRecording ?(
  <View style={{alignItems:'center'}}>
   
      {/* <TouchableOpacity onPress={ captureVideo} >       */}
      <Text  style={{backgroundColor:'rgba(0, 0, 0, 0.6)', padding:5, borderRadius:10, marginBottom:10 }}>Tap to start recording</Text>
    {/* </TouchableOpacity> */}
   

  </View>
  ):(
    <View style={{display:'flex', flexDirection:'row'}}>
    {(selectedCat.highlights).map((item,index)=>(
      <View key={index} style={{flex:1, alignItems:'center', justifyContent:'space-evenly'}}>
      <TouchableOpacity onPress={()=>captureVideo(item)} >      
      <Text  style={{backgroundColor:'rgba(0, 0, 0, 0.6)', padding:5, borderRadius:10, marginBottom:10 }}>{item.name}</Text>
    </TouchableOpacity>
    </View>
     ))
   }
    </View>
   

  )}
    <View style={{ flexDirection:'row',  justifyContent:'space-between', alignItems:'center', paddingBottom: 20}}>
        <View style={{flex:1,alignItems:'center'}}>
      <IconButton
      mode='contained'
      containerColor='rgba(0, 0, 0, 0.5)'
    icon="card-multiple-outline"
    iconColor={'white'}
    size={20}
    // onPress={showModal}
    onPress={()=>handleSnapPress(0)}
  />
  </View>
  <View style={{justifyContent:'center',}}>
  {/* <Button style={{borderRadius:40, width:10, height:40}} mode="contained" onPress={!isRecording ? recordVideo : stopRecordVideo}  >{!isRecording ? 'Ready' : 'Stop Recording'}</Button> */}
  {/* <View style={{borderRadius:50, overflow:'hidden',width:50,height:50,}}> */}

 
  <View style={{backgroundColor:'rgba(255, 255, 255, 0)', width:73, height:73, borderRadius:73, overflow:'hidden', borderWidth:4, justifyContent:'center', alignItems:'center', borderColor:'white'}}>
  <TouchableOpacity disabled={captureButtonMute} style={{width:!isRecording ?60:40,height:!isRecording ?60:40,borderRadius:!isRecording ?60:5, overflow:'hidden', backgroundColor: (captureButtonMute?'gray':'red'),  }} 
  onPress={ !isRecording ?recordVideo: stopRecordVideo} />
</View>


        
      {/* </View> */}
 {/* <Button title="Capture Video" onPress={captureVideo} /> */}
  </View>
  <View style={{flex:1,alignItems:'center'}} />



  
 </View>
 </>
  : <ActivityIndicator size="large" color="#00ff00" />
  
}
</View>
        </View>
  

</View>
<View style={{  flexDirection:'row',  justifyContent:'space-between',zIndex:-1}}>
        <View >
      <IconButton
    icon="image-multiple-outline"
    iconColor={'white'}
    size={20}
    onPress={() => navigation.navigate('Library')}
  />
  </View>
  <View style={{justifyContent:'center'}}>
    <Text style={{color:'white'}}>{selectedCat.name}</Text>
  </View>
  <View >
  <IconButton
    icon="orbit-variant"
    iconColor={'white'}
    size={20}
    onPress={onFlipCameraPressed}
  />
  </View>
      </View> 
       
  
        {/* <Text style={{ color: 'black' }}>{imageSource}</Text>
        <Text style={{ color: 'black' }}>{capturedTime ? moment(capturedTime).format('hh:mm:ss') : ''}</Text>
        <Text style={{ color: 'black' }}>{recordStartTime ? moment(recordStartTime).format('hh:mm:ss') : ''}</Text> */}
        </View>
      </TouchableWithoutFeedback>
     
    );
  }
  
  export default Capture;