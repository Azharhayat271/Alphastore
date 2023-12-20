import React from 'react';
import SliderSlick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../images/iphone/1.jpg';
import slider2 from '../images/iphone/2.jpg';
import slider3 from '../images/iphone/3.jpg';
import slider4 from '../images/iphone/pic5.jpg';


const Slider = () => {
	var settings = {
	    dots: true,
	    infinite: true,
	    speed: 500,
	    slidesToShow: 1,
	    slidesToScroll: 1
	  };

	return(
			<>
			    <section className="hero">
			        <div className="hero-container">
			        	<SliderSlick {...settings}>
					     
					   
					      <div>
					        <img src={slider3} />
					      </div>
					     					     
					    </SliderSlick>
			        </div>
			    </section>
			</>
		)
}

export default Slider;