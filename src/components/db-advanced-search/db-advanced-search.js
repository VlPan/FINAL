import React from 'react';
import './db-advanced-search.scss';
import {connect} from 'react-redux';
import {SelectorBox} from '../db-selector-box';
import {LS} from '../../services';
import {
    Input,
    Button,
    TextArea,
    Selector,
    ClickableIcon
} from '../FormControls';
import {closeSearch, watchAllItems} from '../../store/actions';
import Slider from 'react-rangeslider';
import '../../base_styles/Custom_index.css';

export class AdvancedSearchFormComponent extends React.Component {

    constructor(props) {
        super(props);

        this.change = this.change.bind(this);
        this.changeGenre = this.changeGenre.bind(this);
        this.filterItems = this.filterItems.bind(this);
        this.handleCloseSearch = this.handleCloseSearch.bind(this);
        this.handleChangePopularity = this.handleChangePopularity.bind(this);
        this.handleChangeVote = this.handleChangeVote.bind(this);
        this.filterOptions = this.props.rememberFrom || null;

        this.state = {
            name: this.filterOptions && this.filterOptions.name || '',
            desc: this.filterOptions && this.filterOptions.desc || '',
            genre: this.filterOptions && this.filterOptions.genreIds.map(genre => genre.name) || [],
            isAdult: this.filterOptions && this.filterOptions.adult || false,
            genresFromServer: LS.get('genres'),
            rememberInputs: this.filterOptions && this.filterOptions.rememberInputs || false,
            vote: this.filterOptions && this.filterOptions.vote || 0,
            popularity: this.filterOptions && this.filterOptions.popularity || 0,
            custom: this.filterOptions && this.filterOptions.custom || false
        };
        this.baseState = this.state;
    }

    handleChangePopularity(value) {
        this.setState({
            popularity: value
        });
    }

    handleChangeVote(value) {
        this.setState({
            vote: value
        });
    }

    handleCloseSearch(e) {
        e && e.preventDefault();
        this.props.closeSearch();
    }

    change(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(() => ({
            [name]: value
        }));
    }

    changeGenre(e) {
        const target = e.target;
        const value = target.value;
        if (target.checked === true) {
            this.setState((prevState) => ({
                genre: prevState.genre.concat(value)
            }));
        } else {
            this.setState((prevState) => ({
                genre: prevState.genre.filter((item) => {
                    return item !== value;
                })
            }));
        }
    }

    filterItems(e) {

        e.preventDefault();
        e.stopPropagation();
        let genreIds = this.state.genresFromServer.filter((genre) => {
            return this.state.genre.includes(genre.name);
        });

        const newItem = {
            name: this.state.name,
            desc: this.state.desc,
            genreIds: genreIds,
            adult: this.state.isAdult,
            vote: this.state.vote,
            popularity: this.state.popularity,
            rememberInputs: this.state.rememberInputs,
            custom: this.state.custom
        };

        this.props.filterItemsAdvanced(newItem);
        this.props.watchAllItems();
        this.props.closeSearch();
    }


    render() {
        const popularity = this.state.popularity;
        const vote = this.state.vote;
        return (
            <div className={['db-advanced-search', !this.props.isOpen && 'db-advanced-search--hide'].join(' ')}>
                <h1 className="db-advanced-search__title">{this.props.title}</h1>
                <form className="db-advanced-search__form">
                    <div className="db-advanced-search__main-params">
                        <label htmlFor="">title</label>
                        <Input
                            onChangeHandler={this.change}
                            name="name"
                            value={this.state.name}
                            className="db-advanced-search__name"
                        />


                        <label>Description</label>
                        <TextArea
                            name="desc"
                            className="db-advanced-search__text-area"
                            onChangeHandler={this.change}
                            value={this.state.desc}
                        />
                    </div>
                    <div className="db-advanced-search__second_params">
                        <div className="db__flex-box">
                            <Selector
                                name="isAdult"
                                onChangeHandler={this.change}
                                checked={this.state.isAdult}
                            />
                            <label htmlFor="isAdult">Adult</label>
                        </div>
                        <h1>Popularity</h1>
                        <div className='slider slider--yellow'>
                            <Slider
                                min={0}
                                max={800}
                                step={30}
                                value={popularity}
                                onChange={this.handleChangePopularity}
                            />
                        </div>
                        <h1>Vote Average</h1>
                        <div className='slider slider--green'>
                            <Slider
                                min={0}
                                max={10}
                                step={0.5}
                                value={vote}
                                onChange={this.handleChangeVote}
                            />
                        </div>
                    </div>
                    <div className="db-advanced-search__genre">
                        <label htmlFor="">Genre</label>
                        <SelectorBox onChangeHandler={this.changeGenre}
                                     array={LS.get('genres')}
                                     chunk={7}
                                     compareArray={this.state.genre}
                        />

                        <div>
                        </div>
                    </div>
                    <div className="db-advanced-search__submit_params">
                        <div className="db__flex-box">

                                <ClickableIcon
                                    icon="times"
                                    className="db-advanced-search__reset"
                                    onClickHandler={() => {
                                        this.setState(this.baseState);
                                    }}
                                />
                                <div className="db-advanced-search__label">Reset Form</div>

                        </div>
                        <div className="db__flex-box">
                            <Selector
                                name="rememberInputs"
                                onChangeHandler={this.change}
                                checked={this.state.rememberInputs}
                            />
                            <label htmlFor="RememberInputs">Remember Inputs</label>
                            <Selector
                                name="custom"
                                onChangeHandler={this.change}
                                checked={this.state.custom}
                            />
                            <label htmlFor="custom">Custom</label>
                        </div>
                        <Button
                            onClickHandler={this.filterItems}
                            value="Search"
                        />
                    </div>
                </form>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    const isOpen = state.layout.isOpenSearch;
    return {
        isOpen
    };
};

const mapDispatchToProps = (dispatch) => ({
    closeSearch: () => dispatch(closeSearch()),
    watchAllItems: () => dispatch(watchAllItems())
});

export const AdvancedSearch = connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchFormComponent);
