class Product {
    constructor(id, description, price, imgUri) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.imgUri = imgUri;
    }

    // getProductBudgetEl() {
    //     return `
    //     <tr>
    //         <td><p>${this.description}</p></td>
    //         <td><p>$${this.price.toFixed(2)}</p></td>
    //     </tr>
    //     `;
    // }

    getProductBudgetEl() {
        return `
        <div><p>${this.description}</p></div>
        <div><p>$${this.price.toFixed(2)}</p></div>
        <div><i data-product-id=${this.id} class="fa fa-solid fa-trash"></i></div>
        `;
    }

    getProductEl() {
        return `
        <div class="product_panel-item" data-product-id="${this.id}">
            <a class="item-link" href="1">
                <div class="item-link-img">
                    <img class="item-pic" src="${this.imgUri}" alt="товар">
                    <div class="add-contaner">
                    </div>
                </div>
                <div class="text-box">
                    <p class="item-desk">${this.description}</p>
                    <p class="item-price">$${this.price.toFixed(2)}</p>
                </div>
            </a>
            <a class="add" href="2">
                <img class="add-pic" src="./картинки/Forma%201%20copy%20(1).svg" alt="card">
                <p class="add-desc">Add to Cart</p>
            </a>
        </div>
        `;
    }
}

let products = [
    new Product(0, "ELLERY X M'O CAPSULE", 52, "./картинки/WINDCOAT.png"),
    new Product(1, "ELLERY X M'O COSTUME", 25.1, "./картинки/costume.png"),
    new Product(2, "ELLERY X M'O SHORTS", 56, "./картинки/shorts.png"),
    new Product(3, "ELLERY X M'O T-SHIRT", 22.3, "./картинки/T-shirt.png"),
    new Product(4, "ELLERY X M'O JAKET", 11.9, "./картинки/jaket.png"),
    new Product(4, "ELLERY X M'O BLOUSE", 51, "./картинки/blouse.png")
];

let basketProducts = [];

(function () {
    const sss = 0;
    const productPanelElement = document.querySelector(".product_panel");

    // add products on page
    products.forEach(x => {
        productPanelElement.insertAdjacentHTML('afterbegin', x.getProductEl());
    });

    // add click event handler on product's cards to add them to badget
    productPanelElement.addEventListener('click', (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.classList.contains('add')) {

            //console.log(event.target);
            let productId = event.target.parentElement.dataset.productId;
            let foundProduct = products.find(x => x.id == productId);
            //console.log(event.target.parentElement.dataset.productId);

            // try copy from product array to basketProductsArray
            // let copy = { ...foundProduct }  // shalow copy: lost prototype with methods
            // let copy = JSON.parse(JSON.stringify(foundProduct)); // deep copy:  lost prototype with methods
            // let copy = Object.assign({}, foundProduct); // shalow copy: lost prototype with methods


            // console.log(copy);
            let newId = basketProducts.length > 0 ? basketProducts[basketProducts.length - 1].id + 1 : 0;
            basketProducts.push(new Product(newId, foundProduct.description, foundProduct.price, ''));
            // console.log(basketProducts);

            updateBudget(basketProducts);
            // update product badget
        }


    });

    // add event listener on delete product from basket action
    document.querySelector('.basket-box').addEventListener('click', event => {
        if (event.target.tagName == 'I') {
            event.stopPropagation();
            event.preventDefault();
            // delete product
            basketProducts = basketProducts.filter(x => x.id !== Number(event.target.dataset.productId));
            updateBudget(basketProducts);
        }
    });

    function updateBudget(basketProducts) {
        console.log(basketProducts);
        const menuBoxElement = document.querySelector('.menu_box .basket-box');

        menuBoxElement.innerHTML = "";

        // add product markup on budget panel
        basketProducts.forEach(x => {
            menuBoxElement.insertAdjacentHTML('beforeend', x.getProductBudgetEl());
        })

        let total = basketProducts.reduce((add, x) => {
            return add + x.price;
        }, 0);

        // add total row on budget panel
        menuBoxElement.insertAdjacentHTML('beforeend', `
            <div><hr><p>Total: </p> </div> 
            <div><hr> <p>$${total.toFixed(2)}</p></div>
        `);

        // change number of products in budget
        document.querySelector('.basket-count').dataset.count = basketProducts.length;

        if (basketProducts.length > 0)
            document.querySelector('.basket-menu .menu_box').style['visibility'] = 'visible';
        else
            document.querySelector('.basket-menu .menu_box').style['visibility'] = 'hidden';
    }

    updateBudget(basketProducts); // init default 
})()