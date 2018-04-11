import React from 'react';
import ReactDOM from 'react-dom';

class Statistics extends React.Component {
   render(){
      return(
         <div className="statistics">
            <p>{"Done: "+this.props.done+" Undone: "+this.props.undone}</p>
         </div>
      );
   }
}

class Container extends React.Component {
   constructor(props){
      super(props);
      this.state = {listIndex:-1,todoitemListList:[],todolistList:[],checkList:[]};
      this.addList = this.addList.bind(this);
      this.editTitle = this.editTitle.bind(this);
      this.deleteList =  this.deleteList.bind(this);
      this.addItem = this.addItem.bind(this);
      this.selectListIndex = this.selectListIndex.bind(this);
      this.updateCheckList = this.updateCheckList.bind(this);
      this.deleteItem = this.deleteItem.bind(this);
   }

   updateCheckList(i){
      let newCheckList = this.state.checkList.slice(0);
      newCheckList[this.state.listIndex][i]=!newCheckList[this.state.listIndex][i];
      this.setState({checkList:newCheckList});
   }

   selectListIndex(i){
      this.setState({listIndex:i});
   }

   editTitle(i){
      let s = prompt("Please enter the title:","New Todolist");
      let newList=this.state.todolistList.slice(0);
      newList[i]=s;
      this.setState({todolistList:newList});
   }

   deleteList(i){
      let newList = this.state.todolistList.slice(0);
      let newItemList = this.state.todoitemListList.slice(0);
      let newCheckList = this.state.checkList.slice(0);
      newCheckList.splice(i,1);
      newList.splice(i,1);
      newItemList.splice(i,1);
      this.setState({todolistList:newList,todoitemListList:newItemList,checkList:newCheckList});
   }

   addList(){
      let newList = this.state.todolistList.slice(0);
      let newItemList = this.state.todoitemListList.slice(0);
      let newCheckList = this.state.checkList.slice(0);
      newCheckList.push([]);
      newItemList.push([]);
      newList.push("New Todolist");
      this.setState({todoitemListList:newItemList,todolistList:newList,checkList:newCheckList});
   }

   addItem(s){
      let newItemList = this.state.todoitemListList.slice(0);
      let newCheckList = this.state.checkList.slice(0);
      newItemList[this.state.listIndex].push(s);
      newCheckList[this.state.listIndex].push(false);
      this.setState({todoitemListList:newItemList,checkList:newCheckList});
   }

   deleteItem(i){
      let newItemList = this.state.todoitemListList.slice(0);
      let newCheckList = this.state.checkList.slice(0);
      newItemList[this.state.listIndex].splice(i,1);
      newCheckList[this.state.listIndex].splice(i,1);
      this.setState({todoitemListList:newItemList,checkList:newCheckList})
   }

   render(){
      let totalDone = 0,totalUndone = 0;
      let doneList = new Array(this.state.checkList.length).fill(0), undoneList = new Array(this.state.checkList.length).fill(0);

      for(let i=0;i<this.state.checkList.length;i++){
         for(let j=0;j<this.state.checkList[i].length;j++){
            if(this.state.checkList[i][j]) doneList[i]++;
            else undoneList[i]++;
         }
         totalDone+=doneList[i];
         totalUndone+=undoneList[i];
      }
      return(
         <div className="container">
            <LeftContainer todolistVector={this.state.todolistList} editTitle={this.editTitle} addList={this.addList} deleteList={this.deleteList} selectListIndex={this.selectListIndex} listIndex={this.state.listIndex}  done={totalDone} undone={totalUndone} />
            <RightContainer todoitemListVector={this.state.todoitemListList} listIndex={this.state.listIndex} addItem={this.addItem} updateCheckList={this.updateCheckList} checkList={this.state.checkList} deleteItem={this.deleteItem} done={doneList} undone={undoneList} />
         </div>
      );
   }
}

class LeftContainer extends React.Component {
   constructor(props){
      super(props);
   }
   render(){
      return(
         <div className="left-container">
            <h1>Todolist</h1>
            <TodolistList list={this.props.todolistVector} editTitle={this.props.editTitle} deleteList={this.props.deleteList} selectListIndex={this.props.selectListIndex} listIndex={this.props.listIndex} />
            <NewTodolist addList = {this.props.addList} />
            <Statistics done={this.props.done} undone={this.props.undone} />
         </div>
      );
   }
}


