/***********Objects & Methods************/

function Player(shields, attack, name) {

  this.shields = shields;
  this.attack = attack;
  this.base = attack;
  this.original = shields;
  this.name = name;

    this.fireTorpedos = function(enemy) {
        enemy.decreaseHealth(this.attack);
    };

    this.decreaseHealth = function(p) {
      this.shields -= p;
    };

    this.gotCountered = function(c) {
      this.shields -= c.attack;
    };

    this.levelUp = function() {
      this.attack += this.base;
    };
};

var select = document.getElementsByTagName("audio")[0];
var torpedo = document.getElementsByTagName("audio")[1];
var explode = document.getElementsByTagName("audio")[2];
var warning = document.getElementsByTagName("audio")[3];
var error = document.getElementsByTagName("audio")[4];


var Enterprise = new Player(150, 6, "USS Enterprise");
var Borg = new Player(170, 20, "Borg Cube");
var Klingon = new Player(100, 12, "IKS Buruk");
var Romulan = new Player(110, 8, "K'tanco");

var ships = [Enterprise, Borg, Klingon, Romulan];

var inBattle = [];

$(document).on("click", ".stage1", function() {
  if(inBattle.length < 1) {
    select.play();
    $(this).find('.health').attr('id', 'herostatus');
    var shipYard = $(this).attr('id');
      switch(shipYard) {
        case "enterprise":
          inBattle.push(ships[0]);
          break;
        case "borg":
          inBattle.push(ships[1]);
          break;
        case "klingon":
          inBattle.push(ships[2]);
          break;
        case "romulan":
          inBattle.push(ships[3]);
          break;
      };

document.getElementById("heroName").innerHTML=inBattle[0].name;

    $(".stage1").not(this).each(function() {
      $(this).toggleClass('stage1 stage2')
      $(this).find('.character').toggleClass('pre remaining');
      $(this).appendTo("#badSelection");
    })
  }
});

$(document).on("click", ".stage2", function() {

  if(inBattle.length < 2) {
    select.play();
    $(this).addClass('ondeck')
    $(this).find('.health').attr('id', 'enemystatus')
    var shipYard2 = $(this).attr('id');
      switch(shipYard2) {
        case "enterprise":
          inBattle.push(ships[0]);
          break;
        case "borg":
          inBattle.push(ships[1]);
          break;
        case "klingon":
          inBattle.push(ships[2]);
          break;
        case "romulan":
          inBattle.push(ships[3]);
          break;
      };

    document.getElementById("enemyName").innerHTML=inBattle[1].name;

    $(this).addClass(".currentEnemy")
    $(this).toggleClass('stage2 stage3');
    $(this).find('.character').toggleClass('remaining defending');
    $(this).appendTo("#defender");
  } else {
      error.play();
  };

});

var wins = 0;

$(document).on("click", ".fire", function() {

  var hero = inBattle[0];
  var enemy = inBattle[1];
  torpedo.play();
  if(inBattle.length > 1 && hero.shields > 0) {
    hero.fireTorpedos(enemy);
    hero.gotCountered(enemy);

    document.getElementById('herostatus').innerHTML=hero.shields;
    document.getElementById('enemystatus').innerHTML=enemy.shields;

    alert("You attacked " + enemy.name + " for " + hero.attack + " damage. "
     + enemy.name + " fired back for " + enemy.attack + " damage.")

     hero.levelUp();

    if(((hero.shields / hero.original) * 100) > 50) {
        alert("Shields at " + Math.floor(((hero.shields / hero.original) * 100)) + "% and holding.");
      } else if (((hero.shields / hero.original) * 100) > 30) {
        alert("Shields at " + Math.floor(((hero.shields / hero.original) * 100)) + "% and failing.")
      } else if(((hero.shields / hero.original) * 100) > 10) {
        warning.play();
        alert("Shields at " + Math.floor(((hero.shields / hero.original) * 100)) + "% and failing.")
        alert("She can't take much more!")
      } else if(((hero.shields / hero.original) * 100) <= 0) {
        alert("Abandon ship!!")
        explode.play();
        alert("You Lose")
        document.getElementById('message').innerHTML="You Lose";
        setTimeout(function(){ location.reload(); }, 3000);
      };

      if(enemy.shields <=0 && hero.shields > 0) {
        explode.play();
        alert("Enemy Destroyed.")
        inBattle.pop();
        $(".ondeck").remove()
        wins++;
      };
  };

    if(wins === 3  && hero.shields > 0) {
      alert("You Win");
      document.getElementById('message').innerHTML="You Win the Game!!";
    } else if(wins ===3 && hero.shields <= 0) {
      alert("Its a draw!");
      document.getElementById('message').innerHTML="Shameful Win."
      setTimeout(function(){ location.reload(); }, 3000);
    };

});
