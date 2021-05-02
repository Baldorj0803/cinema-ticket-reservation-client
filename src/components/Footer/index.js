import React, { useEffect, useState } from "react";
import css from "./style.module.css";
import axios from "axios";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import { API } from "../../config";

const Footer = () => {
	const [branches, setBranches] = useState([]);
	useEffect(() => {
		axios
			.get(`${API}/branches`)
			.then((res) => {
				setBranches(res.data.data);
			})
			.catch((err) => {
				console.log(err.response);
			});
	}, []);

	return (
		<div className={css.Footer}>
			<div className={css.Social}>
				<FacebookIcon />
				<InstagramIcon />
				<TwitterIcon />
				<YouTubeIcon />
			</div>
			<div className={css.Branch}>
				<span>Салбарууд</span>
				{branches.map((branch) => {
					return (
						<div key={branch._id}>
							<LocationCityIcon fontSize="small" />
							{branch.branchName}
						</div>
					);
				})}
			</div>
			<div className={css.Branch}>
				<span>Холбогдох утас</span>
				{branches.length > 0 &&
					branches.map((branch) => {
						return (
							<div key={branch._id} className={css.Phone}>
								<PhoneIcon fontSize="small" />
								{branch.branchPhoneNumber}
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Footer;
