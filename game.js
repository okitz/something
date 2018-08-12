"use strict";
class Master {
    constructor(name1, name2, solo) {
        const mochibaF = document.createElement('tr'),
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
        for (let i = 0; i < 9; i++) {
            const tr = document.createElement('tr'),
                  komar = [];
            for (let j = 0; j < 9; j++) {
                const td = document.createElement('td');
                this.maths.push(td);
                tr.appendChild(td);
                const nextClass = classes.shift();
                const PLAYER = classes.length > 27 ? this.player1 : this.player2;
                if (nextClass) {
                    const komaIns = new nextClass(PLAYER, td, this);
                    this.komas.push(komaIns);
                    td.innerHTML = komaIns.name;
                    if (PLAYER.type) td.classList.add('UpsideDown');
                }
            }
            table.appendChild(tr);
        }
        tableF.appendChild(mochibaF);
        tableA.appendChild(mochibaA);
        divF.innerText = `先手 ${name1 || 'habu'}`;
        divA.innerText = `後手 ${name2 || 'huji'}`;
        [resetButton.type, resetButton.value, resetButton.onclick] = ['button', '指し直し', () => {
            new Master(name1, name2, solo);
        }];
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
        this.komas.forEach(v => v.updateKikiObj());
        window.onbeforeunload = function() {
            return '';
        };
    }
    findKomaFromObj(obj){
        this.komas.find(v=>v.obj===obj);
    }
    turnChange() {
        this.turnCount++;
        this.current = this.current !== this.player1 ? this.player1 : this.player2;
        if (this.solo) {
            this.tableDiv.classList.toggle('UpsideDown');
        };
        this.current.check();
    }
}

class Player {
    constructor(name, type, master, mochiba) {
        this.name = name; //string
        this.type = type; //bool
        this.master = master; //Master instamce
        this.mochiba = mochiba;
    }
    check() {
        //okerubsho
        this.master.komas.filter(koma => koma.owner === this).forEach(koma => {
            koma.obj.onclick = e => {
                this.pick(this.master.komas.find(v => v.obj === e.target)); //怪しい
            };
        });
    }
    pick(koma) {
        //押したコマ
        if (this.picking) {
            this.picking.kikiObj.forEach(kikiMath => {
                kikiMath.classList.remove("kiki");
                kikiMath.onclick = () => {};
            });
        }
        this.picking = koma;
        this.picking.kikiObj.forEach(kikiMath => {
            kikiMath.onclick = e => {
                this.put(this.picking, e.target);
            };
            kikiMath.classList.add("kiki");
        });
    }
    put(koma, toObj) {
        if (this.picking) {
            this.picking.kikiObj.forEach(kikiMath => {
                kikiMath.classList.remove("kiki");
                kikiMath.onclick = () => {};
            });
            this.pickingsKiki = null;
        }
        this.master.komas.filter(math => math.owner === this).forEach(koma => {
            koma.obj.onclick = () => {};
        });

        const takenKoma = this.master.komas.find(v => v.obj === toObj);
        if (takenKoma) {
            const td = document.createElement('td');
            this.mochiba.appendChild(td);
            takenKoma.taken(td);
        }
        koma.move(toObj);
        this.master.komas.forEach(v => v.updateKikiObj());
        koma.obj.innerText = koma.name;
        this.master.turnChange();
    }
}

