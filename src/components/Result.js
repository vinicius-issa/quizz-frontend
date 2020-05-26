import React, {useState, useEffect} from 'react'
import { getUser, getToken } from '../services/auth'
import api from '../services/api'

import {Container, Button} from '@material-ui/core'

export default props => {

    const [countAnswers,setCountAnswers] = useState(0);
    const [countCorrects,setCountCorrects] = useState(0);
    const username = getUser();
    const userId = getToken();

    useEffect(()=>{
        const getAnswers = async () =>{
            let response = await api.get(`question/${userId}/`);
            let responses = response.data['answered'];
            setCountAnswers(responses.length);
            let corrects = responses.filter(choice=>choice.is_correct);
            setCountCorrects(corrects.length)
        }
        getAnswers();
    },);

    return (
        <Container className="center" maxWidth='md'>
            <h1>Resultado de {username}</h1>
            <h3>Voce Acertou {countCorrects} de {countAnswers} questões</h3>
            O que corresponde a {countCorrects/countAnswers*100}% das respostas
            <div>
                <Button href="/signin" variant="contained" color="primary">
                    Refazer o Quizz
                </Button>
            </div>
        </Container>
    )

}