import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";

const CLIENT = {
    sandbox:
        "Ac6TYR6oo4GCcGebENVIM5cB3mMzs4W8yr78GnljXmRQjgrU5ApesVAV43rGhMOrqhhXKf5KDhjnaLQi",
    production:
        "your_production_key"
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
//create button here
let PayPalButton = null;

// next create the class and Bind React and ReactDom to window
//as we will be needing them later

class PaypalButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showButtons: false,
            loading: true,
            paid: false
        };

        window.React = React;
        window.ReactDOM = ReactDOM;
    }

     createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Mercedes G-Wagon",
                    amount: {
                        currency_code: "USD",
                        value: 200
                    }
                }
            ]
        });
    };

    componentDidMount() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;

        if (isScriptLoaded && isScriptLoadSucceed) {
            PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
            this.setState({ loading: false, showButtons: true });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

        const scriptJustLoaded =
            !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

        if (scriptJustLoaded) {
            if (isScriptLoadSucceed) {
                PayPalButton = window.paypal.Buttons.driver("react", {
                    React,
                    ReactDOM
                });
                this.setState({ loading: false, showButtons: true });
            }
        }
    }

     onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };
            console.log("Payment Approved: ", paymentData);
            this.setState({ showButtons: false, paid: true });
        });
    };
    //...
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
