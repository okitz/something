"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Master = function () {
    function Master(name1, name2, solo) {
        _classCallCheck(this, Master);

        var mochibaF = document.createElement('tr'),
            mochibaA = document.createElement('tr'),
            tableF = document.createElement('table'),
            tableA = document.createElement('table'),
            table = document.createElement('table'),
            divF = document.createElement('div'),
            divA = document.createElement('div'),
            divOthers = document.createElement('div'),
            resetButton = document.createElement('input'),
            classes = [Kou, Kei, Gin, Kin, Gyo, Kin, Gin, Kei, Kou, null, His, null, null, null, null, null, Kak, null, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, Hoh, null, Kak, null, null, null, null, null, His, null, Kou, Kei, Gin, Kin, Ouu, Kin, Gin, Kei, Kou];
        this.solo = solo;
        this.turnCount = 0;
        this.komas = [];
        this.maths = [];
        this.contentDiv = document.getElementById('content');
        this.tableDiv = document.createElement('div');
        this.player1 = new Player(name1 || 'habu', true, this, mochibaF);
        this.player2 = new Player(name2 || 'huji', false, this, mochibaA);
        this.current;
        tableF.class = "mochi";
        tableA.class = "mochi";
        for (var i = 0; i < 9; i++) {
            var tr = document.createElement('tr'),
                komar = [];
            for (var j = 0; j < 9; j++) {
                var td = document.createElement('td');
                this.maths.push(td);
                tr.appendChild(td);
                var nextClass = classes.shift();
                var PLAYER = classes.length > 27 ? this.player1 : this.player2;
                if (nextClass) {
                    var komaIns = new nextClass(PLAYER, td, this);
                    this.komas.push(komaIns);
                    td.innerHTML = komaIns.name;
                    if (PLAYER.type) td.classList.add('UpsideDown');
                }
            }
            table.appendChild(tr);
        }
        tableF.appendChild(mochibaF);
        tableA.appendChild(mochibaA);
        divF.innerText = '\u5148\u624B ' + (name1 || 'habu');
        divA.innerText = '\u5F8C\u624B ' + (name2 || 'huji');
        var _ref = ['button', '指し直し', function () {
            new Master(name1, name2, solo);
        }];
        resetButton.type = _ref[0];
        resetButton.value = _ref[1];
        resetButton.onclick = _ref[2];

        divOthers.appendChild(resetButton);
        divF.classList.add('UpsideDown');
        this.contentDiv.innerHTML = '';
        this.tableDiv.appendChild(divF);
        this.tableDiv.appendChild(tableF);
        this.tableDiv.appendChild(table);
        this.tableDiv.appendChild(tableA);
        this.tableDiv.appendChild(divA);
        this.contentDiv.appendChild(this.tableDiv);
        this.contentDiv.appendChild(divOthers);
        this.turnChange();
        this.komas.forEach(function (v) {
            return v.updateKikiObj();
        });
        window.onbeforeunload = function () {
            return '';
        };
    }

    _createClass(Master, [{
        key: 'findKomaFromObj',
        value: function findKomaFromObj(obj) {
            this.komas.find(function (v) {
                return v.obj === obj;
            });
        }
    }, {
        key: 'turnChange',
        value: function turnChange() {
            this.turnCount++;
            this.current = this.current !== this.player1 ? this.player1 : this.player2;
            if (this.solo) {
                this.tableDiv.classList.toggle('UpsideDown');
            };
            this.current.check();
        }
    }]);

    return Master;
}();

