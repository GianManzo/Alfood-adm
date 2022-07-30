import { Box, Button, Container, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'
import ITag from '../../../interfaces/ITag'


export const FormPrato = () => {

  const [nomePrato, setPrato] = useState('')
  const [descricao, setDescricao] = useState('')

  const [tags, setTags] = useState<ITag[]>([])
  const [tag, setTag] = useState('')

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [restaurante, setRestaurante] = useState('')

  const [imagem, setImagem] = useState<File | null>(null)


  useEffect(() => {
    http.get<{ tags: ITag[] }>("tags/")
      .then(response => setTags(response.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(response => setRestaurantes(response.data))
  }, [])

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    } else {
      setImagem(null)
    }
  }

  const resetForm = () => {
    setPrato('')
    setDescricao('')
    setTag('')
    setRestaurante('')
    setImagem(null)
  }

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()

    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', tag)
    formData.append('restaurante', restaurante)
    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: formData
    })
      .then(() => {
        resetForm()
        alert('Prato cadastrado com sucesso')
      })

      .catch(error => console.log(error))

  }

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <Typography component="h1" variant="h6">Formulário de Pratos</Typography>
              <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                  required
                  value={nomePrato}
                  fullWidth
                  onChange={evento => setPrato(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Prato"
                  variant="standard"
                  margin='dense' />

                <TextField
                  required
                  value={descricao}
                  fullWidth
                  onChange={evento => setDescricao(evento.target.value)}
                  id="standard-basic"
                  label="Descrição do Prato"
                  variant="standard" />

                <FormControl margin='dense' fullWidth >
                  <InputLabel id='select-tag'>
                    Tag
                  </InputLabel>
                  <Select labelId='select-tag' value={tag} onChange={evento => setTag(evento.target.value)}>
                    {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>{tag.value}</MenuItem>)}
                  </Select>
                </FormControl>

                <FormControl margin='dense' fullWidth >
                  <InputLabel id='select-restaurante'>
                    Restaurante
                  </InputLabel>
                  <Select labelId='select-restaurante' value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>{restaurante.nome}</MenuItem>)}
                  </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />
                <Button sx={{ marginTop: 1 }} type='submit' fullWidth variant="outlined">Salvar</Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>

    </>
  )
}
