require('dotenv').config()
const mongoose = require('mongoose')
const Products = require('../model/products')

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to mongoDB');
    }).catch((error)=>{
        console.log('error while connecting',error);
        process.exit(1)
    })

const products =[
    {
        title:"Fastrack Vyb Maverick Quartz Analog Brown Dial Metal Strap Watch For Guys",
        productImage:[
            "pimages/w1.0.jpg",
            "pimages/w1.1.jpg",
        ],
        brand:'Fastrack',
        price:'850',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Fastrack Opulence Sun Moon Chronograph Black Dial Black Metal Strap Analog Quartz Watch For Guys",
        productImage:[
            "pimages/w2.0.jpg",
            "pimages/w2.1.jpg",
        ],
        brand:'Fastrack',
        price:'1.75',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Fastrack Trendies Quartz Analog Black Dial Silicone Strap Watch for Guys",
        productImage:[
            "pimages/w3.0.jpg",
            "pimages/w3.1.jpg",
        ],
        brand:'Fastrack',
        price:'1500',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Fastrack Vyb Runway Quartz Analog Rose Gold Dial Stainless Steel Strap Watch for Girls",
        productImage:[
            "pimages/w4.0.jpg",
            "pimages/w4.1.jpg",
        ],
        brand:'Fastrack',
        price:'1350',
        quantity:10,
        gender:'Female',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Fastrack Stunners Silver Dial Leather Strap Watch for Girls",
        productImage:[
            "pimages/w5.0.jpg",
            "pimages/w5.1.jpg",
        ],
        brand:'Fastrack',
        price:'600',
        quantity:10,
        gender:'Female',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Vyb Diva By Fastrack Quartz Analog Pink Dial Metal Strap Watch For Girls",
        productImage:[
            "pimages/w6.0.jpg",
            "pimages/w6.1.jpg",
        ],
        brand:'Fastrack',
        price:'999',
        quantity:10,
        gender:'Female',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Fastrack The Minimalists Quartz Analog Grey Dial Silicone Strap Unisex Watch",
        productImage:[
            "pimages/w7.0.jpg",
            "pimages/w7.1.jpg",
        ],
        brand:'Fastrack',
        price:'855',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"Fastrack Hype Neo Chic Quartz Analog Black Dial Silicone Strap Watch For Unisex",
        productImage:[
            "pimages/w8.0.jpg",
            "pimages/w8.1.jpg",
        ],
        brand:'Fastrack',
        price:'1425',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Fastrack Hashtag Quartz Analog White Dial Silicone Strap Unisex Watch",
        productImage:[
            "pimages/w9.0.jpg",
            "pimages/w9.1.jpg",
        ],
        brand:'Fastrack',
        price:'895',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
     {
        title:"CASIO A159WA-N1",
        productImage:[
            "pimages/A159WA-N11.0.jpg",
            "pimages/A159WA-N11.1.jpg",
        ],
        brand:'CASIO',
        price:'1289',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
     {
        title:" CASIO ABL-100WEPC-1B",
        productImage:[
            "pimages/ABL-100WEPC-1B1.0.jpg",
            "pimages/ABL-100WEPC-1B1.1.jpg",
        ],
        brand:'CASIO',
        price:'1599',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"CASIO AQ-230GG-2A",
        productImage:[
            "pimages/AQ-230GG-2A1.0.jpg",
            "pimages/AQ-230GG-2A1.1.jpg",
        ],
        brand:'CASIO',
        price:'1616',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"CASIO F-91 W-1",
        productImage:[
            "pimages/F-91 W-11.0.jpg",
            "pimages/F-91 W-11.1.jpg",
        ],
        brand:'CASIO',
        price:'1200',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Ballon-bleu-de-cartier",
        productImage:[
            "pimages/ballon-bleu-de-cartier1.0.jpg",
            "pimages/ballon-bleu-de-cartier1.1.jpg",
        ],
        brand:'CARTEIR',
        price:'5789',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Cartier W",
        productImage:[
            "pimages/cartier1.0.jpg",
            "pimages/cartier1.1.jpg",
        ],
        brand:'CARTEIR',
        price:'2399',
        quantity:10,
        gender:'Female',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Santos-de-cartier",
        productImage:[
            "pimages/santos-de-cartier1.0.jpg",
            "pimages/santos-de-cartier1.1.jpg",
        ],
        brand:'CARTEIR',
        price:'5029',
        quantity:10,
        gender:'Female',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
    {
        title:"Tank Louis Cartier",
        productImage:[
            "pimages/tank-louis-cartier1.0.jpg",
            "pimages/tank-louis-cartier1.1.jpg",
        ],
        brand:'CARTEIR',
        price:'6099',
        quantity:10,
        gender:'Male',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
     {
        title:"G-SHOCK GA-140GB-1A1",
        productImage:[
            "pimages/GA-140GB-1A1 G-SHOCK 1.0.jpg",
            "pimages/GA-140GB-1A1 G-SHOCK 1.1.jpg",
        ],
        brand:'G-SHOCK',
        price:'5290',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
     {
        title:"G-SHOCK GA-2100-1A1",
        productImage:[
            "pimages/GA-2100-1A1 GSHOCK1.0.jpg",
            "pimages/GA-2100-1A1 GSHOCK1.1.jpg",
        ],
        brand:'G-SHOCK',
        price:'6009',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"G-SHOCK GDB-200-2 blue",
        productImage:[
            "pimages/GDB1.0.jpg",
            "pimages/GDB1.1.jpg",
        ],
        brand:'G-SHOCK',
        price:'7098',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
        {
        title:"G-SHOCK GDB-200-2",
        productImage:[
            "pimages/GDB2.1.jpg",
            "pimages/GDB2.2.jpg",
        ],
        brand:'G-SHOCK',
        price:'7099',
        quantity:10,
        gender:'Unisex',
        services:[
                {icon:'pimages/truck.png',type:'free delivery'},
                {icon:'pimages/verify.png',type:'1 year warrenty'},
        ],
    },
];

const seedProduct = async() =>{
    try {
        //clear all existing products
        await Products.deleteMany({})

        //insert unique product
        const uniqueProduct = Array.from(
            new Map(products.map(p=>[p.title,p])).values()
        )

        await Products.insertMany(uniqueProduct)
        console.log('product seeded successfully');
    } catch (error) {
        console.error('failed to seed products',error);
    }
} 

seedProduct()
