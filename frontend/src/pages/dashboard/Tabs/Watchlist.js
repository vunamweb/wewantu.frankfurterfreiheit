import React, { useState, useEffect } from 'react';
import { getProfessions } from '../../../helpers/authUtils';
import { Select } from "antd";
import { FaRegStar } from "react-icons/fa";
import { t } from 'i18next';
import { Checkbox } from 'antd';
import SerchCenterModal from '../Modal/SerchCenterModal';
import { getLoggedInUser, getAllUser } from '../../../helpers/authUtils';
import Data from '../../../data/watchlist.json';
import { Avatar } from 'antd';
import { Button } from 'reactstrap';
import { APIClient } from '../../../helpers/apiClient';
import WatchListModal from '../Modal/WatchListModal';


function Watchlist(props) {

	document.title = "Watchlist | WEWANTU"
	const admin = getLoggedInUser()[0];
	const allUser = getAllUser();
	const loadwatchlist = props.loadwatchlist;
	const professions = getProfessions();
	const onChange = (values) => { }
	const [loadlang, setloadlang] = useState(true);
	const [currentUser, setcurrentUser] = useState({});
	const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
	const CheckboxGroup = Checkbox.Group;
	const plainOptions = ['A', 'B', 'C'];
	const defaultCheckedList = ['Apple', 'Orange'];
	const [watchlistData, setwatchlistData] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const onChangecheckbox = (list) => {
		setCheckedList(list);
	};
	const onCheckAllChange = (e) => {
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	const handleCancelDetail = () => {
		setIsModalOpenDetail(false);
	}

	useEffect(() => {

		if (props.activeTab === 'watchlist') {
			new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {
				if (res.length > 0) {

					setwatchlistData(res)
				}
			});
		}
	}, [props.activeTab])

	const ondeleteWL = (info, index) => {
		const result = window.confirm("Do you want to proceed?");
		if(result) {
			let tmp = [...watchlistData];
			console.log(info.user_watchlist_id);
			new APIClient().delete('user_watchlist/' + info.user_watchlist_id).then(res => {
				tmp.splice(index, 1)
				setwatchlistData(tmp)
			})
		}
	};

	const handleDTClick = (info) => {
		setIsModalOpenDetail(true)

		let listUserProfile = localStorage.getItem('listUserProfile');
		let userProfile;

		try {
			listUserProfile = JSON.parse(listUserProfile);

			listUserProfile.map((item, index) => {
				if (item.user.user_id == info.user_add_id)
					userProfile = item;
			})
		} catch (error) {
			userProfile = {};
		}

		setcurrentUser(userProfile);
	}

	const renderUserinfo = (values) => {
		const currentUser = allUser.filter(val => (val.user_id === values.user_add_id))[0];
		console.log(currentUser)
		if (currentUser != undefined)
			return (
				<>
					<div className="col-md-2">
						<Checkbox value="A" /><Avatar className='avatar' size={80}>{(currentUser.prename.slice(0, 1)).toUpperCase()}{(currentUser.lastname.slice(0, 1)).toUpperCase()}</Avatar>
						<div className="name">{currentUser.prename} {currentUser.lastname}</div>
					</div>
					<div className="col-md-4">
						<p className="about">{currentUser.hobbies}</p>
						<FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar /> <FaRegStar />
					</div>
				</>
			)
	}

	if (watchlistData.length > 0) {
		return (
			<React.Fragment>

				<div className="main-mes">
					<div className="container-fluid px-0">
						<div className="row w-title">
							<div className="col-md"><span className="w-title-l">WATCHLIST</span> </div>
							<div className="col-md"><span className="w-title-r">
								<Select
									showSearch
									id="category"
									name="category"
									className="form-control searchcenterselect title"
									placeholder={t('t_category').toUpperCase()}
									onChange={onChange}
								//options={professions.map((item) => ({
								// label: item.profession,
								//    value: item.profession_id
								// }))}
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
					<div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
						<form>
							<div className="row w-checkall">
								<div className="col-md-7">
									<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
										Check all
										</Checkbox>
								</div>
								<div className="col-md-2">
									<Button className="btn btn-primary form-control" size="sm" type="submit">EXPORT PDF</Button>
								</div>
								<div className="col-md-3">
									<Button className="btn btn-primary form-control" size="sm" type="submit">SEND MASSAGE ALL CHECKED</Button>
								</div>
							</div>
						</form>
						<CheckboxGroup value={checkedList} onChange={onChangecheckbox} >
							<table className="table">
								<tbody className='table-watchlist'>
									{watchlistData.map((info, index) => {
										if (info.type == 1)
											return (
												<tr>
													<td data-checkbox="true"></td>
													<td>
														<div className="info_watchlist">
															<div className="row">
																{renderUserinfo(info)}

																<div className="col-md-4 watchlist_content">{info.message}</div>
																<div className="col-md-2">
																	<Button className="btn btn-primary form-control" size="sm" type="submit" data-bs-toggle="modal" onClick={(e) => handleDTClick(info)} data-bs-target="#idDeitals">DETAILS</Button>
																	<Button className="btn btn-primary form-control" size="sm" type="submit" data-bs-toggle="modal" data-bs-target="#idWatchList">SEND MASSAGE</Button>
																	<Button className="btn btn-primary form-control" size="sm" type="submit" onClick={(e) => ondeleteWL(info, index)}>DELETE</Button>
																</div>
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
				</div>

				<WatchListModal currentUser={currentUser} JsonData={null} isModalOpenDetail={isModalOpenDetail} handleCancelDetail={handleCancelDetail} />
			</React.Fragment>
		);
	}
	return (<div className="loader"></div>)

}


export default Watchlist;