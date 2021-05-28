import type from './type'

export function updateStopWatchTime(timeString) {
    return {
        type: type.StopWatch.UpdateTime,
        time: timeString
    }
}