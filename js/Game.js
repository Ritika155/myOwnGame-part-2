class Game {
  constructor(){
    this.leaderboardTitle=createElement("h2");
    this.leader1=createElement("h2");
    this.leader2=createElement("h2");
    

  }

  displayleaderboard(){
    this.leaderboardTitle.html("LEADERBOARD")
    this.leaderboardTitle.position(100,50);
    
    this.leader1.html("Rank1");
    this.leader1.position(100,100);
    this.leader2.html("Rank2");
    this.leader2.position(100,150);
    

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').set({
      gameState: state
    });

  }

   start(){
    console.log("starting the game...");
   player=new Player();
   player.getCount();
   
      form = new Form()
      form.display();
    

    boat1 = createSprite(width/2-150,height-50);
    boat1.addAnimation("boat1",boat1Img);
    boat2 = createSprite(width/2+150,height-50);
    boat2.addAnimation("boat2",boat2Img);
  
    boats = [boat1, boat2];
    console.log("in start, boats count" + boats.length)
  }

  play(){
   // console.log("in play funcion....")
    form.hide();

    this.displayleaderboard();
    
    Player.getPlayerInfo();

    player.getboatsAtEnd();
    //console.log("getting players information" + allPlayers.length)
    if(allPlayers !== undefined){
      console.log("All players" + allPlayers)
      background(0);
      image(trackImg, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      drawSprites();
      //index of the array
      var index = 0;

      //x and y position of the boats
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the boats a little away from each other in x direction
        x = x+200 
        //use data form the database to display the boats in y direction
        y = displayHeight - allPlayers[plr].distance;
        boats[index-1].x = x;
        boats[index-1].y = y;

        if (index === player.index){
          fill("red");
          ellipse(x,y,60,60);
          boats[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = boats[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log(boats[index-1].x)
      player.distance +=10
      player.update();
    }

    if(player.distance > 4300){
      gameState = 2;
      player.rank+=1
      player.update()
      Player.updateboatsAtEnd(player.rank);
    }
   
    
  }

  end(){
    console.log("Game Ended");
    console.log(player.name+"  "+player.rank)
  }
}
