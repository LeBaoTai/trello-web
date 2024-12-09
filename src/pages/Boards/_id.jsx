import BoardBar from './BoardBar'
import AppBar from '~/components/Appbar'
import BoardContent from './BoardContent'
import { Container } from '@mui/material'

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  )
}

export default Board
