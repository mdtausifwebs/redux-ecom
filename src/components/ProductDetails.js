import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct ,removeSelectedProduct } from "../redux/actions/productActions";
const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const { title, image, price, category, description } = product;
  console.log("product", product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const fetchProductDetails = async () => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .catch((err) => {
        console.log("err", err);
      });
    dispatch(selectedProduct(response.data));
  };
  useEffect(() => {
    if (productId && productId !== "") fetchProductDetails();
    return ()=>{
      dispatch(removeSelectedProduct())
    }
  }, [productId]);
  return (
    <div className="ui placeholder segment">
      {Object.keys(product).length === 0 ? (
        <div>loading....</div>
      ) : (
        <div className="ui two column stackable center aligned grid">
          <div className="ui verticle divide">AND</div>
          <div className="middle aligned row">
            <div className="column lp">
              <img className="ui fluid image " src={image} />
            </div>
            <div className="column rp">
              <h1>{title}</h1>
              <h2>
                <a className="ui teal tag lebel">${price}</a>
              </h2>
              <h3 className="ui brown block header">{category}</h3>
              <p>{description}</p>
              <div className="ui verticle animated button" tabIndex="0">
                <div className="hidden content">
                  <i className="shop icon"></i>
                </div>
                <div className="visible content">Add to Cart</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
