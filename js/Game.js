var gameMap = new GameMap(200, 200, [new Point(10, 10), new Point(10, 190), new Point(190, 10), new Point(190, 190), new Point(100, 100)]);
var game = new Game(gameMap, 4);
var playersCamera = game.Players[0].Camera;
// PAGE ELEMENTS
const mainCanvas = document.getElementById("mainCanvas");
// GAME CONSTANTS
const OneMapPixelSize = 10;
console.log(JSON.stringify(game));
function GamePointToPointOnCanvas(point){
    if(!(point instanceof Point)) throw new Error("Given object is not point!!!!");
    const OnePixelSizeNow = playersCamera.scale * OneMapPixelSize;
    return new Point(((point.X - playersCamera.Position.X) * OnePixelSizeNow), ((point.Y - playersCamera.Position.Y) * OnePixelSizeNow));
}
function Redraw(gameMap) {
    const OnePixelSizeNow = playersCamera.scale * OneMapPixelSize;
    const LeftTopPoint = new Point(playersCamera.Position.X * OnePixelSizeNow, playersCamera.Position.Y * OnePixelSizeNow);
    var canvasContext = mainCanvas.getContext("2d");
    // Draw cells
    canvasContext.fillStyle = "#00cd00";
    canvasContext.clearRect(0,0,600,600);
    canvasContext.fillRect(LeftTopPoint.X,
        LeftTopPoint.Y,
        gameMap.SizeX * OnePixelSizeNow,
        gameMap.SizeY * OnePixelSizeNow);
    for (let i = 0; i < gameMap.SizeX; i++) {
        for (let j = 0; j < gameMap.SizeY; j++) {
            canvasContext.beginPath();
            canvasContext.lineWidth = "1";
            canvasContext.strokeStyle = "#006600";
            canvasContext.rect(LeftTopPoint.X + (OnePixelSizeNow * i), LeftTopPoint.Y + (OnePixelSizeNow * j), OnePixelSizeNow, OnePixelSizeNow);
            canvasContext.stroke();
        }
    }

    // Draw builds
    game.Players.forEach((player) => {
        player.Builds.forEach((build) => {
            if(build instanceof TownHall){
                canvasContext.fillStyle = "#AAAAAA";
                canvasContext.beginPath();
                canvasContext.arc(GamePointToPointOnCanvas(build.Position).X, GamePointToPointOnCanvas(build.Position).Y, OnePixelSizeNow * 2, 0, 2 * Math.PI);
                canvasContext.stroke();
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function() {
    Redraw(gameMap);
});
document.onkeydown = function (event) {
    var camSpeed = 5/playersCamera.scale;
    switch (event.key) {
        case "w":
            playersCamera.Position.Y += camSpeed;
            break;
        case "s":
            playersCamera.Position.Y -= camSpeed;
            break;
        case "a":
            playersCamera.Position.X += camSpeed;
            break;
        case "d":
            playersCamera.Position.X -= camSpeed;
            break;
    }
    Redraw(gameMap);
};
// CHANGE SCALE OF PLAYERS CAMERA WHEN MOUSE WHEEL ROUTS
mainCanvas.addEventListener("wheel", function (event) {
    if(event.deltaY < 0){
        playersCamera.scale *= 1.1;
    }
    else{
        playersCamera.scale /= 1.1;
    }
    Redraw(gameMap);
});