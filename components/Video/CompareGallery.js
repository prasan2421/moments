import React, { Component, Fragment } from "react";
import {
  View,
  ImageBackground,
  ScrollView,
  Platform,
  ActivityIndicator,
  Dimensions,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";
import VideoPlayer from "./VideoPlayer";
const RNFS = require("react-native-fs");
import { inject, observer } from "mobx-react";
import VideoThumbnail from "react-native-video-thumbnail";
import MainPlay from "../../assets/Svg/MainPlay";
import Pause from "../../assets/Svg/Pause";

class CompareGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loading: false,
      player: false,
      video: {},
      selected: false,
      paused: true
    };
  }

  componentDidMount() {
    this.read();
  }

  handleVideoSelect = item => {
    this.setState({ video: item, player: true });
  };

  handleComparePlay = () => {
    this.props.videoStore.setComparePlaying(
      !this.props.videoStore.comparePlaying
    );
  };

  animVal = new Animated.Value(0);
  interpolateBar = this.animVal.interpolate({
    inputRange: [0, 1],
    outputRange: [30, 15]
  });
  animatedReduce = Animated.spring(this.animVal, { toValue: 1 });
  animatedExpand = Animated.spring(this.animVal, { toValue: 0, friction: 10 });

  read = () => {
    this.setState({ loading: true });
    let email = this.props.profileStore.user.email;
    RNFS.readDir(`${RNFS.DocumentDirectoryPath}/${email}`).then(result => {
      let filteredFiles = result.filter(
        file =>
          file.path
            .split("/")
            .pop()
            .split(".")
            .pop() === "json"
      );
      let counter = 0;
      filteredFiles.map((item, fileIndex) => {
        if (
          item.path &&
          item.path
            .split("/")
            .pop()
            .split(".")
            .pop() === "json"
        ) {
          let path = item.path;
          RNFS.readFile(
            Platform.OS === "android" ? "file://" + path : path,
            "utf8"
          )
            .then(file => {
              let fileReading = JSON.parse(file);
              if (fileReading.fileName) {
                VideoThumbnail.get(
                  fileReading.fileName.replace("file://", "")
                ).then(metadata => {
                  if (metadata.data) {
                    fileReading["thumb"] = metadata.data;
                  }
                  this.setState({ info: [...this.state.info, fileReading] });
                  counter++;
                  if (filteredFiles.length === counter) {
                    this.setState({ loading: false });
                  }
                });
              } else {
                this.setState({ loading: false });
              }
            })
            .catch(err => {
              this.setState({ loading: false });
              console.log(err);
            });
        }
      });

      if (result.length === 0) {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    let video = this.state.info[0] ? this.state.info[0] : "";
    const { width } = Dimensions.get("window");
    const thumbHeight = width * 0.7625;
    const thumbWidth = width * 0.7;

    return (
      <View style={{ flex: 1 }}>
        {!this.state.player ? (
          <View style={{ flex: 1 }}>
            {this.state.loading ? (
              <ActivityIndicator
                style={{
                  alignItem: "center",
                  justifyContent: "center",
                  paddingTop: "40%"
                }}
                size="large"
                color="#434343"
              />
            ) : (
              <ScrollView
                horizontal={true}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  paddingLeft: "2.5%",

                  backgroundColor: "#ececec",
                  paddingBottom: "2.5%"
                }}
              >
                {this.state.info.map((item, i) => (
                  <TouchableWithoutFeedback
                    style={{ display: "flex", height: thumbHeight }}
                    key={i}
                    onPress={() => {
                      if (this.state.selected === i) {
                        this.handleVideoSelect(item);
                      }
                      this.animatedExpand.start();
                      setTimeout(() => {
                        this.setState({ selected: i });
                        this.animatedReduce.start();
                      }, 300);
                    }}
                  >
                    <Animated.View
                      style={{
                        paddingRight: 30,
                        marginTop:
                          i === this.state.selected ? this.interpolateBar : 30
                      }}
                    >
                      <ImageBackground
                        style={{ width: thumbWidth, flex: 3 }}
                        source={item.thumb ? { uri: item.thumb } : null}
                      />
                      <View
                        style={{
                          backgroundColor: "white",
                          flex: 1,
                          width: "100%",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Metropolis-Medium",
                            fontSize: 18,
                            lineHeight: 18,
                            color: "#262628"
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    </Animated.View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
            )}
          </View>
        ) : (
          <Fragment>
            <VideoPlayer video={this.state.video} nav={this.props.nav} />
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  color: "rgba(0, 0, 0, 1)",
                  fontFamily: "Metropolis-Medium"
                }}
              >
                {`${this.props.compareTitle.toUpperCase()} / ${this.state.video.title.toUpperCase()}`}
              </Text>
            </View>
            <View
              style={{
                height: "20%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 50,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  alignItems: "center",
                  justifyContent: "center"
                }}
                onPress={() => this.handleComparePlay()}
              >
                {!this.props.videoStore.comparePlaying ? (
                  <MainPlay width={20} height={20} />
                ) : (
                  <Pause width={20} height={20} />
                )}
              </TouchableOpacity>
            </View>
          </Fragment>
        )}
      </View>
    );
  }
}

export default inject("profileStore", "videoStore")(observer(CompareGallery));
