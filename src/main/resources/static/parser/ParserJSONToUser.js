import User from "../entity/User";

class ParserJSONToUser {

   parse(json) {
      return new User(json.id, json.name, json.email, new Date(json.dateRegistration), new Date(json.dateLogin), json.userStatus);
   }

}

export default new ParserJSONToUser();