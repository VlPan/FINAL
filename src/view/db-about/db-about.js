import React from 'react';
import ReactDOM from 'react-dom';
import './db-about.scss';
import './../shared-style/app.scss';
import {connect} from 'react-redux';
import {
    NavLink
} from 'react-router-dom';
import {
    Navbar
} from '../../components';
import {Button} from '../../components/FormControls';
import Carousel from 'nuka-carousel';


export class AboutComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="db__content">
                <div className="db__nav-container">
                    <Navbar
                        modificators={['db-navbar--left-margin']}
                    >
                        <NavLink
                            to="/about"
                            activeClassName="db-about--red-color"
                            className="db-navbar__nav-item">
                            About
                        </NavLink>
                    </Navbar>
                </div>
                <div className="db__container db-about--grey-color">
                    <div className="db__flex-row">
                        <div className="db-about__title">
                            I built this website
                        </div>
                    </div>
                    <div className="db__flex-row">
                        <div className="db-about__text">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Delectus dolor in labore nesciunt nihil nisi ratione
                            sapiente sed similique veniam? Accusamus debitis, dolorem
                            que, eligendi fugiat impedit itaque nobis non possimus prae
                            sentium quaerat quasi quos sed sequi sit tempora temporibus volup
                            tate? Aliquid, amet atque beatae cum doloribus et ipsa molestiae natus
                            nisi voluptates? Earum ipsam nesciunt nisi non vero. Architecto cupiditat
                            e, deserunt libero molestias nemo officia omnis quam quia repellat reprehender
                            it, sed sequi veniam! Ab at consequuntur deleniti dolor dolore doloremque earum e
                            ius expedita ipsum molestias nam necessitatibus, nemo nostrum quas quidem quis,
                            quisquam sapiente sit soluta ut, veniam vero voluptatum!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Delectus dolor in labore nesciunt nihil nisi ratione
                            sapiente sed similique veniam? Accusamus debitis, dolorem
                            que, eligendi fugiat impedit itaque nobis non possimus prae
                            sentium quaerat quasi quos sed sequi sit tempora temporibus volup
                            tate? Aliquid, amet atque beatae cum doloribus et ipsa molestiae natus
                            nisi voluptates? Earum ipsam nesciunt nisi non vero. Architecto cupiditat
                            e, deserunt libero molestias nemo officia omnis quam quia repellat reprehender
                            it, sed sequi veniam! Ab at consequuntur deleniti dolor dolore doloremque earum e
                            ius expedita ipsum molestias nam necessitatibus, nemo nostrum quas quidem quis,
                            quisquam sapiente sit soluta ut, veniam vero voluptatum!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Delectus dolor in labore nesciunt nihil nisi ratione
                            sapiente sed similique veniam? Accusamus debitis, dolorem
                            que, eligendi fugiat impedit itaque nobis non possimus prae
                            sentium quaerat quasi quos sed sequi sit tempora temporibus volup
                            tate? Aliquid, amet atque beatae cum doloribus et ipsa molestiae natus
                            nisi voluptates? Earum ipsam nesciunt nisi non vero. Architecto cupiditat
                            e, deserunt libero molestias nemo officia omnis quam quia repellat reprehender
                            it, sed sequi veniam! Ab at consequuntur deleniti dolor dolore doloremque earum e
                            ius expedita ipsum molestias nam necessitatibus, nemo nostrum quas quidem quis,
                            quisquam sapiente sit soluta ut, veniam vero voluptatum!
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Delectus dolor in labore nesciunt nihil nisi ratione
                            sapiente sed similique veniam? Accusamus debitis, dolorem
                            que, eligendi fugiat impedit itaque nobis non possimus prae
                            sentium quaerat quasi quos sed sequi sit tempora temporibus volup
                            tate? Aliquid, amet atque beatae cum doloribus et ipsa molestiae natus
                            nisi voluptates? Earum ipsam nesciunt nisi non vero. Architecto cupiditat
                            e, deserunt libero molestias nemo officia omnis quam quia repellat reprehender
                            it, sed sequi veniam! Ab at consequuntur deleniti dolor dolore doloremque earum e
                            ius expedita ipsum molestias nam necessitatibus, nemo nostrum quas quidem quis,
                            quisquam sapiente sit soluta ut, veniam vero voluptatum!
                        </div>
                        <div className="db-about__icon db-about__icon--flex-center">
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="db__flex-row db__flex-row--center" style={{marginBottom: '80px'}}>
                            <Carousel dragging={true} width="80%">
                                <div className="db-about__img1"></div>
                                <div className="db-about__img2"></div>
                                <div className="db-about__img3"></div>
                                <div className="db-about__img4"></div>
                                <div className="db-about__img5"></div>
                                <div className="db-about__img6"></div>
                                <div className="db-about__img7"></div>
                                <div className="db-about__img8"></div>
                                <div className="db-about__img9"></div>
                            </Carousel>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    return {isOpenSidebar};
};

export const About = connect(mapStateToProps)(AboutComponent);