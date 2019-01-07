import React from 'react';
import {Field, reduxForm} from 'redux-form';

class UpdateForm extends React.Component{
   renderError({error,touched}){

        if(touched && error){

            return(
                  <div className="ui error message">
                    <div className="header">{error}</div>
                </div>  

            );
        }
   }
    renderInput= ({input,label,meta})=>{
            const className= `field ${meta.error && meta.touched ?'error':'' }`;
        return (
        <div className={className}>
            <label >{label}</label>
            <input className="form-control" {...input} autoComplete="off"/>
            {this.renderError(meta)}
           
        </div>
        ); 
    }
    onSubmit = (formValues)=>{
        this.props.onSubmit(formValues);
    };

    render(){
     
    return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <div className="form-group">
                    <Field name="first_name" component={this.renderInput} label="Enter FirstName"/>
                    <div/>
                    <div className="form-group">
                    <Field name="last_name" component={this.renderInput} label="Enter LastName"/>
                    </div>
                    <div className="form-group">
                    <Field name="email" component={this.renderInput} label="Enter email"/>
                    </div>
                    <div className="form-group"></div>
                    <Field name="address" component={this.renderInput} label="Enter address"/>
                    </div>
                    <button className="btn btn-outline-primary">Update</button>
            </form>
       
        );

    }

};


const validate= (formValues) => {
    const errors={};
    if(!formValues.first_name){
        errors.title="You must enter your first name";
        
    }

    if(!formValues.last_name){
        errors.description = "You must enter your last name";
    }
    if(!formValues.email){
        errors.description = "You must enter your email";
    }
    if(!formValues.address){
        errors.description = "You must enter your address";
    }
    

    return errors;
    
};

export default reduxForm({
    
    form:'updateForm',
    validate
    
})(UpdateForm);

