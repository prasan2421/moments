import { observable, action, decorate, toJS } from "mobx";
import { addTag, deleteTag, editTag, getTagsData } from "../utils/actions/tag";
import NavigationService from "../utils/NavigationService";

class tagStore {
  tags = [];

  getTags = () => {
    getTagsData()
      .then(response => {
        if (response.status === 200 && response.data) {
          this.tags = response.data;
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  setTag = tag => {
    if (tag === Object(tag)) {
      this.tags = [...this.tags, tag];
    }
    addTag(tag)
      .then(response => {
        this.getTags();
        NavigationService.navigate("TagsSettings");
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  deleteTag = tag => {
    deleteTag(tag)
      .then(response => {
        this.getTags();
        NavigationService.navigate("TagsSettings");
      })
      .catch(error => console.log(error.response));
  };

  editTag = tag => {
    editTag(tag)
      .then(response => {
        this.getTags();
        NavigationService.navigate("TagsSettings");
      })
      .catch(error => console.log(error.response));
  };
}

decorate(tagStore, {
  setTag: action,
  deleteTag: action,
  getTags: action,
  tags: observable
});

export default new tagStore();
