import type from './type'

export function updateHistory(historyData) {
    return {
        type: type.History.Update,
        historyData: historyData
    }
}