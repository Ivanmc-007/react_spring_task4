import React from "react";
import User from "../entity/User";

function TrUser(props) {
   let { className } = props;
   let { user } = props;
   let { isChecked } = props;
   let { onChange } = props;
   if (user instanceof User) {
      return (
         <tr className={className}>
            <td>
               <input type="checkbox" onChange={onChange} checked={isChecked} />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.dateRegistaration && user.dateRegistaration.toDateString()}</td>
            <td>{user.dateLogin && user.dateLogin.toDateString()}</td>
            <td>{user.status}</td>
         </tr>
      );
   } else return <tr></tr>;
}

export default TrUser;