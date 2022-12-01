//флажки для сортировки товаров
function toggleCheckbox() {
    const checkbox = document.querySelectorAll('.filter-check_checkbox');


    checkbox.forEach(function (element) {
        element.addEventListener('change', function () {
            this.nextElementSibling.classList.toggle('checked');
        });
    });

}
toggleCheckbox();
//кон флажки для сортировки

//корзина(отображение)
function korzina() {
    //по факту это тоже создание функции, но немного иная запись, более красивая и удобная
    const cart = document.getElementById('cart'), cartInner = document.querySelector('.cart'), cartClose = document.querySelector('.cart-close');
    // queryselector может работать со всеми селекторами. если ищем по id, то перед названием пишем #, по классу- добавляем точку, а если стилизуем тэги, то без символов
    cart.addEventListener('click', function () {
        cartInner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    cartClose.addEventListener('click', function () {
        cartInner.style.display = 'none';
        document.body.style.overflow = '';
    });
}
korzina();
//кон корзина

//добавить в корзину
const addCart = () => {

    const cards = document.querySelectorAll('.goods .card'),
        cartWrapper = document.querySelector('.cart-wrapper'),
        cartEmpty = document.getElementById('cart-empty'),
        cartCounter = document.querySelector('.counter');

    cards.forEach((card) => {
        const btn = card.querySelector('button');
        btn.addEventListener('click', function () {
            const cardClone = card.cloneNode(true);
            cartWrapper.appendChild(cardClone);
            cardSum();

            const removeBtn = cardClone.querySelector('.btn');
            removeBtn.textContent = 'Удалить из корзины';
            removeBtn.addEventListener('click', () => {
                cardClone.remove();
                cardSum();
            });
        });
    });

    const cardSum = () => {
        const cardsCart = cartWrapper.querySelectorAll('.card'),
            cardsPrice = cartWrapper.querySelectorAll('.card-price'),
            cartTotal = document.querySelector('.cart-total span');
        let sum = 0;
        cartCounter.textContent = cardsCart.length;

        cardsPrice.forEach(function (cardPrice) {
            let price = parseFloat(cardPrice.textContent);
            sum = sum + price;
        });
        console.log(sum);
        cartTotal.textContent = sum;

        if (cardsCart.length) {
            cartEmpty.remove();
        } else {
            cartWrapper.appendChild(cartEmpty);
        }
    }
}
addCart();
//кон доб в корзину

//фильтр акции

const actionPage = () => {
    const cards = document.querySelectorAll('.goods .card'),
    discountCheckbox = document.getElementById('discount-checkbox'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn');

    discountCheckbox.addEventListener('click',() => {
        cards.forEach((card) => {
            if(discountCheckbox.checked){
                if(!card.querySelector('.card-sale')){
                    card.parentNode.style.display = 'none';
                }
            } else {
                card.parentNode.style.display = '';
            }
        });
    });
const filterPrice = () => {
cards.forEach((card) => {
    const cardPrice = card.querySelector('.card-price'),
    price = parseFloat(cardPrice.textContent);

    if((min.value && price < min.value) || (max.value && price > max.value)){
        card.parentNode.style.display = 'none';
    } else {
        card.parentNode.style.display = '';
    }
});
}
    min.addEventListener('change',filterPrice);
    max.addEventListener('change',filterPrice);

    searchBtn.addEventListener('click',() => {
        // addeventlistener это обработчик событий, который принимает 2 аргумента, 1 аргумент- само событие, 2- функция, которая отрабатывает 1 событие
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((card) =>{
        const title = card.querySelector('.card-title');
        if(!searchText.test(title.textContent)){
            card.parentNode.style.display = 'none';
        } else {
            card.parentNode.style.display = '';
        }
    });
    });
}
actionPage();
//кон фильтр акции