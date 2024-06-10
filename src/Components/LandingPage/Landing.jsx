import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setNavbarState } from '../../redux/slices/NavbarStateSlice'

const Landing = () => {

    const dispatch = useDispatch()
    dispatch(setNavbarState(false))

    const navigate = useNavigate()

    return (
        <>
            <header>
                <div className="text">
                    <h2 style={{ fontSize: "100px" }}>Welcome</h2>
                    <h1 style={{ fontSize: "50px", marginTop: "-50px" }}>BOOK MY SPORT</h1>
                    <div className="arrow">
                        <span className="left"></span>
                        <i className="fas fa-asterisk"></i>
                        <span className="right"></span>
                    </div>
                    <span>"Discover, Book, and Play your Favorite Sports with Ease and Excitement!"</span>
                    <div className="button"><button onClick={() => navigate('/roleselect')}>Get Start</button></div>
                </div>
                <svg className="svg-down" width="192" height="61" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 160.7 61.5" enableBackground="new 0 0 160.7 61.5" xmlSpace="preserve"><path fill="currentColor" d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z"></path></svg>
                <div className="arrow-down">
                </div>
            </header>
            <div className="about-us">
                <div className="text">
                    <h2 style={{ fontSize: "80px" }}>Discover</h2>
                    <h3 style={{ fontSize: "40px" }}>Our Mission</h3>
                    <div><i className="fas fa-asterisk"></i></div>
                    <p>At BookMySport, our vision is to foster a vibrant community united by the love of sports. We strive to create a platform where athletes of all levels can come together to share their passion, forge new connections, and experience the joy of playing. Join us in our mission to make sports accessible, inclusive, and exhilarating for everyone.</p>
                </div>
                <div className="image-container">

                    <div className="image image2">
                        <img src="images\FootBallTuf.jpg" alt="Food Photo" style={{ height: "fit-content" }} />
                    </div>
                </div>
            </div>
            <div className="recipes">
                <div className="image"></div>
                <div className="text">
                    <h2 style={{ fontSize: "80px" }}>Exciting</h2>
                    <h3 style={{ fontSize: "40px" }}>Sports</h3>
                </div>
            </div>
            <div className="menu">
                <div className="box-model">
                    <i className="fas fa-times fa-2x close"></i>
                    <div className="arrow">
                        <div className="arrow arrow-right"></div>
                        <div className="arrow arrow-left"></div>
                    </div>
                    <div className="box-image-container">
                        <div className="box-image">
                            <img src="" alt="Food Photo" />
                        </div>
                    </div>
                </div>
                <div className="menu-image-container">
                    <div className="image active">
                        <img src="images/Cricket.jpg" alt="Food Photo" />
                    </div>
                    <div className="image">
                        <img src="images/TableTennis.jpg" alt="Food Photo" style={{ height: "90%" }} />
                    </div>
                    <div className="image">
                        <img src="images/Badmiton.jpg" alt="Food Photo" />
                    </div>
                    <div className="image">
                        <img src="images/Tennis.jpg" alt="Food Photo" />
                    </div>
                </div>
                <div className="text">
                    <h2 style={{ fontSize: "80px" }}>Discover</h2>
                    <h3 style={{ fontSize: "40px" }}>Book Your Arena</h3>
                    <p>For those with a passion for play, dive into the realm of sports excitement with our diverse selection of arenas and sport courts. Whether you're into basketball, soccer, tennis, or something entirely unique, we've got the perfect space for your game. Book your spot now and get ready to unleash your competitive spirit!</p>
                </div>
            </div>
            <div className="fixed-image">
                <div className="text">
                    <h2 style={{ fontSize: "80px" }}>Discover</h2>
                    <h3 style={{ fontSize: "40px" }}>Your Ideal Sports Mix</h3>
                </div>
            </div>
            <div className="reservation">
                <div className="text">
                    <h2 style={{ fontSize: "80px" }}>Explore</h2>
                    <h3 style={{ fontSize: "40px" }}>Your Ultimate</h3>
                    <p>Embark on a journey of sporting exploration with BookMySport. We're dedicated to providing an exhilarating and seamless experience for sports enthusiasts of all levels. Whether you're seeking the thrill of competition or the joy of casual play, we're here to make it happen.</p>
                </div>
                <div className="image-container">
                    <div className="image image2">
                        <img src="images/Background1.jpg" alt="Food Photo" style={{ height: "fit-content" }} />
                    </div>
                </div>
            </div>
            <footer>
                <div className="text">
                    <h2>ABOUT US</h2>
                    <div><i className="fas fa-asterisk"></i></div>
                    <p>BookMySport is an innovative and user-friendly platform that allows you to explore, book, and participate in a wide range of sports activities. Perfect for sports enthusiasts of all levels, our platform connects you with facilities, events, and fellow athletes, making it easier than ever to stay active and engaged.</p>
                </div>
                <div className="contact-container">
                    <div className="social-media">
                        <h3>Follow Along</h3>
                        <div className="links">
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-facebook-square"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="newsletter">
                        <h3>NewsLetter</h3>
                        <form method="post">
                            <input type="email" name="email" placeholder="Type Your Email" />
                            <i className="fas fa-envelope"></i>
                        </form>
                    </div>
                </div>
            </footer>

            <div className="copyright">
                <svg className="svg-up" width="192" height="61" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 160.7 61.5" enableBackground="new 0 0 160.7 61.5" xmlSpace="preserve"><path fill="#262526" d="M80.3,61.5c0,0,22.1-2.7,43.1-5.4s41-5.4,36.6-5.4c-21.7,0-34.1-12.7-44.9-25.4S95.3,0,80.3,0c-15,0-24.1,12.7-34.9,25.4S22.3,50.8,0.6,50.8c-4.3,0-6.5,0,3.5,1.3S36.2,56.1,80.3,61.5z"></path></svg>
                <i className="fas fa-angle-double-up arrow-up"></i>
                <ul className="info">
                    <li>&copy; BOOKMYSPORT 2017</li>
                    <li>13 Hanway Square, London</li>
                    <li>Tel: 71494563</li>
                    <li>Handcrafted with love by <a href="#">Pixelgrade</a> Team</li>
                </ul>
                <ul className="CTA">
                    <li><a href="#">PERMISSIONS AND COPYRIGHT</a></li>
                    <li><a href="#">CONTACT THE TEAM</a></li>
                </ul>
            </div>

            <link href="https://fonts.googleapis.com/css?family=Cabin|Herr+Von+Muellerhoff|Source+Sans+Pro" rel="stylesheet" />
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
            <script src="./script.js"></script>
        </>
    )
}

export default Landing