//crear torre
//Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER );

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');



module.exports.loop = function () {
    var nHarvesterMin = 3;
    var nHarvesterMax = 4;
    var nUpgraderMin = 3;
    var nUpgraderMax = 6;
    var nBuilderMin = 1; 
    //Defensa

    //Torres
    for(var name in Game.rooms) { //Buscamos en todas las habitaciones las torres y las guardamos en el array "targets"
        var targets = Game.rooms[name].find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_TOWER); //Torres de cada habitacion
                    }
            });
             if(targets.length > 0) { //Si targets no es 0
                for(var i = 0; i < targets.length;i++){ //Por cada posicion del array targets
                    if(targets[i]) {
                        //Reparar torres
                        var closestDamagedStructure = targets[i].pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < structure.hitsMax
                        });
                        if(closestDamagedStructure) {
                            targets[i].repair(closestDamagedStructure);
                        }
                
                        //Atacar creeps ostiles
                        var closestHostile = targets[i].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                        if(closestHostile) {
                            targets[i].attack(closestHostile);
                        }
                    }
                }
            }
        console.log('prueba');
    }

    //Gestion de creeps

    //Borrar creeps muertos
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }



    //Recuento de creeps de cada tipo
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    
    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgrader.length);
    
    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builder.length);
    
    //Mostramos la energia de la sala.
    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
    
    
    
    //Revivimos a los creeps muertos hasta un minimo.
    if(harvesters.length >= nHarvesterMin) {
        
        if(upgrader.length < nUpgraderMin) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('Spawning new upgrader: ' + newName);
        }
    
        if(builder.length < nBuilderMin) {
            var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
            console.log('Spawning new builder: ' + newName);
        }
    }
    if(harvesters.length < nHarvesterMax){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        console.log('Spawning new harvester: ' + newName);
    }
    if(harvesters.length == nHarvesterMax && builder.length >= nBuilderMin && upgrader.length < nUpgraderMax){
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
        console.log('Spawning new upgrader: ' + newName);
    }
    

    //Activamos los roles
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
