import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { Link } from "react-router-dom";
import Card from "../../../containers/UI/Card/index";
import { MaterialButton } from "../../../containers/MaterialUI/index";
import Rating from "../../../containers/UI/Rating";
import Price from "../../../containers/UI/Price";


const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const priceRange = product.priceRange;
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <Card
                        headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
                        headerRight={
                            <MaterialButton
                                title={"VIEW ALL"}
                                style={{
                                    width: "96px",
                                }}
                                bgColor="#2874f0"
                                fontSize="12px"
                            />
                        }
                        style={{
                            width: "calc(100% - 40px)",
                            margin: "20px"
                        }}
                    >
                        <div style={{ display: "flex" }} >
                            {
                                product.productsByPrice[key].map((product) => (
                                    <Link
                                        to={`/${product.slug}/${product._id}/p`}
                                        style={{
                                            display: "block",
                                            textDecoration: "home",
                                            color: "#000"
                                        }}
                                        className="productContainer"
                                    >
                                        <div className="productImgContainer">
                                            <img src={product.productPictures[0].img} alt="" />
                                        </div>
                                        <div className="productInfo">
                                            <div style={{ margin: "10px 0" }}>{product.name}</div>
                                            <div>
                                                <Rating value="4.3" />
                                                <span
                                                    style={{
                                                        color: "#777",
                                                        fontWeight: "500",
                                                        fontSize: "12px"
                                                    }}>
                                                    (3353)
                                                </span>
                                            </div>
                                            <Price value={product.price} />
                                        </div>

                                    </Link>
                                ))}

                        </div>
                    </Card>
                );
            })}
        </>
    );
}

export default ProductStore;

