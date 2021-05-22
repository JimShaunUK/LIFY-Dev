//base starting products

const products = [
    //alpha one products
  {
    name: 'Jumper',
    image: '/images/alpha1.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 30.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Cotton Shirt',
    image: '/images/alpha2.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 25.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Fitted Shirt - Cotton',
    image: '/images/alpha3.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 25.00,
    countInStock: 3,
    canDeliver:true
    
  },
  {
    name: 'Evening Dress',
    image: '/images/alpha4.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 80.00,
    countInStock: 3,
    canDeliver:true
    
  },
  {
    name: 'Wax Jacket',
    image: '/images/alpha5.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 115.00,
    countInStock: 3,
    canDeliver:true
    
  },
  {
    name: 'Foriblu Bag',
    image: '/images/alpha6.jpg',
    store: '609fc28e0043ba2e7d51004f',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 65.00,
    countInStock: 3,
    canDeliver:true
  },
  //coco blue boutique
  {
    name: 'Berlin Bluebell',
    image: '/images/coco1.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 165.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Berlin Ivory',
    image: '/images/coco2.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 145.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Delphine Slate Python',
    image: '/images/coco3.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 117.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Kamille Dress - Olive',
    image: '/images/coco4.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 279.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Rosanna Snake Rose',
    image: '/images/coco5.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 379.00,
    countInStock: 3,
    canDeliver:true
  },
  {
    name: 'Orange Cap Sleeve Dress',
    image: '/images/coco6.jpg',
    store: '609fc28e0043ba2e7d510051',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 379.00,
    countInStock: 3,
    canDeliver:true
  },
  //Antiques products
  {
    name: 'Restored Rocking Chair',
    image: '/images/anti1.jpg',
    store: '609fc28e0043ba2e7d510053',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 80.00,
    countInStock: 1,
    canDeliver:false
  },
  {
    name: 'Bedside Unit',
    image: '/images/anti2.jpg',
    store: '609fc28e0043ba2e7d510053',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 60.00,
    countInStock: 1,
    canDeliver:false
  },
  {
    name: 'Georgian Lamp',
    image: '/images/anti3.jpg',
    store: '609fc28e0043ba2e7d510053',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 55.00,
    countInStock: 1,
    canDeliver:false
  },
  {
    name: 'Desk Globe',
    image: '/images/anti4.jpg',
    store: '609fc28e0043ba2e7d510053',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 25.00,
    countInStock: 1,
    canDeliver:false
  },
  {
    name: 'Brass Knockers',
    image: '/images/anti6.jpg',
    store: '609fc28e0043ba2e7d510053',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis neque eu dolor sollicitudin elementum. Nam vulputate quis est quis auctor. Integer a tincidunt elit. Aliquam maximus iaculis tortor.',
    price: 20.00,
    countInStock: 1,
    canDeliver:true
  },
]

export default products
