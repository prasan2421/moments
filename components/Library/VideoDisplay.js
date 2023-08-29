import React, { useEffect, useState, } from 'react';
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView, ScrollView,FlatList, TouchableOpacity,Dimensions, Alert,  } from "react-native";
import { Button, TextInput, Checkbox,Card, IconButton,Searchbar,List, BottomNavigation } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import FFmpegWrapper from '../../lib/FFmpeg';
import Icon from 'react-native-vector-icons/FontAwesome';


const FRAME_WIDTH = 100;
const DURATION_WINDOW_BORDER_WIDTH = 4;
const TILE_HEIGHT = 80;
const TILE_WIDTH = FRAME_WIDTH / 2;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const Width = Dimensions.get('window').width;
const Height = Width*1.778;
const DURATION_WINDOW_DURATION = 1;
const POPLINE_POSITION = '50%';
const FRAME_PER_SEC = 1;


const DURATION_WINDOW_WIDTH =
  DURATION_WINDOW_DURATION * FRAME_PER_SEC * TILE_WIDTH;

const FRAME_STATUS = Object.freeze({
  LOADING: {name: Symbol('LOADING')},
  READY: {name: Symbol('READY')},
});

const getRightLinePlayTime = offset => {
  return (offset + DURATION_WINDOW_WIDTH) / (FRAME_PER_SEC * TILE_WIDTH);
};

const getLeftLinePlayTime = offset => {
  return offset / (FRAME_PER_SEC * TILE_WIDTH);
};

const getPopLinePlayTime = offset => {
  return (
    (offset + (DURATION_WINDOW_WIDTH) / 100) /
    (FRAME_PER_SEC * TILE_WIDTH)
  );
};

const getOffsetFromPlayTime = playtime => {
  return (
    (playtime - (DURATION_WINDOW_WIDTH) * 100) *
    (FRAME_PER_SEC * TILE_WIDTH)
  );
};