class Koma {
    constructor(owner, obj) {
        this.owner = owner; //Player Obj
        this.obj = obj; //HTML Obj
        this.mochi = false;
        this.nari = false;
    }
    updateKikiObj() {
        this.kikiObj = [];
        if (this.mochi) {
            this.kikiObj = this.owner.master.maths.filter(v => v.innerText === '');
            return;
        }
        const objNumber = this.owner.master.maths.indexOf(this.obj);
        if (this.nari && !!this.getNarikiki) {
            for (let kiki of this.getNarikiki(objNumber)) {
                this.kikiObj.push(this.owner.master.maths[kiki]);
            }
        } else {
            for (let kiki of this.getKiki(objNumber)) {
                this.kikiObj.push(this.owner.master.maths[kiki]);
            }
        }
    }
    move(toObj) {
        this.obj.innerText = "";
        if (this.owner.type) {
            this.obj.classList.remove('UpsideDown');
            toObj.classList.add('UpsideDown');
        } else {
            toObj.classList.remove('UpsideDown');
        }
        this.obj.classList.remove('nari');
        this.obj = toObj;
        const tekijin = this.owner.type ? [54, 80] : [0, 26],
              basho = this.owner.master.maths.indexOf(this.obj);
        if (basho >= tekijin[0] && tekijin[1] >= basho && !this.nari && !this.mochi) {
            this.nari = confirm('成りますか？') ? true : false;
        }
        this.mochi = false;
        if (this.nari) {
            this.obj.classList.add('nari');
        }
    }
    taken(toObj) {
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
    kikiOverlap(index, isSameOwner) {
        const judgedKoma = this.owner.master.komas.find(v => v.obj === this.owner.master.maths[index]);
        if (judgedKoma) {
            return isSameOwner ? this.owner === judgedKoma.owner : this.owner !== judgedKoma.owner;
        }
        return false;
    }
}

class Ouu extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "王";
        this.baseName = "王";
    }
    getKiki(k) {
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [-10, -1, 8] : [],
              right = mod !== 8 ? [-8, 1, 10] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
              const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v])||false;
return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
    taken() {
        if(confirm('詰み\n盤面をリセットしますか？')){new Master;}
    }
}

class Gyo extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "玉";
        this.baseName = "玉";
    }
    getKiki(k) {
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [-10, -1, 8] : [],
              right = mod !== 8 ? [-8, 1, 10] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
    taken() {
        if(confirm('詰み\n盤面をリセットしますか？')){new Master;}
    }
}

