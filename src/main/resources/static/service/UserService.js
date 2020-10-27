
const USER_BASE_URL = "/api/users";
const URL_CURRENT_USER = USER_BASE_URL + "/current-user";
const URL_UPDATE_STATUS_UNBLOCK = USER_BASE_URL + "/update-status-unblock";
const URL_UPDATE_STATUS_BLOCK = USER_BASE_URL + "/update-status-block";
const URL_DELETE_USER_LIST = USER_BASE_URL + "/delete-user-list";

class UserService {

   async getUsers() {
      return fetch("/api/users", { method: "GET", headers: { 'Content-Type': 'application/json' } })
         .then(response => response.status === 200 && response.json())
         .catch(error => console.log("LOG", error));
   }

   async getCurrentUser() {
      return fetch(URL_CURRENT_USER, { method: 'GET', headers: { 'Content-Type': 'application/json' } }).then(response => {
         if (response.status === 200)
            return response.json();
      }).catch(error => console.log(error));
   }

   async updateStatusUnblock(arrayCheckedId) {
      return fetch(URL_UPDATE_STATUS_UNBLOCK, { method: "POST", headers: { "Content-Type": 'application/json' }, body: JSON.stringify(arrayCheckedId) })
         .then(response => response.status === 200 && response.json())
         .catch(error => console.log(error));
   }

   async updateStatusBlock(arrayCheckedId) {
      return fetch(URL_UPDATE_STATUS_BLOCK, { method: "POST", headers: { "Content-Type": 'application/json' }, body: JSON.stringify(arrayCheckedId) })
         .then(response => response.status === 200 && response.json())
         .catch(error => console.log(error));
   }

   async deleteUserList(arrayCheckedId) {
      return fetch(URL_DELETE_USER_LIST, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(arrayCheckedId) })
         .then(response => response.status === 200)
         .catch(error => console.log(error));
   }
}

export default new UserService();