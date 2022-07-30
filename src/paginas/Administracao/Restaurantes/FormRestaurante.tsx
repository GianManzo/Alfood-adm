import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'


export const FormRestaurante = () => {

  const [nomeRestaurante, setNomeRestaurante] = useState('')
  const parametros = useParams()

  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(response => setNomeRestaurante(response.data.nome))
    }
  }, [parametros])


  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante Atualizado com Sucesso')
        })
    } else {

      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado')
        })
    }
  }

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
              <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                  required
                  value={nomeRestaurante}
                  fullWidth
                  onChange={evento => setNomeRestaurante(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Restaurante"
                  variant="standard" />
                <Button sx={{ marginTop: 1 }} type='submit' fullWidth variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </>
  )
}
