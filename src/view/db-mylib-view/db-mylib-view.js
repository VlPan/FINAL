import React from 'react';
import './db-mylib.scss';
import './../shared-style/app.scss';
import {LS} from '../../services';
import {connect} from 'react-redux';
import {deleteItem} from '../../store/actions';
import {Link} from 'react-router-dom';
import {
    Navbar,
    Poster
} from '../../components';
import {Input} from '../../components/FormControls';



class MyLibViewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="md__view-container">
                    <div className="md__container">
                        <div className="md-search">
                            <Input onKeyUpHandler={this.filterItemsByTitle}
                                   className="md-search__input"
                                   placeholder="Search Movies"
                            />
                            <div className="md-search__box">
                                <i className="fa fa-search md-search__icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <Navbar itemsToRender={[{name: 'About'}]}/>
                    </div>
                <div className="md__content">
                    <div className="md__content-container md__content-container--flex">
                        {this.props.savedItems.map((item, index) => {
                            let linkTo;
                            if(item.movie){
                                linkTo = `/movies/${item.id}`;
                            } else if(item.tvShow){
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
    const isOpenSidebar = state.sidebar.isOpen;
    const savedItems = state.myLib.savedItems;
    return {isOpenSidebar, savedItems};
};

const mapDispatchToProps = (dispatch) => ({
    deleteItem: (item) => dispatch(deleteItem(item))
});

export const MyLibView = connect(mapStateToProps, mapDispatchToProps)(MyLibViewComponent);