var Player = function () {
    function Player(name, type, master, mochiba) {
        _classCallCheck(this, Player);

        this.name = name; //string
        this.type = type; //bool
        this.master = master; //Master instamce
        this.mochiba = mochiba;
    }

    _createClass(Player, [{
        key: 'check',
        value: function check() {
            var _this = this;

            //okerubsho
            this.master.komas.filter(function (koma) {
                return koma.owner === _this;
            }).forEach(function (koma) {
                koma.obj.onclick = function (e) {
                    _this.pick(_this.master.komas.find(function (v) {
                        return v.obj === e.target;
                    })); //怪しい
                };
            });
        }
    }, {
        key: 'pick',
        value: function pick(koma) {
            var _this2 = this;

            //押したコマ
            if (this.picking) {
                this.picking.kikiObj.forEach(function (kikiMath) {
                    kikiMath.classList.remove("kiki");
                    kikiMath.onclick = function () {};
                });
            }
            this.picking = koma;
            this.picking.kikiObj.forEach(function (kikiMath) {
                kikiMath.onclick = function (e) {
                    _this2.put(_this2.picking, e.target);
                };
                kikiMath.classList.add("kiki");
            });
        }
    }, {
        key: 'put',
        value: function put(koma, toObj) {
            var _this3 = this;

            if (this.picking) {
                this.picking.kikiObj.forEach(function (kikiMath) {
                    kikiMath.classList.remove("kiki");
                    kikiMath.onclick = function () {};
                });
                this.pickingsKiki = null;
            }
            this.master.komas.filter(function (math) {
                return math.owner === _this3;
            }).forEach(function (koma) {
                koma.obj.onclick = function () {};
            });

            var takenKoma = this.master.komas.find(function (v) {
                return v.obj === toObj;
            });
            if (takenKoma) {
                var td = document.createElement('td');
                this.mochiba.appendChild(td);
                takenKoma.taken(td);
            }
            koma.move(toObj);
            this.master.komas.forEach(function (v) {
                return v.updateKikiObj();
            });
            koma.obj.innerText = koma.name;
            this.master.turnChange();
        }
    }]);

    return Player;
}();

var Koma = function () {
    function Koma(owner, obj) {
        _classCallCheck(this, Koma);

        this.owner = owner; //Player Obj
        this.obj = obj; //HTML Obj
        this.mochi = false;
        this.nari = false;
    }

    _createClass(Koma, [{
        key: 'updateKikiObj',
        value: function updateKikiObj() {
            this.kikiObj = [];
            if (this.mochi) {
                this.kikiObj = this.owner.master.maths.filter(function (v) {
                    return v.innerText === '';
                });
                return;
            }
            var objNumber = this.owner.master.maths.indexOf(this.obj);
            if (this.nari && !!this.getNarikiki) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.getNarikiki(objNumber)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var kiki = _step.value;

                        this.kikiObj.push(this.owner.master.maths[kiki]);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            } else {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.getKiki(objNumber)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _kiki = _step2.value;

                        this.kikiObj.push(this.owner.master.maths[_kiki]);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }
    }, {
        key: 'move',
        value: function move(toObj) {
            this.obj.innerText = "";
            if (this.owner.type) {
                this.obj.classList.remove('UpsideDown');
                toObj.classList.add('UpsideDown');
            } else {
                toObj.classList.remove('UpsideDown');
            }
            this.obj.classList.remove('nari');
            this.obj = toObj;
            var tekijin = this.owner.type ? [54, 80] : [0, 26],
                basho = this.owner.master.maths.indexOf(this.obj);
            if (basho >= tekijin[0] && tekijin[1] >= basho && !this.nari && !this.mochi) {
                this.nari = confirm('成りますか？') ? true : false;
            }
            this.mochi = false;
            if (this.nari) {
                this.obj.classList.add('nari');
            }
        }
    }, {
        key: 'taken',
        value: function taken(toObj) {
            this.obj.innerText = "";
            this.owner = this.owner.master.current;
            if (this.owner.type) {
                this.obj.classList.remove('UpsideDown');
                toObj.classList.add('UpsideDown');
            } else {
                toObj.classList.remove('UpsideDown');
            }
            this.mochi = true;
            this.nari = false;
            this.obj.classList.remove('nari');
            this.obj = toObj;
            this.name = this.baseName;
            this.obj.innerText = this.name;
        }
    }, {
        key: 'kikiOverlap',
        value: function kikiOverlap(index, isSameOwner) {
            var _this4 = this;

            var judgedKoma = this.owner.master.komas.find(function (v) {
                return v.obj === _this4.owner.master.maths[index];
            });
            if (judgedKoma) {
                return isSameOwner ? this.owner === judgedKoma.owner : this.owner !== judgedKoma.owner;
            }
            return false;
        }
    }]);

    return Koma;
}();

