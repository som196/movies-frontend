import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa'

/*
  IMPORTANT: Make sure your custom CSS file is imported AFTER the
  react-slick CSS files to ensure your rules override the defaults.
*/
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

// Custom component for the left arrow
const PrevArrow = ({onClick, className}) => {
  // Check if the 'slick-disabled' class is present to determine if the arrow should be unhighlighted
  const isDisabled = className?.includes('slick-disabled')

  const arrowStyle = {
    opacity: isDisabled ? 0.3 : 1, // Change opacity if the arrow is disabled
    cursor: isDisabled ? 'not-allowed' : 'pointer', // Change cursor
    left: '-25px', // Adjusted position for better visibility
    zIndex: 1,
    color: '#ffff',
    fontSize: '24px',
    transition: 'opacity 0.3s ease',
  }

  return (
    <button
      // This is the CRITICAL change: Concatenate the passed className prop
      // with the base classes to ensure 'slick-disabled' is applied when needed.
      className={`slick-arrow slick-prev ${className}`}
      onClick={onClick}
      type="button"
      aria-label="Previous"
      aria-disabled={isDisabled} // Set aria-disabled for accessibility
      style={arrowStyle}
      disabled={isDisabled} // Disable the button element itself
    >
      <FaChevronLeft />
    </button>
  )
}

// Custom component for the right arrow
const NextArrow = ({onClick, className}) => {
  // Check if the 'slick-disabled' class is present to determine if the arrow should be unhighlighted
  const isDisabled = className?.includes('slick-disabled')

  const arrowStyle = {
    opacity: isDisabled ? 0.3 : 1, // Change opacity if the arrow is disabled
    cursor: isDisabled ? 'not-allowed' : 'pointer', // Change cursor
    right: '-25px', // Adjusted position for better visibility
    zIndex: 1,
    color: '#ffff',
    fontSize: '24px',
    transition: 'opacity 0.3s ease',
  }

  return (
    <button
      // This is the CRITICAL change: Concatenate the passed className prop
      // with the base classes to ensure 'slick-disabled' is applied when needed.
      className={`slick-arrow slick-next ${className}`}
      onClick={onClick}
      type="button"
      aria-label="Next"
      aria-disabled={isDisabled} // Set aria-disabled for accessibility
      style={arrowStyle}
      disabled={isDisabled} // Disable the button element itself
    >
      <FaChevronRight />
    </button>
  )
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
}

class ReactSlick extends Component {
  renderSlider = () => {
    const {movies} = this.props
    return (
      <Slider {...settings}>
        {movies.map(eachLogo => {
          const {id, title, posterPath} = eachLogo
          return (
            <li className="slick-item" key={id}>
              <Link to={`/movies/${id}`} className="slick-link">
                <img className="logo-image" src={posterPath} alt={title} />
              </Link>
            </li>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default ReactSlick
