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
            alert("Que pena, esse username já existe. Favor entrar com um novo");
            setUsername('');
        }
    }

    return ( 
    <Container maxWidth="xs" className="center">
        <h2>Bem Vindo!</h2>
        <h4>Participe agora mesmo do nosso Quizz! É só escolher um novo username e pronto. Vamos la?</h4>
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