var Ouu = function (_Koma) {
    _inherits(Ouu, _Koma);

    function Ouu(owner, obj, master) {
        _classCallCheck(this, Ouu);

        var _this5 = _possibleConstructorReturn(this, (Ouu.__proto__ || Object.getPrototypeOf(Ouu)).call(this, owner, obj, master));

        _this5.name = "王";
        _this5.baseName = "王";
        return _this5;
    }

    _createClass(Ouu, [{
        key: 'getKiki',
        value: function getKiki(k) {
            var _this6 = this;

            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [-10, -1, 8] : [],
                right = mod !== 8 ? [-8, 1, 10] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this6.owner.master.komas.find(function (koma) {
                    return koma.obj === _this6.owner.master.maths[v];
                }) || false;
                return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this6.owner);
            });
        }
    }, {
        key: 'taken',
        value: function taken() {
            if (confirm('詰み\n盤面をリセットしますか？')) {
                new Master();
            }
        }
    }]);

    return Ouu;
}(Koma);

var Gyo = function (_Koma2) {
    _inherits(Gyo, _Koma2);

    function Gyo(owner, obj, master) {
        _classCallCheck(this, Gyo);

        var _this7 = _possibleConstructorReturn(this, (Gyo.__proto__ || Object.getPrototypeOf(Gyo)).call(this, owner, obj, master));

        _this7.name = "玉";
        _this7.baseName = "玉";
        return _this7;
    }

    _createClass(Gyo, [{
        key: 'getKiki',
        value: function getKiki(k) {
            var _this8 = this;

            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [-10, -1, 8] : [],
                right = mod !== 8 ? [-8, 1, 10] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this8.owner.master.komas.find(function (koma) {
                    return koma.obj === _this8.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this8.owner);
            });
        }
    }, {
        key: 'taken',
        value: function taken() {
            if (confirm('詰み\n盤面をリセットしますか？')) {
                new Master();
            }
        }
    }]);

    return Gyo;
}(Koma);

