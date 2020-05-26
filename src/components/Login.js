import React, {useState} from 'react';
import api from '../services/api';
import {login} from '../services/auth';
import { Container, Button, Input, InputLabel, FormControl } from '@material-ui/core';

export default props => {

    const [username, setUsername] = useState('')

    const handleUsername = (e) =>{
        setUsername(e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        try{
            let response = await api.post('signup/',{username});
            let userId = response.data.user_id;
            login(userId,username);
            props.history.push('/question/'+userId);
        }catch(error){
            alert("Usuario já cadastrado. Favor entrar com outro username");
            setUsername('');
        }
    }

    return ( 
    <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth={true}>
                <InputLabel htmlFor="email">Username</InputLabel>
                <Input
                    name="username"
                    value={username}
                    onChange={handleUsername} 
                    label="Username"
                    variant="filled"
                    required /> 
            </FormControl>
            
            <FormControl fullWidth={true}>
                <Button 
                    margin-top="50px"
                    variant="contained" 
                    color="primary"
                    type="submit">
                        Ok
                </Button>
            </FormControl>
        </form>
    </Container>
    )
}