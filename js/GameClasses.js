class Point{
    constructor(x,y){
        this.X = parseFloat(x);
        this.Y = parseFloat(y);
    }

    Distance(point2){
        return Math.sqrt(((this.X - point2.X) * (this.X - point2.X)) + ((this.Y - point2.Y) * (this.Y - point2.Y)));
    }
}
class PlayerCamera{
    constructor(point){
        this.scale = 1;
        this.Position = point;
    }

    Transform(){
        return `scale(${this.scale}) translate(${-this.x}, ${-this.y})`;
    }
}
class Player{
    constructor(color){
        this.Builds = [];
        this.Fighters = [];
        this.Color = color;
    }

    AttachBuild(build){
        if(!(build instanceof Build)) throw new Error(`${build} is not build!`);
        this.Builds.push(build);
    }
}
class PlayerAI extends Player{
    constructor(color){
        super(color);
    }
}
class PlayerPerson extends Player{
    constructor(color, camera){
        super(color);
        if(!(camera instanceof PlayerCamera)) throw new Error("");
        this.Camera = camera;
    }
}
class Build{
    constructor(hp, pos, name, description, level){
        this.HP = parseInt(hp);
        this.Position = pos;
        this.Name = name;
        this.Description = description;
        this.Level = parseInt(level);
    }
}
class GameMap{
    constructor(sizeX, sizeY, playersPoints){
        this.SizeX = parseInt(sizeX);
        this.SizeY = parseInt(sizeY);
        if(!Array.isArray(playersPoints)) throw new Error("playersPoints has to be a list of points");
        else if (playersPoints.length < 2) throw new Error("You have to set at least 2 points");
        this.PlayersPoints = playersPoints;
    }
}
class Game{
    constructor(gameMap, playersCount){
        var BotsColors = [
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#00ffff",
            "#ff00ff",
            "#ffffff",
            "#000000"
        ];
        playersCount = parseInt(playersCount);
        if(!(gameMap instanceof GameMap)) throw new Error("game map was not given");
        if(playersCount < 2) throw new Error("Minimal players count is 2");
        if(playersCount > gameMap.PlayersPoints.length) throw new Error("Players count is over than count of available points!");

        // CREATING PLAYERS
        this.Players = [];
        var personPlayer = new PlayerPerson("#FF0000", new PlayerCamera(gameMap.PlayersPoints[0]));
        this.Players.push(personPlayer);
        personPlayer.AttachBuild(new TownHall(gameMap.PlayersPoints[0], 1));
        for (let i = 0; i < playersCount - 1; i++) {
            var playerBot = new PlayerAI(BotsColors[i]);
            playerBot.AttachBuild(new TownHall(gameMap.PlayersPoints[i + 1], 1));
            this.Players.push(playerBot);
        }
        // ATTACHING START BUILDS TO PLAYERS
        this.Players.forEach((player, index) => {
            player.AttachBuild(new GoldMine(gameMap.PlayersPoints[index], 1));
        });
    }
}
//#region BUILDINGS CLASSES
class GoldMine extends Build{

    static LevelParameters = [
        {hp: 300, goldPerSecond: 10},
        {hp: 350, goldPerSecond: 12},
        {hp: 420, goldPerSecond: 14}
    ];

    constructor(pos, level){
        if(level >= GoldMine.LevelParameters.length || level < 1) throw new Error("Level for gold mine is invalid");
        super(GoldMine.LevelParameters[level - 1].hp, pos, "Gold mine", "Gold mine extracts gold. Updrade it to get more gold.", level);
    }
}
class TownHall extends Build{

    static LevelParameters = [
        {hp: 4200},
        {hp: 5100},
        {hp: 7000}
    ];

    constructor(pos, level){
        if(level >= TownHall.LevelParameters.length || level < 1) throw new Error("Level for town hall is invalid");
        super(TownHall.LevelParameters[level-1].hp, pos, "Town hall", "Main build. If enemy destroys it, game is over (for you😉)", level);
    }
}
//#endregion