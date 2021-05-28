import type from './type'

export function updateActivity(activityData) {
    return {
        type: type.Activity.Update,
        activityData: activityData
    }
}