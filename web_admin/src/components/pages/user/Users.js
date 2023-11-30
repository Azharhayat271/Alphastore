import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';
import React, { useState, useEffect } from 'react';

const Users = () => {
	const [userData, setUserData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:5002/api/users');
				const apiresponse = await response.json();

				const filteredUserData = apiresponse.data.filter(user => !user.isAdmin);

				setUserData(filteredUserData);
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<>
			<div className="container-scroller">
				<Header />
				<div className="container-fluid page-body-wrapper">
					<Sidebar />
					<div className="main-panel">
						<div className="content-wrapper">
							<div className="row">
								<div className="col-lg-12 grid-margin stretch-card">
									<div className="card">
										<div className="card-body">
											<h4 className="card-title">Users</h4>
											<p className="card-description">
											</p>
											<div className="table-responsive">
												<table className="table table-hover">
													<thead>
														<tr>
															<th>Name</th>
															<th>Email</th>
														</tr>
													</thead>
													<tbody>
														{userData.map((user) => (
															<tr key={user.id}>
																<td>{user.name}</td>
																<td>{user.email}</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer />
					</div>
				</div>
			</div>
		</>
	)
}

export default Users;