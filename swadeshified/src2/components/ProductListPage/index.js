import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../containers/Layout';
import { getProductsBySlug } from '../../actions';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import ProductStore from './ProductStore';
import getParams from '../../utils/getParams';
import ClothingAndAccesories from './ClothingAndAccesories/index';
import ProductPage from './ProductPage';
const ProductListPage = (props) => {
    const product = useSelector(state => state.product);
    const [priceRange, setPriceRange] = useState({
        under5K: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
        under50k: 50000,
        under100k: 100000
    });
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log(props);
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    const renderProduct = () => {
        console.log(props);
        const params = getParams(props.location.search);
        let content = null;
        switch (params.type) {
            case "store":
                content = <ProductStore {...props} />
                break;
            case "page":
                content = <ProductPage {...props} />
                break;
            default:
                content = <ClothingAndAccesories {...props} />;
        }
        return content;
    };






    // return (


    //     <Layout>
    //         {
    //             Object.keys(product.productsByPrice).map((key, index) => {
    //                 return (
    //                     <div className="card">
    //                         <div className="cardHeader">
    //                             <div >{props.match.params.slug} Mobile under {priceRange[key]}</div>
    //                             <button>view all</button>
    //                         </div>
    //                         <div style={{ display: 'flex' }}>
    //                             {
    //                                 product.productsByPrice[key].map(product =>
    //                                     <div className="productContainer">
    //                                         <div className="productImgContainer">
    //                                             <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
    //                                         </div>
    //                                         <div className="productInfo">
    //                                             <div style={{ margin: '5px 0' }}>{product.name}</div>
    //                                             <div>
    //                                                 <span>4.3</span>&nbsp;
    //                                                 <span>3353</span>
    //                                             </div>
    //                                             <div className="productPrice">{product.price}/-</div>
    //                                         </div>
    //                                     </div>)
    //                             }

    //                         </div>
    //                     </div>
    //                 );
    //             })
    //         }

    //     </Layout>
    // )
     
    return <Layout>{renderProduct()}</Layout>
}
export default ProductListPage;