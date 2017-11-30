import React from 'react';
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

export class AboutComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="md__content">
                <div className="md__nav-container">
                    <Navbar
                        modificators={['md-navbar--left-margin']}
                    >
                        <NavLink
                            to="/about"
                            activeClassName="md-about--red-color"
                            className="md-navbar__nav-item">
                            About
                        </NavLink>
                    </Navbar>
                </div>
                <div className="md__container md-about--grey-color">
                    <div className="md__flex-row">
                        <div className="md-about__title">
                            I built this website
                        </div>
                    </div>
                    <div className="md__flex-row">
                        <div className="md-about__text">
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
                        <div className="md-about__icon md-about__icon--flex-center">
                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                        </div>
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