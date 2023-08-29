import React, { Component } from "react";
import { View, Text } from "react-native";
import { inject, observer } from "mobx-react";
import moment from "moment";

import { AnimatedCircularProgress } from "react-native-circular-progress";

class TimelineAnimation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.isActive !== this.props.isActive) {
      setTimeout(() => {
        this.setState({ isActive: this.props.isActive });
      }, 200);
    }
  }

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
    const multiply = 100 / (duration - start);
    const progress = (this.props.fill - start) * multiply;

    if (Math.round(this.props.fill) === this.props.time) {
      this.props.scrollToTag(this.props.i);
    }

    return (this.props.fill < start || this.props.fill > duration) &&
      !this.state.isActive ? (
      <View
        style={{
          zIndex: 5,
          width: 40,
          height: 40,
          borderRadius: 50,
          marginLeft: -20,
          backgroundColor: "#E5E5E5",
          marginTop: this.props.i === 0 ? 0 : 25,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            zIndex: 5,
            width: 30,
            height: 30,
            borderRadius: 50,
            // marginLeft: -15,
            backgroundColor: "#404040",
            // marginTop: this.props.i === 0 ? 0 : 32,
            margin: 5,
            flexDirection: "column"
          }}
        />
      </View>
    ) : (
      <AnimatedCircularProgress
        style={{
          marginLeft: -20,
          marginTop: this.props.i === 0 ? 0 : 32
          //TODO: fix to display padding
          // backgroundColor: "#E5E5E5",
          // borderRadius: 50,
          // paddingVertical: 5
        }}
        size={40}
        fill={progress > 0 ? progress : 1}
        width={20}
        prefill={0}
        tintColor="#FF0000"
        backgroundColor="#DEDDDD"
      />
    );
  }
}

export default inject("videoStore")(observer(TimelineAnimation));