const Library = ({videoData, navigation}) => {
 
  const videoPlayerRef = React.createRef();
  const scrollViewRef = React.createRef();

  const [framesLineOffset, setFramesLineOffset] = useState(0); // number
  const [paused, setPaused] = useState(false);
    const [text, setText] = React.useState("");
    const [videoFiles, setVideoFiles] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [frames, setFrames] = useState(); // <[{status: <FRAME_STATUS>, uri: <string>}]>
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    useEffect(() => {
      console.log(videoData);
      setSelectedVideo(JSON.parse(videoData))
      // listVideoFiles();
    }, []);

    useEffect(() => {
      console.log(frames);
      
      // listVideoFiles();
    }, [frames]);

    // useEffect(() => {
    //   console.log(`currentTime = ${currentTime}`);
      
    //   // listVideoFiles();
    // }, [currentTime]);

    // ${RNFS.PicturesDirectoryPath}/spoiq/myvideo${duration}.mp4



    const handleVideoLoad = videoAssetLoaded => {
     
      setDuration(videoAssetLoaded.duration);
      console.log(`Duration: ${videoAssetLoaded.duration}`)
      const numberOfFrames = Math.ceil(videoAssetLoaded.duration);

      console.log(numberOfFrames)

      setFrames(
        Array(numberOfFrames).fill({
          status: FRAME_STATUS.LOADING.name.description,
        }),
      );
      FFmpegWrapper.getFrames(
        selectedVideo[0].name.replace(/\.[^/.]+$/, ""),
        selectedVideo[0].path,
        numberOfFrames,
        filePath => {
          const _framesURI = [];
        for (let i = 0; i < numberOfFrames; i++) {
          _framesURI.push(
            `${filePath.replace('%4d', String(i + 1).padStart(4, 0))}`,
          );
        }
        const _frames = _framesURI.map(_frameURI => ({
          uri: _frameURI,
          status: FRAME_STATUS.READY.name.description,
        }));
        setFrames(_frames);
        },
      );
    };

    const handleSliderValueChange = (value) => {
      setCurrentTime(value);
    };

    const handleSliderSlidingComplete = (value) => {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.seek(value);
        setIsSeeking(false);
       
      }
    };


  useEffect(() => {
    // Add event listeners for video progress and duration updates
    if (videoPlayerRef.current) {
      videoPlayerRef.current.addSeekListener((e) => {
        setCurrentTime(e.currentTime);
      });

      videoPlayerRef.current.addOnDurationListener((duration) => {
        setDuration(duration);
      });
    }
  }, []);
   
    const handleOnProgress = data => {
     
      // if (currentTime >= getRightLinePlayTime(framesLineOffset)) {
        // videoPlayerRef.current?.seek(getLeftLinePlayTime(framesLineOffset));
        
        if (!isSeeking) {
          setCurrentTime(data.currentTime);
        }

        const offset = getOffsetFromPlayTime(data.currentTime);
        console.log(`Scroll POS : ${offset}`)
      // scrollViewRef.current.scrollTo({ x: offset, animated: false });
        
      // }
      // const offset = currentTime * FRAME_PER_SEC * TILE_WIDTH;
      // scrollViewRef.current.scrollTo({ x: offset, animated: false });
    };

    const handleOnScroll = ({nativeEvent}) => {

      console.log(`Offset dataaa: ${nativeEvent.contentOffset.x}`)
     
      const playbackTime = getPopLinePlayTime(nativeEvent.contentOffset.x);
      videoPlayerRef.current?.seek(playbackTime);
      setFramesLineOffset(nativeEvent.contentOffset.x);
     
     
      if (!isSeeking) {
        setCurrentTime(playbackTime);
      }
    
    };

    const handleOnTouchStart = () => {
      setPaused(true);
    };
    const handleOnTouchEnd = () => {
      setPaused(false);
    };

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };
    
    const renderFrame = (frame, index) => {
      if (frame.status === FRAME_STATUS.LOADING.name.description) {
        return <View style={styles.loadingFrame} key={index} />;
      } else {
        return (

          // <Text>{frame.uri}</Text>
          <Image
            key={index}
            source={{uri: 'file://' + frame.uri}}
            style={{
              width: TILE_WIDTH,
              height: TILE_HEIGHT,
              zIndex: 10,
            }}
            onLoad={() => {
              console.log('Image loaded');
            }}
          />
        );
      }
    };

  return (
    <SafeAreaView
    style={styles.authContainer}
    >
        <StatusBar
        animated={true}
        backgroundColor="#1A1B1C"
       
      />
   

  <View style={styles.container}>
 

  {selectedVideo && (
    <View style={{display:'flex', justifyContent:'center', alignItems:'center',backgroundColor:'#1A1B1C', position:"relative"}}>
        <View style={{height: 461,}}>
          <Video
          ref={videoPlayerRef}
            source={{ uri: `file://${selectedVideo[0].path}` }}
            style={{ width: 250, height: 450, zIndex:1, }}
            resizeMode={'cover'}
            controls={false}
            paused={paused}
            onLoad = {handleVideoLoad}
            onProgress={handleOnProgress}
            
          />
          </View>
        
          <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handleSliderValueChange}
          onSlidingComplete={handleSliderSlidingComplete}
          minimumTrackTintColor="#00BFFF"
          maximumTrackTintColor="white"
          thumbTintColor="#00BFFF"
          
        />
        </View>
      )}
     
     <View style={{flex:1, backgroundColor:'black',}}>
   
       <View style={{  backgroundColor:'#1A1B1C', display:'flex', flexDirection:'row', alignItems:'center',}}>
       <View style={{flex:1, alignItems:'center'}}>
<Text> {formatTime(currentTime)} </Text>
   
</View>
<View style={{flex:1, alignItems:'center', margin:-10}}>
<IconButton
      icon={paused?"play":"pause"}
      iconColor={'white'}
      size={33}
      onPress={() => setPaused(!paused)}
    />
</View>
<View style={{flex:1, alignItems:'center'}}>
<Text>00:00</Text>
</View>
       </View>
     {frames && (
<View style={{ flex:1,}}>
<View style={{  display:'flex', flexDirection:'row', alignItems:'center',}}>
       <View style={{flex:1, alignItems:'center', flexDirection:'row'}}>
       <IconButton
      icon="volume-mute"
      iconColor={'white'}
      size={24}
      // onPress={() => navigation.navigate('AddHighlights')}
    />
    <IconButton
      icon="arrow-expand-all"
      iconColor={'white'}
      size={20}
      // onPress={() => navigation.navigate('AddHighlights')}
    />
   
</View>
<View style={{flex:1, alignItems:'center'}}>
<Button mode="contained" style={styles.ButtonWrapper} contentStyle={styles.buttonWrapperContent} labelStyle={styles.fontStyle} onPress={() => console.log('Pressed')}>
            Add highlight
        </Button>
</View>
<View style={{flex:1, alignItems:'center'}}>

</View>
       </View>
            <View style={styles.durationWindowAndFramesLineContainer}>
              
              {/* <View style={styles.durationWindow}>
                <View style={styles.durationLabelContainer}>
                  <Text style={styles.durationLabel}>
                    {DURATION_WINDOW_DURATION} sec.
                  </Text>
                </View>
              </View> */}
              <View style={styles.popLineContainer}>
              <Icon name="caret-down" size={30} color="white" style={{marginLeft:-7, marginBottom:-11}} />
                <View style={styles.popLine} />
              </View>
              {/* <View style={styles.durationWindowLeftBorder} /> */}
              {/* <View style={styles.durationWindowRightBorder} /> */}
              <ScrollView
                 ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.framesLine}
                contentContainerStyle={{alignItems:'flex-end', marginBottom:10
                }}
                alwaysBounceHorizontal={true}
                scrollEventThrottle={1}
                onScroll={handleOnScroll}
             
                // onTouchStart={handleOnTouchStart}
                // onTouchEnd={handleOnTouchEnd}
                // onMomentumScrollEnd={handleOnTouchEnd}
                >
                <View style={styles.prependFrame} />
                {frames.map((frame, index) => renderFrame(frame, index))}
                <View style={styles.appendFrame} />
              </ScrollView>
            </View>
            </View>
          )}
     </View>
    </View>

  
 
    </SafeAreaView>
  );
};

