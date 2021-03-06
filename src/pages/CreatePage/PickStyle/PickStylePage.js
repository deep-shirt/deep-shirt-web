import React from 'react';
import { Navbar, Link } from '../../../components/Navbar/Navbar';
import './PickStylePage.css';
import * as firebase from 'firebase';

class PickStylePage extends React.Component {

	constructor(props) {

		super(props);
		this.pickstyle = this.pickstyle.bind(this);
		var styleImage = window.localStorage.getItem('styleImage')
		var imageSet = true;

		if(styleImage === undefined){
			styleImage = "https://dummyimage.com/800x800/ccc/fff.png";
			imageSet = false;
		}

		this.state = {
			styleImage : styleImage,
			imageSet:imageSet
		}
	}

	pickstyle(imageElement){

		if(imageElement.target!==undefined) {
			imageElement = imageElement.target.src
		}

		this.setState({
			styleImage : imageElement,
			imageSet: true
		})

		window.localStorage.setItem('styleImage', imageElement);
	}

	render() {
		return (
			<div>

				<Navbar menuItems={[["Home", false, "/"], ["Explore", false, "/explore"], ["Create", true, "/create/pickcontent"]]}/>
				<div className="container createPage">

					<div className="stylePicker wow slideInRight">

						<h1 className="title">Select a style picture.</h1>
						<div className="row selectbox">

							<div className="col-sm">
								<ul className="nav nav-tabs" role="tablist-style">
									<li className="nav-item">
										<a className="nav-link active" data-toggle="tab" href="#pre-style" role="tab">Predefined styles</a>
									</li>
									<li className="nav-item">
										<a className="nav-link" data-toggle="tab" href="#user-style" role="tab">Upload your own style</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane active" id="pre-style" role="tabpanel">
										<Galery callback={this.pickstyle}></Galery>
									</div>
									<div className="tab-pane" id="user-style" role="tabpanel">
										<ImageUpload callback={this.pickstyle}></ImageUpload>
									</div>
								</div>
							</div>

							<div className="col">
								<p className="font-weight-bold">Selected style image:</p>
								<ImageThumbnail imagefile={this.state.styleImage}></ImageThumbnail>
							</div>

						</div>

						<div className="row">
							<div className="btn btn-group mx-auto" role="group" aria-label="Basic example">
								<Link to="/create/pickcontent" type="button" className={"btn btn-primary "} ><span className="oi oi-chevron-left"></span> Pick Main image</Link>
								<Link to="/create/preview"  type="button"  className={"btn btn-success " + (this.state.imageSet ? '' : 'disabled')}>Generate Design <span className="oi oi-chevron-right"></span></Link>
							</div>
						</div>

					</div>

				</div>

			</div>
		);
	}
}

class ImageUpload extends React.Component {

	constructor(props) {
		super(props)
		this.pickfile = this.pickfile.bind(this);
	}

	uploadFile(file, cb) {

		firebase.storage().ref().child("uploaded/content/" + file.name).put(file).then(function(snapshot) {
			var url = snapshot.downloadURL;
			cb(url);
		});
	}

	pickfile(e) {
		var files = e.target.files;
		if(files.length > 0){
			this.uploadFile(files[0], this.props.callback)
		}
	}

	render() {
		return (
			<div>
				<form>
					<div className="form-group">
						<label>Uploading your own pictures is currently not enabled. Sorry 😐</label>
					</div>
				</form>
			</div>
		)
	}
	
	/*render() {
		return (
			<div>
				<form>
					<div className="form-group">
						<input  accept=".jpg" type="file" onChange={this.pickfile} className="form-control-file"></input>
					</div>
				</form>
			</div>
		)
	}*/
}


const GaleryItem = (props) => {
	return (
		<div className="col-12 col-md-4">
			<div className="card wow fadeIn" data-wow-delay={props.index % 3 / 5 + 0.2 + "s"}>
				<img src={props.url} onClick={props.callback} alt="" className="card-img-top"/>
			</div>
		</div>
	);
}

const Galery = (props) => {

	const urls = [
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/la_muse.jpg",
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/rain_princess.jpg",
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/the_scream.jpg",
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/the_shipwreck_of_the_minotaur.jpg",
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/udnie.jpg",
		"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/wave.jpg"
	];
	const itemList = [];

	for (let i = 0; i < urls.length; i++) {
		itemList.push(<GaleryItem index={i} key={urls[i]}  callback={props.callback} url={urls[i]}/>);
	}

	return (
		<div className="row galery">{itemList}</div>
	);
}


function ImageThumbnail(props) {
	if (props.imagefile !== undefined){
		return (
			<div>
				<div className="card">
					<img className="card-img-top thumbnailIMG" src={props.imagefile} alt="Card cap"></img>
				</div>
			</div>
		);
	}
	else return (<div></div>);
}

export default PickStylePage;
