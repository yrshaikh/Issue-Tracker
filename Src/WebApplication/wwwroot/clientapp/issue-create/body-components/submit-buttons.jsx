import React, { Component } from 'react';

class SubmitButtons extends Component {
	constructor(props){
        super(props);
        this.state = {
            submitting: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
	}
    
	render(){
        var buttons;
        if(this.state.submitting)			
            buttons = this.renderDisabledButtons();		
		else	
            buttons = this.renderButtons();

		return (
            <div>
                {buttons}
            </div>
        );
    }
    
    renderDisabledButtons(){
        return (
            <div className='col-md-12'>
                <button type='button' id='create' className='btn btn-default' disabled='disabled'>Submitting</button>
            </div>
        );
    }

    renderButtons(){
        return (
            <div className='col-md-12'>
                <button type='button' id='create' className='btn btn-success' onClick={this.handleSubmit}>Create Issue</button>
            </div>
        );
    }

    handleSubmit(){
        this.props.save();
    }
}

export default SubmitButtons;