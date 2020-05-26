import React, {useState, useEffect} from 'react'
import { getUser, getToken } from '../services/auth'
import api from '../services/api'

import {Container} from '@material-ui/core'

export default props => {

    const [answers,setAnswers] = useState([]);
    const username = getUser();
    const userId = getToken();

    useEffect(()=>{
        const getAnswers = async () =>{
            let response = await api.get(`question/${userId}/`);
            let responses = response.data['answered'];
            setAnswers(responses);
        }
        getAnswers();
    });

    return (
        <Container>
            <h1>Resultado de {username}</h1>
            Voce Acertou {answers.filter(el=>el.is_correct).length} de {answers.length} questões
        </Container>
    )

}