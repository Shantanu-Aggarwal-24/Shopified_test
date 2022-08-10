import React from "react";
import { Row, Col, } from 'react-bootstrap';
import Input from '../../containers/UI/Input/index'
import Modal from '../../containers/UI/Modal/index';

const AddCategoriesModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage
    } = props;



    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={`Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className = "form-control-sm"
                    />
                </Col>
                <Col>
                    <select className="form-control form-control-sm"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {
                            categoryList.map(option =>
                                <option key={option.value} value={option.value} >{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>


        </Modal>
    )
}

export default AddCategoriesModal;