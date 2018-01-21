import React from 'react';
import { Navbar, Link } from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import './Preview.css'
import { fadeIn } from 'react-animations'
import $ from 'jquery';

const  urls = {
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/la_muse.jpg": "la_muse",
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/rain_princess.jpg": "rain_princess",
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/the_scream.jpg": "scream",
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/the_shipwreck_of_the_minotaur.jpg": "wreck",
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/udnie.jpg": "udnie",
	"https://raw.githubusercontent.com/lengstrom/fast-style-transfer/master/examples/style/wave.jpg": "wave"
};

const Carousel = (props) => {
	if (props.imagesLoaded) {
		return (
			<div id="preview-carousel" className="carousel slide" data-ride="carousel">
				<ol class="carousel-indicators">
			    <li data-target="#preview-carousel" data-slide-to="0" class="active"></li>
			    <li data-target="#preview-carousel" data-slide-to="1"></li>
			    <li data-target="#preview-carousel" data-slide-to="2"></li>
			    <li data-target="#preview-carousel" data-slide-to="3"></li>
			    <li data-target="#preview-carousel" data-slide-to="4"></li>
			  </ol>
				<div class="carousel-inner">
					<div class="carousel-item active">
			      <img class="d-block w-100" src={props.previewImage} alt="First slide" />
			    </div>
					<div class="carousel-item">
			      <img class="d-block w-100" src={props.previewExtras[0]} alt="Second slide" />
			    </div>
					<div class="carousel-item">
			      <img class="d-block w-100" src={props.previewExtras[1]} alt="Third slide" />
			    </div>
					<div class="carousel-item">
			      <img class="d-block w-100" src={props.previewExtras[2]} alt="Forth slide" />
			    </div>
					<div class="carousel-item">
			      <img class="d-block w-100" src={props.previewExtras[3]} alt="Fith slide" />
			    </div>
				</div>
			  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		);
	} else {
		return (
			<div className="carousel slide" data-ride="carousel">
				<div class="carousel-inner">
					<div class="carousel-item active">
			      <img class="d-block w-100" src="https://dummyimage.com/800x500/ccc/fff.png" alt="First slide" />
			    </div>
				</div>
			  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
			    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
			    <span class="sr-only">Previous</span>
			  </a>
			  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
			    <span class="carousel-control-next-icon" aria-hidden="true"></span>
			    <span class="sr-only">Next</span>
			  </a>
			</div>
		);
	}
}

class PreviewPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			contentImage: "",
			styleImage: "",
			previewImage: "",
			previewExtras: [],
			designUrl: "",
			taskid: "",
			imagesLoaded: false,
		}
	}

	loadTeeShirts() {
		let api_key = ["j5kqg094-uo22-haf4:hiyp-17ctdyx9m5wh"];
		let api_url = "https://api.printful.com/mockup-generator/task?task_key=" + this.state.taskid;

		let comp = this;

		$.ajax({
			type: 'POST',
			url: api_url,
			headers: {
			    "Authorization": "Basic " + btoa(api_key),
			},
			success: function(data) {
				if (data.code == '200') {
					if (data.result.status == "completed") {
						console.log(data);
						comp.setState({
							previewImage: data.result.mockups[0].mockup_url,
						});

						let e = [];
						for (let i = 0; i < data.result.mockups[0].extra.length; i++) {
							e.push(data.result.mockups[0].extra[i].url);
						}
						e.push(comp.state.designUrl);

						comp.setState({
							previewExtras: e,
							imagesLoaded: true,
						});
					} else {
						window.setTimeout(comp.loadTeeShirts(), 300);
					}
				}
			},
			error: function(err) {
				console.log(err);
			}
		});

	}

	requestTeeShirts() {
		let api_key = "j5kqg094-uo22-haf4:hiyp-17ctdyx9m5wh";
		let api_url = "https://api.printful.com/mockup-generator/create-task/257";
		let api_body = {
			"variant_ids": [8852],
			"format": "jpg",
			"files": [{
				"placement": "default",
				"image_url": this.state.designUrl
			},{
				"placement": "back",
				"image_url": this.state.designUrl
			},{
				"placement": "sleeve_left",
				"image_url": this.state.designUrl
			},{
				"placement": "sleeve_right",
				"image_url": this.state.designUrl
			}]
		}

		let comp = this;

		$.ajax({
			type: 'POST',
			url: api_url,
			data: JSON.stringify(api_body),
			headers: {
			    "Authorization": "Basic " + btoa(api_key),
			},
			success: function(data) {
				if (data.code == '200') {
					comp.setState({
						taskid: data.result.task_key,
					});
					window.setTimeout(comp.loadTeeShirts(), 50);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	componentDidMount() {
		let content = window.localStorage.getItem('contentImage');
		let style = window.localStorage.getItem('styleImage');

		if (content && style) {
			console.log(content, style)
			this.setState({
				contentImage: content,
				styleImage: style,
			});

			// API call to ML
			let api_url = "http://35.197.98.218:8080/fast-style-transfer";

			let s = '',
					z = 1500,
					t = 5000;

			for (let k in urls) {
				if (k == style) s = urls[k];
			}

			if (s == ''){
				api_url = "http://35.197.98.218:8080/neural-art";
				s = style;
				z = 700;
				t = 60000 * 3;
			}

			let comp = this;

			$.ajax({
		    type: 'POST',
		    url: api_url,
		    data: {
		    	"content": content,
		    	"style": style,
		    	"checkpoint": s,
		    	"num_iterations": 700,
		    	"maxsize": 1500,
		    },
		    timeout: t,
		    success: function(data) {
		  		console.log("got it:", data.result_url);
					comp.setState({
						designUrl: data.result_url,
			  	});
			  	comp.requestTeeShirts();
		    },
		    error: function(error) {
		    	console.log(error);
		    }
		  });
		}
	}
	
	render() {


		return (
			<div>
				<Navbar menuItems={[["Home", false, "/"], ["Explore", false, "/explore"], ["Create", true, "/create/pickcontent"]]}/>		
				<div className="container createPage">
					<h1 className="display-4">Design preview</h1>
					<Carousel imagesLoaded={this.state.imagesLoaded} previewImage={this.state.previewImage} previewExtras={this.state.previewExtras} />
				</div>
			</div>
		);
	}
}


export default PreviewPage;