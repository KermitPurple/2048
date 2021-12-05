const MATSIZE = 4;
class Direction{
    constructor(name){
        this.name = name;
    }

    static Up = new Direction('Up');
    static Down = new Direction('Down');
    static Left = new Direction('Left');
    static Right = new Direction('Right');
}

class Matrix{
    constructor(){
        this.values = [];
        for(let _i = 0; _i < MATSIZE; _i++){
            let row = [];
            for(let _i = 0; _i < MATSIZE; _i++)
                row.push(0);
            this.values.push(row);
        }
    }

    slide(direction){
        let changed = false;
        switch(direction){
            case Direction.Right:
                for(let row of this.values){
                    for(let i = MATSIZE - 1; i >= 0; i--){
                        if(row[i] === 0){
                            let none = true;
                            for(let j = i - 1; j >= 0; j--){
                                if(row[j] !== 0){
                                    row[i] = row[j]
                                    row[j] = 0;
                                    none = false;
                                    changed = true;
                                    break;
                                }
                            }
                            if(none)
                                break;
                        }
                    }
                }
                break;
            case Direction.Left:
                for(let row of this.values){
                    for(let i = 0; i < MATSIZE; i++){
                        if(row[i] === 0){
                            let none = true;
                            for(let j = i; j < MATSIZE; j++){
                                if(row[j] !== 0){
                                    row[i] = row[j]
                                    row[j] = 0;
                                    none = false;
                                    changed = true;
                                    break;
                                }
                            }
                            if(none)
                                break;
                        }
                    }
                }
                break;
            case Direction.Up:
                for(let col = 0; col < MATSIZE; col++){
                    for(let i = 0; i < MATSIZE; i++){
                        if(this.values[i][col] === 0){
                            let none = true;
                            for(let j = i; j < MATSIZE; j++){
                                if(this.values[j][col] !== 0){
                                    this.values[i][col] = this.values[j][col]
                                    this.values[j][col] = 0;
                                    none = false;
                                    changed = true;
                                    break;
                                }
                            }
                            if(none)
                                break;
                        }
                    }
                }
                break;
            case Direction.Down:
                for(let col = 0; col < MATSIZE; col++){
                    for(let i = MATSIZE - 1; i >= 0 ; i--){
                        if(this.values[i][col] === 0){
                            let none = true;
                            for(let j = i - 1; j >= 0; j--){
                                if(this.values[j][col] !== 0){
                                    this.values[i][col] = this.values[j][col]
                                    this.values[j][col] = 0;
                                    none = false;
                                    changed = true;
                                    break;
                                }
                            }
                            if(none)
                                break;
                        }
                    }
                }
                break;
            default:
        }
        return changed
    }

    merge(direction){
        let changed = false;
        switch(direction){
            case Direction.Right:
                for(let row of this.values){
                    for(let i = MATSIZE - 2; i >= 0; i--){
                        if(row[i] === row[i + 1]){
                            row[i + 1] = 0;
                            row[i] *= 2;
                            changed = true;
                        }
                    }
                }
                break;
            case Direction.Left:
                for(let row of this.values){
                    for(let i = 0; i < MATSIZE - 1; i++){
                        if(row[i] === row[i + 1]){
                            row[i] = 0;
                            row[i + 1] *= 2;
                            changed = true;
                        }
                    }
                }
                break;
            case Direction.Up:
                for(let col = 0; col < MATSIZE; col++){
                    for(let i = 0; i < MATSIZE - 1; i++){
                        if(this.values[i][col] === this.values[i + 1][col]){
                            this.values[i + 1][col] = 0;
                            this.values[i][col] *= 2;
                            changed = true;
                        }
                    }
                }
                break;
            case Direction.Down:
                for(let col = 0; col < MATSIZE; col++){
                    for(let i = MATSIZE - 2; i >= 0 ; i--){
                        if(this.values[i][col] === this.values[i + 1][col]){
                            this.values[i + 1][col] = 0;
                            this.values[i][col] *= 2;
                            changed = true;
                        }
                    }
                }
                break;
            default:
        }
        return changed
    }

    move(direction){
        this.slide(direction);
        this.merge(direction);
        this.slide(direction);
        this.log()
    }

    log(){
        for(const row of this.values)
            console.log(row);
    }

    random_number(){
        let rand = Math.random();
        if(rand <= 0.6){
            return 2
        }else if(rand <= 0.9){
            return 4
        }else if(rand <= 0.96){
            return 8
        }
        return 16
    }

    free_spaces(){
        let spaces = [];
        for(let i = 0; i < MATSIZE; i++){
            for(let j = 0; j < MATSIZE; j++){
                if(this.values[i][j] === 0)
                    spaces.push({'i': i, 'j': j});
            }
        }
        return spaces;
    }

    insert_random(){
        let num = this.random_number();
        let spaces = this.free_spaces();
        let space = spaces[Math.floor(Math.random() * spaces.length)]
        this.values[space.i][space.j] = num;
    }
}
