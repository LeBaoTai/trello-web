import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { mapOrder } from '~/utils/sorts'
import ListColumns from './ListColumns/ListColumns'
import Card from './ListColumns/Column/ListCards/Card/Card'
import Column from './ListColumns/Column/Column'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // tìm column theo card Id
  const findColumnByCardId = cardId => {
    return orderedColumns.find(c =>
      c?.cards?.map(card => card._id)?.includes(cardId)
    )
  }

  const handleDragStart = event => {
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    // nếu là card thì lưu lại state cũ của card
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // trigger trong quá trình kéo phần tử
  const handleDragOver = event => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // nếu 1 trong 2 kh có thoát hàm, tránh crash
    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns(prevColumns => {
        // tìm vị trí card bị kéo thả tới
        const overCardIndex = overColumn?.cards?.findIndex(
          card => card._id === overCardId
        )

        // tính cardIndex mới khi kéo thả card qua cột mới
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1

        // clone mảng dữ liệu củ
        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(
          c => c._id === activeColumn._id
        )
        const nextOverColumn = nextColumns.find(c => c._id === overColumn._id)

        // Column cũ
        if (nextActiveColumn) {
          // xoá card khỏi column
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            c => c._id !== activeDraggingCardId
          )
          // cập nhật mảng orderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(c => c._id)
        }

        // Column mới
        if (nextOverColumn) {
          // kiểm tra card đang kéo có tồn tại ở column mới chưa, nếu có thì xoá
          nextOverColumn.cards = nextOverColumn.cards.filter(
            c => c._id !== activeDraggingCardId
          )
          // thêm card và vị trí của column mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )
          // cập nhật mảng orderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(c => c._id)
        }

        return nextColumns
      })
    }
  }

  const handleDragEnd = event => {
    // console.log(event)
    const { active, over } = event
    if (!active || !over) return

    // kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // nếu 1 trong 2 kh có thoát hàm, tránh crash
      if (!activeColumn || !overColumn) return
      /**
       * Phải dùng tới activeDragItemData hoặc oldColumnWhenDragging (set và state từ bưới kéo (dragStart))
       * vì không thể sử dụng activeColumn trong đây vì đã bị set thành state mới khi qua dragOver
       */
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // giữa hai column khác nhau
      } else {
        const oldCardPos = oldColumnWhenDraggingCard?.cards?.findIndex(
          c => c._id === activeDragItemId
        )
        const newCardPos = overColumn?.cards?.findIndex(
          c => c._id === overCardId
        )
        // trong cùng 1 column

        // sắp xếp lại cards trong 1 column sau khi kéo thả
        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardPos,
          newCardPos
        )
        setOrderedColumns(prevColumns => {
          // clone dữ liệu các cột ra một nơi khác để xử lý
          const nextColumns = cloneDeep(prevColumns)

          // column đang thả
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          // cật nhật card trong target column
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(c => c._id)

          // trả về state mới chuẩn vị trí
          return nextColumns
        })
      }
    }

    // tránh kéo ra xa
    if (!over) return

    // kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnPos = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnPos = orderedColumns.findIndex(c => c._id === over.id)

        // sắp xếp lại columns sau khi kéo thả
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnPos,
          newColumnPos
        )
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.4
        }
      }
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: theme =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100',
          height: theme => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
