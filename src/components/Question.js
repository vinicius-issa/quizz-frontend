import React, { useState, useEffect } from 'react';
import { getUser, getToken } from '../services/auth'
import api from '../services/api'
import { Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button } from '@material-ui/core';

export default props => {
    let username = getUser()
    let userId = getToken()
    const [counterAnswered, setCounterAnswered] = useState(0)
    const [counterAll, setCounterAll] = useState(0);
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
            await api.post('answer/', data);
            window.location.reload(false);
        }catch(error){
            console.error(error);
        }
    }



    useEffect(() => {
        const getQuestions = async () => {
            let response = await api.get(`question/${userId}/`);
            let unanswered = response.data['unanswered'];
            let answered = response.data['answered'];
            if(unanswered.length>0){
                setQuestion(sortQuestion(unanswered));
                setCounterAnswered(answered.length + 1);
                setCounterAll(answered.length + unanswered.length);
            }
            else
                props.history.push('/result');
        }
        getQuestions();
    },[setQuestion, userId, props.history, setCounterAll, setCounterAnswered]);

    

    return (
        <Container className="center" maxWidth='sm'>
            <h4>Ola {username}. Vamos para a questão {counterAnswered} de {counterAll}</h4>
            <h1>{question.question}</h1>
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