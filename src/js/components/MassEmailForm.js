import React, { Component } from 'react';
import '../../css/styles.css';

const api = require('../utility/api');

export default class MassEmailForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sender: "unoshareboard.dev@gmail.com",
      subject: "",
      content: ""
    };

    this.emptyFields = false;
    this.successfullySent = false;
    this.sendingFailed = false;

    this.inputValid = "uk-input";
    this.inputInvalid = "uk-input uk-form-danger";

    this.textareaValid = "uk-textarea";
    this.textareaInvalid = "uk-textarea uk-form-danger";

    this.senderStyle = this.inputValid;
    this.subjectStyle = this.inputValid;
    this.contentStyle = this.textareaValid;

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForEmptyFields = this.checkForEmptyFields.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.resetErrors();
    this.checkForEmptyFields();

    if (!this.emptyFields) {
      this.refs.massemailbtn.setAttribute("disabled", "disabled");
      api.sendMassEmail(this.state, function(success, response) {
        if (success) {
          this.successfullySent = true;
          this.refs.massemailbtn.removeAttribute("disabled");
          this.setState({});
        }
        else {
          this.sendingFailed = true;
          this.refs.massemailbtn.removeAttribute("disabled");
          this.setState({});
        }
      }.bind(this));
    }
    else {
      this.setState({});
    }
  }

  resetErrors() {
    this.emptyFields = false;
    this.successfullySent = false;
    this.sendingFailed = false;
    this.senderStyle = this.inputValid;
    this.subjectStyle = this.inputValid;
    this.contentStyle = this.textareaValid;
  }

  checkForEmptyFields() {
    this.emptyFields = this.state.sender === "" || this.state.subject === "" || this.state.content === "";

    this.senderStyle = this.state.sender === "" ? this.inputInvalid : this.inputValid;
    this.subjectStyle = this.state.subject === "" ? this.inputInvalid : this.inputValid;
    this.contentStyle = this.state.content === "" ? this.textareaInvalid : this.textareaValid;
  }

  render() {
    return (
      <div className="uk-width-1-1">
        <form className="uk-form-stacked" onSubmit={this.handleSubmit}>
          <fieldset className="uk-fieldset">

            {
              this.emptyFields ?
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p><span data-uk-icon="icon: warning"></span> Please make sure all required fields are filled out</p>
              </div>
              : null
            }
            {
              this.sendingFailed ?
              <div className="uk-alert-danger uk-text-center" data-uk-alert>
                <p><span data-uk-icon="icon: warning"></span> There was a problem when trying to send the mass e-mail</p>
              </div>
              : null
            }
            {
              this.successfullySent ?
              <div className="uk-alert-success uk-text-center" data-uk-alert>
                <p>Mass e-mail successfully sent</p>
              </div>
              : null
            }

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="sender">Sender's E-mail <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <input id="sender" name="sender" className={this.senderStyle} type="text" placeholder="Sender's E-mail" value={this.state.sender} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="subject">Subject <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <input id="subject" name="subject" className={this.subjectStyle} type="text" placeholder="Subject" value={this.state.subject} onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <label className="uk-form-label form-label" htmlFor="content">Message <span className="label-invalid">*</span></label>
              <div className="uk-form-controls">
                <textarea name="content" id="content" className={this.contentStyle} placeholder="Message" rows="5" onChange={this.handleInputChange} />
              </div>
            </div>

            <div className="uk-margin">
              <button ref="massemailbtn" className="uk-button uk-button-secondary uk-align-center" type="submit" value="Send">Send</button>
            </div>

          </fieldset>
        </form>
      </div>
    );
  }
}
