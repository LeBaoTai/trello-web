import BoardBar from './BoardBar/BoardBar'
import AppBar from '~/components/Appbar/Appbar'
import BoardContent from './BoardContent/BoardContent'
import { Container } from '@mui/material'

import { mockData } from '~/apis/mock-data'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoardContent board={mockData?.board} />
    </Container>
  )
}

export default Board
