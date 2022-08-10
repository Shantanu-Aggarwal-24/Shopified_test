import React, { useEffect, useState } from 'react';
import './style.css';
//import {swadeshifiedLogo} from "";
//import goldenStar from "";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { Modal, MaterialInput, MaterialButton, DropDownMenu } from '../MaterialUI';
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";
import NewLoginModal from '../Modal';


const Header = (props) => {
   const [loginModal, setLoginModal] = useState(true);
   const [signup, setSignup] = useState(false);
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [show, setShow] = useState(false);
   const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch();

   //state cart value
   const cart = useSelector((state) => state.cart);

   const userSignup = () => {
      const user = { firstName, lastName, email, password };
      if (firstName === "" || lastName === "" || email === "" || password === "") {
         return;
      }

      dispatch(_signup(user));
   }

   const userLogin = () => {
      if (signup) {
         userSignup();
      } else {
         const user = {email, password}
         dispatch(login(user));
      }
   };

   const logout = () => {
      dispatch(signout());
   }

   useEffect(() => {
      if (auth.authenticate) {
         setLoginModal(false);
      }

   }, [auth.authenticate]);

   const renderLoggedInMenu = () => {
      return (
         <DropDownMenu
            menu={<a className="fullName">{auth.user.firstName}{auth.user.lastName}</a>}
            menus={[
               // { label: "My Profile", href: "", icon: null },
               //{label:"superCoin Zone", href:"", icon: null},
               //{label:"FlipKart Plus Zone", href: "", icon:null},
               {
                  label: "Orders",
                  href: `/account/orders`,
                  icon: null
               },
               { label: "Wishlist", href: "", icon: null },
               { label: "My Charts", href: "", icon: null },
               { label: "Coupons", href: "", icon: null },
               { label: "Rewards", href: "", icon: null },
               { label: "Notifications", href: "", icon: null },
               { label: "Gift Cards", href: "", icon: null },
               { label: "Logout", href: "", icon: null, onClick: logout },
            ]}
         />
      );
   };

   const renderNonLoggedInMenu = () => {
      return (
         <DropDownMenu
            menu={
               <a
                  className="loginButton"
                  onClick={() => {
                     //setLoginModal(true);
                     setSignup(false);
                     setShow(true);
                  }}
               >
                  Login
               </a>
            }
            menus={[
               { label: "My Profile", href: "", icon: null },
               {
                  label: "Orders",
                  href: `/account/orders`,
                  icon: null,
                  onClick: () => {
                     !auth.authenticate && setLoginModal(true);
                  },
               },
               { label: "wishlist", href: "", icon: null }
            ]}
            firstMenu={
               <div className="firstmenu">
                  <span>New Customer?</span>
                  <a
                     onClick={() => {
                        setLoginModal(true);
                        setSignup(true)
                     }}
                     style={{ color: "#2874f0" }}
                  >
                     Sign Up
                  </a>
               </div>
            }
         />
      );
   };

   return (
      <>
         <div>
            <NewLoginModal
               show={show}
               handleclose = {() => setShow(false)}
               onSubmit={userLogin}
               email={email}
               setEmail={setEmail}
               password={password}
               setPassword={setPassword}
            />



         </div>


         <div className="header">
            {/* <Modal visilble={loginModal} onClose={() => setLoginModal(false)}>
            <div className="authContainer" >
               <div className="row">
                  <div className="leftspace">
                     <h2>Login</h2>
                     <p>Get Access to your Orders, Wishlist and Recommendations</p>
                  </div>
                  <div className="rightspace" >
                     <div className="loginInputContainer">
                        {auth.error && (
                           <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                        )}
                        {signup && (
                           <MaterialInput
                              type="text"
                              label="First Name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                           />
                        )}
                        {signup && (
                           <MaterialInput
                              type="text"
                              label="Last Name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                           />
                        )}

                        <MaterialInput
                           type="text"
                           label="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />

                        <MaterialInput
                           type="password"
                           label="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />

                        <MaterialButton
                           title={signup ? "Register" : "Login"}
                           bgColor="#fb641b"
                           textColor="#ffffff"
                           style={{
                              margin: "40px 0 20px 0"
                           }}
                           onClick={userLogin}
                        />
                        <p style={{ textAlign: "center" }}>OR</p>

                        <MaterialButton
                           title="Request OTP"
                           bgColor="#ffffff"
                           textColor="#2874f0"
                           style={{
                              margin: "20px 0"
                           }}
                        />

                     </div>

                  </div>
               </div>
            </div>
         </Modal> */}

            <div className="subHeader">
               {/*Logo  */}
               <div className="logo">
                  <a href="">
                     {/* <img src="" className="" alt="" /> Swadeshified logo will be place here */}
                  </a>
                  <a style={{ marginTop: "-10px" }}>
                     <span className="exploreText">Explore</span>
                     <span className="plusText">Plus</span>
                     <img src="" className="goldenStar" alt="" />{/*golden star will be place here*/}
                  </a>
               </div>
               {/* Logo ends here */}

               {/* Search Component */}
               <div
                  style={{
                     padding: "0 10px"
                  }}
               >
                  <div className="searchInputContanier">
                     <input
                        className=""
                        placeholder={"Search for Products, Brands and more"}
                     />
                     <div className="searchIconContainer">
                        <IoIosSearch
                           style={{
                              color: "#2874f0"
                           }}
                        />
                     </div>
                  </div>
               </div>
               {/* Search Component ends here */}

               {/*Right Side Menu  */}
               <div className="rightMenu">
                  {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
                  <DropDownMenu
                     menu={
                        <a className="more">
                           <span>More</span>
                           <IoIosArrowDown />
                        </a>
                     }
                     menus={[
                        { label: "Notification Preference", href: "", icon: null },
                        { label: "24x7 Customer care", href: "", icon: null },

                     ]}
                  />
                  <div>
                     <a href={`/cart`} className="cart">
                        <Cart count={Object.keys(cart.cartItems).length} />
                        <span style={{ margin: "0 10px" }}>Cart</span>
                     </a>
                  </div>
               </div>
               {/* right side menu ends here */}
            </div>
         </div>
      </>
   );
};

export default Header;
