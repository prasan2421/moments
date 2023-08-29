import React, { Component } from "react";
import moment from "moment/moment";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { inject, observer } from "mobx-react";

class TimelineTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  convertTimeString = time => {
    return moment()
      .startOf("day")
      .seconds(time)
      .format("H:mm:ss");
  };

  triggerTag = (e, tag) => {
    this.componentRef &&
      this.componentRef.measure((x, y, width, height, pageX, pageY) => {
        let location = { xPosition: pageX, yPosition: pageY };
        this.props.triggerTagActions(tag, location, this.props.count);
      });
  };

  skipToTag = tag => {
    if (
      this.props.active &&
      this.props.active.key === this.props.count &&
      this.props.active.time === tag.time
    ) {
      this.props.reset();
      this.props.setActive(this.props.count, tag.time);
    } else {
      let tagTime = tag.time - tag.backtrace;
      let duration = tag.backtrace + tag.duration;
      if (tagTime < 0 || tagTime === 0) {
        tagTime = 0.1;
      }
      this.props.setActive(this.props.count, tag.time);
      this.props.skipToTime(tagTime, duration);
    }
  };

  render() {
    const videoLength = moment.duration(this.props.end).asSeconds();
    const start =
      this.props.time - this.props.backtrace < 0.1
        ? 0.1
        : this.props.time - this.props.backtrace;
    const duration =
      start + (this.props.duration + this.props.backtrace) > videoLength
        ? videoLength - start
        : start + (this.props.duration + this.props.backtrace) + 0.1;

    const { count, tag, preview, previewLocation } = this.props;
    let previewPosition = {};
    if (preview && previewLocation) {
      previewPosition = {
        position: "absolute",
        top: previewLocation.yPosition,
        left: previewLocation.xPosition
      };
    }

    return (
      <View style={previewPosition}>
        <View
          style={{
            width: 100,
            borderWidth: 1,
            height: 60,
            borderRadius: 10,
            backgroundColor: "transparent",
            borderColor:
              (this.props.fill > 0.5 &&
                this.props.fill >= start &&
                this.props.fill <= duration &&
                this.props.count === this.props.currentTag) ||
              (this.props.active &&
                this.props.count === this.props.active.key &&
                this.props.tag.time === this.props.active.time)
                ? "red"
                : "white"
            // marginLeft: count % 2 == 0 ? 10 : 0,
            // marginRight: count % 2 == 0 ? 0 : 10
          }}
          ref={component => {
            this.componentRef = component;
          }}
        >
          <TouchableOpacity
            onLongPress={e => !preview && this.triggerTag(e, tag)}
            onPress={() => {
              !preview && this.skipToTag(tag);
            }}
          >
            <Image
              source={tag.uri ? { uri: tag.uri } : null}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
                opacity:
                  this.props.active &&
                  this.props.count === this.props.active.key &&
                  this.props.tag.time === this.props.active.time
                    ? 0.7
                    : 1
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 12,
            marginTop: 8,
            fontFamily: preview ? "Metropolis-Bold" : "Metropolis-Medium",
            color: "#262628"
          }}
        >
          {tag.label}
        </Text>
        <Text
          style={{
            marginBottom: 40,
            fontSize: 12,
            lineHeight: 12,
            marginTop: 2,
            fontFamily: preview ? "Metropolis-Bold" : "Metropolis-Medium",
            color: "#262628"
          }}
        >
          {this.convertTimeString(tag.time)}
        </Text>
      </View>
    );
  }
}

export default inject(
  "videoStore",
  "tagStore",
  "profileStore"
)(observer(TimelineTag));
