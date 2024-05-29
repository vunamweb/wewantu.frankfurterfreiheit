import React, { useState, useEffect } from 'react';
import { getProfessions } from '../../../helpers/authUtils';
import { Select } from "antd";
import { FaRegStar } from "react-icons/fa";
import { t } from 'i18next';
import { Checkbox } from 'antd';
import { getLoggedInUser, getAllUser } from '../../../helpers/authUtils';
import Data from '../../../data/watchlist.json';
import { Avatar } from 'antd';
import { Button } from 'reactstrap';
import { APIClient } from '../../../helpers/apiClient';
import RatingStar from '../Component/RatingStar';
import JobSearchProfile from '../Component/JobSearchProfile';
import functions from '../../../function/function';


function Blocklist(props) {

	document.title = "Blocklist | WEWANTU"
	const admin = getLoggedInUser()[0];
	const allUser = getAllUser();
	const loadwatchlist = props.loadwatchlist;
	const professions = getProfessions();
	
	const [loadlang, setloadlang] = useState(true);
	const CheckboxGroup = Checkbox.Group;
	const plainOptions = ['A', 'B', 'C'];
	const defaultCheckedList = ['Apple', 'Orange'];
	const [watchlistData, setwatchlistData] = useState([]);
	const [watchListFilter, setwatchListFilter] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const [categoryID,setCategoryID] = useState("all");
	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const onChangecheckbox = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	useEffect(() => {

		if (props.activeTab === 'blocklist') {
			new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {
				if (res.length > 0) {

					setwatchlistData(res)
					setwatchListFilter(res);
				}
			});
		}
	}, [props.activeTab])

	const onChange = (values) => { 
		setCategoryID(values);

	}

	const ondeleteWL = (info, index) => {
		const result = window.confirm("Do you want to proceed?");

		if (result) {
			let tmp = [...watchlistData];
			console.log(info.user_watchlist_id);
			new APIClient().delete('user_watchlist/' + info.user_watchlist_id).then(res => {
				tmp.splice(index, 1)
				setwatchlistData(tmp)
				setwatchListFilter(res);
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
		let listUserProfile = localStorage.getItem('listUserProfile');

		try {
			listUserProfile = JSON.parse(listUserProfile);
		} catch (error) {
			listUserProfile = [];
		}

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

	const renderUserinfo = (values) => {
		const currentUser = allUser.filter(val => (val.user_id === values.user_add_id))[0];

		if (currentUser != undefined) {
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
									<button onClick={(e) => { }} data-id={'detail_' + currentUser.user_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button>
									<button onClick={(e) => { }} data-id={'watchlist_' + currentUser.user_id} className="btn btn-primary form-control" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">{t("t_delete").toUpperCase()}</button>
								</div>
							</div>
							<div className="row">
								<div className='col-md'>
									<div className="name1"><h4>{currentUser.prename} {currentUser.lastname}</h4></div>
									<div><img src="assets/img/location.svg" alt='' />
										{/* {info.address[0].street} {info.address[0].city} {info.address[0].country === null ? '' : ',' + info.address[0].country} */}
									</div>
									<div><img src="assets/img/year.svg" alt='' />
										{/* {info.address[0].year_birthday} */}
									</div>
									<RatingStar user_id={currentUser.user_id} />
								</div>
							</div>
						</div>
					</div>
				</>
			)
		}
	}


	return (
		<React.Fragment>
			<JobSearchProfile categoryID={categoryID} onClickJobProfile={onClickJobProfile} />

			<div className="main-mes">
				<div className="container-fluid px-0">
					<div className="row w-title">
						<div className="col-md"><span className="w-title-l">BLOCKLIST</span> </div>
						<div className="col-md"><span className="w-title-r">
							<Select
								showSearch
								id="category"
								name="category"
								className="form-control searchcenterselect title"
								placeholder={t('t_category').toUpperCase()}
								onChange={onChange}
							>
								<Select.Option value="all">All</Select.Option>
								{professions !== null && professions.map((item) => (
									<Select.Option value={item.profession_id}>{item.profession}</Select.Option>
								))}

							</Select></span> </div>
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
																{renderUserinfo(info)}

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


export default Blocklist;