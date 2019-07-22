function displayScore(score, ctx) {
    let text = "Score = " + score;
    ctx.font = "20px Georgia";
    ctx.fillText(text, DEFAULT_CANVAS_WIDTH-150, 50);
}