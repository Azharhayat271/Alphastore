import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import QRCode from 'qrcode.react';
import {ToastObjects} from "../util/toastObject";
import { toast } from "react-toastify";


const Products = (props) => {
    const productDetails = props.details.data;
    const { image, title, price, description, stock } = productDetails;
    const [itemQty, setItemQty] = useState(1);
    const dispatch = useDispatch();

    const addToCartHandle = (product) => {
        if (stock > 0) {
            dispatch(addToCart(product, itemQty));
        } else {
            // Display an error message or handle out-of-stock scenario
            toast.error("Product is Out of Stock", ToastObjects);
        }
    }

    const handleItemQty = (e) => {
        setItemQty(e.target.value);
    }

    return (
        <>
            <section className="single-product section">
                <div className="section-center single-product-center">
                    <img src={image} className="single-product-img img" alt="" />
                    <article className="single-product-info">
                        <div>
                            <h2 className="single-product-title">{title}</h2>
                            <p className="single-product-company text-slanted">by Alpha</p>
                            <span className="single-product-price">${price}</span>
                            <div className="single-product-colors">
                                <span className="product-color" />
                                <span className="product-color product-color-red" />
                            </div>
                            <p className="single-product-desc">
                                {description}
                            </p>
                            <p className="item-qty">
                                <select onChange={handleItemQty} defaultValue={itemQty}>
                                    {[...Array(10)].map((_, index) => (
                                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                                    ))}
                                </select>
                            </p>
                            <div className="qr-code-container">
                                <QRCode value={JSON.stringify(productDetails)} />
                            </div>
                            <button className="addToCartBtn btn" data-id="id" onClick={() => addToCartHandle(productDetails)}>
                                add to cart
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}

export default Products;
