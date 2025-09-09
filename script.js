const removeActive = () =>{
    const categoryBtn = document.querySelectorAll(".category-btn");
    categoryBtn.forEach((btn) => btn.classList.remove("active"));
}

// spinner
const manageSpinner =(status)=>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("category").classList.add("hidden");

    }else{
        document.getElementById("category").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
};

const loadPlantDetails = async (id) => {
     manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayPlantDetails(details.plants)
}

const displayPlantDetails = (plant) => {
    const detailsBox = document.getElementById("details-container");
    console.log(plant)
    detailsBox.innerHTML = `
         <div class="bg-white p-2 shadow-lg rounded ">
                    <img class="rounded mx-auto h-40 w-72" src="${plant.image}" alt="" >
                    <h2 class="font-bold my-2 cursor-pointer" onclick="loadPlantDetails(${plant.id})">${plant.name}</h2>
                    <p>${plant.description}</p>
                    <div class="flex justify-between my-2">
                        <button  class="bg-[#a9e1be] text-green-950 rounded-full p-1">${plant.category}</button>
                        <h2>৳${plant.price}</h2>
                    </div>
                    <button onclick="addToCart(${plant.id}, '${plant.name}', ${plant.price})" id="cart-btn-${plant.id}" class="cursor-pointer text-white bg-[#15803D] w-full p-2 rounded-full">Add to Cart</button>
                </div>
    `;
    document.getElementById("my_modal_5").showModal();
    manageSpinner(false)
    return;
}

const loadCategory = () => {
  manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
}

const displayCategory = (categories) =>{
    const allCategory = document.getElementById("all-category");
    allCategory.innerHTML = "";

    for(let category of categories){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="category-btn-${category.id}" class="my-2 category-btn cursor-pointer" onclick="loadTree(${category.id})">
         ${category.category_name}
        </button>
        `;
        
        allCategory.append(btnDiv);
    }
    manageSpinner(false);
}

loadCategory();

const loadTrees = () =>{
    manageSpinner(true);
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => {
        displayAllTrees(data.plants)
        removeActive();
        document.getElementById("all-trees").style.backgroundColor = "green"
         document.getElementById("all-trees").style.color = "white"
    })
}

const displayAllTrees = (trees) =>{
    const treesDiv = document.getElementById("treesDiv");
    treesDiv.innerHTML = "";
    
    for(let tree of trees){
        const btnTree = document.createElement("div");
        btnTree.innerHTML = `
            <div class="bg-white p-2 shadow-lg rounded">
                    <img class="rounded mx-auto h-40 w-72" src="${tree.image}" alt="" >
                    <h2 class="font-bold my-2 cursor-pointer" onclick="loadPlantDetails(${tree.id})">${tree.name}</h2>
                    <p>${tree.description}</p>
                    <div class="flex justify-between my-2">
                        <button  class="bg-[#a9e1be] text-green-950 rounded-full p-1">${tree.category}</button>
                        <h2>৳${tree.price}</h2>
                    </div>
                    <button onclick="addToCart(${tree.id}, '${tree.name}', ${tree.price})" class="cart-btn cursor-pointer text-white bg-[#15803D] w-full p-2 rounded-full" id="cart-btn-${tree.id}">Add to Cart</button>
                </div>
        `

        treesDiv.append(btnTree);
    }
    manageSpinner(false)
}
loadTrees()

const loadTree = (id) => {
    manageSpinner(true)
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive();
        document.getElementById("all-trees").style.backgroundColor = "white"
         document.getElementById("all-trees").style.color = "black"
        const clickBtn = document.getElementById(`category-btn-${id}`)
        clickBtn.classList.add("active");
        displayTree(data.plants)})
}

const displayTree = (ones) => {
   const oneTree = document.getElementById("treesDiv")
    oneTree.innerHTML ="";
    for(let one of ones){
        const btnOne = document.createElement("div")
        btnOne.innerHTML = `
         <div class="bg-white p-2 shadow-lg rounded">
                    <img class="rounded mx-auto h-40 w-72" src="${one.image}" alt="" >
                    <h2 class="font-bold my-2 cursor-pointer" onclick="loadPlantDetails(${one.id})">${one.name}</h2>
                    <p>${one.description}</p>
                    <div class="flex justify-between my-2">
                        <button onclick="loadPlantDetails(${one.id})" class="bg-[#a9e1be] text-green-950 rounded-full p-1">${one.category}</button>
                        <h2>৳${one.price}</h2>
                    </div>
                    <button onclick="addToCart(${one.id}, '${one.name}', ${one.price})" class="cart-btn cursor-pointer text-white bg-[#15803D] w-full p-2 rounded-full" id="cart-btn-${one.id}">Add to Cart</button>
                </div>
        `
        oneTree.append(btnOne);
    }
    manageSpinner(false)
}

// Cart functionality
let cartItems = [];
let cartTotal = 0;


const addToCart = (id, name, price) => {
    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {

        existingItem.quantity += 1;

    } else {
        
        cartItems.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateCartTotal();
}

// Remove from Cart Function
const removeFromCart = (id) => {
   
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
    }
    
    updateCartDisplay();
    updateCartTotal();
}

// Update Cart Display
const updateCartDisplay = () => {
    const cartContainer = document.getElementById("cart-container");
    
    const existingItems = cartContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());
    
    
    cartItems.forEach(item => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <div class="flex justify-between items-center bg-[#F0FDF4] p-2 mt-2 rounded">
                <div>
                    <h4 class="font-bold text-sm">${item.name}</h4>
                    <p class="text-xs">৳${item.price} x ${item.quantity}</p>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-700">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;
        
        
        const cartSummary = document.getElementById("cart-summary");
        cartContainer.insertBefore(cartItemDiv, cartSummary);
    });
}


const updateCartTotal = () => {
    cartTotal = cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    
    document.getElementById("cart-total").textContent = `৳${cartTotal}`;
}
