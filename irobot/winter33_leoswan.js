var irobot = require('./index');

var robot = new irobot.Robot('/dev/ttyUSB0');

robot.on('ready', function() {
    console.log('READY');
});

// robot.on('sensordata', function (data) {
//   console.log('SENSOR DATA', data);
// });

var keypress = require('keypress');
velocity = { left: 0, right: 0 };
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function(ch, key) {
    console.log('got "keypress"', key);
    if (!key) return;

    if (key.name == 'w') {
        console.log("moved up");
        //up(10);
        velocity.left += 10;
        velocity.right += 10;
        robot.drive(velocity);
        //robot.rtsTrue();
    } else if (key.name == 's') {
        velocity.left -= 10;
        velocity.right -= 10;
        robot.drive(velocity);
        //robot.rtsFalse();
    } else if (key.name == 'd') {
        velocity.left -= 5;
        velocity.right += 5;
        robot.drive(velocity);
        console.log("moved right");
        //turnRightDegrees(10);
    } else if (key.name == 'a') {
        velocity.left += 5;
        velocity.right -= 5;
        robot.drive(velocity);
        console.log("moved left");
        //turnLeftDegrees(10);
    } else if (key.name == 'space') {
        console.log("stop me");
        velocity.left = 0;
        velocity.right = 0;
        robot.drive(velocity);
    } else if (key.name == 'f') {
        console.log("fullMode");
        robot.fullMode();
    } else if (key.name == 'p') {
        console.log("passiveMode");
        robot.passiveMode();
    } else if (key.name == 'g') {
        console.log("go -- safeMode");
        robot.safeMode();
    } else if (key.name == 'q') {
        console.log("play song");
        mysong = [
            [369, 50],
            [293, 50],
            [246,100],
            [246,100],
            [246,50],
            [261,50],
            [293,50],
            [329,50],
            [249,100],
            [249,100],
            [249,100],
            [293,100],
            [392,100],
            [392,100],
            [392,150],
            [349,50],
            [392,150],
            [349,50],
            [392,50],
            [440,50],
            [493,50],
            [523,50],
            [587,150],
            [493,50],
            [349,50],
            [587,150],
            [349,50],
            [293,50],
            [349,150],
            [261,50],
            [293,50],
            [246,100],
            [0,100],
            [369, 60],
            [293, 60],
            [246,100],
            [246,100],
            [246,50],
            [261,50],
            [293,50],
            [329,50],
            [249,100],
            [249,100],
            [249,100],
            [293,100],
            [392,100],
            [392,100],
            [392,150],
            [349,50],
            [392,150],
            [349,50],
            [392,50],
            [440,50],
            [493,50],
            [523,50],
            [587,150],
            [493,50],
            [349,50],
            [587,150],
            [349,50],
            [293,50],
            [349,150],
            [261,50],
            [293,50],
            [246,100],
            [349,50],
            [349,50],
            [493,50],
            [587,50],
            [523,50],
            [493,50],
            [394,50],
            [493,100],
            [394,50],
            [523,150],
            [392,50],
            [523,150],
            [392,50]

        ];
        robot.sing(mysong);
    }


    if (key && key.ctrl && key.name == 'c') {
        console.log('shift control.c');
        process.exit();
        //process.stdin.pause();
    }
});


process.stdin.setRawMode(true);

process.stdin.resume();
batteryVolts = 0;
robot.on('sensordata', function(data) {
    if (batteryVolts !== data.battery.voltage.volts) {
        batteryVolts = data.battery.voltage.volts;
        console.log('voltage', batteryVolts);
    }
});
robot.on('bump', function(e) {
    console.log('BUMP', e);
});
robot.on('button', function(e) {
    console.log('BUTTON', e);
});
robot.on('cliff', function(e) {
    console.log('CLIFF', e);
});
robot.on('ir', function(e) {
    console.log('IR', e);
});
robot.on('mode', function(e) {
    console.log('MODE', e);
});
robot.on('overcurrent', function(e) {
    console.log('OVERCURRENT', e);
});
robot.on('virtualwall', function(e) {
    console.log('VIRTUALWALL', e);
});
robot.on('wall', function(e) {
    console.log('WALL', e);
});
robot.on('wheeldrop', function(e) {
    console.log('WHEELDROP', e);
});