const MyComponent = ({route,navigation}) => {
  const [index, setIndex] = React.useState(0);

  // const parameterFromPreviousPage = route.params?.parameterFromPreviousPage || '';
  const { videoData } = route.params;



  const [routes] = React.useState([
    { key: 'edit', title: 'Edit', focusedIcon: 'movie-edit', unfocusedIcon: 'movie-edit-outline', component:Library},
    { key: 'highlights', title: 'Highlights', focusedIcon: 'content-cut',component:Library },
    { key: 'compare', title: 'Compare', focusedIcon: 'layers-triple', unfocusedIcon: 'layers-triple-outline',component:Library },
    
  ]);



  const renderScene = ({ route }) => {
    const Component = route.component;
    return (
      <Component
        navigation={navigation}
        videoData={videoData}
      />
    );
  };



  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      activeColor={'#00BFFF'}
      inactiveColor={'white'}
      barStyle={{ backgroundColor: '#1A1B1C' }}
     
    />
  );
};


export default MyComponent;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        // paddingHorizontal:10,
       
       position:'relative',
      },
     
  container: {
    flex: 1,
    // paddingTop: 22,
  },

  framesLine: {
    width: SCREEN_WIDTH,
    
    // position: 'absolute',
  },
  durationWindowAndFramesLineContainer: {
    // top: -DURATION_WINDOW_BORDER_WIDTH,
    position:'relative',
    flex:1,
    width: SCREEN_WIDTH,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    // justifyContent: 'center',
    marginBottom:5,
  
    flexDirection:'row'
    // zIndex: 10,
  },

  buttonWrapperContent:{
   
  },

  slider: {
    position:'absolute',
    width: 283,
    
    zIndex:100,
    bottom:0,
   
  },

  durationWindow: {
    width: DURATION_WINDOW_WIDTH,
    borderColor: 'yellow',
    borderWidth: DURATION_WINDOW_BORDER_WIDTH,
    borderRadius: 4,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    alignSelf: 'center',
  },

  durationLabelContainer: {
    backgroundColor: 'yellow',
    alignSelf: 'center',
    top: -28,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  durationLabel: {
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '700',
  },
  popLineContainer: {
    position: 'absolute',
   
    left:'50%',
  bottom:0,
    zIndex: 25,
    // backgroundColor:'green'
    
  },

  popLine: {
    width: 3,
    height: 120,
    backgroundColor: 'white',
  },

  durationWindowLeftBorder: {
    position: 'absolute',
    width: DURATION_WINDOW_BORDER_WIDTH,
    alignSelf: 'center',
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    left: SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    backgroundColor: 'yellow',
    zIndex: 25,
  },
  durationWindowRightBorder: {
    position: 'absolute',
    width: DURATION_WINDOW_BORDER_WIDTH,
    right: SCREEN_WIDTH - SCREEN_WIDTH / 2 - DURATION_WINDOW_WIDTH / 2,
    height: TILE_HEIGHT + DURATION_WINDOW_BORDER_WIDTH * 2,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'yellow',
    zIndex: 25,
  },



  prependFrame: {
    width: SCREEN_WIDTH / 2  ,
  },
  appendFrame: {
    width: SCREEN_WIDTH / 2 ,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'black',
    flex:1
  },
  fontStyle: {
    fontSize: 13,
   fontFamily: FontFamily.sFProMedium,
   color:'#00BFFF'
//    fontWeight: "500",
    // width: '100%',
    
    // borderRadius: Border.br_3xs,
    // letterSpacing: 1,
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
   
    backgroundColor: '#1A1B1C',
    borderRadius: 7,
  },
  signIn: {
    color: Color.purple,
  },
  signInWrapper: {
    
    borderColor: "#7636b7",
    borderRadius: Border.br_3xs,
    marginTop:15
  },

  loadingFrame: {
    width: TILE_WIDTH,
    height: TILE_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
  },
  
});


