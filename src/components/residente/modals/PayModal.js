import React, {useEffect} from 'react';
import { deleteRecord } from './../../../actions/deleteRecord';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import ReactDOM from "react-dom";
import { PayPalButton } from "react-paypal-button-v2";

const CLIENT = {
    sandbox:
        "Ac6TYR6oo4GCcGebENVIM5cB3mMzs4W8yr78GnljXmRQjgrU5ApesVAV43rGhMOrqhhXKf5KDhjnaLQi",
    production:
        "your_production_key"
};

const CLIENT_ID =
    process.env.NODE_ENV === "production" ? CLIENT.production : CLIENT.sandbox;
//create button here

export const PayModal = (props) => {

    const handleClickDelete = async () => {
        try {
            const result = await deleteRecord(props.idRecord, props.resource);
            props.toggleDeleteModal();
            props.updateRecords();
        }catch (e) {

        }
    }

    useEffect(() => {

        window.React = React;
        window.ReactDOM = ReactDOM;

        if(window?.paypal) {
            PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
        }
    })
    const createOrder = (data, actions) => {
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

    const onApprove = (data, actions) => {
        actions.order.capture().then(details => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };
            console.log("Payment Approved: ", paymentData);
            this.setState({ showButtons: false, paid: true });
        });
    };

    return(<Modal isOpen={props.modalControl} toggle={() => props.togglePayModal()} className={props.className}>
        <ModalHeader toggle={() => props.togglePayModal()}>Pagar la cuota {' '}
             <b>'{props.title}'</b></ModalHeader>
        <ModalBody>
            <PayPalButton
                amount="0.01"
                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                onSuccess={(details, data) => {
                    alert("Transaction completed by " + details.payer.name.given_name);

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                            orderID: data.orderID
                        })
                    });
                }}
            />
        </ModalBody>
        <ModalFooter  className="d-flex justify-content-around">
            <Button className="neutralButton" onClick={() => props.toggleDeleteModal()}>Cancelar</Button>
        </ModalFooter>
    </Modal>);
};



export default PayModal;


