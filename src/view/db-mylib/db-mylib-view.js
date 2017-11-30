import React from 'react';
import './db-mylib.scss';
import './../shared-style/app.scss';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {
    deleteItem,
    filterItemsByName,
    toggleSearch,
    initMyLib,
    filterItemsAdvanced,
    closeSearch
} from '../../store/actions';
import {Link, NavLink} from 'react-router-dom';
import {
    Navbar,
    Poster,
    AdvancedSearch
} from '../../components';
import {Input} from '../../components/FormControls';


class MyLibViewComponent extends React.Component {
    constructor(props) {
        super(props);
        this.filterItemsByName = this.filterItemsByName.bind(this);
        this.props.initMyLib();
    }

    filterItemsByName(e) {
        let string = e.target.value || '';
        this.props.filterItemsByName(string);
    }

    componentWillUnmount() {
        this.props.filterItemsByName('');
        this.props.closeSearch();
    }

    render() {
        return (
            <div className="md__view-container">
                <div className="md__nav-container">
                    <div className="md-search">
                        <Input onKeyUpHandler={this.filterItemsByName}
                               className="md-search__input"
                               placeholder="Search Saved Movies/TvShows"
                        />
                        <div className="md-search__container">
                            <div className="md-search__box" onClick={this.props.toggleSearch}>
                                <i className="fa fa-search md-search__icon"
                                   aria-hidden="true"
                                ></i>
                            </div>
                            <AdvancedSearch
                                title="Advanced Search by MyLib"
                                filterItemsAdvanced={this.props.filterItemsAdvanced}
                                rememberFrom={LS.get('filterOptionsMyLib')}
                            />
                        </div>
                    </div>
                    <Navbar modificators={['md-navbar--left-margin']}>
                        <NavLink
                            to="/about"
                            activeClassName="md-about--red-color"
                            className="md-navbar__nav-item">
                            About
                        </NavLink>
                    </Navbar>
                </div>
                <div className="md__content">
                    <div className="md__content-container md__content-container--flex">
                        {this.props.savedItems.map((item, index) => {
                            let linkTo;
                            if (item.movie) {
                                linkTo = `/movies/${item.id}`;
                            } else if (item.tvShow) {
                                linkTo = `/tvshows/${item.id}`;
                            }
                            return (
                                <Link to={linkTo} key={index}>
                                    <Poster
                                        item={item}
                                        name={item.name}
                                        imagePath={item.poster}
                                        key={item}
                                        saveItem={this.props.saveItem}
                                        deleteItem={this.props.deleteItem}
                                        saved={true}
                                        modificators={['md-poster--green-border'].join(' ')}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const isOpenSidebar = state.layout.isOpenSidebar;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    deleteItem: (item) => dispatch(deleteItem(item)),
    filterItemsByName: (item) => dispatch(filterItemsByName(item)),
    toggleSearch: () => dispatch(toggleSearch()),
    closeSearch: () => dispatch(closeSearch()),
    initMyLib: () => dispatch(initMyLib()),
    filterItemsAdvanced: (searchOptions) => dispatch(filterItemsAdvanced(searchOptions))
});

export const MyLibView = connect(mapStateToProps, mapDispatchToProps)(MyLibViewComponent);

