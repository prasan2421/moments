import {TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';

const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

export default DismissKeyboard