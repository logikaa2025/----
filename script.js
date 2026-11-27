
// Завантаження збереженого кошика

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let notificationTimer;

// Збереження кошика

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Додавання товару

function addToCart(name, price) {
    let product = cart.find(item => item.name === name);

    if (product) {
        product.count += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            count: 1
        });
    }

    saveCart();
    showNotification(name + " — додано до кошика!");
}

// Оновлення кошика

function updateCart() {
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(function(item) {
        totalCount += item.count;
        totalPrice += item.price * item.count;
    });

    let count = document.getElementById("count");
    let total = document.getElementById("total");

    if (count) {
        count.textContent = totalCount;
    }

    if (total) {
        total.textContent = totalPrice.toFixed(2);
    }

    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    if (cartCount) {
        cartCount.textContent = totalCount;
    }

    if (cartTotal) {
        cartTotal.textContent = totalPrice.toFixed(2);
    }

    showCartItems();
}

// Відображення товарів у кошику

function showCartItems() {
    let container = document.getElementById("cart-items");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<h3>Ваш кошик порожній!</h3>";
        return;
    }

    cart.forEach(function(item, index) {
        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.price.toFixed(2)} грн / шт.</p>
                </div>

                <div>
                    <button onclick="changeCount(${index}, -1)">
                        -
                    </button>

                    <span>${item.count}</span>

                    <button onclick="changeCount(${index}, 1)">
                        +
                    </button>
                </div>

                <p>${(item.price * item.count).toFixed(2)} грн</p>

                <button onclick="removeItem(${index})">
                    🗑
                </button>
            </div>
        `;
    });
}

// Зміна кількості товарів

function changeCount(index, amount) {
    cart[index].count += amount;

    if (cart[index].count <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}

// Видалення товару

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
}

// Очищення кошика

function clearCart() {
    if (cart.length === 0) {
        alert("Кошик вже порожній!");
        return;
    }

    if (confirm("Очистити весь кошик?")) {
        cart = [];
        saveCart();
    }
}

// Оформлення замовлення

function checkout() {
    if (cart.length === 0) {
        alert("Ваш кошик порожній!");
        return;
    }

    let totalPrice = 0;

    cart.forEach(function(item) {
        totalPrice += item.price * item.count;
    });

    alert(
        "Дякуємо за замовлення!\n" +
        "Сума до сплати: " +
        totalPrice.toFixed(2) + " грн"
    );

    cart = [];
    saveCart();
}

// Пошук товарів

function searchProducts() {
    let search = document.getElementById("search").value.toLowerCase();
    let products = document.querySelectorAll(".product");
    let found = 0;

    products.forEach(function(product) {
        let name = product.dataset.name.toLowerCase();

        if (name.includes(search)) {
            product.style.display = "flex";
            found++;
        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("no-results").hidden = found !== 0;
}

// Повідомлення про додавання товару

function showNotification(message) {
    let notification = document.getElementById("notification");

    if (!notification) {
        return;
    }

    notification.textContent = "✓ " + message;
    notification.style.display = "block";

    clearTimeout(notificationTimer);

    notificationTimer = setTimeout(function() {
        notification.style.display = "none";
    }, 2000);
}

// Повернення нагору

function goUp() {
    window.scrollTo(0, 0);
}

// Оновлення при відкритті сторінки

updateCart();

window.addEventListener("pageshow", function() {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCart();
});
