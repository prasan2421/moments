import {StyleSheet} from "react-native";


const VideoSpeedStyles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        height: '80%',
        width: '100%',
        backgroundColor: '#ffffff',
        color: '#000'
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Metropolis-Bold',
        color: '#000',
        marginTop: 32,
        paddingLeft: 80
    },
    speedContainer: {
        marginVertical: 10,
        flexDirection: 'row'
    },
    check : {
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    speed: {
        fontFamily: 'Metropolis-Bold',
        color: '#000'
    },
    selectedSpeed: {
        color: '#579FFB'
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 0.5,
        paddingLeft: 30
    },
    cancelText: {
        fontFamily: 'Metropolis-Medium',
        color: '#000',
        marginLeft: 2
    },
    cancelIcon: {
        transform: [
            { rotateZ: "45deg" },
            {scale: 1.5}
        ],
        marginRight: 30
    }
});

export default VideoSpeedStyles;