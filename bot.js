(function () {

var Player = function () {

    this.DIRECTION_UP = 38;
    this.DIRECTION_DOWN = 40;
    this.DIRECTION_LEFT = 37;
    this.DIRECTION_RIGHT = 39;
    this.directions = [
        this.DIRECTION_UP,
        this.DIRECTION_DOWN,
        this.DIRECTION_LEFT,
        this.DIRECTION_RIGHT
    ];
    this.rowCount = 4;
    this.colCount = 4;
    this.interval = null;
};

Player.prototype.getGrid = function () {
    var grid = [], i, ii, cell;
    for (i = 0; i < this.rowCount; i++) {
        grid[i] || (grid[i] = []);
        for (ii = 0; ii < this.colCount; ii++) {
            grid[i][ii] || (grid[i][ii] = []);
            cell = document.getElementsByClassName('tile-position-' + i + '-' + ii);
            grid[i][ii] = cell.length ? parseInt(cell[0].innerText, 10) : 0;
        }
    }
};

Player.prototype.calculateMoveScore = function (grid, direction) {

};

Player.prototype.moveCellsInGrid = function (grid, direction) {
    var i, ii;
    for (i = 0; i < this.rowCount; i++) {
        for (ii = 0; ii < this.colCount; ii++) {

        }
    }
};

Player.prototype.getBestMove = function () {

    return this.directions[Math.floor((Math.random()*4)+0)];
};

Player.prototype.move = function () {
    if (this.isGameOver()) {
        console.log('Gave Over');
        this.stop();
    }
    var direction = this.getBestMove();
    console.log('Move to ' + direction);
    this.pressKey(direction);
};

Player.prototype.pressKey = function (keyCode) {
    var event = this.eventFactory(keyCode);
    document.dispatchEvent(event);
};

Player.prototype.eventFactory = function(keyCode) {
    var doc = document;
    var event;

    if (/*goog.userAgent.GECKO*/false) {
        var view = goog.dom.getWindow(doc);
        var keyCode = args.charCode ? 0 : args.keyCode;
        event = doc.createEvent('KeyboardEvent');
        event.initKeyEvent(this.type_, this.bubbles_, this.cancelable_, view,
            args.ctrlKey, args.altKey, args.shiftKey, args.metaKey, keyCode,
            args.charCode);
        // https://bugzilla.mozilla.org/show_bug.cgi?id=501496
        if (this.type_ == bot.events.EventType.KEYPRESS && args.preventDefault) {
            event.preventDefault();
        }
    } else {
        if (/*bot.userAgent.IE_DOC_PRE9*/false) {
            event = doc.createEventObject();
        } else {  // WebKit, Opera, and IE 9+ in Standards mode.
            event = doc.createEvent('Events');
            event.initEvent('keydown', true, true);
        }
        event.altKey = event.ctrlKey = event.metaKey = event.shiftKey = false;
        event.keyCode = keyCode;
        event.which = keyCode;
        event.charCode = 0;
    }

    return event;
};

Player.prototype.isGameOver = function () {
    return !!document.getElementsByClassName('game-over').length;
};

Player.prototype.play = function () {
    this.interval = setInterval(this.move.bind(this), 100);
};

Player.prototype.stop = function () {
    clearInterval(this.interval);
};

var player = new Player();
player.play();

})();
