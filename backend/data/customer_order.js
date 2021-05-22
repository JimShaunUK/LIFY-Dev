

const customer_order = [
    //alpha one products
  {
    user: "609e80e9b3cf5a296e4d9ffb",
    orderItems:[{
        name:"Jumper",
        qty:1,
        image:"/images/alpha1.jpg",
        price:30.00,
        store:"609fc28e0043ba2e7d51004f",
        product:"609fcc871478d730343414a9"
         },
        {
        name:"Brass Knockers",
        qty:1,
        image:"/images/anti6.jpg",
        price:20.00,
        store:"609fc28e0043ba2e7d510053",
        product:"609fcc871478d730343414b9"
        }
    ],
    storeOrders:[],
    shippingAddress:{
        address:"3 Belvedere Road",
        city: "Taunton",
        county: "Somerset",
        postcode: "TA11HD"
    },
    paymentMethod:"Card",
    processingPrice:3.00,
    deliveryPrice:5.00,
    totalPrice: 58.00,
    isPaid: false,
    isCollection:true,
}
]



export default customer_order