var His = function (_Koma3) {
    _inherits(His, _Koma3);

    function His(owner, obj, master) {
        _classCallCheck(this, His);

        var _this9 = _possibleConstructorReturn(this, (His.__proto__ || Object.getPrototypeOf(His)).call(this, owner, obj, master));

        _this9.name = "飛";
        _this9.baseName = "飛";
        return _this9;
    }

    _createClass(His, [{
        key: 'getKiki',
        value: function getKiki(k) {
            return [].concat(_toConsumableArray( /*#__PURE__*/regeneratorRuntime.mark(function _callee(k) {
                var quo, mod, i, index, _i, _index, _i2, _index2, _i3, _index3;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                quo = Math.floor(k / 9), mod = k % 9;
                                i = 1;

                            case 2:
                                if (!(i <= quo)) {
                                    _context.next = 15;
                                    break;
                                }

                                index = k - i * 9;

                                if (!this.kikiOverlap(index, true)) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('break', 15);

                            case 6:
                                ;_context.next = 9;
                                return index;

                            case 9:
                                if (!this.kikiOverlap(index)) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt('break', 15);

                            case 11:
                                ;

                            case 12:
                                i++;
                                _context.next = 2;
                                break;

                            case 15:
                                _i = 1;

                            case 16:
                                if (!(_i <= 8 - quo)) {
                                    _context.next = 29;
                                    break;
                                }

                                _index = k + _i * 9;

                                if (!this.kikiOverlap(_index, true)) {
                                    _context.next = 20;
                                    break;
                                }

                                return _context.abrupt('break', 29);

                            case 20:
                                ;_context.next = 23;
                                return _index;

                            case 23:
                                if (!this.kikiOverlap(_index)) {
                                    _context.next = 25;
                                    break;
                                }

                                return _context.abrupt('break', 29);

                            case 25:
                                ;

                            case 26:
                                _i++;
                                _context.next = 16;
                                break;

                            case 29:
                                _i2 = 1;

                            case 30:
                                if (!(_i2 <= mod)) {
                                    _context.next = 43;
                                    break;
                                }

                                _index2 = k - _i2;

                                if (!this.kikiOverlap(_index2, true)) {
                                    _context.next = 34;
                                    break;
                                }

                                return _context.abrupt('break', 43);

                            case 34:
                                ;_context.next = 37;
                                return _index2;

                            case 37:
                                if (!this.kikiOverlap(_index2)) {
                                    _context.next = 39;
                                    break;
                                }

                                return _context.abrupt('break', 43);

                            case 39:
                                ;

                            case 40:
                                _i2++;
                                _context.next = 30;
                                break;

                            case 43:
                                _i3 = 1;

                            case 44:
                                if (!(_i3 <= 8 - mod)) {
                                    _context.next = 57;
                                    break;
                                }

                                _index3 = k + _i3;

                                if (!this.kikiOverlap(_index3, true)) {
                                    _context.next = 48;
                                    break;
                                }

                                return _context.abrupt('break', 57);

                            case 48:
                                ;_context.next = 51;
                                return _index3;

                            case 51:
                                if (!this.kikiOverlap(_index3)) {
                                    _context.next = 53;
                                    break;
                                }

                                return _context.abrupt('break', 57);

                            case 53:
                                ;

                            case 54:
                                _i3++;
                                _context.next = 44;
                                break;

                            case 57:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }).apply(this, [k])));
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            this.name = '龍';
            var quo = Math.floor(k / 9),
                mod = k % 9;
            return [].concat(_toConsumableArray( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(k) {
                var i, index, _i4, _index4, _i5, _index5, _i6, _index6;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                i = 1;

                            case 1:
                                if (!(i <= quo)) {
                                    _context2.next = 14;
                                    break;
                                }

                                index = k - i * 9;

                                if (!this.kikiOverlap(index, true)) {
                                    _context2.next = 5;
                                    break;
                                }

                                return _context2.abrupt('break', 14);

                            case 5:
                                ;_context2.next = 8;
                                return index;

                            case 8:
                                if (!this.kikiOverlap(index)) {
                                    _context2.next = 10;
                                    break;
                                }

                                return _context2.abrupt('break', 14);

                            case 10:
                                ;

                            case 11:
                                i++;
                                _context2.next = 1;
                                break;

                            case 14:
                                _i4 = 1;

                            case 15:
                                if (!(_i4 <= 8 - quo)) {
                                    _context2.next = 28;
                                    break;
                                }

                                _index4 = k + _i4 * 9;

                                if (!this.kikiOverlap(_index4, true)) {
                                    _context2.next = 19;
                                    break;
                                }

                                return _context2.abrupt('break', 28);

                            case 19:
                                ;_context2.next = 22;
                                return _index4;

                            case 22:
                                if (!this.kikiOverlap(_index4)) {
                                    _context2.next = 24;
                                    break;
                                }

                                return _context2.abrupt('break', 28);

                            case 24:
                                ;

                            case 25:
                                _i4++;
                                _context2.next = 15;
                                break;

                            case 28:
                                _i5 = 1;

                            case 29:
                                if (!(_i5 <= mod)) {
                                    _context2.next = 42;
                                    break;
                                }

                                _index5 = k - _i5;

                                if (!this.kikiOverlap(_index5, true)) {
                                    _context2.next = 33;
                                    break;
                                }

                                return _context2.abrupt('break', 42);

                            case 33:
                                ;_context2.next = 36;
                                return _index5;

                            case 36:
                                if (!this.kikiOverlap(_index5)) {
                                    _context2.next = 38;
                                    break;
                                }

                                return _context2.abrupt('break', 42);

                            case 38:
                                ;

                            case 39:
                                _i5++;
                                _context2.next = 29;
                                break;

                            case 42:
                                _i6 = 1;

                            case 43:
                                if (!(_i6 <= 8 - mod)) {
                                    _context2.next = 56;
                                    break;
                                }

                                _index6 = k + _i6;

                                if (!this.kikiOverlap(_index6, true)) {
                                    _context2.next = 47;
                                    break;
                                }

                                return _context2.abrupt('break', 56);

                            case 47:
                                ;_context2.next = 50;
                                return _index6;

                            case 50:
                                if (!this.kikiOverlap(_index6)) {
                                    _context2.next = 52;
                                    break;
                                }

                                return _context2.abrupt('break', 56);

                            case 52:
                                ;

                            case 53:
                                _i6++;
                                _context2.next = 43;
                                break;

                            case 56:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }).apply(this, [k]))).concat((mod !== 0 ? [-10, 8] : []).concat(mod !== 8 ? [-8, 10] : []).map(function (v) {
                return v + k;
            }).filter(function (v) {
                return v >= 0 && v <= 80;
            }));
        }
    }]);

    return His;
}(Koma);

