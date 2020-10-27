import React, { Component } from "react";
import TrUser from "../TrUser";
import ParserJSONToUser from "../../parser/ParserJSONToUser";
import UserService from "../../service/UserService";
import "./style.scss";

class IndexSectionOne extends Component {

   state = {
      checkedRows: [], // array keeps checked/unchecked rows: [true, false, false, ...]
      checkedAll: false, // for main checkbox 
      userList: [],
      currUser: null
   }

   componentDidMount() {
      UserService.getCurrentUser().then(user => this.setState({ currUser: user }));

      UserService.getUsers().then(data => {
         let userList = data;
         for (let i = 0; i < userList.length; i++) {
            userList[i] = ParserJSONToUser.parse(userList[i]);
         }
         this.setState({
            userList: userList,
            checkedRows: new Array(userList.length).fill(false)
         });
      });
   }

   render() {
      return (
         <section className="section-one">
            <div className="section-one__bottons">
               <form className="section-one__form">
                  <button className="section-one__botton" type="submit" onClick={this.handlerBlock}>Block</button>
               </form>
               <form className="section-one__form">
                  <button className="section-one__botton" type="submit" onClick={this.handlerUnblock}>Unblock</button>
               </form>
               <form action="#" className="section-one__form">
                  <button className="section-one__botton" type="submit" onClick={this.handlerDelete}>Delete</button>
               </form>
            </div>
            <table className="section-one__table">
               <thead className="section-one__table-header">
                  <tr className="section-one__table-row">
                     <th>
                        <input type="checkbox" onChange={this.handlerCheckedAll} />
                     </th>
                     <th>id</th>
                     <th>name</th>
                     <th>email</th>
                     <th>Date registration</th>
                     <th>Date login</th>
                     <th>Status</th>
                  </tr>
               </thead>
               <tbody className="section-one__table-body">
                  {
                     this.state.userList.map((user, index) => {
                        return <TrUser key={user.id} className="section-one__table-row" user={user} onChange={this.handlerChecked.bind(this, index)} isChecked={this.state.checkedRows[index]} />
                     })
                  }
               </tbody>
            </table>
         </section>
      );
   }

   handlerCheckedAll = () => {
      let toCheckAll = false;
      if (!this.state.checkedAll)
         toCheckAll = true;
      let array = new Array(this.state.checkedRows.length).fill(toCheckAll);
      this.setState({
         checkedRows: array,
         checkedAll: toCheckAll
      });
   }

   handlerChecked = index => {
      let newArray = this.state.checkedRows.slice();
      if (newArray[index])
         newArray[index] = false;
      else
         newArray[index] = true;
      this.setState({
         checkedRows: newArray
      });
   }

   handlerBlock = (event) => {
      event.preventDefault();
      let arrayCheckedId = [];
      let toShutInMyselfToo = false;
      this.state.checkedRows.forEach((isChecked, index) => {
         if (isChecked) {
            arrayCheckedId.push({ id: this.state.userList[index].id });
            if (this.state.userList[index].id === this.state.currUser.id)
               toShutInMyselfToo = true;
         }
      });
      if (arrayCheckedId.length !== 0) {
         UserService.updateStatusBlock(arrayCheckedId).then(data => {
            if (toShutInMyselfToo)
               this.logout();
            else {
               let userList = this.changeStatusAndGetNewList(data, "BLOCK");
               this.setState({ userList: userList });
            }
         });

      }
   }

   handlerUnblock = (event) => {
      event.preventDefault(); // turn off actions by default
      let arrayCheckedId = [];
      this.state.checkedRows.forEach((isChecked, index) => {
         if (isChecked)
            arrayCheckedId.push({ id: this.state.userList[index].id });
      });
      if (arrayCheckedId.length !== 0) {
         UserService.updateStatusUnblock(arrayCheckedId).then(data => {
            let userList = this.changeStatusAndGetNewList(data, "UNBLOCK");
            this.setState({
               userList: userList
            });
         });
      }
   }

   // just for inner using 
   changeStatusAndGetNewList(data, status) {
      let userList = this.state.userList.slice();
      for (let i = 0; i < data.length; i++) {
         for (let j = 0; j < userList.length; j++) {
            if (data[i].id === userList[j].id) {
               userList[j].status = status; break;
            }
         }
      }
      return userList;
   }

   handlerDelete = (event) => {
      event.preventDefault(); // turn off actions by default
      let arrayCheckedId = [];
      let newUserList = [];
      let toShutInMyselfToo = false;
      this.state.checkedRows.forEach((isChecked, index) => {
         if (isChecked) {
            arrayCheckedId.push({ id: this.state.userList[index].id });
            if (this.state.currUser.id === this.state.userList[index].id)
               toShutInMyselfToo = true;
         } else
            newUserList.push(this.state.userList[index]);
      });
      if (arrayCheckedId.length !== 0) {
         if (UserService.deleteUserList(arrayCheckedId)) {
            if (toShutInMyselfToo)
               this.logout();
            else {
               this.setState({
                  userList: newUserList,
                  checkedRows: new Array(newUserList.length).fill(false)
               });
            }
         }
      }
   }

   logout() {
      fetch("/logout", { method: "POST" }).then(res => {
         if (res.status === 200)
            window.location.reload(false); // reload page
      }).catch(error => console.log(error));
   }

}

export default IndexSectionOne;