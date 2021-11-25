import axios from 'axios'

let addToCart = document.querySelectorAll('.add-to-cart')
// let cartCounter = document.querySelector('#cartCounter')

function updateCart(merch) {
    axios.post('/update-cart', merch).then(res => {
        console.log(res)
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let merch = JSON.parse(btn.dataset.merch)
        updateCart(merch)
    })
})