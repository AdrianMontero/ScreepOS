var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        if(creep.memory.building) {
            var contructioSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(contructioSite != undefined){
                if(creep.build(contructioSite)==ERR_NOT_IN_RANGE){
                    creep.moveTo(contructioSite , {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(sources.length >= 2){ //Para no saturar los recursos
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1]);
                }
            }
            else{
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            
        }
    }
};

module.exports = roleBuilder;