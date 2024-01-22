///<reference types="Cypress" />
import './commands';
import "@synthetixio/synpress/support";
import addContext from "mochawesome/addContext";
Cypress.on("test:after:run", (test, runnable) => {
   if (test.state === "failed" ) {
      const screenshot =
         `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
      addContext({ test }, screenshot);
      if(test.currentRetry > 0) {
         const screenshot =
         `assets/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed) (attempt ${test.currentRetry + 1}).png`;
      addContext({ test }, screenshot);
      }
   }
   addContext({ test }, `assets/videos/${Cypress.spec.name}.mp4`);
});