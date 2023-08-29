import { action, decorate, observable, toJS } from "mobx";

class videoStore {
  video = {};
  compareMode = false;
  videos = [];
  isSpeedOpen = false;
  selectedSpeed = 1;
  currentTime = 0;
  videoTags = [];
  filtered = "";
  filters = [];
  comparePlaying = false;
  isPlaying = false;
  activeTag = { key: null, time: null };
  currentVideosStatus = {};

  setVideo = video => {
    this.video = video;
  };

  setVideos = videos => {
    this.videos = videos;
  };

  setCurrentTime = time => {
    this.currentTime = time;
  };

  resetCurrentTime = () => {
    this.currentTime = 0;
  };

  setFilters = filter => {
    this.filters = filter;
  };

  setComparePlaying = comparePlaying => {
    this.comparePlaying = comparePlaying;
  };

  setPlaying = playing => {
    this.isPlaying = playing;
  };

  setVideoTags = tags => {
    this.videoTags = tags.sort((a, b) => (a.time > b.time ? 1 : -1));
  };

  setFilter = filtered => {
    this.filtered = filtered;
  };

  setFilteredTag = item => {
    if (this.filtered !== "") {
      filteredTags = item.filter(e => e.label === this.filtered);
      sortedTages = filteredTags.sort((a, b) => (a.time > b.time ? 1 : -1));
      this.setVideoTags(sortedTages);
    } else {
      this.setVideoTags(item);
    }
  };

  getCurrentTime = () => {
    return this.currentTime;
  };

  getVideo = () => {
    return this.video;
  };

  getVideos = () => {
    return this.videos;
  };

  toggleCompareMode = () => {
    this.compareMode = !this.compareMode;
  };

  resetCompareMode = () => {
    this.compareMode = false;
  };

  toggleIsSpeedOpen = () => {
    this.isSpeedOpen = !this.isSpeedOpen;
  };

  setSpeed = speed => {
    this.selectedSpeed = speed;
  };

  setActiveTag = tag => {
    this.activeTag = tag;
  };

  setCurrentVideoStatus = (video, status) => {
    if (video.createTime) {
      const statuses = this.currentVideosStatus;
      statuses[video.createTime.trim()] = { playing: status };
      this.currentVideosStatus = statuses;
    }

    if (
      Object.values(this.currentVideosStatus).length > 1 &&
      Object.values(this.currentVideosStatus).every(value => {
        return !value.playing;
      })
    ) {
      this.currentVideosStatus = {};
      this.setComparePlaying(false);
    }
  };
}

decorate(videoStore, {
  setVideo: action,
  getVideo: action,
  setVideos: action,
  getVideos: action,
  setCurrentTime: action,
  resetCurrentTime: action,
  getCurrentTime: action,
  setComparePlaying: action,
  comparePlaying: observable,
  setPlaying: action,
  isPlaying: observable,
  setFilter: action,
  toggleCompareMode: observable,
  resetCompareMode: observable,
  compareMode: observable,
  isSpeedOpen: observable,
  toggleIsSpeedOpen: action,
  selectedSpeed: observable,
  video: observable,
  setSpeed: action,
  getSpeed: action,
  currentTime: observable,
  videoTags: observable,
  setFilteredTag: action,
  setFilters: action,
  filters: observable,
  activeTag: observable,
  setActiveTag: action,
  currentVideosStatus: observable,
  setCurrentVideoStatus: action
});

export default new videoStore();
