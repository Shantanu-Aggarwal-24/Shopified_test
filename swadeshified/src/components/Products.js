import React, { useState } from 'react';
import Layout from '../containers/Layout/index';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Input from '../containers/UI/Input/index';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../actions';
import Modal from '../containers/UI/Modal/index';
import './products/style.css'
import { generatePublicUrl } from '../urlConfig';

const Products = (props) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [shop, setShop] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [categoryId, setCategoryId] = useState('')
    const [productPictures, setProductPictures] = useState([]);
    const [show, setShow] = useState(false);
    const [productDetailModal, setProductDetailModal] = useState(false);
    const [productDetails, setProductDetails] = useState(null);
    const category = useSelector(state => state.category);
    const product = useSelector(state => state.product);
    const dispatch = useDispatch();

    const handleClose = () => {
        setShow(false);
    }

    const submitProductForm = () => {
        const form = new FormData();

        form.append('name', name);
        form.append('quantity', quantity);
        form.append('price', price);
        form.append('description', description);
        form.append('shop', shop);
        form.append('area', area);
        form.append('city', city);
        form.append('category', categoryId);

        for (let pic of productPictures) {
            form.append('productPictures', pic);
        }

        dispatch(addProduct(form)).then(() => setShow(false));

    }

    const handleShow = () => setShow(true)

    const handleProductPictures = (e) => {

        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }



    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });

            if (category.children.length > 0) {
                createCategoryList(cate.children, options);
            }
        }
        return options;
    }

    const renderProducts = () => {
        return (
            <Table style={{ fontSize: 12 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        {/* <th>Description</th> */}
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Shop</th>
                        <th>Area</th>
                        <th>City</th>
                        <th>productPictures</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ?
                            product.products.map(
                                <tr key={product._id}>
                                    <td>2</td>
                                    <td>{product.name}</td>
                                    {/* <td>{product.description}</td> */}
                                    <td>{product.price}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.category.name}</td>
                                    <td>{product.shop}</td>
                                    <td>{product.area}</td>
                                    <td>{product.city}</td>
                                    <td>
                                        <button onClick={() => showProductDetailsModal(product)}>
                                            Info
                                        </button>
                                        <button
                                            onClick={() => {
                                                const payload = {
                                                    productId: product._id,
                                                };
                                                dispatch(deleteProductById(payload))
                                            }}
                                        >
                                            Del
                                        </button>
                                    </td>

                                </tr>
                            ) : null
                    }
                </tbody>
            </Table>
        );
    }

    const renderAddProductModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Product'}
                onSubmit={submitProductForm}
            >
                <Input
                    label="Name"
                    value={name}
                    placeholder={`Product Name`}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    label="Quantity"
                    value={quantity}
                    placeholder={`Product quantity`}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <Input
                    label="Price"
                    value={price}
                    placeholder={`Product price`}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <Input
                    label="Description"
                    value={description}
                    placeholder={`Product description`}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <Input
                    label="Shop"
                    value={shop}
                    placeholder={`Shop name`}
                    onChange={(e) => setShop(e.target.value)}
                />

                <Input
                    label="Area"
                    value={area}
                    placeholder={`Area name`}
                    onChange={(e) => setArea(e.target.value)}
                />

                <Input
                    label="City"
                    value={city}
                    placeholder={`City name`}
                    onChange={(e) => setCity(e.target.value)}
                />

                <select className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option>Select category</option>
                    {
                        createCategoryList(category.categories).map((option) => (
                            <option key={option.value} value={option.value} >{option.name}</option>)
                        )}
                </select>



                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => (<div key={index}>{pic.name}</div>)) : null
                }


                <input type="file" name="productImage" onChange={handleProductPictures} />
            </Modal>
        );
    };

    const handleCloseProductDetailsModal = () => {
        setProductDetailModal(false);
    }

    const showProductDetailsModal = (product) => {
        setProductDetails(product);
        setProductDetailModal(true);
        //console.log(product);
    }

    const renderProductDetailsModal = () => {

        if (!productDetails) {
            return null;
        }


        return (
            <Modal
                show={productDetailModal}
                handleClose={handleCloseProductDetailsModal}
                modalTitle={'Product Details'}
                size="lg"
            >

                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>

                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>

                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>

                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Shop</label>
                        <p className="value">{productDetails.shop}</p>
                    </Col>

                    <Col md="6">
                        <label className="key">Area</label>
                        <p className="value">{productDetails.area}</p>
                    </Col>

                    <Col md="6">
                        <label className="key">City</label>
                        <p className="value">{productDetails.city}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Product Pictures </label>
                        <div style={{ display: 'flex' }}>
                            {productDetails.productPictures.map(picture =>(
                                <div className="productImgContainer">
                                    {/* <img src={generatePublicUrl(picture.img)} /> */}
                                   <img src={picture.img} alt="" /> 
                                </div>
                            ))}

                        </div>

                    </Col>
                </Row>
            </Modal>
        );
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3>Products</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {renderProducts()}
                    </Col>
                </Row>
            </Container>

            {renderAddProductModal()}
            {renderProductDetailsModal()}

        </Layout>
    );
};

export default Products;