var Kak = function (_Koma4) {
    _inherits(Kak, _Koma4);

    function Kak(owner, obj, master) {
        _classCallCheck(this, Kak);

        var _this10 = _possibleConstructorReturn(this, (Kak.__proto__ || Object.getPrototypeOf(Kak)).call(this, owner, obj, master));

        _this10.name = "角";
        _this10.baseName = "角";
        return _this10;
    }

    _createClass(Kak, [{
        key: 'getKiki',
        value: function getKiki(k) {
            return [].concat(_toConsumableArray( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(k) {
                var quo, mod, i, index, _i7, _index7, _i8, _index8, _i9, _index9;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                quo = Math.floor(k / 9), mod = k % 9;
                                i = 1;

                            case 2:
                                if (!(i <= quo && i <= mod)) {
                                    _context3.next = 15;
                                    break;
                                }

                                index = k - i * 10;

                                if (!this.kikiOverlap(index, true)) {
                                    _context3.next = 6;
                                    break;
                                }

                                return _context3.abrupt('break', 15);

                            case 6:
                                ;_context3.next = 9;
                                return index;

                            case 9:
                                if (!this.kikiOverlap(index)) {
                                    _context3.next = 11;
                                    break;
                                }

                                return _context3.abrupt('break', 15);

                            case 11:
                                ;

                            case 12:
                                i++;
                                _context3.next = 2;
                                break;

                            case 15:
                                _i7 = 1;

                            case 16:
                                if (!(_i7 <= 8 - quo && _i7 <= mod)) {
                                    _context3.next = 29;
                                    break;
                                }

                                _index7 = k + _i7 * 8;

                                if (!this.kikiOverlap(_index7, true)) {
                                    _context3.next = 20;
                                    break;
                                }

                                return _context3.abrupt('break', 29);

                            case 20:
                                ;_context3.next = 23;
                                return _index7;

                            case 23:
                                if (!this.kikiOverlap(_index7)) {
                                    _context3.next = 25;
                                    break;
                                }

                                return _context3.abrupt('break', 29);

                            case 25:
                                ;

                            case 26:
                                _i7++;
                                _context3.next = 16;
                                break;

                            case 29:
                                _i8 = 1;

                            case 30:
                                if (!(_i8 <= quo && _i8 <= 8 - mod)) {
                                    _context3.next = 43;
                                    break;
                                }

                                _index8 = k - _i8 * 8;

                                if (!this.kikiOverlap(_index8, true)) {
                                    _context3.next = 34;
                                    break;
                                }

                                return _context3.abrupt('break', 43);

                            case 34:
                                ;_context3.next = 37;
                                return _index8;

                            case 37:
                                if (!this.kikiOverlap(_index8)) {
                                    _context3.next = 39;
                                    break;
                                }

                                return _context3.abrupt('break', 43);

                            case 39:
                                ;

                            case 40:
                                _i8++;
                                _context3.next = 30;
                                break;

                            case 43:
                                _i9 = 1;

                            case 44:
                                if (!(_i9 <= 8 - quo && _i9 <= 8 - mod)) {
                                    _context3.next = 57;
                                    break;
                                }

                                _index9 = k + _i9 * 10;

                                if (!this.kikiOverlap(_index9, true)) {
                                    _context3.next = 48;
                                    break;
                                }

                                return _context3.abrupt('break', 57);

                            case 48:
                                ;_context3.next = 51;
                                return _index9;

                            case 51:
                                if (!this.kikiOverlap(_index9)) {
                                    _context3.next = 53;
                                    break;
                                }

                                return _context3.abrupt('break', 57);

                            case 53:
                                ;

                            case 54:
                                _i9++;
                                _context3.next = 44;
                                break;

                            case 57:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }).apply(this, [k])));
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            this.name = '馬';
            var quo = Math.floor(k / 9),
                mod = k % 9;
            return [].concat(_toConsumableArray( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(k) {
                var i, index, _i10, _index10, _i11, _index11, _i12, _index12;

                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                i = 1;

                            case 1:
                                if (!(i <= quo && i <= mod)) {
                                    _context4.next = 14;
                                    break;
                                }

                                index = k - i * 10;

                                if (!this.kikiOverlap(index, true)) {
                                    _context4.next = 5;
                                    break;
                                }

                                return _context4.abrupt('break', 14);

                            case 5:
                                ;_context4.next = 8;
                                return index;

                            case 8:
                                if (!this.kikiOverlap(index)) {
                                    _context4.next = 10;
                                    break;
                                }

                                return _context4.abrupt('break', 14);

                            case 10:
                                ;

                            case 11:
                                i++;
                                _context4.next = 1;
                                break;

                            case 14:
                                _i10 = 1;

                            case 15:
                                if (!(_i10 <= 8 - quo && _i10 <= mod)) {
                                    _context4.next = 28;
                                    break;
                                }

                                _index10 = k + _i10 * 8;

                                if (!this.kikiOverlap(_index10, true)) {
                                    _context4.next = 19;
                                    break;
                                }

                                return _context4.abrupt('break', 28);

                            case 19:
                                ;_context4.next = 22;
                                return _index10;

                            case 22:
                                if (!this.kikiOverlap(_index10)) {
                                    _context4.next = 24;
                                    break;
                                }

                                return _context4.abrupt('break', 28);

                            case 24:
                                ;

                            case 25:
                                _i10++;
                                _context4.next = 15;
                                break;

                            case 28:
                                _i11 = 1;

                            case 29:
                                if (!(_i11 <= quo && _i11 <= 8 - mod)) {
                                    _context4.next = 42;
                                    break;
                                }

                                _index11 = k - _i11 * 8;

                                if (!this.kikiOverlap(_index11, true)) {
                                    _context4.next = 33;
                                    break;
                                }

                                return _context4.abrupt('break', 42);

                            case 33:
                                ;_context4.next = 36;
                                return _index11;

                            case 36:
                                if (!this.kikiOverlap(_index11)) {
                                    _context4.next = 38;
                                    break;
                                }

                                return _context4.abrupt('break', 42);

                            case 38:
                                ;

                            case 39:
                                _i11++;
                                _context4.next = 29;
                                break;

                            case 42:
                                _i12 = 1;

                            case 43:
                                if (!(_i12 <= 8 - quo && _i12 <= 8 - mod)) {
                                    _context4.next = 56;
                                    break;
                                }

                                _index12 = k + _i12 * 10;

                                if (!this.kikiOverlap(_index12, true)) {
                                    _context4.next = 47;
                                    break;
                                }

                                return _context4.abrupt('break', 56);

                            case 47:
                                ;_context4.next = 50;
                                return _index12;

                            case 50:
                                if (!this.kikiOverlap(_index12)) {
                                    _context4.next = 52;
                                    break;
                                }

                                return _context4.abrupt('break', 56);

                            case 52:
                                ;

                            case 53:
                                _i12++;
                                _context4.next = 43;
                                break;

                            case 56:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }).apply(this, [k]))).concat([-9, 9].concat(mod !== 0 ? [-1] : []).concat(mod !== 8 ? [1] : []).map(function (v) {
                return v + k;
            }).filter(function (v) {
                return v >= 0 && v <= 80;
            }));
        }
    }]);

    return Kak;
}(Koma);

