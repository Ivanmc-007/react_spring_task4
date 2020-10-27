
class User {

   constructor(id, name, email, dateRegistaration, dateLogin, status) {
      this._id = id || 0;
      this._name = name || "";
      this._email = email || "";
      this._dateRegistaration = dateRegistaration || new Date();
      this._dateLogin = dateLogin || new Date();
      this._status = status || "";
   }

   get id() {
      return this._id;
   }

   set id(id) {
      this._id = id;
   }

   get name() {
      return this._name;
   }

   set name(name) {
      this._name = name;
   }

   get email() {
      return this._email;
   }

   set email(email) {
      this._email = email;
   }

   get dateRegistaration() {
      return this._dateRegistaration;
   }

   set dateRegistaration(dateRegistaration) {
      this._dateRegistaration = dateRegistaration;
   }

   get dateLogin() {
      return this._dateLogin;
   }

   set dateLogin(dateLogin) {
      this._dateLogin = dateLogin;
   }

   get status() {
      return this._status;
   }

   set status(status) {
      this._status = status;
   }
}

export default User;