import React, { Component } from 'react';
import { assign, unassign } from '../../util/APIUtils';
import { Form, Input, Button, notification } from 'antd';
import './Makepayment.css';

const FormItem = Form.Item;

class MakePayment extends Component {
  constructor(props) {
        super(props);
        this.state = {
          buyer1: '',
          seller1: '',
          endDate: ''
        }
        this.handleAssign = this.handleAssign.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

  handleAssign(event) {
      event.preventDefault();
      const payuserRequest = {
          buyerNric: encodeURIComponent(this.state.buyer1.value),
          sellerNric: encodeURIComponent(this.state.seller1.value),
          endDate: encodeURIComponent(this.state.endDate.value)
      };
      assign(payuserRequest)
      .then(response => {
          notification.success({
              message: 'EquiV',
              description: "You've successfully assigned the users!",
          });
      }).catch(error => {
          notification.error({
              message: 'EquiV',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
      });
  }

  handleUnassign(event) {
      event.preventDefault();
      const depayuserRequest = {
          buyerNric: this.state.buyer2.value,
          sellerNric: this.state.seller2.value
      };
      unassign(depayuserRequest)
      .then(response => {
          notification.success({
              message: 'EquiV',
              description: "You've successfully unassigned the users!",
          });
          this.props.history.push("/pay");
      }).catch(error => {
          notification.error({
              message: 'EquiV',
              description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
      });
  }

  handleInputChange(event) {
      const target = event.target;
      const inputName = target.name;
      const inputValue = target.value;

      this.setState({
          [inputName] : {
              value: inputValue
          }
      });
  }

  render() {
      return (
          <div className="payuser-container">
              <h1 className="page-title">Make Payment</h1>
              <div className="payuser-content">
                  <Form onSubmit={this.handleAssign} className="payuser-form">
                      <FormItem
                          label="Your NRIC">
                          <Input
                              size="large"
                              name="buyer1"
                              value={this.state.buyer1.value}
                              onChange={(event) => {this.handleInputChange(event)}} />
                      </FormItem>
                      <FormItem
                          label="Recipient's NRIC">
                          <Input
                              size="large"
                              name="seller1"
                              value={this.state.seller1.value}
                              onChange={(event) => {this.handleInputChange(event)}} />
                      </FormItem>
                      <FormItem
                          label="Amount">
                          <Input
                              size="large"
                              name="endDate"
                              value={this.state.endDate.value}
                              onChange={(event) => {this.handleInputChange(event)}} />
                      </FormItem>
                      <FormItem>
                          <Button type="primary" icon="shrink"
                              htmlType="submit"
                              size="large"
                              className="payuser-form-button"
                              >Pay</Button>
                      </FormItem>
                  </Form>
              </div>
          </div>
      );
  }
}

export default MakePayment;
