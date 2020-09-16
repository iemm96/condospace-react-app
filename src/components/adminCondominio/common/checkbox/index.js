import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import IconUnchecked from "./IconUnchecked";

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }

        this.icon = this.icon.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    icon() {
        return this.state.checked ? <FontAwesomeIcon icon={faCheck} /> : <IconUnchecked/>
    }

    toggle(event) {
        this.props.setRecordar(!this.state.checked);
        event.preventDefault()
        this.setState(function (state, props) {
            return {
                checked: !state.checked
            }
        })
    }

    render() {
        return (
            <button
                style={ Styles.button}
                onClick={ this.toggle }>
                <div style={ Styles.check }>
                    { this.icon() }
                </div>

                <div style={ Styles.content }>
                    { this.props.children }
                </div>
            </button>
        )
    }
}

const Styles = {
    button: {
        background: 'transparent',
        border: '0',
        marginBottom: '0.5rem',
        fontSize: '1rem',
        display: 'flex',
        outline: '0',
        color: 'white',
        marginRight: '0.5rem',
        cursor: 'pointer',
        textAlign: 'left'
    },

    check: {
        marginRight: '1rem'
    },

    content: {
        paddingTop: '0.2rem',
        fontSize: '0.9rem',
        fontWeight: '100',
        lineHeight: '1.25rem'
    }
}