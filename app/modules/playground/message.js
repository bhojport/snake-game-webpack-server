var df = require('../engine/definitions.js');
(function(){
    // console.log(test);
    let showMessage = function(){
        // Show Message on Re-start
        df.messageHolder.innerHTML = df.messageText + "<br /> Press any key to re-start the game!";
        df.messageHolder.classList.remove("hide");
    };
    // Hide Message on Start
    let hideMessage = function(){
        df.messageHolder.classList.add("hide");
    };

    module.exports = {
        showMessage,
        hideMessage
    };
})();
