import React, { Component } from "react";
import { Dimensions, View } from "react-native";
import styles from "./PreviewStyles";
import VideoPlayer from "./VideoPlayer";
import { inject, observer } from "mobx-react";
import { HeaderBackButton } from "react-navigation";
import RNListSlider from "react-native-list-slider";
import Orientation from "react-native-orientation";
import moment from "moment";
import _ from "lodash";

let orientation = null;

class Preview extends Component {
  constructor(props) {
    const isPortrait = () => {
      const dim = Dimensions.get("screen");
      return dim.height >= dim.width;
    };

    Dimensions.addEventListener("change", () => {
      orientation = isPortrait() ? "portrait" : "landscape";
    });
    super(props);
    this.state = {
      info: [],
      video: {},
      activeTab: 0,
      unique: [],
      tags: [],
      skipTime: null,
      tagTime: null,
      val: 0,
      scrubTime: null
    };
    this.videoPlayerRef = React.createRef();
    this.debounceVideoPlayer = _.debounce(this.restartVideoPlayer, 1000);
    this.debounceScrubber = _.debounce(this.updateScrubber, 300);
  }

  static navigationOptions = ({ navigation }) => {
    let video = navigation.getParam("video");
    return {
      headerTitle: video.title.toUpperCase() + " VIDEO" || "VIDEO",
      headerLeft: (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: <View />,
      headerTintColor: "#000",
      headerTitleStyle: {
        headerTintColor: "#000",
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

  componentWillMount() {
    this.props.tagStore.getTags();
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    self = this;
    let video = this.props.navigation.getParam("video");
    this.setState({ video: video });
    if (this.props.navigation.getParam("currentTime")) {
      this.setState({
        val: this.props.navigation.getParam("currentTime")
      });
    }
  }

  componentWillUnmount() {
    this.props.videoStore.resetCurrentTime();
  }

  onValueChanged = value => {
    if (value > 0) {
      // prevent scrubbing when scrubbed value is before skipTime (time - backtrace)
      // or after tagDuration (skipTime + tag duration)
      if (
        value >=
          this.props.navigation.getParam("skipTime") +
            this.props.navigation.getParam("tagDuration") ||
        value <= this.props.navigation.getParam("skipTime")
      ) {
        return;
      }
      if (
        this.videoPlayerRef &&
        this.videoPlayerRef.current &&
        !this.videoPlayerRef.current.state.paused &&
        this.state.scrubTime !== null
      ) {
        this.videoPlayerRef.current.handleMainButtonTouch();
        this.setState({ val: this.videoPlayerRef.current.state.currentTime });
        this.setState({
          scrubTime: this.videoPlayerRef.current.state.currentTime
        });
        //this might be useful if demanded later on
        //this.debounceVideoPlayer();
      } else {
        this.setState({ val: value });
        this.setState({ scrubTime: value });
      }
    }
  };

  //this might be useful if demanded later on
  restartVideoPlayer = () => {
    if (
      this.videoPlayerRef &&
      this.videoPlayerRef.current &&
      this.videoPlayerRef.current.state.paused
    ) {
      this.videoPlayerRef.current.handleMainButtonTouch();
    }
  };

  updateScrubber = time => {
    this.setState({
      val: time
    });
  };

  render() {
    const video = this.props.navigation.getParam("video");
    const duration =
      (video &&
        video.duration &&
        moment.duration(video.duration).asSeconds()) ||
      0;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fullscreen}>
          <VideoPlayer
            compare={false}
            video={video}
            skipTime={this.props.navigation.getParam("skipTime")}
            tagDuration={this.props.navigation.getParam("tagDuration")}
            full={true}
            scrubTime={this.state.scrubTime}
            nav={this.props.navigation}
            ref={this.videoPlayerRef}
            updateScrubber={this.debounceScrubber}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F5FCFF"
          }}
        >
          <RNListSlider
            value={this.state.val}
            onValueChange={this.onValueChanged}
            maximumValue={duration}
            multiplicity={0.05}
            decimalPlaces={2}
            mainContainerStyle={{
              backgroundColor: "#BEBEBE",
              height: "100%"
            }}
            itemStyle={{ borderColor: "white" }}
            thumbStyle={{ borderColor: "#579FFB", marginTop: 30 }}
          />
        </View>
      </View>
    );
  }
}

export default inject("videoStore", "tagStore")(observer(Preview));
