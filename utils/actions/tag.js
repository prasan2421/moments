import { axiosInstance } from "../restApi";

export const addTag = tag => {
  let config = {
    label: tag.tagName,
    duration: tag.tagDuration,
    backtrace: tag.backtraceDuration
  };
  return axiosInstance.post("/Tag", config);
};

export const getTagsData = () => {
  return axiosInstance.get("/Tag");
};

export const deleteTag = tag => {
  return axiosInstance.delete(`/Tag/${tag.id}`);
};

export const editTag = tag => {
  let config = {
    id: tag.id,
    label: tag.tagName,
    duration: tag.tagDuration,
    backtrace: tag.backtraceDuration
  };
  return axiosInstance.patch("/Tag", config);
};
