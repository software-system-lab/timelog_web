import type from './type'

export function updateBoard(boardData) {
    return {
        type: type.Board.Update,
        boardData: boardData
    }
}