var Kei = function (_Koma5) {
    _inherits(Kei, _Koma5);

    function Kei(owner, obj, master) {
        _classCallCheck(this, Kei);

        var _this11 = _possibleConstructorReturn(this, (Kei.__proto__ || Object.getPrototypeOf(Kei)).call(this, owner, obj, master));

        _this11.name = "桂";
        _this11.baseName = "桂";
        return _this11;
    }

    _createClass(Kei, [{
        key: 'getKiki',
        value: function getKiki(k) {
            var _this12 = this;

            var mod = k % 9,
                left = mod !== 0 ? [17, -19] : -1,
                right = mod !== 8 ? [19, -17] : -1;
            return (this.owner.type ? [left[0], right[0]] : [left[1], right[1]]).map(function (v) {
                return v + k;
            }).filter(function (v) {
                return v >= 0 && v <= 80;
            }).filter(function (v) {
                return !_this12.kikiOverlap(v, true);
            });
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            var _this13 = this;

            this.name = '圭';
            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
                right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this13.owner.master.komas.find(function (koma) {
                    return koma.obj === _this13.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this13.owner);
            });
        }
    }]);

    return Kei;
}(Koma);

var Kin = function (_Koma6) {
    _inherits(Kin, _Koma6);

    function Kin(owner, obj, master) {
        _classCallCheck(this, Kin);

        var _this14 = _possibleConstructorReturn(this, (Kin.__proto__ || Object.getPrototypeOf(Kin)).call(this, owner, obj, master));

        _this14.name = "金";
        _this14.baseName = "金";
        return _this14;
    }

    _createClass(Kin, [{
        key: 'getKiki',
        value: function getKiki(k) {
            var _this15 = this;

            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
                right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this15.owner.master.komas.find(function (koma) {
                    return koma.obj === _this15.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this15.owner);
            });
        }
    }]);

    return Kin;
}(Koma);

