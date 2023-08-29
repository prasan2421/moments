import React, { PureComponent } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
// import Slider from "@react-native-community/slider";
import styles from "./PreviewStyles";
import Video from "react-native-video";
import MainPlay from "../../assets/Svg/MainPlay";
import Compare from "../../assets/Svg/Compare";
import Zoom from "../../assets/Svg/Zoom";
import * as RNFS from "react-native-fs";
import Pause from "../../assets/Svg/Pause";
import { inject, observer } from "mobx-react";
import { autorun } from "mobx";
import { captureRef } from "react-native-view-shot";
import moment from "moment";
// import { ProcessingManager } from "react-native-video-processing";
import SlowMo from "../../assets/Svg/SlowMo";
import Fullscreen from "../../assets/Svg/Fullscreen";
import { StackActions, NavigationActions } from "react-navigation";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loading: false,
      paused: true,
      progress: 0,
      duration: null,
      visible: true,
      animation: new Animated.Value(0),
      isSeeking: false,
      zoom: 0,
      zoomView: false,
      activeTab: 0,
      captionText: "",
      captionDuration: "3",
      video: {},
      recording: false,
      currentTag: 0,
      currentTime: 0,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
    this.seekBarWidth = 200;
    this.wasPlayingBeforeSeek = props.autoplay;
    this.seekTouchStart = 0;
    this.seekProgressStart = 0;
    this.onSeekBarLayout = this.onSeekBarLayout.bind(this);
    this.onSeekGrant = this.onSeekGrant.bind(this);
    this.onSeekRelease = this.onSeekRelease.bind(this);
    this.onProgress = this.onProgress.bind(this);
    this.onSeek = this.onSeek.bind(this);
    this.onVideoSeek = this.onVideoSeek.bind(this);
  }

  componentWillMount() {
    this.props.tagStore.getTags();
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });

    if (
      this.props.full &&
      this.props.videoStore.isPlaying &&
      !this.props.videoStore.comparePlaying
    ) {
      this.setState({ paused: false });
    }

    this.dispose = autorun(() => {
      const { comparePlaying, compareMode } = this.props.videoStore;
      if (compareMode) {
        if (comparePlaying) {
          this.setState({ paused: false });
        } else {
          this.setState({ paused: true });
        }
      }
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.skipTime !== this.props.skipTime) {
      if (this.props.skipTime != null) {
        this.player.seek(this.props.skipTime);
        if (this.state.paused) {
          this.setState({
            progress:
              this.props.skipTime /
              (this.props.duration ||
                this.state.duration ||
                moment.duration(this.props.video.duration).asSeconds()),
            currentTime: this.props.skipTime
          });
        }
      }
    }
    if (prevProps.scrubTime !== this.props.scrubTime) {
      if (this.props.scrubTime !== null) {
        this.player.seek(this.props.scrubTime);
        this.setState({
          progress:
            this.props.scrubTime / (this.props.duration || this.state.duration),
          currentTime: this.props.scrubTime
        });
        if (!this.props.videoStore.isPlaying) {
          this.setState({ paused: true });
        }
      }
    }
  }

  onSeekBarLayout({ nativeEvent }) {
    let padding = 1;
    this.seekBarWidth = nativeEvent.layout.width - padding;
  }

  onSeekStartResponder() {
    return true;
  }

  onSeekMoveResponder() {
    return true;
  }

  onSeekGrant(e) {
    this.seekTouchStart = e.nativeEvent.pageX;
    this.seekProgressStart = this.state.progress;
    this.wasPlayingBeforeSeek = this.state.paused;
    this.setState({
      isSeeking: true,
      paused: true
    });
  }

  onSeekRelease() {
    this.setState({
      isSeeking: false,
      paused: this.wasPlayingBeforeSeek
    });
    if (this.props.updateScrubber) {
      this.props.updateScrubber(this.state.currentTime);
    }
  }

  onSeek(e) {
    const diff = e.nativeEvent.pageX - this.seekTouchStart;
    const ratio = 100 / this.seekBarWidth;
    const progress = this.seekProgressStart + (ratio * diff) / 100;

    if (progress > 0 && progress <= 1) {
      this.setState({
        progress
      });

      if (this.state.paused) {
        const currentTime =
          progress * (this.props.duration || this.state.duration);
        this.setState({
          currentTime
        });
      }
      this.player.seek(progress * this.state.duration);
    }
  }

  toggleZoom = () => {
    this.setState({ speedView: false, zoomView: !this.state.zoomView });
  };

  handleVisible = () => {
    this.setState({ visible: !this.state.visible });
    if (this.state.visible) {
      setTimeout(() => this.setState({ visible: false }), 2000);
    }
    if (this.state.paused) {
      this.setState({ visible: true });
    }
  };

  handleMainButtonTouch = () => {
    this.props.videoStore.setComparePlaying(false);
    if (this.state.paused) {
      this.setState({ visible: !this.state.visible });
    }
    const status = this.state.paused;
    this.setState({ paused: !status });
    this.props.videoStore.setPlaying(status);
  };

  onProgress(event) {
    this.props.videoStore.setCurrentTime(event.currentTime);

    if (this.state.isSeeking) {
      return;
    }
    if (this.props.onProgress) {
      this.props.onProgress(event);
    }
    if (typeof this.props.skipTime === "number") {
      if (event.currentTime > this.props.skipTime + this.props.tagDuration) {
        this.player.seek(this.props.skipTime);
        setTimeout(() => {
          this.setState({
            paused: true
          });
          this.props.videoStore.setPlaying(false);
        }, 500);
      }
    }

    this.setState({
      progress:
        event.currentTime / (this.props.duration || this.state.duration),
      currentTime: event.currentTime
    });
  }

  onVideoSeek(e) {
    if (Number.isInteger(this.props.skipTime)) {
      // setTimeout(() => {
      //   this.setState({
      //     paused: true
      //   });
      //   this.props.videoStore.setPlaying(false);
      // }, 100);
    }
  }

  handleEnd = () => {
    if (
      this.props.skipTime + this.props.tagDuration >=
      moment.duration(this.props.video.duration).asSeconds()
    ) {
      this.player.seek(this.props.skipTime);
      setTimeout(() => {
        this.setState({
          paused: true
        });
        this.props.videoStore.setPlaying(false);
      }, 500);
    } else {
      // ??
      this.props.videoStore.setCurrentVideoStatus(this.props.video, false);
      this.setState(
        {
          paused: true,
          progress: 1
        },
        () => this.player.seek(0)
      );
      this.props.videoStore.setCurrentTime(0);
    }
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration
    });
    if (this.props.skipTime) {
      this.player.seek(this.props.skipTime);
      if (Platform.OS === "android") {
        if (!(this.props.skipTime < this.props.nav.getParam("currentTime")))
          this.setState({
            progress:
              this.props.skipTime /
              moment.duration(this.props.video.duration).asSeconds(),
            currentTime: this.props.skipTime
          });
      }
    }

    if (!this.props.full && this.props.nav.getParam("currentTime")) {
      this.player.seek(this.props.nav.getParam("currentTime"));
      if (this.props.videoStore.isPlaying) {
        this.setState({ paused: false });
      }
      if (Platform.OS === "android") {
        this.setState({
          progress:
            this.props.nav.getParam("currentTime") /
            moment.duration(this.props.video.duration).asSeconds(),
          currentTime: this.props.nav.getParam("currentTime")
        });
      }
    }
  };

  handleComapre = () => {
    this.props.videoStore.toggleCompareMode();
  };

  setTag = item => {
    if (!this.state.paused) {
      let time = this.state.currentTime;
      if (Platform.OS === "android") {
        // capture screenshot of the screen on Android.
        captureRef(this.player, {
          format: "jpg",
          quality: 0.8
        }).then(uri => this.saveTagThumbnail(item, uri, time));
      } else {
        // a video frame is extracted on iOS as a screenshot cannot be performed on a camera component
        let path = this.props.video.fileName.replace("file://", "");
        const maximumSize = { width: 300, height: 200 };

        // ProcessingManager.getPreviewForSecond(
        //   path,
        //   time,
        //   maximumSize,
        //   "JPEG"
        // ).then(data => this.saveTagThumbnail(item, data.uri, time));
      }
    }
  };

  saveTagThumbnail = (item, uri, time) => {
    let { email } = this.props.profileStore.user;

    let path = this.props.video.path;
    let updatedVideo = this.props.video;
    let thumbPath = `${
      RNFS.DocumentDirectoryPath
    }/${email}/thumbnails/${uri.split("/").pop()}`;
    RNFS.moveFile(uri, thumbPath).then(() => {
      let newUri = `file://${thumbPath}`;
      updatedVideo.tags = [
        ...updatedVideo.tags,
        {
          tagId: item.id,
          label: item.label,
          duration: item.duration,
          uri: newUri,
          backtrace: item.backtrace,
          time
        }
      ];
    });
    return RNFS.unlink(path)
      .then(() => {
        RNFS.writeFile(
          Platform.OS === "android" ? "file://" + path : path,
          JSON.stringify(updatedVideo),
          "utf8"
        )
          .then(success => {
            console.log("FILE WRITTEN!");
            this.props.videoStore.setVideo(this.state.video);
            this.props.videoStore.setFilteredTag(updatedVideo.tags);
            this.props.videoStore.setFilters([
              ...new Set(updatedVideo.tags.map(item => item.label))
            ]);
          })

          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  toggleFullscreen = video => {
    this.setState({
      paused: true
    });

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Gallery" }),
        NavigationActions.navigate({
          routeName: "Preview",
          params: {
            video: video,
            skipTime: this.props.skipTime,
            tagDuration: this.props.tagDuration,
            currentTime: this.state.currentTime
          }
        })
      ]
    });

    if (this.props.full && !this.props.videoStore.compareMode) {
      this.props.nav.dispatch(resetAction);
    } else if (this.props.full && this.props.videoStore.compareMode) {
      this.props.nav.goBack();
    } else {
      this.props.videoStore.setComparePlaying(false);
      this.props.nav.navigate("Fullscreen", {
        video: video,
        title: "Enter new group name",
        button: true,
        skipTime: this.props.skipTime,
        tagDuration: this.props.tagDuration,
        currentTime: this.state.currentTime
      });
    }
  };

  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;
    const { tags } = this.props.tagStore;
    const { toggleIsSpeedOpen, selectedSpeed } = this.props.videoStore;
    const { video } = this.props;

    return (
      <View
        style={{
          width: "100%",
          zIndex: 1000
        }}
      >
        <View style={{ overflow: "hidden" }}>
          <Video
            source={{
              uri:
                Platform.OS === "android"
                  ? this.props.video.fileName
                  : this.props.video.fileName.replace("file://", "")
            }}
            ref={ref => {
              this.player = ref;
            }}
            onSeek={this.onVideoSeek}
            paused={this.state.paused} // Store reference
            onBuffer={this.onBuffer}
            resizeMode={this.props.full ? "cover" : "contain"}
            onProgress={this.onProgress}
            onEnd={this.handleEnd}
            onLoad={this.handleLoad}
            rate={selectedSpeed}
            style={{
              height: this.props.full ? "100%" : height,
              width: "100%",
              transform: [{ scale: this.state.zoom + 0.1 * 10 }],
              overflow: "hidden",
              backgroundColor: "#cfcfcf"
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              paddingHorizontal: 20,
              width: "100%",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>
                {`${moment
                  .utc(Math.round(this.state.currentTime) * 1000)
                  .format("m:ss")} / ${moment
                  .utc(Math.round(this.state.duration) * 1000)
                  .format("m:ss")}`}
              </Text>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.handleVisible}>
          <View
            style={{
              height: "95%",
              width: "100%",
              flex: 1,
              alignItems: "center",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute"
            }}
          >
            {this.state.visible && (
              <View
                style={{
                  height: 20,
                  width: "90%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "5%"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    width: "30%",
                    justifyContent: "space-between"
                  }}
                >
                  {this.props.compare && (
                    <TouchableOpacity
                      onPress={this.handleComapre}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 50,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Compare />
                    </TouchableOpacity>
                  )}
                  {/*<View*/}
                  {/*  style={{*/}
                  {/*    flexDirection: "column",*/}
                  {/*    alignItems: "center"*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <TouchableOpacity*/}
                  {/*    style={{*/}
                  {/*      height: 40,*/}
                  {/*      width: 40,*/}
                  {/*      borderRadius: 50,*/}
                  {/*      backgroundColor: "rgba(0,0,0,0.5)",*/}
                  {/*      alignItems: "center",*/}
                  {/*      justifyContent: "center"*/}
                  {/*    }}*/}
                  {/*    onPress={toggleIsSpeedOpen}*/}
                  {/*  >*/}
                  {/*    <Speed />*/}
                  {/*  </TouchableOpacity>*/}
                  {/*</View>*/}
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      height: 40,
                      width: 40,
                      borderRadius: 50,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={this.toggleZoom}
                  >
                    <Zoom />
                  </TouchableOpacity>
                  {/* {this.state.zoomView && (
                    <Slider
                      style={{
                        position: "absolute",
                        width: 120,
                        top: 90,
                        transform: [{ rotateZ: "-90deg" }]
                      }}
                      step={0.05}
                      minimumValue={0}
                      maximumValue={2}
                      value={this.state.zoom}
                      orientation={"vertical"}
                      onValueChange={value => {
                        this.setState({ zoom: value });
                      }}
                      thumbTintColor="#ffffff"
                      maximumTrackTintColor="#ffffff"
                      minimumTrackTintColor="#ffffff"
                    />
                  )} */}
                  {this.state.zoomView && (
                    <View
                      style={{
                        position: "absolute",
                        width: 50,
                        top: 135 - Math.round(this.state.zoom * 45),
                        left: -40
                      }}
                    >
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.9)",
                          fontFamily: "Metropolis-Bold"
                        }}
                      >
                        {`${Math.round(this.state.zoom * 50)} %`}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
            {this.state.visible && !this.state.speedView && (
              <View
                style={{
                  width: "80%",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    height: 40,
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: this.props.full
                      ? this.state.orientation === "portrait"
                        ? "50%"
                        : "10%"
                      : "10%",
                    alignItems: "center"
                  }}
                >
                  {/*<TouchableOpacity style={{height: 45, width: 45, borderRadius: 50, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center'}}><DoubleBackward/></TouchableOpacity>*/}
                  {/*<TouchableOpacity*/}
                  {/*  style={{*/}
                  {/*    height: 45,*/}
                  {/*    width: 60,*/}
                  {/*    borderRadius: 50,*/}
                  {/*    backgroundColor: "rgba(0,0,0,0.5)",*/}
                  {/*    alignItems: "center",*/}
                  {/*    justifyContent: "center",*/}
                  {/*    flexDirection: "row"*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <Backward />*/}
                  {/*  <Text*/}
                  {/*    style={styles.tagButton}*/}
                  {/*    onPress={() => this.prevTag()}*/}
                  {/*  >*/}
                  {/*    {" "}*/}
                  {/*    TAG*/}
                  {/*  </Text>*/}
                  {/*</TouchableOpacity>*/}
                  <TouchableOpacity
                    style={{
                      height: 80,
                      width: 80,
                      borderRadius: 50,
                      backgroundColor: "rgba(0,0,0,0.5)",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onPress={this.handleMainButtonTouch}
                  >
                    {this.state.paused ? <MainPlay /> : <Pause />}
                  </TouchableOpacity>
                  {/*<TouchableOpacity*/}
                  {/*  style={{*/}
                  {/*    height: 45,*/}
                  {/*    width: 60,*/}
                  {/*    borderRadius: 50,*/}
                  {/*    backgroundColor: "rgba(0,0,0,0.5)",*/}
                  {/*    alignItems: "center",*/}
                  {/*    justifyContent: "center",*/}
                  {/*    flexDirection: "row"*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <Text*/}
                  {/*    style={styles.tagButton}*/}
                  {/*    onPress={() => this.nextTag()}*/}
                  {/*  >*/}
                  {/*    TAG{" "}*/}
                  {/*  </Text>*/}
                  {/*  <Forward />*/}
                  {/*</TouchableOpacity>*/}
                </View>
              </View>
            )}
            {!this.state.zoomView && (
              <React.Fragment>
                <View
                  style={{
                    position: "absolute",
                    bottom: 40,
                    //top: this.state.visible ? 0 : 107,
                    height: 40,
                    width: "100%",
                    flexDirection: "row",
                    marginTop: "10%",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      width: "100%"
                    }}
                  >
                    {!this.state.visible &&
                    !this.props.videoStore.compareMode ? (
                      tags.map((item, i) => {
                        if (this.props.videoStore.filters.length < 5) {
                          return (
                            <TouchableOpacity
                              style={{
                                height: 45,
                                minWidth: 90,
                                borderRadius: 50,
                                backgroundColor: "rgba(255, 0, 0, 0.65)",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row",
                                borderWidth: 1,
                                borderColor: "#808080"
                              }}
                              key={i}
                              onPress={() => this.setTag(item)}
                            >
                              <Text style={styles.tagText}>{item.label}</Text>
                            </TouchableOpacity>
                          );
                        } else {
                          if (
                            this.props.videoStore.filters.includes(item.label)
                          ) {
                            return (
                              <TouchableOpacity
                                style={{
                                  height: 45,
                                  minWidth: 90,
                                  borderRadius: 50,
                                  backgroundColor: "#579FFB",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexDirection: "row"
                                }}
                                key={i}
                                onPress={() => this.setTag(item)}
                              >
                                <Text style={styles.tagText}>{item.label}</Text>
                              </TouchableOpacity>
                            );
                          }
                          return null;
                        }
                      })
                    ) : (
                      <View
                        style={{
                          height: 20,
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between"
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "30%",
                            justifyContent: "space-between"
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 50,
                              backgroundColor: "rgba(0,0,0,0.5)",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            onPress={toggleIsSpeedOpen}
                          >
                            <SlowMo />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center"
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              height: 40,
                              width: 40,
                              borderRadius: 50,
                              backgroundColor: "rgba(0,0,0,0.5)",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                            onPress={() => this.toggleFullscreen(video)}
                          >
                            <Fullscreen />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              </React.Fragment>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.seekBar} onLayout={this.onSeekBarLayout}>
          <View
            style={[{ flexGrow: this.state.progress }, styles.seekBarProgress]}
          />
          <View
            style={{
              ...styles.seekHitPoint,
              marginLeft: `${this.state.progress * 96}%`
            }}
            onStartShouldSetResponder={this.onSeekStartResponder}
            onMoveShouldSetPanResponder={this.onSeekMoveResponder}
            onResponderGrant={this.onSeekGrant}
            onResponderMove={this.onSeek}
            onResponderRelease={this.onSeekRelease}
            onResponderTerminate={this.onSeekRelease}
            hitSlop={
              Platform.OS === "android"
                ? { top: 100, bottom: 100, left: 100, right: 100 }
                : { top: 10, bottom: 2, left: 50, right: 50 }
            }
          >
            <View
              style={[
                this.props.s ? null : styles.seekBarKnob,
                this.state.isSeeking ? { transform: [{ scale: 1.1 }] } : {}
              ]}
            />
          </View>
          <View
            style={{
              flexGrow: 1 - this.state.progress,
              ...styles.seekBarRemains
            }}
          />
          {video.tags &&
            this.state.duration &&
            video.tags.map((tag, i) => {
              let progressPoint = tag.time / this.state.duration;
              return (
                <View
                  key={i}
                  style={{
                    ...styles.horizontalTagMarker,
                    left: `${progressPoint * 100}%`
                  }}
                />
              );
            })}
        </View>
      </View>
    );
  }
}

export default inject(
  "videoStore",
  "tagStore",
  "profileStore"
)(observer(VideoPlayer));
