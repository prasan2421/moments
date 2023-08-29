import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  TextInput
} from "react-native";

class DialogBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputModal: "", openning: true, inputValue: "" };
  }

  render() {
    let title = this.props.title || "";
    let value = "";
    if (!this.state.openning) {
      value = this.state.inputModal;
    } else {
      value = this.props.initValueTextInput
        ? this.props.initValueTextInput
        : "";
    }

    let twoButtonsModal = this.props.twoButtonsModal;
    let modalStyleProps = this.props.modalStyle || {};
    let dialogStyleProps = this.props.dialogStyle || {};
    let cancelText = this.props.cancelText || "CANCEL";
    let submitText = this.props.submitText || "YES";

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isDialogVisible}
        onRequestClose={() => {
          this.props.closeDialog();
          this.setState({ inputModal: "" });
        }}
      >
        <View style={[styles.container, { ...modalStyleProps }]}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPress={() => {
              this.setState({ inputModal: "", openning: true });
            }}
          >
            <View style={[styles.modal_container, { ...dialogStyleProps }]}>
              <View style={styles.modal_body}>
                <Text style={styles.title_modal}>{title}</Text>
              </View>
              {this.props.input && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    onChangeText={value => {
                      this.setState({ inputValue: value });
                      this.props.onChange(value);
                    }}
                    defaultValue={this.props.defaultValue}
                    autoFocus={true}
                    maxLength={20}
                  />
                  <Text style={styles.inputText}>Name</Text>
                </View>
              )}
              {!this.props.input && (
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: 1
                  }}
                />
              )}
              <View style={styles.btn_container}>
                <TouchableOpacity
                  style={{ flex: 1 }}
                  disabled={
                    this.props.input && this.state.inputValue.length < 1
                  }
                  onPress={() => {
                    this.props.closeDialog();
                    this.setState({ inputModal: "", openning: false });
                  }}
                >
                  <Text
                    style={{
                      ...styles.btn_modal_cofirm,
                      opacity:
                        this.props.input && this.state.inputValue.length < 1
                          ? 0.6
                          : 1
                    }}
                  >
                    {cancelText}
                  </Text>
                </TouchableOpacity>
                {twoButtonsModal ? (
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      this.props.confirm();
                      this.setState({ inputModal: "", openning: true });
                    }}
                  >
                    <Text style={styles.btn_modal_cancel}>{submitText}</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      android: {
        backgroundColor: "rgba(0,0,0,0.62)"
      }
    })
  },
  modal_container: {
    marginHorizontal: 40,
    textAlign: "center",
    ...Platform.select({
      ios: {
        backgroundColor: "#E3E6E7",
        minWidth: 300,
        maxWidth: 300
      },
      android: {
        backgroundColor: "#fff",
        elevation: 24,
        minWidth: 280,
        maxWidth: 280
      }
    }),
    borderRadius: 10
  },
  modal_body: {
    textAlign: "center",
    padding: 24
  },
  title_modal: {
    fontSize: 17,
    color: "#000000",
    ...Platform.select({
      ios: {
        fontFamily: "Metropolis-Medium",
        marginTop: 10,
        textAlign: "center",
        marginBottom: 5
      },
      android: {
        textAlign: "center"
      }
    })
  },
  btn_container: {
    display: "flex",
    marginTop: 12,
    marginBottom: 8,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        maxHeight: 48
      },
      android: {
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8
      }
    })
  },
  btn_modal_cofirm: {
    ...Platform.select({
      // fontWeight: "bold",
      fontFamily: "Metropolis-Medium",
      ios: {
        fontSize: 12,
        color: "#007AFF",
        textAlign: "center",
        borderColor: "#757577",
        padding: 10
      },
      android: {
        textAlign: "center",
        color: "#000000",
        padding: 8,
        marginBottom: 20
      }
    })
  },
  btn_modal_cancel: {
    ...Platform.select({
      // fontWeight: "bold",
      fontFamily: "Metropolis-Medium",
      ios: {
        fontSize: 12,
        color: "#FF0000",
        textAlign: "center",
        borderColor: "#757577",
        padding: 10
      },
      android: {
        textAlign: "center",
        color: "#000000",
        padding: 8,
        marginBottom: 20
      }
    })
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    marginHorizontal: 28,
    marginTop: 20,
    borderBottomColor: "#A8A8C6",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  input: {
    flex: 4,
    paddingBottom: 8,
    fontFamily: "CircularStd-Book",
    ...Platform.select({
      android: {
        paddingTop: 5
      }
    })
  },
  inputText: {
    fontFamily: "CircularStd-Book",
    flex: 1,
    textAlign: "right",
    color: "rgba(38, 38, 40, 0.4)",
    ...Platform.select({
      android: {
        marginTop: "10%",
        marginBottom: "10%"
      }
    }),
    fontSize: 13,
    lineHeight: 14,
    zIndex: 200
  }
});
export default DialogBox;