var Gin = function (_Koma7) {
    _inherits(Gin, _Koma7);

    function Gin(owner, obj, master) {
        _classCallCheck(this, Gin);

        var _this16 = _possibleConstructorReturn(this, (Gin.__proto__ || Object.getPrototypeOf(Gin)).call(this, owner, obj, master));

        _this16.name = "銀";
        _this16.baseName = "銀";
        return _this16;
    }

    _createClass(Gin, [{
        key: 'getKiki',
        value: function getKiki(k) {
            var _this17 = this;

            var mod = k % 9,
                result = [this.owner.type ? 9 : -9],
                left = mod !== 0 ? [-10, 8] : [],
                right = mod !== 8 ? [-8, 10] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this17.owner.master.komas.find(function (koma) {
                    return koma.obj === _this17.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this17.owner);
            });
            return [-8, -9, -10, 8, 10];
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            var _this18 = this;

            this.name = '全';
            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
                right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this18.owner.master.komas.find(function (koma) {
                    return koma.obj === _this18.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this18.owner);
            });
        }
    }]);

    return Gin;
}(Koma);

var Kou = function (_Koma8) {
    _inherits(Kou, _Koma8);

    function Kou(owner, obj, master) {
        _classCallCheck(this, Kou);

        var _this19 = _possibleConstructorReturn(this, (Kou.__proto__ || Object.getPrototypeOf(Kou)).call(this, owner, obj, master));

        _this19.name = "香";
        _this19.baseName = "香";
        return _this19;
    }

    _createClass(Kou, [{
        key: 'getKiki',
        value: function getKiki(k) {
            return (/*#__PURE__*/regeneratorRuntime.mark(function _callee5(k) {
                    var _ref2, _ref3, moving, quo, i, index;

                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _ref2 = this.owner.type ? [9, 8 - Math.floor(k / 9)] : [-9, Math.floor(k / 9)], _ref3 = _slicedToArray(_ref2, 2), moving = _ref3[0], quo = _ref3[1];
                                    i = 1;

                                case 2:
                                    if (!(i <= quo)) {
                                        _context5.next = 15;
                                        break;
                                    }

                                    index = k + i * moving;

                                    if (!this.kikiOverlap(index, true)) {
                                        _context5.next = 6;
                                        break;
                                    }

                                    return _context5.abrupt('break', 15);

                                case 6:
                                    ;_context5.next = 9;
                                    return index;

                                case 9:
                                    if (!this.kikiOverlap(index)) {
                                        _context5.next = 11;
                                        break;
                                    }

                                    return _context5.abrupt('break', 15);

                                case 11:
                                    ;

                                case 12:
                                    i++;
                                    _context5.next = 2;
                                    break;

                                case 15:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, this);
                }).apply(this, [k])
            );
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            var _this20 = this;

            this.name = '杏';
            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
                right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this20.owner.master.komas.find(function (koma) {
                    return koma.obj === _this20.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this20.owner);
            });
        }
    }]);

    return Kou;
}(Koma);

