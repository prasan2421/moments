import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Stopwatch = ({ running,  elapsedTime }) => {
  const [startTime, setStartTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime + elapsedTime);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [running, startTime, elapsedTime]);

  useEffect(() => {
    if (running) {
      setStartTime(Date.now() - elapsedTime);
      setCurrentTime(0);
    } else {
      setStartTime(0);
   
    }
  }, [running, elapsedTime]);

  

  const formatTime = (time) => {
    const milliseconds = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const formattedMilliseconds = milliseconds.toString().padStart(3, '0').substr(0, 2);
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${formattedMilliseconds}`;
    return formattedTime;
  };

  return (
    <View>
      <Text style={{ fontSize: 24, }}>{formatTime(currentTime)}</Text>
      
    </View>
  );
};

export default Stopwatch;