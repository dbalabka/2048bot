(function () {

    var Player = function () {

        this.DIRECTION_UP = 0;
        this.DIRECTION_DOWN = 1;
        this.DIRECTION_LEFT = 2;
        this.DIRECTION_RIGHT = 3;
        this.directions = [
            this.DIRECTION_UP,
            this.DIRECTION_DOWN,
            this.DIRECTION_LEFT,
            this.DIRECTION_RIGHT
        ];
        this.keyMap = [
            38,
            40,
            37,
            39
        ];
        this.width = 4;
        this.interval = null;
    };

    Player.prototype.getGrid = function () {
        var grid = [], i, ii, cell;
        for (i = 0; i < this.width; i++) {
            grid[i] || (grid[i] = []);
            for (ii = 0; ii < this.width; ii++) {
                grid[i][ii] || (grid[i][ii] = []);
                cell = document.getElementsByClassName('tile-position-' + i + '-' + ii);
                grid[i][ii] = cell.length ? parseInt(cell[0].innerText, 10) : 0;
            }
        }
    };

    Player.prototype.calculateMoveScore = function (grid, direction) {
        this.itterateGridElements(grid, direction, function (currentXY, nextXY, vector) {
            if (grid[nextXY.x][nextXY.y] && !grid[currentXY.x][currentXY.y]) {
                grid[currentXY.x][currentXY.y] = grid[nextXY.x][nextXY.y];
                grid[nextXY.x][nextXY.y] = 0;
            } else if (grid[currentXY.x][currentXY.y] && grid[currentXY.x][currentXY.y] === grid[nextXY.x][nextXY.y]) {
                grid[currentXY.x][currentXY.y] += grid[nextXY.x][nextXY.y];
                grid[nextXY.x][nextXY.y] = 0;
            }
        });
    };

    Player.prototype.moveElements = function (grid, currentXY, vector) {
        if (!grid[currentXY.x][currentXY.y]) {
            return;
        }
        var nextXY = {x: currentXY.x + vector.x, y: currentXY.y + vector.y};
        while (nextXY.x > this.width || nextXY.x < 0 || nextXY.y > this.width || nextXY.y < 0) {

        }
    };

    Player.prototype.itterateGridElements = function (grid, direction, callback) {
        var x, y, vector, i, ii, currentXY, nextXY;
        vector = this.getVector(direction);

        for (i = 0; i < this.width; i++) {
            if (vector.x === 0) {
                x = i;
            } else { // otherwise y is 0
                y = i
            }
            for (ii = 0; ii < this.width; ii++) {
                if (vector.x !== 0) {
                    x = vector.x < 0 ? ii : this.width - ii;
                } else { // otherwise y is not 0
                    y = vector.x < 0 ? ii : this.width - ii;
                }
                currentXY = {x: x, y: y};
                nextXY = {x: x + vector.x, y: y + vector.y};
                if (nextXY.x > this.width || nextXY.x < 0 || nextXY.y > this.width || nextXY.y < 0) {
                    continue;
                }
                callback(currentXY, nextXY, vector)
            }
        }
    };

    Player.prototype.getVector = function (direction) {
        var vectors = [
            {x: 0,  y: -1}, // up
            {x: 0,  y: 1},  // down
            {x: -1, y: 0},  // left
            {x: 1,  y: 0}   // right
        ];
        return vectors[direction];
    };

    Player.prototype.getBestMove = function () {

        return Math.floor((Math.random()*4)+0);
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

    Player.prototype.pressKey = function (direction) {
        var event = this.eventFactory(this.keyMap[direction]);
        document.dispatchEvent(event);
    };

    /**
     * Thanks to Google for this piece of good code.
     * https://code.google.com/p/selenium/source/browse/javascript/atoms/events.js#408
     * @param keyCode
     * @returns {*}
     */
    Player.prototype.eventFactory = function(keyCode) {
        var doc = document;
        var event;

        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            var view = goog.dom.getWindow(doc);
            event = doc.createEvent('KeyboardEvent');
            event.initKeyEvent('keydown', true, true, window,
                false, false, false, false, keyCode, 0);
            event.which = keyCode;
        } else {
            if (doc.createEventObject) { // IE_PRE9
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