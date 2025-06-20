import React, { useState, useEffect } from 'react';
import { getProfessions } from '../../../helpers/authUtils';
import { Select } from "antd";
import { FaRegStar } from "react-icons/fa";
import { t } from 'i18next';
import { Checkbox } from 'antd';
import { connect, useSelector } from 'react-redux';
import { getLoggedInUser, getAllUser } from '../../../helpers/authUtils';
import Data from '../../../data/watchlist.json';
import { Avatar } from 'antd';
import { Button } from 'reactstrap';
import { APIClient } from '../../../helpers/apiClient';
import RatingStar from '../Component/RatingStar';
import JobSearchProfile from '../Component/JobSearchProfile';
import functions from '../../../function/function';
import config from '../../../config';

let allUser = [];

function Blocklist(props) {

	document.title = "Blocklist | WEWANTU"
	const admin = getLoggedInUser()[0];
	//const allUser = getAllUser();
	const loadwatchlist = props.loadwatchlist;
	const professions = getProfessions();

	const [loadlang, setloadlang] = useState(true);
	const CheckboxGroup = Checkbox.Group;
	const plainOptions = ['A', 'B', 'C'];
	const defaultCheckedList = ['Apple', 'Orange'];
	const [watchlistData, setwatchlistData] = useState([]);
	const [watchListFilter, setwatchListFilter] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const [categoryID, setCategoryID] = useState("all");
	const [userPayments, setUserPayments] = useState([]);

	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const onChangecheckbox = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};
	const listUserProfile = useSelector(state => state.Layout.listUserProfile);

	useEffect(() => {
		getAllUser().then(listUser => {
			allUser = listUser;
		})

		if (props.activeTab === 'blocklist') {
			let watchlistLocal = localStorage.getItem('watchlist');
			let watchlist = JSON.parse(watchlistLocal);

			watchlist = watchlist.filter(item => item.type == 0);

			setwatchlistData(watchlist);
			setwatchListFilter(watchlist);

			/*new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {
				if (res.length > 0) {

					setwatchlistData(res)
					setwatchListFilter(res);
				}
			});*/

			new APIClient().get('user/' + admin.user_id + '/user_payment').then(res => {
				if (res.length > 0) {
					setUserPayments(res);
				}
			})
		}
	}, [props.activeTab])

	const onChange = (values) => {
		setCategoryID(values);

	}

	const ondeleteWL = (info, index) => {
		const result = window.confirm("Do you want to proceed?");

		if (result) {
			let tmp = [...watchListFilter];
			new APIClient().delete('user_watchlist/' + info.user_watchlist_id).then(res => {
				tmp.splice(index, 1)
				setwatchlistData(tmp)
				setwatchListFilter(tmp);
			})
		}
	};

	const existIntoWatchList = (filterSearch, user_id) => {
		let check = false;

		filterSearch.map((item, index) => {
			if (item.user.user_id == user_id)
				check = true;
		})

		return check;
	}

	const onClickJobProfile = (item) => {
		let filterSearch = functions.getListUser(listUserProfile, item);

		let watchListFilter = [];

		try {
			watchlistData.map((item, index) => {


				if (existIntoWatchList(filterSearch, item.user_add_id))
					watchListFilter.push(item)
			})
		} catch (error) {

		}

		setwatchListFilter(watchListFilter);
	}

	const renderUserinfo = (values, index) => {
		const currentUser = allUser.filter(val => (val.user_id === values.user_add_id))[0];
		let hasPayment = false;

		if (currentUser != undefined) {
			currentUser.user_watchlist_id = values.user_watchlist_id;

			let hobbiesList, hobbies = '';

			try {
				hobbiesList = currentUser.hobbies;
				hobbiesList = JSON.parse(hobbiesList);

				for (let i = 0; i < hobbiesList.length; i++) {
					if (i < hobbiesList.length - 1)
						hobbies = hobbies + hobbiesList[i] + ', ';
					else
						hobbies = hobbies + hobbiesList[i];
				}
			} catch (error) {
				hobbies = currentUser.hobbies;
			}

			if (admin.userType != 0) {
				const user_payment_message = userPayments.filter((payment) => { return payment.user_id_payment == values.user_add_id });
				if (user_payment_message.length > 0) {
					hasPayment = true;
				}
			}
			else {
				hasPayment = true;
			}

			let fieldsHide = config.USER_FIELD_HIDE;

			let prename = (!hasPayment && fieldsHide.includes("prename")) ? "*****" : currentUser.prename;
			let lastname = (!hasPayment && fieldsHide.includes("lastname")) ? "*****" : currentUser.lastname;


			return (
				<>
					{/* <div className="col-md-5">
						<Checkbox value="A" /><Avatar className='avatar' size={80}>{(currentUser.prename.slice(0, 1)).toUpperCase()}{(currentUser.lastname.slice(0, 1)).toUpperCase()}</Avatar>
						<div className="name">{currentUser.prename} {currentUser.lastname}</div>
					</div>
					<div className="col-md-5">
						<p className="about">{hobbies}</p>
						<FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
					</div> */}

					<div className='col-md-3'>
						<div className="info">
							<div className="row">
								<div className="col-md-6">
									<Checkbox value="A" /><Avatar className='avatar' size={80}>{(currentUser.prename.slice(0, 1)).toUpperCase()}{(currentUser.lastname.slice(0, 1)).toUpperCase()}</Avatar>
								</div>

								<div className="col-md-6">
									{/* <button onClick={(e) => { }} data-id={'detail_' + currentUser.user_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button> */}
									<button onClick={(e) => { ondeleteWL(currentUser, index) }} data-id={'watchlist_' + currentUser.user_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">{t("t_delete").toUpperCase()}</button>
								</div>
							</div>
							<div className="row">
								<div className='col-md'>
									<div className="name1"><h4>{prename} {lastname}</h4></div>
									{/* <div><img src="assets/img/location.svg" alt='' />
										{info.address[0].street} {info.address[0].city} {info.address[0].country === null ? '' : ',' + info.address[0].country}
									</div>
									<div><img src="assets/img/year.svg" alt='' />
										{info.address[0].year_birthday}
									</div> */}
									<RatingStar user_id={currentUser.user_id} />
								</div>
							</div>
						</div>
					</div>
				</>
			)
		}
	}

	let listJobProfileMobile = props.listJobProfileMobile;

	return (
		<React.Fragment>
			<JobSearchProfile watchListFilter={watchlistData} listJobProfileMobile={listJobProfileMobile} onSelect={onChange} categoryID={categoryID} onClickJobProfile={onClickJobProfile} />

			<div className="main-mes">
				<div className="container-fluid px-0">
					<div className="row w-title">
						<div className="col-md"><span className="w-title-l">BLOCKLIST</span> </div>
						<div className="col-md"><span className="w-title-r">
						</span> </div>
					</div>
					<div className="row">
						<div className="col-md">
							<nav className="navbar navbar-expand-sm navbar-light">
								<div className="container-fluid ">
									<Button className="navbar-toggler" type="Button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
										aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </Button>
								</div>
							</nav>
						</div>
					</div>
				</div>
				{(watchListFilter.length > 0) &&
					<div className="row table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
						<CheckboxGroup value={checkedList} onChange={onChangecheckbox} >
							<table className="table">
								<tbody className='table-watchlist'>
									{watchListFilter.map((info, index) => {
										if (info.type == 0)
											return (
												<tr>
													<td data-checkbox="true"></td>
													<td>
														<div className="info_watchlist">
															<div className="row">
																{renderUserinfo(info, index)}

																{/* <div className="col-md-2">
																	<Button className="btn btn-primary form-control" size="sm" type="submit" onClick={(e) => ondeleteWL(info, index)}>DELETE</Button>
																</div> */}
															</div>

														</div>
													</td>
												</tr>
											)
									})}
								</tbody>
							</table>
						</CheckboxGroup>

					</div>
				}
			</div>

		</React.Fragment>
	);

}

const mapStateToProps = (state) => {
	return {
		listJobProfileMobile: state.Layout.listUserProfile
	};
};


export default connect(mapStateToProps)(Blocklist);