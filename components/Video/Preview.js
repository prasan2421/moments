import React, { Component } from "react";
import {
  BackHandler,
  Dimensions,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./PreviewStyles";
import VideoPlayer from "./VideoPlayer";
import { inject, observer } from "mobx-react";
import CompareGallery from "./CompareGallery";
import Timeline from "./Timeline/Timeline";
import VideoSpeed from "./VideoSpeed";
import {
  HeaderBackButton,
  NavigationActions,
  StackActions
} from "react-navigation";
import Orientation from "react-native-orientation";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Gallery" })]
});

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      video: {},
      activeTab: 0,
      unique: [],
      tags: [],
      skipTime: null,
      tagTime: null,
      renderPlayer: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
        navigation.state.params && navigation.state.params.title
          ? navigation.state.params.title
          : "VIDEO",
      headerLeft: (
        <HeaderBackButton
          tintColor="#000000"
          onPress={() => {
            navigation.dispatch(resetAction);
          }}
        />
      ),
      headerRight: <View />,
      headerTintColor: "#000",
      headerTitleStyle: {
        alignSelf: "center",
        justifyContent: "center",
        flex: 1,
        fontWeight: "bold",
        textAlignVertical: "center",
        textAlign: "center",
        color: "#000",
        fontFamily: "Metropolis-Medium",
        fontSize: 12,
        lineHeight: 15
      }
    };
  };

  componentDidUpdate(prevProps) {
    const { navigation } = this.props;
    if (
      this.props.videoStore.compareMode &&
      navigation.state.params.title !== "COMPARE MODE"
    ) {
      navigation.setParams({ title: "COMPARE MODE" });
    }
    if (
      !this.props.videoStore.compareMode &&
      navigation.state.params.title === "COMPARE MODE"
    ) {
      let video = this.props.navigation.getParam("video");
      navigation.setParams({ title: video.title });
    }
  }

  handleBackPress = () => {
    this.props.navigation.dispatch(resetAction);
    return true;
  };

  componentWillMount() {
    this.props.tagStore.getTags();
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    const { navigation } = this.props;

    // BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    let video = this.props.navigation.getParam("video");
    let tag = this.props.navigation.getParam("tag");
    navigation.setParams({ title: video.title + " VIDEO" });
    navigation.setParams({ title: video.title + " VIDEO" });
    if (tag) {
      this.setState({
        skipTime: tag.time - tag.backtrace > 0 ? tag.time - tag.backtrace : 0,
        tagDuration: tag.duration
      });
      this.props.videoStore.setPlaying(false);
    }
    this.props.videoStore.setVideo(video);
    this.setState({ unique: [...new Set(video.tags.map(item => item.label))] });
    this.props.videoStore.setFilters([
      ...new Set(video.tags.map(item => item.label))
    ]);
    this.props.videoStore.setVideoTags(video.tags);
    this.setState({ video: video });
  }

  componentWillUnmount() {
    Orientation.unlockAllOrientations();
    this.props.videoStore.setComparePlaying(false);
    this.props.videoStore.resetCompareMode();
  }

  onFilterPress = (item, i) => {
    let video = this.props.navigation.getParam("video");
    if (item) {
      this.setState({ activeTab: i + 1 });
      this.setState({ activeItem: item });
      this.props.videoStore.setFilter(item);
      let filteredTags = video.tags.filter(e => e.label === item);
      this.props.videoStore.setVideoTags(filteredTags);
    } else {
      this.setState({ activeTab: 0 });
      let sortedTags = video.tags.sort((a, b) => (a.time > b.time ? 1 : -1));
      this.props.videoStore.setVideoTags(sortedTags);
    }
  };

  skipToTime = (tagTime, tagDuration) => {
    this.setState({ skipTime: tagTime, tagDuration: tagDuration });
    this.props.videoStore.setPlaying(false);
  };

  resetSkipTime = () => {
    this.setState({ skipTime: null, tagDuration: null });
  };

  render() {
    let video = this.props.navigation.getParam("video");

    return (
      <View style={styles.container}>
        {this.state.renderPlayer && (
          <VideoPlayer
            compare={true}
            video={video}
            skipTime={
              this.state.skipTime || this.props.navigation.getParam("skipTime")
            }
            tagDuration={
              this.state.tagDuration ||
              this.props.navigation.getParam("tagDuration")
            }
            nav={this.props.navigation}
          />
        )}
        <VideoSpeed />
        {!this.props.videoStore.compareMode ? (
          <View
            style={{
              height: 40,
              backgroundColor: "#FFFFFF",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.3)"
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                height: "100%",
                width: "100%"
              }}
            >
              <TouchableOpacity
                onPress={() => this.onFilterPress()}
                style={{
                  height: "100%",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingHorizontal: 4,

                  borderBottomColor: this.state.activeTab === 0 ? "black" : "",
                  borderBottomWidth: this.state.activeTab === 0 ? 2 : 0
                }}
                hitSlop={{ left: 50, right: 50 }}
              >
                <Text
                  style={{
                    ...styles.inactiveTab,
                    ...(this.state.activeTab === 0 && styles.activeTab)
                  }}
                >
                  {"ALL HIGHLIGHTS"}
                </Text>
              </TouchableOpacity>
              {this.props.videoStore.filters.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    onPress={() => this.onFilterPress(item, i)}
                    style={{
                      height: "100%",
                      alignItems: "center",
                      paddingTop: 10,
                      paddingHorizontal: 4,
                      borderBottomColor:
                        this.state.activeTab === i + 1 ? "black" : "",
                      borderBottomWidth: this.state.activeTab === i + 1 ? 2 : 0
                    }}
                    hitSlop={{ left: 50, right: 50 }}
                  >
                    <Text
                      style={{
                        ...styles.inactiveTab,
                        ...(this.state.activeTab === i + 1 && styles.activeTab)
                      }}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ) : null}
        {this.props.videoStore.compareMode ? (
          <CompareGallery
            nav={this.props.navigation}
            compareTitle={this.props.videoStore.video.title}
          />
        ) : (
          <Timeline
            video={video}
            tags={this.props.videoStore.videoTags}
            skipToTime={this.skipToTime}
            resetSkipTime={this.resetSkipTime}
          />
        )}
      </View>
    );
  }
}

export default inject("videoStore", "tagStore")(observer(Preview));
