import React, { useState, useEffect } from 'react';
import { getUser, getToken } from '../services/auth'
import api from '../services/api'
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@material-ui/core';

export default props => {
    let username = getUser()
    let userId = getToken()

    const [question, setQuestion] = useState([]);
    const [choice, setChoice] = useState(0);

    const sortQuestion = allQuestions =>{
        let index = Math.floor(Math.random() * allQuestions.length );
        return allQuestions[index];
    }

    const handleChoice = e =>{
        setChoice(parseInt(e.target.value));
        console.log(choice);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let data = {
            user:userId,
            choice_id:choice
        }
        try{
            let response = await api.post('answer/', data);
            window.location.reload(false);
        }catch(error){
            console.error(error);
        }
    }



    useEffect(() => {
        const getQuestions = async () => {
            let response = await api.get(`question/${userId}/`);
            console.log(response.data['unanswered']);
            let unanswered = response.data['unanswered'];
            if(unanswered.length>0)
                setQuestion(sortQuestion(unanswered));
            else
                props.history.push('/result');
        }
        getQuestions();
    },[setQuestion, userId]);

    

    return (
        <Container>
            Hello {username}
            <h1>{question.question} - {choice}</h1>
            <form onSubmit={handleSubmit}>
                <FormControl component="fieldset">
                <FormLabel component="legend">Alternativas:</FormLabel>
                <RadioGroup value={choice} onChange={handleChoice}>
                    {question.choices && question.choices.map(alternative=><FormControlLabel key={alternative.id} value={alternative.id} control={<Radio />} label={alternative.choice} />)}
                </RadioGroup>
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