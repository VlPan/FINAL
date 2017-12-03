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
            <div className="db__content">
                <div className="db__nav-container">
                    <Navbar modificators={['db-navbar--left-margin']}>
                        <NavLink
                            to="/about"
                            activeClassName="db-about--red-color"
                            className="db-navbar__nav-item">
                            About
                        </NavLink>
                    </Navbar>
                </div>
                <div className="db__container">
                    <div className="db__flex-row">
                        <div className="db__flex-column db-support__main-params">
                            <h1 className="db-support__title">Request</h1>
                            <label className="db-support__title-form">Name</label>
                            <Input
                                onChangeHandler={this.change}
                                name="name"
                                className="db-support__name"
                            />
                            <label className="db-support__title-form">Description</label>
                            <TextArea
                                name="desc"
                                className="db-support__desc"
                            />
                        </div>
                        <div className="db__flex-column db-support__poster">
                            <div className="db-add-movie__drop-files" draggable="true"
                                 ref={div => {
                                     this.dropzone = div;
                                 }}>

                            </div>
                            <div className="db-add-movie__dropped">
                                <img src="" alt="" className="db-add-movie__dropped-image"
                                     ref={img => {
                                         this.dropped = img;
                                     }}/>
                            </div>
                        </div>
                    </div>
                    <div className="db-support__buttons">
                        <div className="db-flex-row db-flex-row--reverse">

                            <Button
                                value="Cancel"
                                className="db-support__cancel"
                            />
                            <Button
                                value="Submit"
                                className="db-support__submit"
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