import React, { useEffect, useState,useRef } from 'react';
import { Image, StyleSheet, Text, View,StatusBar, SafeAreaView, ScrollView,FlatList, TouchableOpacity } from "react-native";
import { Button, TextInput, Checkbox,Card, IconButton,Searchbar,List } from 'react-native-paper';
import LinearGradient from "react-native-linear-gradient";
import { Padding, Border, FontSizeStyle, FontFamily, Color } from "../GlobalStyles";
import SplashLogo from "../../assets/Svg/SplashLogo";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import Video from 'react-native-video';
import moment from 'moment';

const numColumns = 3;

const VideoDuration = ({videoSource}) => {
  const [videoDuration, setVideoDuration] = useState('15:02');


  const fetchDuration = async (videoSource) => {
    try {
      const { size, duration} = await RNFS.stat(videoSource);
      console.log('Video duration:', size);
    } catch (error) {
      console.log('Error fetching video duration:', error);
    }
  };

  useEffect(() => {
    fetchDuration(videoSource)
  }, []);

  return (
    <Text source={{color:'black'}}>{videoDuration}</Text>
  );
};

const Library = ({navigation}) => {
  const videoRef = React.createRef();
  const columns = numColumns;

    const [text, setText] = React.useState("");
    const [videoFiles, setVideoFiles] = useState([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedButtom, setSelectedButton] = useState(1);

    useEffect(() => {
      listVideoFiles();
    }, []);

    // ${RNFS.PicturesDirectoryPath}/spoiq/myvideo${duration}.mp4

    const onChangeSearch = query => setSearchQuery(query);

    const listVideoFiles = async () => {
      try {
        const directoryPath =`${RNFS.PicturesDirectoryPath}/spoiq` ; // Set the directory path where your videos are stored
  
        const files = await RNFS.readDir(directoryPath);
  
        const videoFiles = files.filter((file) =>
          file.name.endsWith('.mp4') || file.name.endsWith('.mov') // Add any other video file extensions you want to include
        );

        console.log(`vd files: ${files}`)
  
        setVideoFiles(videoFiles);
      } catch (error) {
        console.error('Error listing video files:', error);
      }
    };

    const onVideoLoad = () => {
      // Capture a thumbnail image at the current time (e.g., 1 second) of the video
      videoRef.current.seek(0);
    
    };

    const handleVideoPress = (video) => {
      console.log(`selected Video : ${JSON.stringify(video)}`)
let videoData =[video]
      // console.log(data)
      setSelectedVideo(video);
      navigation.navigate('VideoDisplay',{
        
        videoData:JSON.stringify(videoData)
      })
    };

    const renderItem = ({ item }) => (
      
      
       
          <View style={{flex:1,margin:2 }}>
          <TouchableOpacity style={{flex:1,position:'relative'}}  onPress={() => handleVideoPress(item)}>
             {/* <View> */}
               <Image
                 source={{ uri: `file://${item.path}` }}
                 style={{width:'100%', height:100 }}
               />
               <View style={{position:'absolute', top:0,left:3}}>
             <Text>{moment(item.mtime).format("H:mm")}</Text>
             </View>
             <View style={{position:'absolute', bottom:3,left:3}}>
             <Icon name="camera" size={15} color="white"  />
             
             </View>
             <View style={{position:'absolute', bottom:0,right:3}}>
             <VideoDuration  videoSource={item.path}/>
             </View>
             {/* </View> */}
             {/* <Text style={{color:'black'}}>{item.name}</Text> */}
           </TouchableOpacity>
 
          
           {/* <Video
               ref={(ref) => {
                 this.player = ref
               }} 
             source={{ uri: item.path }}
             style={{ width: 200, height: 200 }}
             onLoad={onVideoLoad}
             // paused={true}
           /> */}
         </View>
       
     
      
      );

      const PlaceholderItem = () => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
          <Text>Empty</Text>
        </View>
      );

      const itemsToShow =  videoFiles;

  return (
    <SafeAreaView
    style={styles.authContainer}
    >
        <StatusBar
        animated={true}
        backgroundColor="#FFF"
       
      /><View style={{backgroundColor:'white', paddingHorizontal:10, paddingBottom:10, elevation:3}}>
 <Searchbar
      mode="bar"
      style={{backgroundColor:'#e0e0e0', borderRadius:10, fontFamily:14, color:'black'}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
      </View>
     

  <View style={styles.container}>
  <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',  paddingVertical: 10,}}>
  <Text style={{color:'black', marginLeft:20, color:'#444',fontSize:16, fontWeight:'500'}}>Today</Text>
  {/* <IconButton  icon="plus" iconColor={'gray'} /> */}

  </View>

  {/* {selectedVideo && (
        <View>
          <Video
            source={{ uri: `file://${selectedVideo.path}` }}
            style={{ width: '100%', height:'100%' }}
            controls={true}
            paused={false}
          />
        </View>
      )} */}
      <FlatList
         data={ (itemsToShow).slice().reverse()}
        numColumns={columns}
        keyExtractor={(item, index) =>index.toString()}
        renderItem={({item}) =>(renderItem({item}))
         
       
       
        }
        style={{marginHorizontal:10}}
      />
      <View style={{width:'60%',elevation:1, backgroundColor:'lightgray', display:'flex',padding:4, flexDirection:'row', alignSelf:'center', marginVertical:15,borderRadius:10}}>
      <Button labelStyle={{ marginHorizontal: 0 }} buttonColor={selectedButtom==1 && 'white'} style={{borderRadius:10,  flex:1, }} textColor={Color.purple} mode={selectedButtom==1?"elevated":"text"} onPress={() => setSelectedButton(1)}>
   All
  </Button>
  {selectedButtom==3 && 
  <View style={{borderLeftWidth:1, borderColor:'gray', marginVertical:5, border:'solid'}}/>}
  <Button labelStyle={{ marginHorizontal: 0 }} buttonColor={selectedButtom==2 && 'white'} style={{borderRadius:10, flex:1}} mode={selectedButtom==2?"elevated":"text"} textColor='gray' onPress={() => setSelectedButton(2)}>
    Videos
  </Button>
  {selectedButtom==1 && 
  <View style={{borderLeftWidth:1, borderColor:'gray', marginVertical:5, border:'solid'}}/>}
  <Button labelStyle={{ marginHorizontal: 0 }} buttonColor={selectedButtom==3 && 'white'}  style={{borderRadius:10, flex:1, }} mode={selectedButtom==3?"elevated":"text"} textColor='gray' onPress={() => setSelectedButton(3)}>
    Reels
  </Button>
      </View>
    </View>

  
 
    </SafeAreaView>
  );
};

export default Library;

const styles = StyleSheet.create({
    authContainer: {
        flex: 1,
        // paddingHorizontal:10,
       
       position:'relative',
      },
      navContainer:{
          flex:1,
          justifyContent:'flex-start',
          paddingBottom:20,
         
        //   alignItems:'center',
      },
 
      buttonWrapperContent: {
   height:50,
 
  },

  container: {
    flex: 1,
   
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'black',
    flex:1
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


