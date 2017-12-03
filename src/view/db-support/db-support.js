import React from 'react';
import './db-support.scss';
import './../shared-style/app.scss';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Navbar
} from '../../components';
import {Button, TextArea, Input} from '../../components/FormControls';

export class SupportComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(this.dropped);
        this.dropzone.ondrop = (e)=>{
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            console.log(this.dropped);
            this.loadInView(file, this.dropped);
        };

        this.dropzone.ondragover = function(){
            return false;
        };

        this.dropzone.ondragleave = function(){
            return false;
        };
    }

    loadInView(file,elem){
        var fileReader = new FileReader();
        fileReader.onloadend = ()=>{
            elem.src = fileReader.result;
            this.setState(()=>({
                posterImg: elem.src
            }));
        };
        fileReader.readAsDataURL(file);
    }

    render() {
        return (
            <div className="md__content">
                <div className="md__nav-container">
                    <Navbar modificators={['md-navbar--left-margin']}>
                        <NavLink
                            to="/about"
                            activeClassName="md-about--red-color"
                            className="md-navbar__nav-item">
                            About
                        </NavLink>
                    </Navbar>
                </div>
                <div className="md__container">
                    <div className="md__flex-row">
                        <div className="md__flex-column md-support__main-params">
                            <h1 className="md-support__title">Request</h1>
                            <label className="md-support__title-form">Name</label>
                            <Input
                                onChangeHandler={this.change}
                                name="name"
                                className="md-support__name"
                            />
                            <label className="md-support__title-form">Description</label>
                            <TextArea
                                name="desc"
                                className="md-support__desc"
                            />
                        </div>
                        <div className="md__flex-column md-support__poster">
                            <div className="md-add-movie__drop-files" draggable="true"
                                 ref={div => {
                                     this.dropzone = div;
                                 }}>

                            </div>
                            <div className="md-add-movie__dropped">
                                <img src="" alt="" className="md-add-movie__dropped-image"
                                     ref={img => {
                                         this.dropped = img;
                                     }}/>
                            </div>
                        </div>
                    </div>
                    <div className="md-support__buttons">
                        <div className="md-flex-row md-flex-row--reverse">

                            <Button
                                value="Cancel"
                                className="md-support__cancel"
                            />
                            <Button
                                value="Submit"
                                className="md-support__submit"
                            />

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

export const Support = connect(mapStateToProps)(SupportComponent);