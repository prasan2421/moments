import { observable, action, decorate } from "mobx";
import {
  getGroups,
  addGroup,
  deleteGroup,
  updateGroup
} from "../utils/actions/sharingGroup";
import NavigationService from "../utils/NavigationService";

class sharingGroupStore {
  sharingGroups = [];

  getSharingGroups = () => {
    getGroups()
      .then(response => {
        if (response.status === 200 && response.data) {
          this.sharingGroups = response.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  setSharingGroup = sharingGroup => {
    // TO DO: delete assigning groups via REST operator, but get them from API after updating them.
    // this.sharingGroups = [...this.sharingGroups, sharingGroup];
    addGroup(sharingGroup)
      .then(response => {
        this.getSharingGroups();
        NavigationService.navigate("SharingGroups");
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  deleteSharingGroup = group => {
    deleteGroup(group)
      .then(response => {
        this.getSharingGroups();
        NavigationService.navigate("SharingGroups");
      })
      .catch(error => console.log(error.response));
    this.sharingGroups = this.sharingGroups.filter(e => e.id !== group.id);
  };

  editSharingGroup = group => {
    updateGroup(group)
      .then(response => {
        if (response.status === 200 && response.data) {
          this.getSharingGroups();
          NavigationService.navigate("SharingGroups");
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };
}

decorate(sharingGroupStore, {
  setSharingGroup: action,
  getSharingGroups: action,
  deleteSharingGroup: action,
  sharingGroups: observable
});

export default new sharingGroupStore();
