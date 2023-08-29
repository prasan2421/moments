import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import styles from "./GalleryStyles";
import StraightLine from "../../assets/Svg/StraightLine";
import ShareIcon from "../../assets/Svg/Share";
import Delete from "../../assets/Svg/Delete";
import Dots from "../../assets/Svg/Dots";
import Calendar from "../../assets/Svg/Calendar";
import Clock from "../../assets/Svg/Clock";
import moment from "moment";
import { inject, observer } from "mobx-react";
import Edit from "../../assets/Svg/Edit";

const isPortrait = () => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};

class GalleryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: false,
      orientation: isPortrait() ? "portrait" : "landscape"
    };
  }

  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      this.setState({
        orientation: isPortrait() ? "portrait" : "landscape"
      });
    });
  }

  toggleOptions = () => {
    this.setState({ options: !this.state.options });
  };

  formatDate = (formatType, item) => {
    switch (formatType) {
      case "mdy":
        return moment(item).format("MM-DD-YYYY");
      case "dmy":
        return moment(item).format("DD-MM-YYYY");
      case "ymd":
        return moment(item).format("YYYY-MM-DD");
      case "ydm":
        return moment(item).format("YYYY-DD-MM");
      case "dmya":
        return moment(item).format("DD-MMM-YYYY");
      case "mdya":
        return moment(item).format("MMM-DD-YYYY");
      case "ymda":
        return moment(item).format("YYYY-MMM-DD");
      case "ydma":
        return moment(item).format("YYYY-DD-MMM");
    }
  };

  componentWillUnmount() {
    Dimensions.removeEventListener("change", () => {});
  }

  render() {
    const { item, index } = this.props;
    return (
      <View style={styles.itemContainer}>
        <ImageBackground
          style={styles.imageContainer}
          source={item.thumb ? { uri: item.thumb } : null}
        >
          <TouchableOpacity
            onPress={() => this.props.preview(item)}
            style={{ flex: 1 }}
          >
            {this.state.options && (
              <View style={styles.buttonContainer}>
                {item.tags && !!item.tags.length && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.extract(item)}
                  >
                    <StraightLine width={20} height={20} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.share(item)}
                >
                  {!this.props.shareLoading ? (
                    <ShareIcon width={20} height={20} />
                  ) : (
                    <ActivityIndicator />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.rename(item)}
                  style={styles.button}
                >
                  <Edit fill={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.delete(item)}
                  style={styles.button}
                >
                  <Delete fill={"#fff"} width={20} height={20} />
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.nameContainer}>
            <Text style={styles.descriptionText}>
              {item.title ? item.title : `Video ${index}`}
            </Text>
            <TouchableOpacity
              style={styles.optionsButton}
              onPress={() => this.toggleOptions()}
            >
              <Dots fill={"#FFFFFF"} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.descriptionContainer}>
          <View style={styles.description}>
            <View style={styles.descriptionItem}>
              {this.props.item.tags.length > 0 && (
                <Image
                  source={
                    item.tags.length > 0 ? { uri: item.tags[0].uri } : null
                  }
                  style={{
                    ...styles.tagIcon,
                    ...(this.state.orientation === "landscape" &&
                      styles.tagLandscape)
                  }}
                />
              )}
              {this.props.item.tags.length > 0 && (
                <Text style={styles.descriptionItemText}>
                  {item.tags.length}
                </Text>
              )}
            </View>
            <View style={styles.descriptionItem}>
              <Calendar />
              <Text style={styles.descriptionItemText}>
                {item.createTime &&
                  this.formatDate(
                    this.props.profileStore.getDateFormat(),
                    item.createTime
                  )}
              </Text>
            </View>
            <View style={styles.descriptionItem}>
              <Clock />
              <Text style={styles.descriptionItemText}>
                {item.createTime &&
                  (this.props.profileStore.getDateType() == "24h"
                    ? moment(item.createTime).format("HH:mm")
                    : moment(item.createTime).format("h:mm A"))}
              </Text>
            </View>
          </View>
        </View>
        <View />
      </View>
    );
  }
}

export default inject("profileStore")(observer(GalleryItem));