class His extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "飛";
        this.baseName = "飛";
    }
    getKiki(k) {
        return [...function* (k) {
            const quo = Math.floor(k / 9),
                  mod = k % 9;
            for (let i = 1; i <= quo; i++) {
                const index = k - i * 9;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //up
            for (let i = 1; i <= 8 - quo; i++) {
                const index = k + i * 9;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //down
            for (let i = 1; i <= mod; i++) {
                const index = k - i;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //left
            for (let i = 1; i <= 8 - mod; i++) {
                const index = k + i;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //right
        }.apply(this, [k])];
    }
    getNarikiki(k) {
        this.name = '龍';
        const quo = Math.floor(k / 9),
              mod = k % 9;
        return [...function* (k) {
            for (let i = 1; i <= quo; i++) {
                const index = k - i * 9;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //up
            for (let i = 1; i <= 8 - quo; i++) {
                const index = k + i * 9;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //down
            for (let i = 1; i <= mod; i++) {
                const index = k - i;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //left
            for (let i = 1; i <= 8 - mod; i++) {
                const index = k + i;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //right
        }.apply(this, [k])].concat((mod !== 0 ? [-10, 8] : []).concat(mod !== 8 ? [-8, 10] : []).map(v => v + k).filter(v => v >= 0 && v <= 80));
    }
}
class Kak extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "角";
        this.baseName = "角";
    }
    getKiki(k) {
        return [...function* (k) {
            const quo = Math.floor(k / 9),
                  mod = k % 9;
            for (let i = 1; i <= quo && i <= mod; i++) {
                const index = k - i * 10;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //lup
            for (let i = 1; i <= 8 - quo && i <= mod; i++) {
                const index = k + i * 8;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //ldown
            for (let i = 1; i <= quo && i <= 8 - mod; i++) {
                const index = k - i * 8;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //rup
            for (let i = 1; i <= 8 - quo && i <= 8 - mod; i++) {
                const index = k + i * 10;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //rdown
        }.apply(this, [k])];
    }
    getNarikiki(k) {
        this.name = '馬';
        const quo = Math.floor(k / 9),
              mod = k % 9;
        return [...function* (k) {
            for (let i = 1; i <= quo && i <= mod; i++) {
                const index = k - i * 10;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //lup
            for (let i = 1; i <= 8 - quo && i <= mod; i++) {
                const index = k + i * 8;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //ldown
            for (let i = 1; i <= quo && i <= 8 - mod; i++) {
                const index = k - i * 8;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //rup
            for (let i = 1; i <= 8 - quo && i <= 8 - mod; i++) {
                const index = k + i * 10;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            } //rdown
        }.apply(this, [k])].concat([-9, 9].concat(mod !== 0 ? [-1] : []).concat(mod !== 8 ? [1] : []).map(v => v + k).filter(v => v >= 0 && v <= 80));
    }
}
class Kei extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "桂";
        this.baseName = "桂";
    }
    getKiki(k) {
        const mod = k % 9,
              left = mod !== 0 ? [17, -19] : -1,
              right = mod !== 8 ? [19, -17] : -1;
        return (this.owner.type ? [left[0], right[0]] : [left[1], right[1]]).map(v => v + k).filter(v => v >= 0 && v <= 80).filter(v => !this.kikiOverlap(v, true));
    }
    getNarikiki(k) {
        this.name = '圭';
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
              right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
}
class Kin extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "金";
        this.baseName = "金";        
    }
    getKiki(k) {
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
              right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
}
class Gin extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "銀";
        this.baseName = "銀";
    }
    getKiki(k) {
        const mod = k % 9,
              result = [this.owner.type ? 9 : -9],
              left = mod !== 0 ? [-10, 8] : [],
              right = mod !== 8 ? [-8, 10] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
        return [-8, -9, -10, 8, 10];
    }
    getNarikiki(k) {
        this.name = '全';
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
              right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
}
class Kou extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "香";
        this.baseName = "香";
    }
    getKiki(k) {
        return function* (k) {
            const [moving, quo] = this.owner.type ? [9, 8 - Math.floor(k / 9)] : [-9, Math.floor(k / 9)];
            for (let i = 1; i <= quo; i++) {
                const index = k + i * moving;if (this.kikiOverlap(index, true)) {
                    break;
                };yield index;if (this.kikiOverlap(index)) {
                    break;
                };
            }
        }.apply(this, [k]);
    }
    getNarikiki(k) {
        this.name = '杏';
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
              right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
}
class Hoh extends Koma {
    constructor(owner, obj, master) {
        super(owner, obj, master);
        this.name = "歩";
        this.baseName = "歩";
    }
    getKiki(k) {

        return [this.owner.type ? 9 + k : -9 + k].filter(v => v >= 0 && 80 >= v);
    }
    getNarikiki(k) {
        this.name = 'と';
        const mod = k % 9,
              result = [-9, 9],
              left = mod !== 0 ? [this.owner.type ? 8 : -10, -1] : [],
              right = mod !== 8 ? [this.owner.type ? 10 : -8, 1] : [];
        return result.concat(left).concat(right).map(v => v + k).filter(v => {
            const myKoma = this.owner.master.komas.find(koma => koma.obj === this.owner.master.maths[v]);return (v >= 0) && (v <= 80) && (!myKoma ||  (myKoma.owner !== this.owner));
        });
    }
    updateKikiObj() {
        this.kikiObj = [];
        if (this.mochi) {
            this.kikiObj = this.owner.master.maths
            .filter((v,i,a)=>{
                const mod = i%9;
                for(let j=0;j<9;j++){
                    const current = this.owner.master.komas.find(v=>v.obj===a[j*9+mod]);
                    if(current&&current.name==='歩'&&current.owner.type===this.owner.type)return false;
                }
  return true;
            })
            .filter(v => !this.owner.master.komas.find(koma=>koma.obj===v)); 
            return;
        }
        const objNumber = this.owner.master.maths.indexOf(this.obj);
        if (this.nari && !!this.getNarikiki) {
            for (let kiki of this.getNarikiki(objNumber)) {
                this.kikiObj.push(this.owner.master.maths[kiki]);
            }
        } else {
            for (let kiki of this.getKiki(objNumber)) {
                this.kikiObj.push(this.owner.master.maths[kiki]);
            }
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    [...document.getElementsByClassName('selects')].forEach(s => {
        s.addEventListener("change", e => {
            const target = e.target,
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
    document.getElementById("startButton").addEventListener("click", () => {
        const name1 = document.getElementById('user1').value,
              name2 = document.getElementById('user2').value,
              solo = document.getElementById('turnOn').checked;
        new Master(name1, name2, solo);
    }, false);
});
//二歩、打ち歩詰め、動けない場所に持ち駒を打つ