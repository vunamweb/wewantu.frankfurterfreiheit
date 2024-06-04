import React, { useState, useEffect } from 'react';
import { getProfessions } from '../../../helpers/authUtils';
import { Button, Input, Modal, Select } from "antd";
import { t } from 'i18next';
import { Checkbox } from 'antd';
import { getLoggedInUser, getAllUser } from '../../../helpers/authUtils';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
// import { Button } from 'reactstrap';
import { APIClient } from '../../../helpers/apiClient';
import jsPDF from 'jspdf';
import functions from '../../../function/function';
import WatchListSendMessageModal from '../Modal/WatchListSendMessageModal';
import WatchListSendMessageAllModal from '../Modal/WatchListSendMessageAllModal';
import { toast } from 'react-toastify';
import RatingStar from '../Component/RatingStar';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';
import JobSearchProfile from '../Component/JobSearchProfile';
import UserDetail from '../Component/UserDetail';
import config from '../../../config';

function Watchlist(props) {

	document.title = "Watchlist | WEWANTU"
	const language = useSelector(state => state.Layout.language);
	const listUserProfile = useSelector(state => state.Layout.listUserProfile);

	const admin = getLoggedInUser()[0];
	const allUser = getAllUser();
	const loadwatchlist = props.loadwatchlist;
	const professions = getProfessions();
	const [loadlang, setloadlang] = useState(true);
	const [search, setSearch] = useState(null);
	const [categoryID, setCategoryID] = useState('all');
	const [currentUser, setcurrentUser] = useState({});
	const [currentUserSendMessage, setCurrentUserSendMessage] = useState({});
	const [currentUserSendMail, setCurrentUserSendMail] = useState({});
	const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);

	const [isModalOpenSendMessage, setIsModalOpenSendMessage] = useState(false);
	const [isModalOpenSendMail, setIsModalOpenSendMail] = useState(false);
	const [isModalOpenSendMessageAll, setIsModalOpenSendMessageAll] = useState(false);
	const [jobSearchProfile, setJobSearchProfile] = useState(null);
	const [checkAll, setCheckAll] = useState(false);
	const [notes, setNotes] = useState({});

	const CheckboxGroup = Checkbox.Group;
	const plainOptions = [];
	const defaultCheckedList = ['Apple', 'Orange'];
	const [watchlistData, setwatchlistData] = useState([]);
	const [watchListFilter, setwatchListFilter] = useState([]);
	const [checkedList, setCheckedList] = useState([]);
	// const checkAll = plainOptions.length === checkedList.length;
	const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length;
	const [checkedListUsers, setCheckedListUsers] = useState([]);
	const [userRating, setUserRating] = useState({});

	const onChangecheckbox = (list) => {
		setCheckedList(list);
		setCheckAll(plainOptions.length == list.length);
	};
	const onCheckAllChange = (e) => {
		setCheckAll(e.target.checked);
		setCheckedList(e.target.checked ? plainOptions : []);
	};

	const handleCancelDetail = () => {
		setIsModalOpenDetail(false);
	}

	const handleCancelSendMessage = () => {
		setIsModalOpenSendMessage(false);
	};

	const handleCancelSendMail = () => {
		setIsModalOpenSendMail(false);
	}

	const getNameJobFromId = (id) => {
		let jobs = localStorage.getItem('job');

		try {
			jobs = JSON.parse(jobs);
		} catch (error) {
			jobs = [];
		}
		let name = null;

		jobs.map((item, index) => {
			if (item.value == id)
				name = item.label;
		})

		return name;
	}


	useEffect(() => {
		if (props.activeTab === 'watchlist') {
			new APIClient().get('user/' + admin.user_id + '/user_watchlist').then(res => {				
				if (res.length > 0) {
					let noteupd = new Object();
					res.forEach(element => {
						noteupd[element.user_add_id] = element.note;
					});
					setNotes(noteupd);					
					setwatchlistData(res)
					setwatchListFilter(res);
				}
			});
		}
	}, [props.activeTab])

	const ondeleteWL = (info, index) => {
		const result = window.confirm("Do you want to proceed?");
		if (result) {
			let tmp = [...watchListFilter];
			new APIClient().delete('user_watchlist/' + info.user_watchlist_id).then(res => {
				tmp.splice(index, 1)
				setwatchListFilter(tmp)
			})
		}
	};

	const getUserprofileFromWatchList = (info) => {
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

		return userProfile;
	}

	const handleDTClick = (info) => {
		setIsModalOpenDetail(true)

		let userProfile;
		try {
			listUserProfile.map((item, index) => {
				if (item.user.user_id == info.user_add_id)
					userProfile = item;
			})
		} catch (error) {
			userProfile = {};
		}
		if (jobSearchProfile) {
			userProfile.profiles = userProfile.profiles.filter(item => item.job_id == jobSearchProfile.job_id);
		}

		setcurrentUser(userProfile);
	}

	const handleSendMessage = (info, type) => {
		let userProfile;
		try {
			listUserProfile.map((item, index) => {
				if (item.user.user_id == info.user_add_id)
					userProfile = item;
			})
		} catch (error) {
			userProfile = {};
		}
		if (type == "mail") {
			setCurrentUserSendMail(userProfile);

			setIsModalOpenSendMail(true);
		}
		else {
			setCurrentUserSendMessage(userProfile);

			setIsModalOpenSendMessage(true);
		}
	}

	const handleSendMessageAll = () => {
		if (checkedList.length == 0) {
			toast.warn(t("t_no_items_selected"))
		}
		else {
			const uniqueValues = checkedList.reduce((acc, currentValue) => {
				let user_id = currentValue.substr(0, 36);
				if (!acc.includes(user_id)) {
					acc.push(user_id);
				}
				return acc;
			}, []);
			// checkListUsers
			uniqueValues.forEach(id => {
				const user = allUser.filter(val => (val.user_id === id))[0];
				setCheckedListUsers([...checkedListUsers, user]);
			});
			//open modal send message all
			setIsModalOpenSendMessageAll(true);
		}

	}

	const handleCancelSendMessageAll = () => {
		setIsModalOpenSendMessageAll(false);
	}

	const exportPDF = (item) => {
		const x = 10;
		let y = 10, spacey = 8;

		const fontSize = 12;
		const docWidth = 210; // in mm
		const docHeight = 597; // in mm

		// Create a new jsPDF instance
		const pdf = new jsPDF({
			orientation: 'portrait', // or 'landscape'
			unit: 'mm',
			format: [docWidth, docHeight]
		});

		pdf.setFontSize(fontSize);

		watchListFilter.map((info, index) => {
			if (info.type == 1) {

				info = getUserprofileFromWatchList(info);

				try {
					let hobbiesList, hobbies = '';

					try {
						hobbiesList = info.user.hobbies;
						hobbiesList = JSON.parse(hobbiesList);

						for (let i = 0; i < hobbiesList.length; i++) {
							if (i < hobbiesList.length - 1)
								hobbies = hobbies + hobbiesList[i] + ', ';
							else
								hobbies = hobbies + hobbiesList[i];
						}
					} catch (error) {
						hobbies = info.user.hobbies;
					}

					let name = info.user.prename.toUpperCase() + ' ' + info.user.lastname.toUpperCase();
					pdf.text(name, x, y);
					y = y + spacey;

					let location = info.address[0].city + ' ' + info.address[0].postal_code;
					pdf.text(location, x, y);
					y = y + spacey;

					let rate = t("t_rate") + ":" + userRating[info.user.user_id] + " *";
					pdf.text(rate, x, y);
					y = y + spacey;

					let text;

					info.profiles.map((item, index) => {
						item.job_id = (item.job_id != undefined) ? item.job_id : 0;

						let jobLabel = getNameJobFromId(item.job_id);

						let positionProfile = 'Profile ' + (index + 1);
						pdf.text(positionProfile, x, y);
						y = y + spacey;

						text = '-------';
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_job_desire') + ': ' + jobLabel;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_location') + ': ' + item.max_distance + ' km PLZ ' + item.postalcode;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_salary_request') + ': ' + item.desired_salary * 500;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_working_hours_week') + ': ' + item.desired_weekly_hours;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_days_week') + ': ' + item.desired_working_days_per_week;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_holiday_days') + ': ' + item.desired_holiday_days_per_year;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_home_office') + ': ' + item.desired_work_at_home.value;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_working_on weekends') + ': ' + item.desired_work_at_weekend.value;
						pdf.text(text, x, y);
						y = y + spacey;

						text = t('t_night_work') + ': ' + item.desired_work_at_night.value;
						pdf.text(text, x, y);
						y = y + spacey;

						let ambition = "";
						if (item.ambitions) {
							let ambitions = JSON.parse(item.ambitions.ambition);
							ambition = ambitions[language];
						}
						text = t('t_ambitions') + ': ' + ambition;
						pdf.text(text, x, y);
						y = y + spacey;
					})

					text = t('t_place_of_residence') + ': ' + location;
					pdf.text(text, x, y);
					y = y + spacey;

					/*text = t('t_language_knowledge') + ' ' + (info.languages !== null ? rendervalue(info.languages) : '');
					pdf.text(text, x, y);
					y = y + spacey;
	
					text = 'Education' + ' ' + rendereducational_stagesvalue(info.educational_stages);
					pdf.text(text, x, y);
					y = y + spacey;
	
					text = t("t_driver_s_license") + ' ' + renderdriver_licenses(info.driver_licenses);
					pdf.text(text, x, y);
					y = y + spacey; */

					text = t("t_passenger_transport") + ': ' + (info.user.passenger_transport === 0 ? t('that_s_obvious') : t('people_what'));
					pdf.text(text, x, y);
					y = y + spacey;

					text = t("t_hobbies") + ': ' + hobbies;
					pdf.text(text, x, y);
					y = y + spacey;

					text = "Note" + ': ' + notes[info.user.user_id];
					const splitText = pdf.splitTextToSize(text, 180);
					// pdf.text(splitText, 10, 10);
					pdf.text(splitText, x, y);
					y = y + spacey;

					text = '--------------------------------------';
					pdf.text(text, x, y);
					y = y + spacey;

				} catch (error) {
					pdf.text("No data", x, y);
				}
			}
		})

		// Save the PDF
		pdf.save("export.pdf");
	};


	const renderUserinfo = (values, index) => {


		const currentUser = allUser.filter(val => (val.user_id === values.user_add_id))[0];
		let id = currentUser.user_id + "-" + index;
		plainOptions.push(id);

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

		if (currentUser != undefined)
			return (
				<>
					<div className="col-md-2">
						{/* <Checkbox value={id} /> */}
						<Avatar className='avatar' size={80}>{(currentUser.prename.slice(0, 1)).toUpperCase()}{(currentUser.lastname.slice(0, 1)).toUpperCase()}</Avatar>
						<div className="name">{currentUser.prename} {currentUser.lastname}</div>
					</div>
					<div className="col-md-4">
						<p className="about">{hobbies}</p>

						<RatingStar user_id={currentUser.user_id} updateRating={updateRating} />
					</div>
				</>
			)
	}

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
				let upd = { ...notes };
				upd[item.user_add_id] = item.note;
				setNotes(upd);

				if (existIntoWatchList(filterSearch, item.user_add_id))
					watchListFilter.push(item)
			})
		} catch (error) {
			console.log(error);
		}
		setJobSearchProfile(item);
		setwatchListFilter(watchListFilter);
	}

	const onChange = (values) => {
		setCategoryID(values);
	}

	const updateNotes = (user_id) => (event) => {
		let upd = { ...notes };
		upd[user_id] = event.target.value;
		setNotes(upd);
		// console.log(event.target.value);
	}

	const saveNote = (user_watchlist_id, user_id) => {
		const note = notes[user_id];
		const dataput = { user_watchlist_id: user_watchlist_id, note: note };
		new APIClient().put(config.API_URL + "user_watchlist", dataput).then(res => {
			// console.log(res);
		});
	}

	const updateRating = (user_id, rate) => {
		let upd = { ...userRating };
		upd[user_id] = rate;
		setUserRating(upd);
	}


	if (watchlistData.length > 0) {
		let filterSearch = [];
		filterSearch = functions.getListUser(allUser, {});

		let listJobProfileMobile = props.listJobProfileMobile;

		// console.log(filterSearch);
		return (
			<React.Fragment>
				<JobSearchProfile type={1} watchListFilter={watchlistData} listJobProfileMobile={listJobProfileMobile} onSelect={onChange} categoryID={categoryID} onClickJobProfile={onClickJobProfile} />
				<div className="main-mes">
					<div className="container-fluid px-0">

						<div className="row w-title">
							<div className="col-md"><span className="w-title-l">{t("t_watchlist").toUpperCase()}/{watchListFilter.length} {t("t_results")}</span> </div>
							<div className="col-md">
								<span className="w-title-r">

									{(jobSearchProfile) && <span>{jobSearchProfile.job_decription}</span>}
								</span>

							</div>
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
					{
						(watchListFilter.length > 0) ?
							<div className="table-responsive" data-mdb-perfect-scrollbar="false" style={{ position: 'relative', height: '600px' }}>
								<form>
									<div className="row w-checkall">
										{/* <div className="col-md-7">
											<Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
												{t("t_check_all")}
											</Checkbox>
										</div> */}
										<div className="col-md-2">
											<button className="btn btn-primary form-control btn-sm" onClick={(e) => exportPDF(null)}>{t("t_export_pdf")}</button>
										</div>
										{/* <div className="col-md-3">
											<button className="btn btn-primary form-control btn-sm" onClick={(e) => handleSendMessageAll()}>{t("t_send_message_all").toUpperCase()}</button>
										</div> */}
									</div>
								</form>
								<CheckboxGroup value={checkedList} onChange={onChangecheckbox} className='row'>
									<table className="table">
										<tbody className='table-watchlist'>
											{watchListFilter.map((info, index) => {
												console.log(notes[info.user_add_id]);
												if (info.type == 1)
													return (
														<tr>
															<td data-checkbox="true"></td>
															<td>
																<div className="info_watchlist">
																	<div className="row">
																		{renderUserinfo(info, index)}

																		<div className="col-md-4">
																			<TextArea name='note' value={notes[info.user_add_id]} onBlur={() => saveNote(info.user_watchlist_id, info.user_add_id)} onChange={updateNotes(info.user_add_id)} cols={10} rows={10} placeholder='Write a note' />
																		</div>
																		<div className="col-md-2">
																			<button class="btn btn-primary form-control btn-sm" type="submit" data-bs-toggle="modal" onClick={(e) => handleDTClick(info)} data-bs-target="#idDeitals">{t("t_details").toUpperCase()}</button>
																			<button class="btn btn-primary form-control btn-sm" data-bs-toggle="modal" onClick={(e) => handleSendMessage(info, "message")} data-bs-target="#idWatchList">{t("t_send_message").toUpperCase()}</button>
																			<button class="btn btn-primary form-control btn-sm" data-bs-toggle="modal" onClick={(e) => handleSendMessage(info, "mail")} >{t("t_send_mail").toUpperCase()}</button>
																			<button class="btn btn-primary form-control btn-sm" onClick={(e) => ondeleteWL(info, index)}>{t("t_delete").toUpperCase()}</button>
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
							: null
					}
				</div>
				<UserDetail user={currentUser} isModalOpen={isModalOpenDetail} handleCancelDetail={handleCancelDetail} />
				{Object.keys(currentUserSendMessage).length > 0 && (<WatchListSendMessageModal type="message" currentUser={currentUserSendMessage} JsonData={null} isModalOpen={isModalOpenSendMessage} handleCancel={handleCancelSendMessage} />)}
				{Object.keys(currentUserSendMail).length > 0 && (<WatchListSendMessageModal type="mail" currentUser={currentUserSendMail} JsonData={null} isModalOpen={isModalOpenSendMail} handleCancel={handleCancelSendMail} />)}
				{checkedListUsers.length > 0 && (<WatchListSendMessageAllModal listUser={checkedListUsers} JsonData={null} isModalOpen={isModalOpenSendMessageAll} handleCancel={handleCancelSendMessageAll} />)}
			</React.Fragment>
		);
	}
	return (<div className="loader"></div>)

}

const mapStateToProps = (state) => {
	return {
		listJobProfileMobile: state.Layout.listUserProfile
	};
};


export default connect(mapStateToProps)(Watchlist);