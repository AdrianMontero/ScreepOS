var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

function sacaInfoConsola(numHarvesters, numUpgraders ){
    //Tomamos elementos de la partida
    var numHarvesters= _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numUpgraders= _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    var numBuilders= _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    
     //INFO DEL TICK
    console.log();
    console.log();
    console.log("-----------------------------------------");
    console.log("--            INFO DEL TICK            --");
    console.log("-----------------------------------------");
    //Mostramos el numero de recolectores
    console.log("Numero de Harvesters ->"+ numHarvesters);
    //Mostramos el numero de Upgraders
    console.log("Num Upgraders ->"+numUpgraders);
    //Mostramos el numero de Builders
    console.log("Num Builders ->"+numBuilders);
    console.log("-----------------------------------------");
    console.log();
    console.log();
}

module.exports.loop = function () {
    
    //Limpiar la memoria para sacar los objetos que ya no usemos (Ej:creeps muertos)
    for(var name in Memory.creeps){
        if(!Game.creeps[name]){
            delete Memory.creeps[name];
        }
    }
    
    for (var name in Game.creeps){
        var creep=Game.creeps[name];
        
        if(creep.memory.role=='harvester'){
            roleHarvester.run(creep);
        }else if(creep.memory.role=='upgrader'){
            roleUpgrader.run(creep);
        }else if(creep.memory.role=='builder'){
            roleBuilder.run(creep);
        }
    }
    
    //Numero minimo de recoletores
    var minNumHarvesters=6;
    //Numero actual de recolectores
    var numHarvesters= _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    
    //Numero minimo de Upgraders
    var minNumUpgraders=1;
    //Numero actual de Upgraders
    var numUpgraders= _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    
    //Numero minimo de Builders
    var minNumBuilders=2;
    //Numero actual de Builders
    var numBuilders= _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    
    //Llama a funcion sacar por colsola los datos.
    //sacaInfoConsola();
    
    var name= undefined;
    
    //Si el numero de Harvesters es menor que el minimo generamos uno nuevo.
    //Tras esto comprobamos el mismo caso con los Upgraders
    if(numHarvesters<minNumHarvesters){
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            {role:'harvester', working: false});
    }else if(numUpgraders<minNumUpgraders){
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            {role:'upgrader', working: false});
    }else if(numBuilders<minNumBuilders){
        name = Game.spawns.Spawn1.createCreep([WORK,WORK,CARRY,MOVE],undefined,
            {role:'builder', working: false});
    }
    
    //Mostramos en pantalla en la zona del spawn que se esta creado
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }
    
    //Comparamos que el nombre no sea nulo, en el caso de serlo devolvera un valor numerico negativo, en el caso de ser positivo devolvera una cadena
    if(!(name < 0)&& name!=undefined){
        console.log("Spawned new creep:  " + name);
    }
}