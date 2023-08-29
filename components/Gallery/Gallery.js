import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View, Text, Alert
} from "react-native";
import styles from "./GalleryStyles";
// import Footer from "../Global/Footer";
import Search from "../../assets/Svg/Search";
// import { inject, observer } from "mobx-react";
import DialogBox from "../Global/DialogBox";
// import Share from "react-native-share";
import showToast from "../Toast/Toast";
// import VideoThumbnail from "react-native-video-thumbnail";
import { NavigationActions, StackActions } from "react-navigation";
import GalleryItem from "./GalleryItem";
// import { ProcessingManager } from "react-native-video-processing";
// import RNVideoEditor from "react-native-video-editor";
import moment from "moment";
// import ModalFromTop from "../Settings/ModalFromTop";
import Dots from "../../assets/Svg/Dots";
// import profileStore from "../../stores/profileStore";
// import Orientation from "react-native-orientation";
// import sanitizeName from "../Utils/sanitizeName";

const RNFS = require("react-native-fs");

// const resetAction = StackActions.reset({
//   index: 0,
//   actions: [NavigationActions.navigate({ routeName: "Gallery" })]
// });

let self = null;

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      loading: false,
      isDialogVisible: false,
      isEditDialogVisible: false,
      itemToDelete: null,
      options: false,
      isExtractDialogVisible: false,
      videoTitle: "",
      sharedLoading: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity
          style={{ height: "100%", width: 50, justifyContent: "center" }}
          onPress={() => navigation.navigate("GallerySearch")}
        >
          <Search fill="black" />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          style={{ height: "100%", width: 50, justifyContent: "center" }}
          onPress={() => self.props.profileStore.toggleIsTopOpen()}
        >
          <Dots fill="black" />
        </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        marginLeft: 20
      },

      headerTintColor: "#000000"
    };
  };

  componentWillMount() {
    if (Platform.OS === "ios") {
      StatusBar.setBarStyle("dark-content");
    }
    
  }

  async componentDidMount() {
    
    let seenOnboarding = !!this.props.profileStore.user.seenOnboarding;
    if (!seenOnboarding) {
      this.props.navigation.navigate("Onboarding", {
        firstLoad: true,
        callFrom: "Gallery"
      });
    }

    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      // this.read();
    });

    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      () => {
        // window.setImmediate(() => {
        //   Orientation.lockToPortrait();
        // });
        this.props.footerStore.setTab(0);
        this.props.videoStore.setActiveTag({ key: null, time: null });
        this.props.videoStore.setSpeed(1);
        this.props.videoStore.resetCurrentTime();
      }
    );
    self = this;
    //this.read();
  }
  componentWillUnmount() {
    // Orientation.unlockAllOrientations();
    // this.focusListener.remove();
    // this.willFocusListener.remove();
  }

  // read = () => {
  //   this.props.videoStore.setVideos([]);
  //   this.setState({ loading: true });
  //   // let { email } = this.props.profileStore.user;
  //   let { email } = 'tuladharprasan@gmail.com';
  //   RNFS.readDir(`${RNFS.DocumentDirectoryPath}/${email}`)
  //     .then(result => {
  //       let filteredFiles = result.filter(
  //         file =>
  //           file.path
  //             .split("/")
  //             .pop()
  //             .split(".")
  //             .pop() === "json"
  //       );
  //       let counter = 0;
  //       if (filteredFiles.length > 0) {
  //         let videosInfo = [];
  //         filteredFiles.map((item, fileIndex) => {
  //           if (
  //             item.path &&
  //             item.path
  //               .split("/")
  //               .pop()
  //               .split(".")
  //               .pop() === "json"
  //           ) {
  //             let path = item.path;
  //             RNFS.readFile(
  //               Platform.OS === "android" ? "file://" + path : path,
  //               "utf8"
  //             )
  //               .then(file => {
  //                 let fileReading = JSON.parse(file);
  //                 if (fileReading.fileName) {
  //                   VideoThumbnail.get(fileReading.fileName).then(metadata => {
  //                     if (metadata) {
  //                       fileReading["thumb"] = metadata.data;
  //                     }
  //                     videosInfo = [...videosInfo, fileReading];
  //                     counter++;
  //                     if (filteredFiles.length === counter) {
  //                       if (profileStore.getSortType() === "NAME") {
  //                         videosInfo.sort((a, b) =>
  //                           a.title > b.title ? 1 : -1
  //                         );
  //                       }
  //                       if (profileStore.getSortType() === "DATE") {
  //                         videosInfo.sort((a, b) =>
  //                           a.createTime > b.createTime ? -1 : 1
  //                         );
  //                       }
  //                       this.setState({
  //                         loading: false,
  //                         info: videosInfo
  //                       });
  //                       this.props.videoStore.setVideos(videosInfo);
  //                     }
  //                   });
  //                 } else {
  //                   this.setState({ loading: false });
  //                   this.props.videoStore.setVideos(this.state.info);
  //                 }
  //               })
  //               .catch(err => {
  //                 this.setState({ loading: false });
  //               });
  //           } else {
  //             this.setState({ loading: false });
  //           }
  //         });
  //       } else {
  //         this.setState({ loading: false });
  //       }

  //       if (result.length === 0) {
  //         this.setState({ loading: false });
  //         this.props.videoStore.setVideos(this.state.info);
  //       }
  //     })
  //     .catch(err => {
  //       this.setState({ loading: false });
  //     });
  // };

  handleShare = (video, index) => {
    let fileName = video.fileName;
    if (fileName) {
      showToast(
        "Video sharing started. This might take a while depending on the video length.",
        null,
        100
      );
      this.setState({ sharedLoading: [...this.state.sharedLoading, index] });
      Share.open({
        url: fileName.toString(),
        type: "video/mp4",
        title: "Check out my video"
      })
        .then(res => {
          showToast("Video forwarded to app.");
          this.setState({
            sharedLoading: this.state.sharedLoading.filter(i => i !== index)
          });
        })
        .catch(err => {
          console.log(err);
          this.setState({
            sharedLoading: this.state.sharedLoading.filter(i => i !== index)
          });

          err && showToast("Video share not successful.");
        });
    }
  };

  handleDelete = e => {
    return RNFS.unlink(e.path)
      .then(() => {
        RNFS.unlink(e.fileName)
          .then(console.log("VIDEO DELETED"))
          .catch(err => console.log(err.message));
        console.log("FILE DELETED");
        let s = this.state.info.filter(file => file.path !== e.path);
        this.setState({ info: s, isDialogVisible: false });
        this.props.videoStore.setVideos(s);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  openRenameDialog = item => {
    this.setState({ isEditDialogVisible: true, video: item });
  };

  handleRename = () => {
    const { video } = this.state;
    let { email } = this.props.profileStore.user;

    const destPath = `${
      RNFS.DocumentDirectoryPath
    }/${email}/videos/${sanitizeName(video.title)}_spoiq_${moment(
      video.createTime ? video.createTime : Date.now()
    ).format("HH-mm-ss_MM-DD-YY")}.${video.fileName.split(".").pop()}`;

    RNFS.moveFile(video.fileName, destPath).then(() => {
      let path = this.state.video.path;
      RNFS.unlink(path)
        .then(() => {
          const JSONdataSet = this.state.video;
          const path = `${RNFS.DocumentDirectoryPath}/${email}/${destPath
            .split("/")
            .pop()}.json`;
          JSONdataSet.fileName = "file://" + destPath;
          JSONdataSet.path = "file://" + path;
          RNFS.writeFile(
            Platform.OS === "android" ? "file://" + path : path,
            JSON.stringify(JSONdataSet),
            "utf8"
          )
            .then(success => {
              console.log("FILE WRITTEN!");
              this.setState({ isEditDialogVisible: false });
              // this.props.navigation.dispatch(resetAction);
            })
            .catch(err => {
              console.log(err.message);
            });
        })
        .catch(err => {
          console.log(err.message);
        });
    });
  };

  openExtractDialog = item => {
    this.setState({ isExtractDialogVisible: true, video: item });
  };

  // handleExtract = video => {
  //   showToast(
  //     "Tag extraction started. This might take a while depending on the video length.",
  //     null,
  //     100
  //   );
  //   this.setState({ isExtractDialogVisible: false });
  //   let totalTime = 0;
  //   let trimedTags = [];
  //   let promises = [];
  //   let updatedTags = [];
  //   const source =
  //     Platform.OS === "android"
  //       ? video.fileName
  //       : video.fileName.replace("file://", "");
  //   video.tags.forEach((item, i) => {
  //     totalTime =
  //       totalTime +
  //       // if backtrace is further in the past than 0 marker it's not exported
  //       (item.time - item.backtrace < 0 ? item.time : item.backtrace) +
  //       // if duration is further than final final time, it's not exported
  //       (item.time + item.duration > moment.duration(video.duration).asSeconds()
  //         ? moment.duration(video.duration).asSeconds() - item.time
  //         : item.duration);

  //     updatedTags = [
  //       ...updatedTags,
  //       {
  //         tagId: item.tagId,
  //         time:
  //           totalTime -
  //           (item.time + item.duration >
  //           moment.duration(video.duration).asSeconds()
  //             ? moment.duration(video.duration).asSeconds() - item.time
  //             : item.duration),
  //         label: item.label,
  //         uri: item.uri,
  //         duration: item.duration,
  //         backtrace: item.backtrace
  //       }
  //     ];
  //     const options = {
  //       startTime:
  //         // if backtrace is further in the past than 0 marker it's not exported
  //         item.time - item.backtrace < 0 ? 0 : item.time - item.backtrace,
  //       endTime:
  //         // if duration is further than final final time, it's not exported
  //         item.time + item.duration >
  //         moment.duration(video.duration).asSeconds()
  //           ? moment.duration(video.duration).asSeconds()
  //           : item.time + item.duration
  //     };

  //     promises.push(
  //       ProcessingManager.trim(source, options)
  //         .then(data => {
  //           trimedTags = [
  //             ...trimedTags,
  //             Platform.OS === "android" ? data : data.replace("file://", "")
  //           ];
  //         })
  //         .catch(e => console.log(e))
  //     );
  //   });
  //   Promise.all(promises)
  //     .then(() => {
  //       RNVideoEditor.merge(
  //         trimedTags,
  //         results => {
  //           showToast("Tag extraction failed.", null, 100);
  //           console.log(results);
  //         },
  //         (results, file) => {
  //           let { email } = this.props.profileStore.user;
  //           RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${email}/videos`).then(
  //             folder => {
  //               let destPath = `${
  //                 RNFS.DocumentDirectoryPath
  //               }/${email}/videos/${sanitizeName(
  //                 this.state.videoTitle
  //               )}_spoiq_${moment().format("HH-mm-ss_MM-DD-YY")}.${file
  //                 .split(".")
  //                 .pop()}`;
  //               RNFS.moveFile(file, destPath)
  //                 .then(moved => {
  //                   // if recording was not cancelled, save the reference information to the local JSON file
  //                   const path = `${
  //                     RNFS.DocumentDirectoryPath
  //                   }/${email}/${destPath.split("/").pop()}.json`;
  //                   let formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
  //                   this.setState({
  //                     JSONdata: {
  //                       path: path,
  //                       title: "test1",
  //                       fileName: "file://" + destPath,
  //                       duration: moment
  //                         .utc(totalTime * 1000)
  //                         .format("HH:mm:ss"),
  //                       createTime: formattedDate,
  //                       tags: updatedTags,
  //                       audio: ""
  //                     }
  //                   });
  //                 })
  //                 .then(() => {
  //                   let JSONdataSet = this.state.JSONdata;
  //                   JSONdataSet.title = this.state.videoTitle;
  //                   RNFS.writeFile(
  //                     JSONdataSet.path,
  //                     JSON.stringify(JSONdataSet),
  //                     "utf8"
  //                   )
  //                     .then(success => {
  //                       console.log("FILE WRITTEN!");
  //                     })
  //                     .catch(err => {
  //                       console.log(err.message);
  //                       showToast("Tag extraction failed.", null, 100);
  //                     });
  //                   this.props.navigation.dispatch(resetAction);
  //                 })
  //                 .catch(err => {
  //                   console.log(err);
  //                   showToast("Tag extraction failed.", null, 100);
  //                 });
  //             }
  //           );
  //         }
  //       );
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       showToast("Tag extraction failed.", null, 100);
  //     });
  // };

  handleClose = () => {
    this.setState({ isDialogVisible: false });
  };

  handleExtractClose = () => {
    this.setState({ isExtractDialogVisible: false });
  };

  openDeleteDialog = item => {
    this.setState({
      isDialogVisible: true,
      itemToDelete: item
    });
  };
  handlePreview = item => {
    this.props.navigation.navigate(isPortrait() ? "Preview" : "Fullscreen", {
      video: item,
      gallery: this.props.info
    });
  };

  handleEditClose = () => {
    this.setState({ isEditDialogVisible: false });
  };

  render() {
    let video = this.state.info[0] ? this.state.info[0].fileName : "";

    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator
            style={styles.activityLoader}
            size="large"
            color="#434343"
          />
        ) : (
          <ScrollView style={styles.scrollContainer}>
           
            {this.state.info.map((item, i) => (
              <GalleryItem
                item={item}
                index={i}
                key={item.createTime}
                // share={video => this.handleShare(video, i)}
                info={this.state.info}
                rename={this.openRenameDialog}
                delete={this.openDeleteDialog}
                preview={this.handlePreview}
                extract={this.openExtractDialog}
                shareLoading={this.state.sharedLoading.includes(i)}
              />
            ))}
          </ScrollView>
        )}
        {/* <Footer /> */}
        <DialogBox
          isDialogVisible={this.state.isDialogVisible}
          title={"Are you sure you want to delete this video?"}
          twoButtonsModal={true}
          cancelText={"CANCEL"}
          submitText={"OK"}
          confirm={() => this.handleDelete(this.state.itemToDelete)}
          closeDialog={() => this.handleClose()}
        />
        <DialogBox
          twoButtonsModal={true}
          isDialogVisible={this.state.isEditDialogVisible}
          title={"Are you sure you want to rename this video?"}
          cancelText={"OK"}
          submitText={"CANCEL"}
          defaultValue={
            this.state.video && this.state.video.title
              ? this.state.video.title
              : undefined
          }
          // closeDialog={() => this.handleRename()}
          confirm={() => this.handleEditClose()}
          input
          onChange={value =>
            this.setState({ video: { ...this.state.video, title: value } })
          }
        />
        <DialogBox
          twoButtonsModal={true}
          isDialogVisible={this.state.isExtractDialogVisible}
          title={"Enter a name for the extracted highlights"}
          cancelText={"OK"}
          submitText={"CANCEL"}
          // closeDialog={() => this.handleExtract(this.state.video)}
          confirm={() => this.handleExtractClose()}
          input
          onChange={value => this.setState({ videoTitle: value })}
        />
        {/* <ModalFromTop navigation={this.props.navigation} /> */}
      </View>
    );
  }
}

export default Gallery;

// export default inject(
//   "videoStore",
//   "profileStore",
//   "footerStore"
// )(observer(Gallery));