class TodolistList extends React.Component {
   render(){
      let renderList = [];
      for(let i=0;i<this.props.list.length;i++){
         if(i!=this.props.listIndex){
            renderList.push(<TodolistUnit title={this.props.list[i]} editTitle={this.props.editTitle} index={i} deleteList={this.props.deleteList} selectListIndex={this.props.selectListIndex} selected={false}/>);
         }
         else{
            renderList.push(<TodolistUnit title={this.props.list[i]} editTitle={this.props.editTitle} index={i} deleteList={this.props.deleteList} selectListIndex={this.props.selectListIndex} selected={true}/>);
         }
      }
      return (renderList);
   }
}

class TodolistUnit extends React.Component {
   constructor(props){
      super(props);
   }

   render(){
      if(this.props.selected){
         return(
            <div className="todolist-unit" id="selected-list" onClick={()=>{ console.log("div is clicked,index:"+this.props.index); this.props.selectListIndex(this.props.index)} } >
               <p className="list-title" >{this.props.title}</p>
               <input className="list-title-edit-button" type="button" onClick={()=>this.props.editTitle(this.props.index)} />
               <input className="list-cancel-button" type="button" onClick={()=>{this.props.deleteList(this.props.index)}}/>
            </div>
         );
      }
      else{
         return(
            <div className="todolist-unit" onClick={()=>{ console.log("div is clicked,index:"+this.props.index); this.props.selectListIndex(this.props.index)} } >
               <p className="list-title" >{this.props.title}</p>
               <input className="list-title-edit-button" type="button" onClick={()=>this.props.editTitle(this.props.index)} />
               <input className="list-cancel-button" type="button" onClick={()=>{this.props.deleteList(this.props.index)}}/>
            </div>
         );
      }
   }
}

class NewTodolist extends React.Component {
   render(){
      return(
         <div className="new-todolist">
            <input className="new-list-button" type="button" onClick={()=>{this.props.addList()}}/>
            <p>New Todolist</p>
         </div>
      );
   }
}

class RightContainer extends React.Component {
   constructor(props){
      super(props);
   }

   render(){
      if(this.props.listIndex>=0){
         return(
            <div className="right-container">
               <h2>TodoItems</h2>
               <TodoitemList todoitemVector={this.props.todoitemListVector[this.props.listIndex]} listIndex={this.props.listIndex} updateCheckList={this.props.updateCheckList} checkVector={this.props.checkList[this.props.listIndex]} deleteItem={this.props.deleteItem}/>
               <NewTodoitem addItem = {this.props.addItem} />
               <Statistics done={this.props.done[this.props.listIndex]} undone={this.props.undone[this.props.listIndex]} />
            </div>
         );
      }
      else{
         return(
            <div className="right-container">
               <h2>Click on a todolist to view the todoitems</h2>
            </div>
         );
      }
   }
}

class TodoitemList extends React.Component {
   constructor(props){
      super(props);
   }
   render(){
      let list = [];
      for(let i=0;i<this.props.todoitemVector.length;i++){
         list.push(<TodoitemUnit title={this.props.todoitemVector[i]} index={i} updateCheckList={this.props.updateCheckList} selected={this.props.checkVector[i]} deleteItem={this.props.deleteItem} />);
      }
      return (
         list
      );
   }
}

class TodoitemUnit extends React.Component {
   constructor(props){
      super(props);
   }
   render(){
      return(
         <div className="todoitem-unit">
            <input className="item-finish-checkbox" type="checkbox" checked={this.props.selected} onChange={()=>this.props.updateCheckList(this.props.index)}/>
            <p>{this.props.title}</p>
            <input className="item-delete-button" type="button" onClick={()=>this.props.deleteItem(this.props.index)} />
         </div>
      );
   }
}

class NewTodoitem extends React.Component {
   constructor(props){
      super(props);
      this.state={value:""};
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
   }

   handleChange(event){
      this.setState({value:event.target.value});
   }

   handleClick(){
      this.props.addItem(this.state.value);
   }

   render(){
      return(
         <div className="new-todoitem">
            <input className="new-item-button" type="button" onClick={this.handleClick} />
            <input className="new-item-title" type="text" placeholder="Enter the title here..." onChange={this.handleChange} />
         </div>
      );
   }
}

class TodoApp extends React.Component {
   render() {
      return (
         <Container />
      ); //<section>Hello</section>;
   }
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));

