import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'
import moment from 'moment'
//import { initStripe } from './stripe'

let addToCart = document.querySelectorAll('.add-to-cart')
let deleteFromCart = document.querySelectorAll('.delete-from-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(merch) {
    axios.post('/update-cart', merch).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let merch = JSON.parse(btn.dataset.merch)
        updateCart(merch)
    })
})

function deleteCart(merch) {
    axios.post('/delete-cart', merch).then(res => {
        cartCounter.innerText = res.data.totalQty
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong in deletion',
            progressBar: false,
        }).show();
    })
}

deleteFromCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let merch = JSON.parse(btn.dataset.merch)
        deleteCart(merch)
    })
})

const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}

let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format("MM.DD.YYYY")
            status.appendChild(time)

           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })
}

updateStatus(order);

let socket = io()
initAdmin(socket)

if(order) {
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname;
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', () => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
    }).show();
})
