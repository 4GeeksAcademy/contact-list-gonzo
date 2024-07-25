import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-md navbar-dark bg-danger" data-bs-theme="dark">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">Gonzo-List</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
					<div className="offcanvas-header">
						<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
						<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div className="offcanvas-body">
						<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li className="nav-item">
								<Link className="nav-link active" aria-current="page" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contact-list">Lista Contactos</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
