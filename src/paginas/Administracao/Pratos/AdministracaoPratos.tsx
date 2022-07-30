import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import http from '../../../http'
import IPrato from '../../../interfaces/IPrato'

export const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])

  useEffect(() => {
    http.get<IPrato[]>('pratos/')
      .then(response => setPratos(response.data))
  }, [])

  const excluir = (pratoParaExcluir: IPrato) => {
    http.delete(`pratos/${pratoParaExcluir.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(prato => prato.id !== pratoParaExcluir.id)
        setPratos([...listaPratos])
        alert('Prato removido')
      })

  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Tag
            </TableCell>
            <TableCell>
              Imagem
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map(prato => (
            <TableRow key={prato.id}>
              <TableCell>
                {prato.nome}
              </TableCell>
              <TableCell>
                {prato.tag}
              </TableCell>
              <TableCell>
                [ <a href={prato.imagem} rel="noreferrer" target="_blank">Ver imagem</a> ]
              </TableCell>
              <TableCell>
                [ <RouterLink to={`/admin/pratos/${prato.id}`}>editar</RouterLink> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
