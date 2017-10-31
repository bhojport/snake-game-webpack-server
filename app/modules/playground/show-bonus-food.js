var df = require('../engine/definitions.js');
var bf = require('./bonus-food.js');
(function(){
    // Make Bonus Food Appear in Random Interval
    df.bonusInterval = setInterval(bf.createBonusFood,bf.randomTime[Math.floor(Math.random()*bf.randomTime.length)]);
})();
