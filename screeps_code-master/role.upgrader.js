//------------------------------------//
//--          role.upgrader         --//
//------------------------------------//
module.exports={
    run: function(creep){
        //Dependiendo de si el creep esta lleno de energia se le aplica un estado distinto de trabajo
        if(creep.memory.working== true && creep.carry.energy==0){
            creep.memory.working=false;
        }else if(creep.memory.working==false && creep.carry.energy==creep.carryCapacity){
            creep.memory.working=true;
        }

        //Si el creep esta lleno de energia ira a dejarla al controlador de la sala
        if(creep.memory.working == true){
            if(creep.upgradeController(creep.room.controller)==ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#FAF4C7'}});
            }
        }else{
            //Si el creep aun no esta lleno buscara mas recursos
            var source= creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source)==ERR_NOT_IN_RANGE){
                creep.moveTo(source , {visualizePathStyle: {stroke: '#E4CF3A'}});
            }
        }
    }
}