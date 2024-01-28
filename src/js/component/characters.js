import React from "react";

export default function Characters() {
	return (
		<div className="card m-2 " style={{ width: "15rem" }}>
			<img
				className="card-img-top mt-3"
				src="https://via.placeholder.com/150"></img>
			<div className="card-body">
				<h5 className="card-title text-white">Title Character</h5>
				<p className="card-text p-0 m-0">Gender: </p>
				<p className="card-text p-0 m-0">Hair-Color: </p>
				<p className="card-text p-0 m-0">Eye-Color: </p>
			</div>
			<div className="d-flex justify-content-between mb-3">
				<button type="button" class="btn btn-secondary">
					Learn more
				</button>
				<button type="button" class="btn btn-outline-danger">
					<i class="fa-regular fa-heart text-danger fs-5"></i>
				</button>
			</div>
		</div>
	);
}
