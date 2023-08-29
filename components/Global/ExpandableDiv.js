import React, { Component } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Edit from "../../assets/Svg/Edit";
import Delete from "../../assets/Svg/Delete";
import styles from "./ExpandableDivStyles";
import DialogBox from "./DialogBox";

class ExpandableDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleButtons: false,
      isDialogVisible: false
    };
  }

  animVal = new Animated.Value(0);
  interpolateBar = this.animVal.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "-50%"]
  });
  animatedReduce = Animated.spring(this.animVal, { toValue: 1 });
  animatedExpand = Animated.spring(this.animVal, { toValue: 0, friction: 10 });

  toggleButton = () => {
    this.setState(
      {
        toggleButtons: !this.state.toggleButtons
      },
      () => {
        if (this.state.toggleButtons) {
          this.animatedReduce.start();
        } else {
          this.animatedExpand.start();
        }
      }
    );
  };

  onEdit = () => {
    this.toggleButton();
    this.props.navigation.navigate("SingleValueSettingsInput", {
      screenTitle: this.props.tag ? "EDIT HIGHLIGHT" : "EDIT GROUP",
      title: this.props.tag ? "Edit highlight name" : "Edit sharing group name",
      type: "default",
      saveButton: true,
      button: !this.props.tag,
      onSubmit: this.props.onSubmit,
      value: this.props.group || this.props.tag,
      tagID: this.props.tag ? this.props.tag.id : "",
      editGroup: this.props.group,
      index: this.props.count
    });
  };

  handleClose = () => {
    this.setState({ isDialogVisible: false });
    this.animatedExpand.start();
  };

  render() {
    return (
      <TouchableOpacity style={styles.tagContainer} onPress={this.toggleButton}>
        <Animated.View
          style={{
            backgroundColor: this.props.tag ? "#d54849" : "#eaeaea",
            marginLeft: this.interpolateBar,
            ...styles.animatedView
          }}
        >
          <View style={styles.innerTagContainer}>
            <Text
              style={{
                ...styles.name,
                color: this.props.tag ? "#FFFFFF" : "#000000"
              }}
            >
              {this.props.name}
            </Text>
            {!this.props.tag && (
              <Text style={{ fontSize: 14 }}>
                {this.props.count}
                {this.props.count > 1 ? "members" : "member"}
              </Text>
            )}
            {this.props.tag && (
              <>
                <Text style={styles.textContainer}>
                  <Text style={styles.detail}>{this.props.tag.backtrace}s</Text>
                  <Text style={styles.detailName}> backtrace</Text>
                </Text>
                <Text style={styles.textContainer}>
                  <Text style={styles.detail}>{this.props.tag.duration}s</Text>
                  <Text style={styles.detailName}> duration</Text>
                </Text>
                <Text style={{ fontSize: 14 }}>
                  <Text style={styles.detail}>
                    {this.props.tag.duration + this.props.tag.backtrace}s
                  </Text>
                  <Text style={styles.detailName}> total length</Text>
                </Text>
              </>
            )}
          </View>
        </Animated.View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.editButton }}
            onPress={this.onEdit}
          >
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, ...styles.deleteButton }}
            onPress={() => this.setState({ isDialogVisible: true })}
          >
            <Delete fill={"#FFFFFF"} />
          </TouchableOpacity>
        </View>
        <DialogBox
          isDialogVisible={this.state.isDialogVisible}
          title={"Are you sure you want to delete this highlight?"}
          twoButtonsModal={true}
          cancelText={"CANCEL"}
          submitText={"OK"}
          confirm={() => {
            this.props.delete(this.props.tag);
            this.handleClose();
          }}
          closeDialog={() => this.handleClose()}
        />
      </TouchableOpacity>
    );
  }
}

export default ExpandableDiv;
