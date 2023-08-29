import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { inject, observer } from "mobx-react";
import moment from "moment";
import TimelineAnimation from "./TimelineAnimation";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  convertTimeString = time => {
    return moment()
      .startOf("day")
      .seconds(time)
      .format("H:mm:ss");
  };

  render() {
    const { width } = Dimensions.get("window");
    const tags = this.props.tags;
    const left = [];
    const right = [];
    const active = [];
    let count = 0;
    let i = 0;
    for (let x of tags) {
      const el = (
        <View>
          <View
            key={count}
            style={{
              width: 100,
              borderWidth: 1,
              height: 70,
              borderRadius: 10,
              marginLeft: count % 2 == 0 ? 10 : 0,
              marginRight: count % 2 == 0 ? 0 : 10
            }}
          >
            <TouchableOpacity onPress={() => console.log("press")}>
              <Image
                source={x.uri ? { uri: x.uri } : null}
                style={{ height: "100%", width: "100%", borderRadius: 10 }}
              ></Image>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 12,
              lineHeight: 12,
              fontFamily: "Metropolis-Medium",
              color: "#262628"
            }}
          >
            {x.label}
          </Text>
          <Text
            style={{
              marginBottom: 50,
              fontSize: 12,
              lineHeight: 12,
              fontFamily: "Metropolis-Medium",
              color: "#262628"
            }}
          >
            {this.convertTimeString(x.time)}
          </Text>
        </View>
      );

      if (count++ % 2 == 0) {
        left.push(el);
        continue;
      }

      right.push(el);
    }
    for (let x of tags) {
      let activeTag = (
        <TimelineAnimation
          time={x.time}
          duration={x.duration}
          fill={this.props.videoStore.currentTime}
          i={i}
        />
      );
      i++;
      active.push(activeTag);
    }
    return (
      <View
        style={{
          flex: 1,
          marginTop: 30
        }}
      >
        <ScrollView
          style={{ width: count - 1 === 0 ? width - 110 : width }}
          contentContainerStyle={{
            flexGrow: 1
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <View
              style={{
                flexGrow: 1,
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {left}
            </View>
            <View
              style={{
                width: 1,
                height: "100%",
                backgroundColor: "black",
                marginTop: 40
              }}
            />
            <View style={{ flexDirection: "column", marginTop: 20 }}>
              {active}
            </View>
            <View
              style={{
                marginTop: 70,
                flexGrow: 1,
                flexDirection: "column",
                alignItems: "center"
              }}
            >
              {right}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default inject("videoStore")(observer(Timeline));
