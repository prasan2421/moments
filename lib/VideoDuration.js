import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Video from 'react-native-video';

const getVideoDuration = (videoSource) => {
    return new Promise((resolve, reject) => {
      const video = new Video(videoSource);
      video.seek(0);
      video.onLoadedMetadata = () => {
        const duration = video.duration;
        resolve(duration);
      };
      video.onError = (error) => {
        reject(error);
      };
    });
  };