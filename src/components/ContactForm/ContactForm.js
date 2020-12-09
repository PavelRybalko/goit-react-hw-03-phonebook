import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

// const INITIAL_STATE = { name: "", number: "" };

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const isValidatedForm = this.validateForm();
    if (!isValidatedForm) return;
    this.props.onSubmit(this.state);

    this.setState({
      name: '',
      number: '',
    });
  };

  // resetForm = () => this.setState(INITIAL_STATE);

  validateForm = () => {
    const { onCheckUnique } = this.props;
    const { name, number } = this.state;
    if (!name || !number) {
      alert('Some fields are empty! Please write something');
      return;
    }

    return onCheckUnique(name);
  };

  render() {
    return (
      <>
        <h2 className={s.title}>Phonebook</h2>
        <form className={s.ContactForm} onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              autoComplete="off"
              className={s.input}
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number
            <input
              autoComplete="off"
              className={s.input}
              name="number"
              type="tel"
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCheckUnique: PropTypes.func.isRequired,
};

export default ContactForm;
