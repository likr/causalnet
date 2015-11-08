import {LOAD_DATA} from '../action-types'

export const loadData = (data) => {
  return {
    type: LOAD_DATA,
    data
  }
};
