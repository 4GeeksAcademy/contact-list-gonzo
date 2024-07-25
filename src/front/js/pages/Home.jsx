import React, { useContext } from "react";
import "../../styles/home.css";
import FondoStar from "/workspaces/contact-list-gonzo/src/front/img/11.jpeg";

export const Home = () => {

	return (
		<div className="vh-100 vw-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${FondoStar})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="container text-white text-center">
                <h1>Api STAR WARS</h1>
                <p>Pesadillas con Java Script</p>
            </div>
        </div>
	);
};
