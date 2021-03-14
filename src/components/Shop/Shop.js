import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const[products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys  = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity =savedCart[existingKey];
            console.log(existingKey, savedCart[existingKey]);
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) =>{

        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }

        //const newCart = [...cart, product];
        //ager cart gulore array er moddhe copy korte hole 3 dot use hoy

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className = 'twin-container'>
            <div className="product-container">
                    {
                        products.map(pd => <Product 
                            key = {pd.key}
                            handleAddProduct = {handleAddProduct}
                            product = {pd}
                        ></Product>)
                    }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                <Link to = '/review'>
                    <button className = 'main-button'>Review order</button>
                </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;

//parallel vabe props use kora jay naa...props ta child er khetre hye thakee
//parallel vabe pathate hole database(local storage) e pathate hoy or rout parameter hisebe kintu seta recommended naa...
//ejonno use kora hoy context api jeta provider diye kaj kore
//ektu advance hole redux diye korle valo hoy
//ei project e local storage diye kora hoise