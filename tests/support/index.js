///<reference types="Cypress" />
import './commands';
import "@synthetixio/synpress/support";
import addContext from "mochawesome/addContext";



let content = []

class ErrorMes {
  constructor(testName, message) {
    this.testName = testName;
    this.message = message;
  }
}

class ErrorMessages {
  constructor() {
    this.testErrors = {
      uncought: [],
      fail: undefined
    };
    this.hookErrors = {
      uncought: [],
      fail: undefined
    };
  }
}
let errorMessages = new ErrorMessages();



const errorsExist = (mes) => {
  if (mes.testErrors.uncought.length === 0 && !mes.testErrors.fail
    && mes.hookErrors.uncought.length === 0 && !mes.hookErrors.fail) {
    return false
  } else {
    return true
  }
}







Cypress.on("test:after:run", (test, runnable) => {
  const mess = errorMessages
  if (errorsExist(mess)) {
    const curentInfo = {
      state: test.state,
      retry: test.currentRetry,
      exceptions: mess
    }
    content.push(curentInfo)
  }


  if (test.final) {
    const cypressConfig = Cypress.config()
    const spec = Cypress.spec.name.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '')
    const parentTitle = runnable.parent.title.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '')
    const testTitle = test.title.replace(/[<>:"\/\\|?*\x00-\x1F]/g, '')
    content.forEach((record) => {

      addContext({ test }, {
        title: `Retry # ${record.retry} from ${test.retrys}`, value:
          `________________________________________________________________________________________________________________\nState: ${record.state}`
      });

      if (record.state === 'failed' && cypressConfig.screenshotOnRunFailure) {
        let screenshot

        if (record.retry === 0) {
          screenshot = `assets/screenshots/${spec}/${parentTitle} -- ${testTitle} (failed).png`;
        } else {
          screenshot = `assets/screenshots/${spec}/${parentTitle} -- ${testTitle} (failed) (attempt ${record.retry + 1}).png`;
        }
        addContext({ test }, screenshot);
      }

      addContext({ test }, {
        title: `Fails: `, value: `Hook fail: ${!record.exceptions.hookErrors.fail ? 'NO' : record.exceptions.hookErrors.fail}\nTest fail: ${!record.exceptions.testErrors.fail ? 'NO' : record.exceptions.testErrors.fail}`
      })
      const hookErrorsQty = record.exceptions.hookErrors.uncought.length
      const testErrorsQty = record.exceptions.testErrors.uncought.length
      addContext({ test }, `Uncought Exceptions. Hooks: ${hookErrorsQty};  Test: ${testErrorsQty}`)
      if (cypressConfig.reporterOptions.addUncougth) {

        if (hookErrorsQty > 0) {
          let errors = '';
          record.exceptions.hookErrors.uncought.forEach((error) => {
            errors += `\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nHook Name: ${error.testName} \nMEssage: ${error.message}`
          })

          addContext({ test }, {
            title: `HOOKS Uncought Exceptions: `, value: errors
          })
        }

        if (testErrorsQty > 0) {
          let errors = '';
          record.exceptions.testErrors.uncought.forEach((error) => {
            errors += `\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n\nTest Name: ${error.testName} \nMEssage: ${error.message}`
          })

          addContext({ test }, {
            title: `TEST Uncought Exceptions: `, value: errors
          })
        }
      }



    })


    content = []
    if (cypressConfig.video) {addContext({ test }, `assets/videos/${Cypress.spec.name}.mp4`);
}
  }

  errorMessages = new ErrorMessages()
})



Cypress.on('uncaught:exception', (err, runnable) => {
  const uncEx = new ErrorMes(runnable.title, err.message)
  if (runnable.type === 'hook') {
    errorMessages.hookErrors.uncought.push(uncEx)
  } else {
    errorMessages.testErrors.uncought.push(uncEx)
  }
  return false;
})

Cypress.on('fail', (err, runnable) => {
  const uncEx = new ErrorMes(runnable.title, err.message)
  if (runnable.type === 'hook') {
    errorMessages.hookErrors.fail = err.message
  } else {
    errorMessages.testErrors.fail = err.message
  }
  throw err;
})