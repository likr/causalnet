/* global FileReader */

import Rx from 'rx'
import {
  DATA_LOAD,
  DATA_UPDATE_THRESHOLD,
} from '../constants'

export const intentSubject = new Rx.Subject()

export const setModel = () => {
};

export const toggleVertex = () => {
};

export const loadDataFromFile = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    intentSubject.onNext({
      type: DATA_LOAD,
      data: JSON.parse(event.target.result),
    });
  };
  reader.readAsText(file);
};

export const updateRThreshold = (rThreshold) => {
  intentSubject.onNext({
    type: DATA_UPDATE_THRESHOLD,
    rThreshold,
  });
};
