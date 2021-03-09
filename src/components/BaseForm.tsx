import React from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';


const BaseForm = () => {
    return (
        <section className="App form" >
            <h1 className="logo">AddToContact</h1>
        <FormControl fullWidth={true}>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input id="firstName"/>
        </FormControl>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="secondName">Second Name</InputLabel>
                <Input id="secondName"/>
            </FormControl>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email"/>
            </FormControl>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input id="phone"/>
            </FormControl>
            <Button variant="outlined" color="secondary" size="large">
                Add to Contacts
            </Button>
        </section>
    );
};

export default BaseForm;