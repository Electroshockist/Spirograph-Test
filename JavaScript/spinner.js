class Spinner{
    constructor(length, speed, startingAngle){
        this.length = length;
        this.speed = speed;
        this.pos = createVector(canvas.width/2, canvas.height/2);
        this.angle = startingAngle;
    }
}

class SpinnerSystem{
    constructor(){
        let root = new Spinner(0, 0, 0)
        this.spinners = [];
        this.spinners.push(root);
        
    }
    
    addSpinner(spinner){
        this.spinners.push(spinner);
    }
    
    spin(){
        for(let i = 0; i < this.spinners.length; i++){
            const spinner = this.spinners[i];
            
            const prevPos = this.spinners[i-1] != undefined ? this.spinners[i-1].pos : spinner.pos;
            
            spinner.angle -= spinner.speed * timeStep;
            
            let spinX = Math.cos(spinner.angle) * spinner.length;
            let spinY = Math.sin(spinner.angle) * spinner.length;
            
            spinner.pos = createVector(spinX, spinY);
            spinner.pos.add(prevPos);
        }
    }
}