var CommentBox = React.createClass({
	render: function () {
		return (
			<div>
				<div id="hero-issues" className="hero-banner">
					<div className="hero-banner-inner">
						<div className="hero-banner-title">
							<h1>Issues</h1>
						</div>
					</div>
				</div>
				<div id="issues" className="body">
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>#</th>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Username</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">1</th>
								<td>Mark Z</td>
								<td>Otto</td>
								<td>mdo</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td>Mark</td>
								<td>Otto</td>
								<td>TwBootstrap</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Jacob</td>
								<td>Thornton</td>
								<td>fat</td>
							</tr>
							<tr>
								<th scope="row">4</th>
								<td colspan="2">Larry the Bird</td>
								<td>twitter</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
});
ReactDOM.render(
	<CommentBox />,
	document.getElementById('content')
);