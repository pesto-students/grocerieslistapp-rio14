// initial values
const localStorage = window.localStorage;
let userDetail = [];
let currentUser = "";
let currentUserData = [];
let currentUserIndex = null;
let userName = "";
let myGroceryItems = [];
let maxItem = 5;
let selectedGrocery = "";
function loadData() {
  userDetail = JSON.parse(localStorage.getItem("users"));
  userDetail = userDetail ? userDetail : [];
  currentUser = JSON.parse(localStorage.getItem("currentUser"));
  currentUserIndex = currentUser
    ? userDetail.findIndex((d) => d.name === currentUser)
    : null;
  currentUserData =
    currentUserIndex !== null ? userDetail[currentUserIndex]["groceries"] : [];
  auth();
  updateMaxItem();
  groceryList();
}

function login() {
  userName = document.getElementById("userName").value;
  if (userName === "") {
    onError("enter user name");
  } else {
    userDetail.length > 2 && userDetail.pop();
    // userDetail.unshift({ userName: userName, groceries: [] });
    currentUser = userName;
    let checkUserExist = userDetail
      ? userDetail.filter((d) => d.name === currentUser)
      : [];
    if (checkUserExist.length > 0) {
      currentUserIndex = currentUser
        ? userDetail.findIndex((d) => d.name === currentUser)
        : null;
      loadCurrentUserData();
      updateMaxItem();
    } else {
      createNewUser();
    }
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }
}

function createNewUser() {
  userDetail.push({
    name: currentUser,
    groceries: currentUserData,
  });
  localStorage.setItem("users", JSON.stringify(userDetail));
  auth();
}

function loadCurrentUserData() {
  auth();
  currentUserData = userDetail[currentUserIndex]["groceries"];
  groceryList();
}

function checkGroceries(item) {
  if (item === "") {
    onError("enter grocery name");
    return;
  } else if (maxItem === 5) {
    onError(`can not add more than 5 items`);
  } else if (item.split(" ").length > 1) {
    onError(`can not add space character`);
  } else {
    if (currentUserData.includes(item) || selectedGrocery === item) {
      onError("grocery already present");
    } else {
      return true;
    }
  }
}
function createGroceries() {
  let groceryName = document.getElementById("myGrocery").value;
  const res = checkGroceries(groceryName);
  if (res) {
    currentUserData.push(groceryName);
    maxItem -= 1;
    document.getElementById("myText").innerHTML = maxItem;
    document.getElementById("showLeftItem").style.visibility = "visible";
    userDetail[currentUserIndex]["groceries"] = currentUserData;
    localStorage.setItem("users", JSON.stringify(userDetail));
    groceryList();
    updateMaxItem();
    document.getElementById("myGrocery").value = "";
  } else return;
}

function updateMaxItem() {
  maxItem = currentUserData.length;
  document.getElementById("myText").innerHTML = `Item left to add in list${
    maxItem - 5
  }`;
}
function groceryList() {
  deleteAllGroceryItem();
  const groceryListContainer = document.getElementById("myUL");
  if (currentUserData.length > 0) {
    currentUserData.forEach((item) => {
      const groceryItemLi = document.createElement("li");
      groceryItemLi.classList.add("groceryItem");
      groceryItemLi.innerHTML = `<h3>${item}</h3>`;
      const editButton = document.createElement("button");
      editButton.classList.add("button");
      editButton.classList.add("buttonBlue");
      editButton.innerHTML = "Edit";
      editButton.addEventListener("click", () => editGroceryItem(item));
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("button");
      deleteButton.classList.add("buttonRed");
      deleteButton.innerHTML = "delete";
      deleteButton.addEventListener("click", () => deleteGroceryItem(item));
      // groceryItemLi.classList.add(item);
      // groceryItemLi.addEventListener("click", () => highlight(item));
      groceryItemLi.appendChild(deleteButton);
      groceryItemLi.appendChild(editButton);
      groceryListContainer.appendChild(groceryItemLi);
    });
  }
}

function highlight(item) {
  console.log("highlight", item);
  var element = document.getElementById();
  element.classList.add("mystyle");
}
function editGroceryItem(item) {
  document.getElementById("add").style.visibility = "hidden";
  document.getElementById("update").style.visibility = "visible";
  document.getElementById("cancel").style.visibility = "visible";
  document.getElementById("myGrocery").value = item;
  selectedGrocery = item;
}

function update() {
  let groceryName = document.getElementById("myGrocery").value;
  const res = checkGroceries(groceryName);
  if (res) {
    currentUserData[currentUserData.indexOf(selectedGrocery)] = groceryName;
    userDetail[currentUserIndex]["groceries"] = currentUserData;
    localStorage.setItem("users", JSON.stringify(userDetail));
    groceryList();
    cancel();
  }
}
function cancel() {
  selectedGrocery = "";
  document.getElementById("myGrocery").value = "";
  document.getElementById("add").style.visibility = "visible";
  document.getElementById("update").style.visibility = "hidden";
  document.getElementById("cancel").style.visibility = "hidden";
}
function deleteGroceryItem(groceryItem) {
  currentUserData = currentUserData.filter((item) => item != groceryItem);
  userDetail[currentUserIndex]["groceries"] = currentUserData;
  localStorage.setItem("users", JSON.stringify(userDetail));
  deleteAllGroceryItem();
  groceryList();
  updateMaxItem();
}
function deleteAllGroceryItem() {
  const groceryListContainer = document.getElementById("myUL");
  let i = 0;
  while (i < groceryListContainer.childElementCount) {
    groceryListContainer.removeChild(groceryListContainer.childNodes[0]);
  }
}
function logOut() {
  currentUser = "";
  currentUserData = [];
  deleteAllGroceryItem();
  refreshList();
  updateMaxItem();
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  document.getElementById("myGrocery").value = "";
  document.getElementById("userName").value = "";
  auth();
}
function refreshList() {
  deleteAllGroceryItem();
  groceryList();
}

function auth() {
  if (currentUser) {
    document.getElementById("displayName").innerHTML = `Hii , ${currentUser}`;
    document.getElementById("showCreateNewUser").style.visibility = "hidden";
    document.getElementById("myDIV").style.visibility = "visible";
    document.getElementById("myUL").style.visibility = "visible";
    document.getElementById("update").style.visibility = "hidden";
    document.getElementById("cancel").style.visibility = "hidden";
  } else {
    document.getElementById("showCreateNewUser").style.visibility = "visible";
    document.getElementById("myDIV").style.visibility = "hidden";
    document.getElementById("myUL").style.visibility = "hidden";
  }
}
function onError(err) {
  alert(err);
}
