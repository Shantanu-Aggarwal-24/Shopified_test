import React from 'react';
import { Modal, Button } from 'react-bootstrap';


const NewModal = (props) => {
    return (
        <Modal ml={15} size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}

                {
                    props.buttons ? (
                        props.buttons.map((btn, index) => (
                            <Button key={index} variant={btn.color} onClick={btn.onClick}>
                                {btn.label}
                            </Button>
                        ))
                    ) : (
                        <Button variant="primary" {...props} style={{ backgroundColor: "#333" }}
                            className="btn-sm" onClick={props.handleClose}>
                            Save Changes
                        </Button>
                    )}

            </Modal.Footer>
        </Modal>

    );
}

export default NewModal;





// <Input
//                     value={categoryName}
//                     placeholder={`Category Name`}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />

//                 <select className="form-control"
//                     value={parentCategoryId}
//                     onChange={(e) => setParentCategoryId(e.target.value)}>
//                     <option>Select category</option>
//                     {
//                         createCategoryList(category.categories).map(option =>
//                             <option key={option.value} value={option.value} >{option.name}</option>)
//                     }
//                 </select>

//                 <input type="file" name="categoryImage" onChange={handleCategoryImage} />