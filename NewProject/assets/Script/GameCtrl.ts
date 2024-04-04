import { _decorator, Component, instantiate, Label, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

interface Box {
    num: number,
    update: boolean
}

interface objk {
    num: number,
    i: number,
    j: number
}

@ccclass('GameCtrl')
export class NewComponent extends Component {
    private scoreLabel: Node | null = null;

    private score: number = 0;

    private ischeckmove = false;

    @property({ type: Prefab })
    private boxPrefab: Prefab | null = null;

    private boxes: Box[][] = [];
    protected onLoad(): void {
        this.scoreLabel = this.node.getChildByName("ScoreLabel");
        this.initBoxes();
    }
    start() {

    }




    //khởi tạo mảng boxes
    private initBoxes() {

        // tạo 1 mảng 2 chiều
        let rows = 4;
        let cols = 4;
        for (let i = 0; i < rows; i++) {
            let row: Box[] = [];
            for (let j = 0; j < cols; j++) {
                let okj: Box = {
                    num: 0,
                    update: false
                };

                row.push(okj);
            }
            this.boxes.push(row);
        }

        this.startBoxes()
    }
    resetBoxesUpdate() {
        for (let i = 0; i < this.boxes.length; i++) {
            for (let j = 0; j < this.boxes[i].length; j++) {
                this.boxes[i][j].update = false;
            }
        }

        this.randrom2Boxes();
    }
    private startBoxes() {
        // chọn random 2 o trong mảng boxes truyền vào giá trị 2
        let randomIndex1 = Math.floor(Math.random() * this.boxes.length);
        let randomIndex2 = Math.floor(Math.random() * this.boxes.length);

        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * this.boxes.length);
        }

        let row1 = this.boxes[randomIndex1];
        let row2 = this.boxes[randomIndex2];

        let randomIndex3 = Math.floor(Math.random() * row1.length);
        let randomIndex4 = Math.floor(Math.random() * row2.length);

        while (randomIndex3 === randomIndex4) {
            randomIndex4 = Math.floor(Math.random() * row2.length);
        }

        row1[randomIndex3].num = 2;
        row2[randomIndex4].num = 2;

        //   row1[randomIndex3].num += 2;
        //  row2[randomIndex4].num += 2;

       // this.boxes[3][1].num = 2;
       // this.boxes[2][1].num = 2;

        this.showUI();

    }

    private randrom2Boxes() {
        const boxescopy: Box[][] = this.boxes.slice();
        let boxesgiatri0:  objk[] = [];
        for (let i = 0; i < boxescopy.length; i++) {
            for (let j = 0; j < boxescopy.length; j++) {
                const element = boxescopy[i][j];
                if(element.num == 0){
                    let ojk : objk = {num: element.num, i: i, j : j};
                    boxesgiatri0.push(ojk);
                }
            }
        }
        console.log("boxgia tri = ", boxesgiatri0);
        
        let index1: number
            index1 = Math.floor(Math.random() * boxesgiatri0.length);
        
        const value1: objk = boxesgiatri0[index1];
        this.boxes[value1.i][value1.j].num = 2;

        this.showUI();

    }


    private combine_up() {
        let length = this.boxes.length;
        for (let index = 0; index < length; index++) {
            for (let i = 0; i < (length - 1); i++) {
                let row = this.boxes[i];
                let row_next = this.boxes[i + 1];
                for (let j = 0; j < length; j++) {
                    let col0j = row[j];
                    let col0_nextj = row_next[j];
                    if (col0j.num == 0 || col0_nextj.num == 0) {
                        let newnum = col0j.num + col0_nextj.num;
                        this.boxes[i][j].num = newnum;
                        this.boxes[i + 1][j].num = 0;
                    } else {
                        if (index == length - 1 && col0j.num == col0_nextj.num) {
                            this.boxes[i + 1][j].update = true;
                            let newnum = col0j.num + col0_nextj.num;
                            this.boxes[i][j].num = newnum;
                            this.boxes[i + 1][j].num = 0;
                        }
                    }
                }
            }
        }
        this.showUI();
        this.resetBoxesUpdate();
    }

    private combine_down() {
        let length = this.boxes.length;
        for (let index = 0; index < length; index++) {
            for (let i = (length - 1); i > 0; i--) {
                let row = this.boxes[i];
                let row_next = this.boxes[i - 1];
                for (let j = 0; j < length; j++) {
                    let col0j = row[j];
                    let col0_nextj = row_next[j];
                    if (col0j.num == 0 || col0_nextj.num == 0) {
                        let newnum = col0j.num + col0_nextj.num;
                        this.boxes[i][j].num = newnum;
                        this.boxes[i - 1][j].num = 0;
                    } else {
                        if (index == length - 1 && col0j.num == col0_nextj.num) {
                            this.boxes[i - 1][j].update = true;
                            let newnum = col0j.num + col0_nextj.num;
                            this.boxes[i][j].num = newnum;
                            this.boxes[i - 1][j].num = 0;
                        }
                    }
                }
            }
        }
        this.showUI();
        this.resetBoxesUpdate();
    }

    private combine_right() {
        let length = this.boxes.length;
        for (let index = 0; index < length; index++) {
            for (let i = 0; i < length; i++) {
                let row = this.boxes[i];
                for (let j = (length - 1); j > 0; j--) {
                    const curentRow = row[j];
                    const nextRow = row[j - 1];
                    let newnum = curentRow.num + nextRow.num;
                    if (curentRow.num == 0 || nextRow.num == 0) {
                        row[j].num = newnum;
                        row[j - 1].num = 0;
                    } else {
                        if (index == length - 1 && curentRow.num == nextRow.num) {
                            row[j].update = true;
                            row[j].num = newnum;
                            row[j - 1].num = 0;
                        }
                    }
                }

            }

        }

        this.showUI();
        this.resetBoxesUpdate();
    }

    private combine_left() {
        let length = this.boxes.length;
        for (let index = 0; index < length; index++) {
            for (let i = 0; i < length; i++) {
                let row = this.boxes[i];
                for (let j = 0; j < length - 1; j++) {
                    const curentRow = row[j];
                    const nextRow = row[j + 1];
                    let newnum = curentRow.num + nextRow.num;
                    if (curentRow.num == 0 || nextRow.num == 0) {
                        row[j].num = newnum;
                        row[j + 1].num = 0;
                    } else {
                        if (index == length - 1 && curentRow.num == nextRow.num) {
                            row[j].update = true;
                            row[j].num = newnum;
                            row[j + 1].num = 0;
                        }
                    }
                }


            }
        }
        this.showUI();
        this.resetBoxesUpdate();
    }


    private showUI() {
        let GameTable = this.node.getChildByName("GameTable");

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                //if (this.boxes[i][j].num != 0) {
                let box = GameTable.getChildByName((i * 10 + j) + "");
                // xóa hết children của box
                box.removeAllChildren();
                // add boxPrefab
                let boxClone = instantiate(this.boxPrefab);
                const label = boxClone.getComponent(Label)!;
                label.string = this.boxes[i][j].num.toString();
                box.addChild(boxClone);

            }
        }
    }

    update(deltaTime: number) {

    }

    onRightButtonLeft() {
        this.combine_right();


    }
    onLeftButtonRight() {
        this.combine_left();



    }

    onUpButtonUp() {
        this.combine_up();


    }

    onDownButtonDown() {
        this.combine_down();
    }

}


