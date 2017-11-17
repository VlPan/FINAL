import React from 'react';
import './db-nav.scss';
import { openAddMovieForm } from './../../store/actions';
import { connect } from 'react-redux';



export const NavbarCopmonent = (props) => {
    console.log(props.isOpen);
    console.log(props.openAddMovieForm);
    return (
        <div className="md-navbar md-navbar--left-margin">
            <ul className="md-navbar__container">
                {props.isFilmPage && <li className={['md-navbar__nav-item',
                    props.isOpen && 'md-navbar__nav-item--red-text'].join(' ')}
                                              onClick={props.openAddMovieForm}>Add movie</li>}
                <li className="md-navbar__nav-item">About</li>
                <li className="md-navbar__nav-item">Pricing</li>
                <li className="md-navbar__nav-item">Blog</li>
            </ul>
        </div>
    );
};

const mapStateToProps = (state) => {
    const isOpen = state.addMovieForm.isOpen;
    return {
        isOpen
    };
};

const mapDispatchToProps = (dispatch) => ({
    openAddMovieForm: () => dispatch(openAddMovieForm())
});

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(NavbarCopmonent);