let selectedSize = '';
let selectedCrust = '';
let selectedDrink = '';
let toppings = [];

document.querySelectorAll('.pizza-option').forEach(option => {
    option.addEventListener('click', function() {
        // Update the selected pizza size
        selectedSize = option.getAttribute('data-size');
        document.querySelectorAll('.pizza-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

document.querySelectorAll('.crust-option').forEach(option => {
    option.addEventListener('click', function() {
        // Update the selected crust type
        selectedCrust = option.getAttribute('data-crust');
        document.querySelectorAll('.crust-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
    });
});

document.querySelectorAll('input[name="toppings"]').forEach(option => {
    option.addEventListener('change', function() {
        // Update toppings list
        toppings = Array.from(document.querySelectorAll('input[name="toppings"]:checked')).map(input => input.value);
    });
});

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get customer info and selected options
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const drink = document.getElementById('drink').value;
    const deliveryTime = document.getElementById('delivery-time').value;
    const notes = document.getElementById('notes').value;

    // Price calculation based on size
    let basePrice = 0;
    if (selectedSize === 'small') basePrice = 8.99;
    if (selectedSize === 'medium') basePrice = 12.99;
    if (selectedSize === 'large') basePrice = 16.99;
    if (selectedSize === 'extra-large') basePrice = 19.99;
    if (selectedSize === 'personal') basePrice = 6.99;

    // Add price for crust type
    let crustPrice = selectedCrust === 'gluten-free' ? 2 : 0;

    // Topping price
    let toppingPrice = toppings.length * 1.5;

    // Drink price
    let drinkPrice = (drink === 'none') ? 0 : (drink === 'cola' || drink === 'sprite' ? 1.99 : 0);

    // Total price calculation
    let totalPrice = (basePrice + toppingPrice + crustPrice + drinkPrice) * quantity;

    // Summary HTML
    let summaryHTML = `
        <p><strong>Customer Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pizza Size:</strong> ${selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}</p>
        <p><strong>Crust Type:</strong> ${selectedCrust.charAt(0).toUpperCase() + selectedCrust.slice(1)}</p>
        <p><strong>Toppings:</strong> ${toppings.length ? toppings.join(', ') : 'None'}</p>
        <p><strong>Drink:</strong> ${drink === 'none' ? 'None' : drink.charAt(0).toUpperCase() + drink.slice(1)}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Preferred Delivery Time:</strong> ${deliveryTime}</p>
        <p><strong>Notes:</strong> ${notes ? notes : 'None'}</p>
        <h3>Total Price: $${totalPrice.toFixed(2)}</h3>
    `;

    // Display order summary
    document.getElementById('summary-details').innerHTML = summaryHTML;
    document.querySelector('.order-summary').style.display = 'block';
});
