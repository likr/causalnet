/* global fetch */

import Rx from 'rx'

const sem = (n, alpha, sigma, S, alphaFixed, sigmaFixed) => {
  return Rx.Observable.create((observer) => {
    const request = fetch('https://websem.herokuapp.com/sem', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        n,
        alpha,
        sigma,
        S,
        alpha_fixed: alphaFixed,
        sigma_fixed: sigmaFixed,
      }),
    })
    request.then((response) => response.json())
      .then((result) => {
        observer.onNext(result)
        observer.onCompleted()
      })

    return () => {
    }
  })
}

export default sem
