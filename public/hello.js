const taskContainer = document.querySelector(".task_container");
let  globalTaskData = [];//array to be edited layer
const saveToLocalStorage = () => {
localStorage.setItem("taskyCA",JSON.stringify({cards: globalTaskData}));//updating the local storage
}

const generateHTML = (taskData) =>{//appying this keyword as an argument for the functon thsi will point to where the html is currrently at
  //this is the event object now

  return ` <div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
  <div class="card">
    <div class="card-header gap-2 d-flex justify-content-end">
      <button class="btn btn-outline-info" name=${taskData.id} onclick="editCard.apply(this, arguments)" >
        <i class="fal fa-pencil" name=${taskData.id}></i>
      </button>
      <button class="btn btn-outline-danger" name=${taskData.id} onclick="deleteCard.apply(this, arguments)">
        <i class="far fa-trash-alt" name=${taskData.id}></i>
      </button>
    </div>
    <div class="card-body">
      <img
        src=${taskData.image}
        alt="image"
        class="card-img"
        style = "height: 200px"
      />
      <h5 class="card-title mt-4">${taskData.title}</h5>
      <p class="card-text">
        ${taskData.description}
      </p>
      <span class="badge bg-primary">${taskData.type}</span>
    </div>
    <div class="card-footer">
    <button class="btn btn-outline-primary" name=${taskData.id} data-bs-toggle="modal" data-bs-target="#modal${taskData.id}">Open Task</button>
  </div>
  </div>
  </div>
  <div class="modal fade" id="modal${taskData.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        
      </div>
      <div class="modal-body">
      
        <img src = ${taskData.image} style = "height: 300px; width: 100% ">
        <h5 class="card-title mt-4">${taskData.title}</h5>
        <p class="card-text">
          ${taskData.description}
        </p>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
      </div>
      </div>
      
    </div>
  </div>
</div>
  `;
  };



const addNewCard = () => {//creating function
    const taskData = {//creating object
        id: `${Date.now()}`,//unique id
        title: document.getElementById("taskTitle").value,//add value by .value
        image: document.getElementById("imgurl").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,
    };
    globalTaskData.push(taskData);//pushing the object
    //update the local storage
    saveToLocalStorage();
    
    //by passing the key and the value
    //key to identify ur data
    //now open the CONSOLE LOG APPLICATIONS AND LOCAL STORAGE
    //JSON is string and every programming language can understand
    //JSON need the object input to convert to string so always 
    //contd try to convert to the object and then use it
    //stringify convert to string in json
    //localstorage is now added

const newCard = generateHTML(taskData);

//generate html code of task card
//const is used as i dont want someone to edit it in future
//inject to dode
taskContainer.insertAdjacentHTML("beforeend",newCard);//beforeend added 

//clear the form
document.getElementById("taskTitle").value = "" ;
document.getElementById("imgurl").value = "" ;
document.getElementById("taskType").value = "" ;
document.getElementById("taskDescription").value = "" ;
return
};



//load the data to the website storage
const loadExistingCards = () =>{
 //check local strrage BROWSER STORAGE (5MB)
 const getData = localStorage.getItem("taskyCA");
 //any website can store the data in the local storage of the copute
 //but that storage wil be accessible through the website only
 //parse JSON  data if exist
 if(!getData) return;

 const taskCards = JSON.parse(getData);//storing data to in soncst
 //also the parse will convrt the JSON to the JS object
 //converted to the JSON to JS reverse of stringify
 globalTaskData = taskCards.cards;
 //updting the gloabal array
 globalTaskData.map((taskData) => {
  const newCard = generateHTML(taskData);
  taskContainer.insertAdjacentHTML("beforeend",newCard);
});//map means copying the while array
//foreach 
// inject to dom
return;
};
const deleteCard = (event) => {
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;

    const removeTask = globalTaskData.filter((task) => task.id !== targetID);
    globalTaskData = removeTask;


    saveToLocalStorage();

    if(elementType === "BUTTON"){
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode
      );
    }else{
      return taskContainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
      );
    }
    };


    //access DOM to remove Card


//we will use event which on clic gives the id of the class
//we will use name for identification


// /RELODING THE WEBSITE
//now every website is having som elocal stoRAGE nd whenever we write data through input that website save the data in the local storage 
//so what we first id that we first created a variable in js which is an array of objects and which will store the local storage as the data i sentered in
//it  globaltasjdat is the array that i am talking about
//now when accessing to this globaldata the broweser was treates as an object so we convert it to json which is easy understanca
//using stringify
//we then saved it to local storage and then we converted it back to the js file and inserted it into the HTML
//game finitshed

// event is basically the place that where we click we will get the id of that element  very cool feature if id detection is very difficult


const editCard = (event) =>{//need acess to exact card
  
  const elementType = event.target.tagName;
  
  //need acces to the carf title
  let taskTitle;
  let taskType;
  let taskDescription;
  let parentElement;
  let submitButton;
  //getting th access elelment bu node method
  if(elementType === "BUTTON"){
    parentElement = event.target.parentNode.parentNode;
  }
  else{
    //access to the card class
    parentElement = event.target.parentNode.parentNode.parentNode;
  }
  //now goint to childs
  
  //child nodes printing of card element with index 3
  taskTitle = parentElement.childNodes[3].childNodes[3];
  taskDescription = parentElement.childNodes[3].childNodes[5];
  taskType = parentElement.childNodes[3].childNodes[7];//accesing all the eleents
  submitButton = parentElement.childNodes[5].childNodes[1];
  //console.log(taskTitle,taskDescription,taskType,submitButton);
  //checking if varaibles have cprrect pt not
   
  // CONTENTEDITABLE TRUE EDITABLE 
  // CONTENTEDITABLE FALES NOn EDITABLE 
  //here working only if the function is called
  
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");//called upon clicking
  submitButton.innerHTML = "Save Changes";
  //innter html helpd in
  //editing the test from js file 
  
  };
  const saveEdit = (event) =>{
    const targetID = event.target.getAttribute("name");
    const elementType = event.target.tagName;
    let parentElement;
    
    if(elementType === "BUTTON"){
      parentElement = event.target.parentNode.parentNode;
    }
    else{
      //access to the card class
      parentElement = event.target.parentNode.parentNode.parentNode;
    }
  
  const taskTitle = parentElement.childNodes[3].childNodes[3];
  const taskDescription = parentElement.childNodes[3].childNodes[5];
  const taskType = parentElement.childNodes[3].childNodes[7];//accesing all the eleents
  const submitButton = parentElement.childNodes[5].childNodes[1]
  
  const updatedData = {
    title: taskTitle.innerHTML,//not values are values are for input forms
    type: taskType.innerHTML,
    description: taskDescription.innerHTML,
    //creating object with new values
  }
  const updateGlobalTasks = globalTaskData.map((task) => {
    if (task.id === targetID) {
      console.log({ ...task, ...updatedData });
      return { ...task, ...updatedData };
    }
    return task;
  });
   globalTaskData = updateGlobalTasks;
   saveToLocalStorage();
   taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open Task";
   };