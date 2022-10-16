import React, { useState, useEffect } from "react";
import "./style.css";

// get all data in localStorage
const getLocalData = ()=>{
   const lists = localStorage.getItem("taskList");
   if(lists)
   {
      return JSON.parse(lists);
   }
   else
   {
      return [];
   }
}

const Todo = ()=>{
   const [inputdata, setInputData] = useState("");
   const [items, setItems] = useState(getLocalData());
   const [isEdit, setEdit] = useState("");
   const [toggleBtn, setToggleBtn] = useState(false);

   // add element of this function
   const addItem = () =>{
      if(!inputdata)
      {
        alert("Please fill the data!");
      }
      else if(inputdata && toggleBtn)
      {
         setItems(
            items.map((cur)=>{
              if(cur.id === isEdit){
                 return {...cur, name:inputdata};
              }
              else
              {
                return cur;
              }
            })
         )
         setInputData("");
         setEdit(null);
         setToggleBtn(false);
      }
      else
      {
        const newItem = {
         id: new Date().getTime().toString(),
         name: inputdata
        };
        setItems([...items, newItem]);
        setInputData("");
      }
   };

   // edit todo item if need

   const editItem = (index) => {
      const cur_Item = items.find((curElm)=>{
         return curElm.id === index;
      });
      setInputData(cur_Item.name);
      setEdit(index);
      setToggleBtn(true);
   }



   //delete element in todo list function 
   const deleteItem = (index) => {
       const updatedItems = items.filter((curElem) => {
          return curElem.id !== index;
       });
       setItems(updatedItems);
   };

   //remove all element in todo list

   const removeAll = () => {
      setItems([]);
   }

   // add data in localStorage

   useEffect(() => {
     localStorage.setItem("taskList", JSON.stringify(items));
   },[items]);


   return (
    <>
      <div className="main-div">
          <div className="child-div">
            
             <figure>
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/approve-list-4810441-4003144.png" alt="todo-box" />
                <figcaption>Add Your List Here ✌️</figcaption>
             </figure>

             <div className="addItems">
             <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
              />
              {
                 toggleBtn ? (
                  <i className="far fa-edit add-btn" onClick={addItem}></i>
                 ) : (
                  <i className="fa fa-plus add-btn" onClick={addItem}></i>
                 )
              }
             </div>
              {/* show items list */}
              <div className="showItems">

               {
                  items.map((curEle)=>{
                     return (
                        <div className="eachItem" key={curEle.id}> 
                           <h3>{curEle.name}</h3>
                           <div className="todo-btn">
                                 <i className="far fa-edit add-btn" onClick={()=> editItem(curEle.id)}></i>
                                 <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curEle.id)}></i>
                           </div>
                        </div>
                     )
                  })
               }

              </div>


             {/* code for button */}
             <div className="showItems">
               <button className="btn effect04" data-sm-link-text ="Remove All" onClick={removeAll}>
                  <span>CHECK LIST</span>
               </button>
             </div>
          </div>
      </div>
    </>
   );
}

export default Todo;