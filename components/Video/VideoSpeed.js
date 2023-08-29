import React, {Component} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Modal, TouchableWithoutFeedback,
} from "react-native";
import styles from "./VideoSpeedStyles";
import BigPlus from "../../assets/Svg/BigPlus";
import { inject, observer } from "mobx-react";
import Confirm from "../../assets/Svg/Confirm";

const playbackSpeeds = [
    {value: 0.25, label: '0.25x'},
    {value: 0.5, label: '0.5x'},
    {value: 0.75, label: '0.75x'},
    {value: 1, label: 'Normal'},
    {value: 1.25, label: '1.25x'},
    {value: 1.5, label: '1.5x'},
    {value: 1.75, label: '1.75x'},
    {value: 2, label: '2x'},
];

class VideoSpeed extends Component {
    render() {
        const {toggleIsSpeedOpen, setSpeed, isSpeedOpen, selectedSpeed} =  this.props.videoStore;

        return (
            <Modal
                animationType='slide'
                transparent={true}
                onRequestClose={toggleIsSpeedOpen}
                visible={isSpeedOpen}
            >
                <View style={{flex: 1}}>
                    <TouchableWithoutFeedback onPress={toggleIsSpeedOpen}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}/>
                    </TouchableWithoutFeedback>
                    <View style={styles.mainContainer}>
                        <Text style={styles.sectionTitle}>Playback speed</Text>
                        <View>
                            {playbackSpeeds.map((speed) => {
                                return (
                                    <TouchableOpacity key={speed.value} style={styles.speedContainer} onPress={() => {setSpeed(speed.value)}}>
                                        <View style={styles.check}>
                                            {(selectedSpeed === speed.value) && <Confirm
                                               fill="#579FFB"
                                               stroke="#579FFB"
                                               style={{
                                                   transform: [{ scale: 1.2 }]
                                               }}
                                           />}
                                        </View>
                                        <Text style={{...styles.speed, ...((selectedSpeed === speed.value) && styles.selectedSpeed )}}>{speed.label}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity style={styles.cancelButton} onPress={toggleIsSpeedOpen}>
                            <BigPlus
                                fill="#000"
                                style={styles.cancelIcon}
                            />
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        );
    }
}

VideoSpeed.propTypes = {};

export default inject("videoStore")(observer(VideoSpeed));
