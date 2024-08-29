const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
const items = document.querySelectorAll('li')
const inputFilter = document.querySelector('#filter')
//build functions
function addItem (e) {
  e.preventDefault();
  const inputValue =  itemInput.value.charAt(0).toUpperCase() + itemInput.value.slice(1);

  if (!inputValue) {
    alert('Please fill in the item you wish to add to shopping list')
  } else {
    if (!checkIfItemExists(inputValue)) {
      const newItem = document.createElement('li')
    newItem.innerHTML = `
   ${inputValue}
        <button class="remove-item btn-link text-red">
          <i class="fa-solid fa-xmark">X</i>
        </button>
    `;
    itemList.appendChild(newItem)
    itemInput.value = "";
    addItemToStorage(inputValue)
    updateUI()
    } else {
      alert("Item already exists in the list")
    }
  }
}


function addItemToStorage (item) {
  let itemsFromStorage = JSON.parse(localStorage.getItem('items') || "[]")
  itemsFromStorage.push(item)
  localStorage.setItem('items' , JSON.stringify(itemsFromStorage))
}


function checkIfItemExists (item) {
  let itemsFromStorage = JSON.parse(localStorage.getItem('items') || '[]')
  return itemsFromStorage.includes(item)
}
function clearItems () {
  itemList.innerHTML = "";
  localStorage.removeItem('items')
  updateUI()
}
function deleteItem (e) {
if (e.target.closest('.remove-item')) {
  const itemToRemove = e.target.closest('li').firstChild.textContent.trim()
  e.target.closest('li').remove()
  removeItemFromStorage(itemToRemove)
  updateUI()
}

};
function removeItemFromStorage  (itemToRemove) {
  let itemsFromStorage = JSON.parse(localStorage.getItem('items') || '[]')
  itemsFromStorage = itemsFromStorage.filter(item  => item !== itemToRemove)
  localStorage.setItem('items' , JSON.stringify(itemsFromStorage))
}

function filterItems (e) {
 let term = e.target.value.toLowerCase()
 const items = itemList.querySelectorAll('li');
 items.forEach(item => {
  const itemName = item.firstChild.textContent.toLowerCase()
  console.log(item.firstChild);
  console.log(item.textContent);
  
  if (itemName.includes(term)) {
    item.style.display = ""
  } else {
    item.style.display = "none"
  }
 })
 updateUI()
}

const updateUI = () => {
  if (itemList.children.length === 0) {
    clearBtn.style.display = "none"
    inputFilter.style.display = "none"
  }  else if (itemList.children.length > 0) {
    clearBtn.style.display = "block"
    inputFilter.style.display = "block"
  };
}
function loadItemsfromStorage () {
  let itemsFromStorage = JSON.parse(localStorage.getItem('items') || '[]')
  itemsFromStorage.forEach(item => {
    const newItem = document.createElement('li')
    newItem.innerHTML = `
      ${item}
      <button class="remove-item btn-link text-red">
        <i class="fa-solid fa-xmark">X</i>
      </button>
    `;
    itemList.appendChild(newItem)
  })
  updateUI()
}
loadItemsfromStorage()
updateUI()
//event listeners
itemForm.addEventListener('submit' , addItem)
itemList.addEventListener('click' , deleteItem)
clearBtn.addEventListener('click' , clearItems)
inputFilter.addEventListener('input' , filterItems)



