var Hoh = function (_Koma9) {
    _inherits(Hoh, _Koma9);

    function Hoh(owner, obj, master) {
        _classCallCheck(this, Hoh);

        var _this21 = _possibleConstructorReturn(this, (Hoh.__proto__ || Object.getPrototypeOf(Hoh)).call(this, owner, obj, master));

        _this21.name = "歩";
        _this21.baseName = "歩";
        return _this21;
    }

    _createClass(Hoh, [{
        key: 'getKiki',
        value: function getKiki(k) {

            return [this.owner.type ? 9 + k : -9 + k].filter(function (v) {
                return v >= 0 && 80 >= v;
            });
        }
    }, {
        key: 'getNarikiki',
        value: function getNarikiki(k) {
            var _this22 = this;

            this.name = 'と';
            var mod = k % 9,
                result = [-9, 9],
                left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
                right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
            return result.concat(left).concat(right).map(function (v) {
                return v + k;
            }).filter(function (v) {
                var myKoma = _this22.owner.master.komas.find(function (koma) {
                    return koma.obj === _this22.owner.master.maths[v];
                });return v >= 0 && v <= 80 && (!myKoma || myKoma.owner !== _this22.owner);
            });
        }
    }, {
        key: 'updateKikiObj',
        value: function updateKikiObj() {
            var _this23 = this;

            this.kikiObj = [];
            if (this.mochi) {
                this.kikiObj = this.owner.master.maths.filter(function (v, i, a) {
                    var mod = i % 9;

                    var _loop = function _loop(j) {
                        var current = _this23.owner.master.komas.find(function (v) {
                            return v.obj === a[j * 9 + mod];
                        });
                        if (current && current.name === '歩' && current.owner.type === _this23.owner.type) return {
                                v: false
                            };
                    };

                    for (var j = 0; j < 9; j++) {
                        var _ret = _loop(j);

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                    return true;
                }).filter(function (v) {
                    return !_this23.owner.master.komas.find(function (koma) {
                        return koma.obj === v;
                    });
                });
                return;
            }
            var objNumber = this.owner.master.maths.indexOf(this.obj);
            if (this.nari && !!this.getNarikiki) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.getNarikiki(objNumber)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var kiki = _step3.value;

                        this.kikiObj.push(this.owner.master.maths[kiki]);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            } else {
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.getKiki(objNumber)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var _kiki2 = _step4.value;

                        this.kikiObj.push(this.owner.master.maths[_kiki2]);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        }
    }]);

    return Hoh;
}(Koma);

window.addEventListener("DOMContentLoaded", function () {
    [].concat(_toConsumableArray(document.getElementsByClassName('selects'))).forEach(function (s) {
        s.addEventListener("change", function (e) {
            var target = e.target,
                value = target.options[target.selectedIndex].value,
                box = document.getElementById(target.name);
            if (value === "human") {
                box.value = "";
                box.disabled = "";
                box.focus();
            } else if (value === "cpu") {
                box.value = "CPU";
                box.disabled = "true";
            }
        }, false);
    });
    document.getElementById("startButton").addEventListener("click", function () {
        var name1 = document.getElementById('user1').value,
            name2 = document.getElementById('user2').value,
            solo = document.getElementById('turnOn').checked;
        new Master(name1, name2, solo);
    }, false);
});
//二歩、打ち歩詰め、動けない場所に持ち駒を打つ