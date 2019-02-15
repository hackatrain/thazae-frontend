import {action, computed, observable} from 'mobx'
import moment, {Moment} from 'moment'

declare global {
  interface Window {
    store: Store
  }
}

function loadAuth2() {
  return new Promise(resolve => {
    function run() {
      if (!gapi.auth2) {
        return gapi.load('auth2', run)
      }

      const auth = gapi.auth2.getAuthInstance()

      if (!auth) {
        gapi.auth2.init({}).then(resolve)
      }
    }

    run()
  })
}

class Store {}

export const store = new Store()

if (typeof window !== 'undefined') {
  window.store = store
}
