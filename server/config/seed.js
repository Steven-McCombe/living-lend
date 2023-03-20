const db = require('./connection');
const { Category, Product, User, } = require('../models');

db.once('open', async () => {
    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});
    const categories = await Category.create([
        { name: 'Living Room' },
        { name: 'Dining Room' },
        { name: 'Bedroom' },
    ]);

    console.log('categories Seeded');
    
    const products = await Product.create([
        {
            name: 'Living Room chair',
            description: 'This comfortable and stylish chair is perfect for your living room. It is upholstered in soft, durable fabric and features a sturdy wooden frame. The chair comes with a cushioned seat and backrest, providing ample support for you to relax and unwind after a long day. With a classic design and neutral color, it will complement any decor style. Dimensions: 32" H x 26" W x 28" D.',
            image: "https://source.unsplash.com/JaXs8Tk5Iww?",
            price: 50.00,
            quantity: 20,
            category: categories[0]._id
              
        
        },
        {
            name: 'Dining Room Table',
            description: 'This elegant and functional dining table is perfect for hosting family dinners or entertaining guests. It is made of solid wood and features a beautiful natural finish. The table can comfortably seat six people and comes with matching chairs sold separately. The simple and sleek design will add a touch of sophistication to any dining room. Dimensions: 30" H x 60" W x 36" D',
            image: "https://source.unsplash.com/7OeyNx69jfs?",
            price: 75.00,
            quantity: 30,
            category: categories[1]._id
                
            
        },
        {
            name: 'Dining Room Chair',
            description: 'These beautiful dining room chairs are perfect for your next dinner party. They are made of solid wood and feature a comfortable padded seat and backrest. The chairs have a sleek and modern design, with a natural finish that will complement any dining room decor. Sold in sets of two. Dimensions: 32" H x 18" W x 20" D',
            image: "https://source.unsplash.com/kvmdsTrGOBM?",
            price: 100.00,
            quantity: 20,
            category: categories[1]._id
        },
        {
            name: 'Leather Sofa',
            description: 'This luxurious leather sofa is perfect for your living room. It is upholstered in top-grain leather and features a sturdy wooden frame. The sofa comes with plush cushions, providing ample support for you to relax and unwind after a long day. With a classic design and neutral color, it will complement any decor style. Dimensions: 35" H x 86" W x 38" D.',
            image: "https://source.unsplash.com/nWidMEQsnAQ?",
            price: 800.00,
            quantity: 10,
            category: categories[0]._id
        },
        {
            name: 'Crystal Chandelier',
            description: 'This beautiful crystal chandelier is perfect for your dining room or foyer. It features a classic design with elegant crystal accents, and will add a touch of sophistication to any room. The chandelier has six lights and is easy to install. Dimensions: 24" H x 24" W',
            image: "https://source.unsplash.com/QLJOPiVsRZQ?",
            price: 400.00,
            quantity: 5,
            category: categories[1]._id
        },
        {
            name: 'Wooden Coffee Table',
            description: 'This beautiful coffee table is perfect for your living room. It is made of solid wood and features a natural finish. The table has a simple and elegant design, with a large surface area and a lower shelf for additional storage. It will be the centerpiece of your living room, and a great place to gather around with friends and family. Dimensions: 18" H x 48" W x 24" D',
            image: "https://source.unsplash.com/GctCfIx8taQ?",
            price: 150.00,
            quantity: 15,
            category: categories[0]._id
        },
        {
            name: "Queen Size Bed",
            description: "This elegant and comfortable queen-size bed is perfect for your bedroom. It features a solid wood frame and a beautiful fabric headboard with button tufting. The bed comes with a sturdy slat system that provides excellent support for your mattress, ensuring a good night's sleep. With a timeless design and neutral color, it will complement any decor style. Mattress not included. Dimensions: 60\" H x 65\" W x 85\" D",
            image: "https://source.unsplash.com/nclN_J0UtJ8?",
            price: 450.00,
            quantity: 10,
            category: categories[2]._id
          },
          {
            name: "3-Drawer Dresser",
            description: "This stylish and practical 3-drawer dresser is perfect for storing your clothes and accessories. It features a solid wood frame and a sleek, modern design. The drawers are equipped with smooth glides that make opening and closing them easy and quiet. The dresser comes with metal handles that add a touch of sophistication to the piece. With ample storage space and a compact size, it will fit perfectly in your bedroom. Dimensions: 36\" H x 30\" W x 18\" D",
            image: "https://source.unsplash.com/_NbwONZam9Q?",
            price: 250.00,
            quantity: 15,
            category: categories[2]._id
          },
        {
            name: 'Bedroom Lamp',
            description: 'This stylish and practical lamp is perfect for your bedside table. It features a sleek and modern design with a metal base and a fabric shade. The lamp has a built-in dimmer switch, allowing you to adjust the light to your desired level of brightness. With a warm and inviting glow, it will create a cozy and relaxing ambiance in your bedroom. Dimensions: 18" H x 10" W x 10" D',
            image: "https://source.unsplash.com/AgU9-qsNc1Y?",
            price: 90.00,
            quantity: 35,
            category: categories[2]._id
                
            
        }

    ]);

    console.log('products seeded');

    await User.create([
        {
            firstName: 'John',
            lastName: 'doe',
            email: 'john@doe.com',
            password: 'johndoe1',
            orders: [
                {
                    products: [products[0].id, products[3].id, products[5].id]
                }
            ] 
            
        },
        {
            firstName: 'Admin',
            lastName: 'admin',
            email: 'admin@admin.com',
            password: 'Password1!',
            orders: [
                {
                    products: [products[0].id, products[3].id, products[5].id]
                }
            ],
            isAdmin: true
        },
        {
            firstName: 'Jane',
            lastName: 'doe',
            email: 'jane@doe.com',
            password: 'janedoe1',
            orders: [
                {
                    orderLength: 7,
                    products: [products[0].id, products[3].id, products[5].id, products[7].id]
                }
            ] 
            
        }
    ]);

    console.log('users seeded');      
    
    process.exit();
    
});