import React, { Component } from "react";
import styles from "./TimelineStyles";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator
} from "react-native";
import TimelineTag from "./TimelineTag";
import Delete from "../../../assets/Svg/Delete";
import ShareIcon from "../../../assets/Svg/Share";
import * as RNFS from "react-native-fs";
import { inject, observer } from "mobx-react";
import { ProcessingManager } from "react-native-video-processing";
import Share from "react-native-share";
import showToast from "../../Toast/Toast";
import DialogBox from "../../Global/DialogBox";
// import { RNFFmpeg } from "react-native-ffmpeg";
import moment from "moment";
import Extract from "../../../assets/Svg/Extract";
import sanitizeName from "../../Utils/sanitizeName";

class TimelineModal extends Component {
  state = {
    isDialogVisible: false,
    isExtractDialogVisible: false,
    isSharingProcessing: false
  };

  convertTimeString = time => {
    return moment()
      .startOf("day")
      .seconds(time)
      .format("H:mm:ss");
  };

  deleteTag = item => {
    const { onRequestClose } = this.props;

    let path = this.props.video.path;
    let updatedVideo = this.props.video;
    updatedVideo.tags = this.props.video.tags.filter(e => e.uri !== item.uri);
    return RNFS.unlink(item.uri)
      .then(() => {
        RNFS.unlink(path)
          .then(() => {
            RNFS.writeFile(
              Platform.OS === "android" ? "file://" + path : path,
              JSON.stringify(updatedVideo),
              "utf8"
            )
              .then(success => {
                console.log("FILE WRITTEN!");
                console.log(success);

                this.props.videoStore.setVideo(updatedVideo);
                this.props.videoStore.setFilteredTag(updatedVideo.tags);
                this.handleClose();
                window.setImmediate(() => {
                  onRequestClose();
                });
              })
              .catch(err => {
                console.log(err.message);
              });
          })
          .catch(err => {
            console.log(err.message);
          });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  // trimVideo = () => {
  //   this.setState({ isSharingProcessing: true });
  //   const { selectedTag } = this.props;
  //   const source =
  //     Platform.OS === "android"
  //       ? this.props.video.fileName
  //       : this.props.video.fileName;
  //   const options = {
  //     startTime:
  //       selectedTag.time - selectedTag.backtrace < 0
  //         ? 0
  //         : selectedTag.time - selectedTag.backtrace,
  //     endTime: selectedTag.time + selectedTag.duration
  //   };
  //   const cachePath = RNFS.CachesDirectoryPath;
  //   let fileName = `${sanitizeName(selectedTag.label)}(${sanitizeName(
  //     this.props.video.title
  //   )})_spoiq_${moment().format("HH-mm-ss_MM-DD-YY")}`;

  //   ProcessingManager.trim(source, options).then(data => {
  //     showToast("Processing...");
  //     RNFFmpeg.execute(
  //       `-y -i ${data} -vf drawtext="fontfile=/${
  //         Platform.OS === "android"
  //           ? "system/fonts/Roboto-Black.ttf"
  //           : RNFS.MainBundlePath + "/CircularStd-Medium.otf"
  //       }:
  //             text='SpoIQ™': fontcolor=white: fontsize=24: box=1: boxcolor=black@0.5:
  //             boxborderw=5: x=w-tw-10:y=h-th-10" -vcodec libx264 -crf 6  -acodec copy ${cachePath}/${fileName}.mp4`
  //     )
  //       .then(result =>
  //         console.log("FFprobe process exited with rc " + result.rc)
  //       )
  //       .then(() =>
  //         Share.open({
  //           url:
  //             Platform.OS === "android"
  //               ? `file://${cachePath}/${fileName}.mp4`
  //               : `${cachePath}/${fileName}.mp4`,
  //           type: "video/mp4"
  //         })
  //       )
  //       .then(res => {
  //         this.setState({ isSharingProcessing: false });
  //         this.props.onRequestClose();
  //         showToast("Video forwarded to app.");
  //       })
  //       .catch(err => {
  //         this.setState({ isSharingProcessing: false });
  //         err && showToast("Video share not successful.");
  //       });
  //   });
  // };

  extract = () => {
    const { selectedTag } = this.props;
    const source =
      Platform.OS === "android"
        ? this.props.video.fileName
        : this.props.video.fileName;
    const options = {
      startTime:
        selectedTag.time - selectedTag.backtrace < 0
          ? 0
          : selectedTag.time - selectedTag.backtrace,
      endTime: selectedTag.time + selectedTag.duration
    };
    showToast("Processing...");
    ProcessingManager.trim(source, options).then(data => {
      let { email } = this.props.profileStore.user;
      RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/${email}/videos`).then(
        folder => {
          let destPath = `${
            RNFS.DocumentDirectoryPath
          }/${email}/videos/${sanitizeName(
            this.state.videoTitle
          )}_spoiq_${moment().format("HH-mm-ss_MM-DD-YY")}.${data
            .split(".")
            .pop()}`;
          RNFS.moveFile(data, destPath)
            .then(moved => {
              // if recording was not cancelled, save the reference information to the local JSON file
              if (!this.state.recordingCanceled) {
                const path = `${
                  RNFS.DocumentDirectoryPath
                }/${email}/${destPath.split("/").pop()}.json`;
                let formattedDate = moment().format("YYYY-MM-DD HH:mm:ss");
                this.setState({
                  JSONdata: {
                    path: path,
                    title: this.state.title || "",
                    fileName: "file://" + destPath,
                    duration: this.convertTimeString(
                      selectedTag.backtrace + selectedTag.duration
                    ),
                    createTime: formattedDate,
                    tags: [],
                    audio: "",
                    captionDuration: "3"
                  }
                });
              } else {
                RNFS.unlink(`file://${destPath}`)
                  .then(() => {
                    // delete recording when recording was cancelled
                    this.setState({ recordingCanceled: false });
                  })
                  .catch(err => console.log(err.message));
              }
            })
            .then(() => {
              let JSONdataSet = this.state.JSONdata;
              JSONdataSet.title = this.state.videoTitle;
              RNFS.writeFile(
                JSONdataSet.path,
                JSON.stringify(JSONdataSet),
                "utf8"
              )
                .then(success => {
                  this.props.onRequestClose();
                  showToast("Video extracted.");
                  console.log("FILE WRITTEN!");
                })
                .catch(err => {
                  console.log(err.message);
                });
              this.setState({ isExtractDialogVisible: false });
            })
            .catch(err => console.log(err));
        }
      );
    });
  };

  handleClose = () => {
    this.setState({ isDialogVisible: false });
  };

  handleExtractClose = () => {
    this.setState({ isExtractDialogVisible: false });
  };

  render() {
    const {
      onRequestClose,
      visible,
      selectedTag,
      previewLocation
    } = this.props;

    let { tagCount } = this.props;

    let tagsPosition;

    if (tagCount++ % 2 !== 0) {
      tagsPosition = {
        removePosition: {
          top: previewLocation.yPosition + 4,
          left: previewLocation.xPosition - 165,
          flexDirection: "row-reverse"
        },
        extractPosition: {
          top: previewLocation.yPosition - 80,
          left: previewLocation.xPosition - 120,
          flexDirection: "row-reverse"
        },
        sharePosition: {
          top: previewLocation.yPosition - 125,
          left: previewLocation.xPosition - 15,
          flexDirection: "row-reverse"
        }
      };
    } else {
      tagsPosition = {
        removePosition: {
          top: previewLocation.yPosition + 4,
          left: previewLocation.xPosition + 130
        },
        extractPosition: {
          top: previewLocation.yPosition - 80,
          left: previewLocation.xPosition + 80
        },
        sharePosition: {
          top: previewLocation.yPosition - 125,
          left: previewLocation.xPosition - 20
        }
      };
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          !this.state.isSharingProcessing && onRequestClose();
        }}
        visible={visible}
      >
        <DialogBox
          isDialogVisible={this.state.isDialogVisible}
          title={"Are you sure you want to delete this highlight?"}
          twoButtonsModal={true}
          cancelText={"CANCEL"}
          submitText={"OK"}
          confirm={() => this.deleteTag(selectedTag)}
          closeDialog={() => this.handleClose()}
        />
        <DialogBox
          twoButtonsModal={true}
          isDialogVisible={this.state.isExtractDialogVisible}
          title={"Enter a name for the extracted highlight"}
          cancelText={"OK"}
          submitText={"CANCEL"}
          closeDialog={() => this.extract()}
          confirm={() => this.handleExtractClose()}
          input
          onChange={value => this.setState({ videoTitle: value })}
        />
        <View
          style={styles.tagModal}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => {
            !this.state.isSharingProcessing && onRequestClose();
          }}
        >
          <TimelineTag
            tag={selectedTag}
            preview
            previewLocation={previewLocation}
          />
          <View
            style={{
              ...styles.actionContainer,
              ...tagsPosition.extractPosition
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.isSharingProcessing}
              onPress={() => this.setState({ isExtractDialogVisible: true })}
            >
              <Extract style={styles.icon} />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Extract</Text>
          </View>
          <View
            style={{
              ...styles.actionContainer,
              ...tagsPosition.removePosition
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.isSharingProcessing}
              onPress={() => this.setState({ isDialogVisible: true })}
            >
              <Delete
                fill={"#fff"}
                style={styles.icon}
                width={29}
                height={32}
              />
            </TouchableOpacity>
            <Text style={styles.buttonText}>Delete</Text>
          </View>
          <View
            style={{
              ...styles.actionContainer,
              ...tagsPosition.sharePosition
            }}
          >
            <TouchableOpacity
              style={styles.button}
              disabled={this.state.isSharingProcessing}
              // onPress={() => this.trimVideo()}
            >
              {!this.state.isSharingProcessing ? (
                <ShareIcon fill={"#fff"} style={styles.icon} />
              ) : (
                <ActivityIndicator color="#ffffff" />
              )}
            </TouchableOpacity>
            <Text style={styles.buttonText}>Share</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

export default inject("videoStore", "profileStore")(observer(TimelineModal));
