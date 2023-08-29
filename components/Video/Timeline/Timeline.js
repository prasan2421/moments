import React, { Component } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { inject, observer } from "mobx-react";
import TimelineAnimation from "./TimelineAnimation";
import TimelineTag from "./TimelineTag";
import TimelineModal from "./TimelineModal";

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTagModalOpened: false,
      selectedTag: null,
      active: { key: null, time: null },
      currentTag: 0,
      modalLocation: {
        xPosition: null,
        yPosition: null
      },
      tagCount: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentTag !== this.state.currentTag) {
      this.refs._scrollView.scrollTo({ y: this.state.currentTag * 70 });
    }
  }

  toggleSelectTagModal = () => {
    this.setState({
      isTagModalOpened: !this.state.isTagModalOpened
    });
  };

  triggerTagActions = (tag, location, count) => {
    this.setState({
      isTagModalOpened: !this.state.isTagModalOpened,
      selectedTag: tag,
      modalLocation: location,
      tagCount: count
    });
  };

  setActive = (key, time) => {
    if (
      this.props.videoStore.activeTag.key !== key &&
      this.props.videoStore.activeTag.time !== time
    ) {
      this.props.videoStore.setActiveTag({ key: key, time: time });
    } else {
      this.props.videoStore.setActiveTag({ key: null, time: null });
    }
  };

  scrollToTag = tagIndex => {
    this.setState({ currentTag: tagIndex });
  };

  render() {
    const { width } = Dimensions.get("window");
    const tags = this.props.tags;
    const left = [];
    const right = [];
    const active = [];
    let count = 0;
    tags.forEach((tag, index) => {
      const el = (
        <TimelineTag
          count={count}
          tag={tag}
          key={index}
          active={this.props.videoStore.activeTag}
          setActive={this.setActive}
          skipToTime={this.props.skipToTime}
          triggerTagActions={this.triggerTagActions}
          reset={this.props.resetSkipTime}
          currentTag={this.state.currentTag}
          end={this.props.video.duration}
          backtrace={tag.backtrace}
          time={tag.time}
          fill={this.props.videoStore.currentTime}
          duration={tag.duration}
        />
      );

      const isActive = count === this.state.active.key;

      let activeTag = (
        <TimelineAnimation
          end={this.props.video.duration}
          backtrace={tag.backtrace}
          time={tag.time}
          duration={tag.duration}
          scrollToTag={this.scrollToTag}
          fill={this.props.videoStore.currentTime}
          i={index}
          key={index}
          isActive={isActive && tag.time === this.state.active.time}
        />
      );
      active.push(activeTag);

      if (count++ % 2 === 0) {
        left.push(el);
      } else {
        right.push(el);
      }
    });

    return (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          backgroundColor: "#E5E5E5"
        }}
      >
        <ScrollView
          ref="_scrollView"
          style={{ width: count - 1 === 0 ? width - 100 : width }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingLeft: 15
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
                width: 2,
                height: "100%",
                backgroundColor: "#727272",
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
        <TimelineModal
          onRequestClose={this.toggleSelectTagModal}
          visible={this.state.isTagModalOpened}
          selectedTag={this.state.selectedTag}
          previewLocation={this.state.modalLocation}
          tagCount={this.state.tagCount}
          video={this.props.video}
        />
      </View>
    );
  }
}

export default inject("videoStore")(observer(Timeline));
