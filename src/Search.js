import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        const { value, onChange } = this.props;
        return (

            <form action="">
            <input 
             type="text"
             onChange={this.onChange}
             value={value}
            />
            </form>
        )
    }
}
