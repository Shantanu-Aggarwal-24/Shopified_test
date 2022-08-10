import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import Card from "../../../containers/UI/Card";
import { BiRupee } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./style.css";

const ClothingAndAccesories = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex"
                }}
            >{product.products.map((product) => (
                <div className="caContainer">
                    <Link
                        className="caImgContanier"
                        to={`/${product.slug}/${product._id}/p`}
                    >
                        <img src={product.productPictures[0].img} />
                    </Link>
                    <div>
                        <div className="canProductName">{product.name}</div>
                        <div className="caProductPrice">
                            <BiRupee />
                        </div>
                    </div>
                </div>
            ))}
            </Card>
        </div>
    );
};

export default ClothingAndAccesories;