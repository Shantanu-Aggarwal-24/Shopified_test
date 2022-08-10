import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const NewLoginModal = (props) => {

    const {
        setEmail,
        setPassword
    } = props;


    return (
        <Modal
            {...props}
            size="sm"
            // aria-labelledby ="conatined-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.handleclose}
            animation={false}
        >

            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    SignIn
                    {/* {Title} */}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6>Email</h6>
                    <input
                        type="text"
                        label="EmailId"
                        placeholder="Enter Your Email"
                        value={props.email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                </div>

                <div>
                    <h6>Password</h6>
                    <input
                        type="text"
                        label="Password"
                        placeholder="Enter Your Password"
                        value={props.password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    {...props}
                    style={{ backgroundColor: "blue" }}
                    onClick={props.onSubmit}
                >
                    Login
                </Button>
            </Modal.Footer>

        </Modal>
    )
}

export default NewLoginModal;






