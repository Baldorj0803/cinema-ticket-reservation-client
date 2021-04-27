import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import { connect } from "react-redux";
import { role } from "../../auth/Role";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
const Menu = (props) => {
	const [drop, setDrop] = useState(false);
	return (
		<header className={styles.Menu}>
			<Link className={styles.text} to="/">
				Нүүр хуудас
			</Link>
			<Link className={styles.text} to="/movies">
				Одоо гарч буй
			</Link>
			<Link className={styles.text} to="/comingsoon">
				Тун удахгүй
			</Link>
			{props.userId ? (
				<>
					{role() === "user" && (
						<div className={styles.logout}>
							<span className={styles.text} onClick={() => setDrop(!drop)}>
								Хэрэглэгч
								<ArrowDropDownIcon />
							</span>
							<div style={{ display: drop ? "flex" : "none" }}>
								<div className={styles.item} onClick={() => setDrop(false)}>
									<Link style={{ textDecoration: "none" }} to="/my-order">
										Захиалгууд
									</Link>
								</div>
								<div className={styles.item} onClick={() => setDrop(false)}>
									<Link style={{ textDecoration: "none" }} to="/logout">
										Гарах
									</Link>
								</div>
							</div>
						</div>
					)}
					{role() === "manager" && (
						<div className={styles.logout}>
							<span className={styles.text} onClick={() => setDrop(!drop)}>
								Ажилтан
								<ArrowDropDownIcon />
							</span>
							<div style={{ display: drop ? "flex" : "none" }}>
								<div className={styles.item} onClick={() => setDrop(false)}>
									<Link style={{ textDecoration: "none" }} to="/dashboard">
										Dashboard
									</Link>
								</div>
								<div className={styles.item} onClick={() => setDrop(false)}>
									<Link style={{ textDecoration: "none" }} to="/logout">
										Гарах
									</Link>
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<>
					<Link className={styles.text} to="/login">
						Нэвтрэх
					</Link>
					<Link className={styles.text} to="/signup">
						Бүртгүүлэх
					</Link>
				</>
			)}
		</header>
	);
};

const mapStateToProps = (state) => {
	return {
		userId: state.signupLoginReducer.userId,
	};
};

export default connect(mapStateToProps)(Menu);
