import React, {useEffect, useState} from 'react';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';

const BaseForm = () => {
    const defaultFormData = {email: '', name: '', phone: ''};
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        chrome.storage.onChanged.addListener(function(changes, namespace) {
            for (const key in changes) {
                const storageChange = changes[key];
                const newData =  JSON.parse(storageChange.newValue);
                if (key === 'contactInfo' && namespace === 'local' && newData.phone) {
                    setFormData(newData);
                }

            }
        });
        chrome.storage.local.get(['contactInfo'], function(result) {
            setFormData(JSON.parse(result.contactInfo) as typeof defaultFormData);
        });
    }, []);

    const onChange = (e: { target: { id: string; value: string; }; }) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    };

    const onSubmit = () => {
        console.log('sent message');
        chrome.runtime.sendMessage({type: 'AddContact', formData, defaultFormData});
    };
    return (
        <section className="App form" >
            <h1 className="logo">AddToContact</h1>
        <FormControl fullWidth={true}>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" value={formData.name} onChange={onChange}/>
        </FormControl>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input id="email" value={formData.email} onChange={onChange}/>
            </FormControl>
            <FormControl fullWidth={true} margin="dense">
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input id="phone" value={formData.phone} onChange={onChange}/>
            </FormControl>
            <Button variant="outlined" color="secondary" size="large" onClick={onSubmit}>
                Add to Contacts
            </Button>
        </section>
    );
};

export default BaseForm;
