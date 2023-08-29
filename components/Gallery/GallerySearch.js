import React, { Component } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./GalleryStyles";
import Footer from "../Global/Footer";
import Search from "../../assets/Svg/Search";
import { inject, observer } from "mobx-react";
import { NavigationActions, StackActions } from "react-navigation";
import Orientation from "react-native-orientation";

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Gallery" })]
});

class GallerySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      videos: [],
      tags: []
    };
  }

  searchVideos = criteria => {
    let video = this.props.videoStore.getVideos();
    let filteredVideo = video.filter(e => e.title.includes(criteria));
    this.setState({ videos: filteredVideo });
  };

  searchTag = criteria => {
    let tags = [];
    let video = this.props.videoStore.getVideos();
    //video.map((item,i) => {tags=tags.concat({tag:item.tags})})
    video.map((item, i) => {
      item.tags.map(e => {
        tags = [...tags, { ...e, video: item }];
      });
    });

    // let filteredTags=tags.filter((item,i) => {item.tag.map(e=>e.label.substring(0,criteria.length) === criteria)})

    //tags.filter(e=>console.log(e.tag.filter(e=>console.log(e)))
    let filteredTags = tags.filter(e => e.label.includes(criteria));
    this.setState({ tags: filteredTags });
    //
    // console.log("criteria")
  };

  handleChange = criteria => {
    setTimeout(() => {
      this.searchVideos(criteria), this.searchTag(criteria);
    }, 500);
  };

  componentDidMount() {
    let video = this.props.videoStore.getVideos();
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.searchVideos("");
      this.searchTag("");
      Orientation.lockToPortrait();
    });
    this.props.footerStore.setTab(null);
  }

  componentWillUnmount(): void {
    this.setState({ videos: [] });
    Orientation.unlockAllOrientations();
    this.focusListener.remove();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => {}}>
          <Search fill="white" />
        </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        marginLeft: 20
      },
      headerTitle: "LIBRARY",
      headerTitleStyle: {
        width: "70%",
        textAlign: "center",
        color: "#ffffff",
        fontFamily: "Metropolis-Medium",
        fontSize: 12,
        lineHeight: 15
      },
      headerRight: (
        <TouchableOpacity
          style={{ height: "100%", width: 80, justifyContent: "center" }}
          onPress={() => {
            navigation.dispatch(resetAction);
          }}
        >
          <Text style={{ color: "white", marginRight: 20 }}>cancel</Text>
        </TouchableOpacity>
      ),
      headerTintColor: "#000000"
    };
  };

  render() {
    return (
      <View style={styles.searchContainer}>
        <View style={{ width: "90%", flex: 1, marginLeft: "5%" }}>
          <TextInput
            style={styles.galleryInput}
            allowFontScaling={false}
            onChangeText={text => {
              this.handleChange(text);
            }}
          />
          <Text style={{ color: "white", marginTop: -10 }}>
            Result({this.state.videos.length + this.state.tags.length})
          </Text>
          <Text style={{ color: "white", paddingTop: 20 }}>VIDEOS</Text>
          <ScrollView horizontal={true} style={{ flex: 1 }}>
            {this.state.videos.map((item, i) => {
              return (
                <TouchableOpacity
                  style={{ width: 150, marginRight: 20 }}
                  key={i}
                  onPress={() =>
                    this.props.navigation.navigate("Preview", { video: item })
                  }
                >
                  <Image
                    source={item.thumb ? { uri: item.thumb } : null}
                    style={{ height: "50%", width: "100%", borderRadius: 10 }}
                  ></Image>
                  <Text style={{ color: "white" }}>{item.title}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <Text style={{ color: "white" }}>HIGHLIGHTS</Text>
          <ScrollView horizontal={true} style={{ flex: 1 }}>
            {this.state.tags.map((item, i) => {
              return (
                <TouchableOpacity
                  style={{ width: 150, marginRight: 20 }}
                  key={i}
                  onPress={() => {
                    this.props.navigation.navigate("Preview", {
                      video: item.video,
                      tag: item
                    });
                  }}
                >
                  <Image
                    source={item.uri ? { uri: item.uri } : null}
                    style={{ height: "50%", width: "100%", borderRadius: 10 }}
                  ></Image>
                  <Text style={{ color: "white" }}>
                    {item.label + `(${item.video.title})`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Footer />
      </View>
    );
  }
}

export default inject("videoStore", "footerStore")(observer(GallerySearch));
