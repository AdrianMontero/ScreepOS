//------------------------------------//
//--          role.builder        --//
//------------------------------------//

var roleUpgrader = require('role.upgrader');

module.exports={
    run: function(creep){
        //Dependiendo de si el creep esta lleno de energia se le aplica un estado distinto de trabajo
        if(creep.memory.working== true && creep.carry.energy==0){
            creep.memory.working=false;
        }else if(creep.memory.working==false && creep.carry.energy==creep.carryCapacity){
            creep.memory.working=true;
        }

        //Si esta lleno se movera al spawn
        if(creep.memory.working == true){
            var contructioSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(contructioSite != undefined){
                if(creep.build(contructioSite)==ERR_NOT_IN_RANGE){
                    creep.moveTo(contructioSite);
                }
            }else{
                //En el caso de que no haber elementos para construir se procede a usar el constructor como si fuera un upgrader.
                roleUpgrader.run(creep);
            }
            
        }else{
            //Si esta vacio buscara recursos para llenarse de energia
            var source= creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source)==ERR_NOT_IN_RANGE){
                creep.moveTo(source , {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}