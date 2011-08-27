(function($){

$(function()
{
var $wnd = $(window);
var $canvas = $("#teh-canvas");

var canvas = $canvas[0];
canvas.width = $wnd.width() - 1;
canvas.height = $wnd.height() - 1;

var ctx = canvas.getContext('2d');  
var width = canvas.width;
var height = canvas.height;
var centerX = width / 2;
var centerY = height / 2;

var FOCUS = 20;

var GRAVITY = 2;

var Pendulum = Class.extend({
init:
    function(length, size, zPos, angle)
    {
        this.length = length;
        this.size = size;
        this.zPos = zPos;
        this.angle = angle;
        this.speed = 0;
    },
draw:
    function()
    {
        var factor = FOCUS / this.zPos;
        
        var x = Math.sin(this.angle) * this.length * factor;
        var y = Math.cos(this.angle) * this.length * factor;
        
        ctx.beginPath()
        ctx.arc(centerX + x, centerY / 4 + y, this.size * factor, 0, Math.PI*2, false);
        ctx.fill();
    },
update:
    function()
    {
        var delta = - GRAVITY / this.length * Math.sin(this.angle);
        this.speed += delta;
        this.angle += this.speed;
    }
});

var pendula = [];

for (var i=0; i < 10; i++)
{
    var lengthDelta = i * 12;
    var zDelta = i * 2;
    pendula.push(new Pendulum(96 + lengthDelta, 40, 26 - zDelta, 1.4));
}

var colors = ["#280053","#1e005e","#1a0063","#0f0070","#03017e","#06068a","#1212a6","#1818b4","#2626d5","#3636f8"];


MainLoop.start($canvas,function()
{
    console.debug("main");
    
    ctx.save();
    ctx.fillStyle = "#080000";
    ctx.fillRect(0,0,width,height);
    
    var len = pendula.length;
    for (var i=0; i <  len ; i++)
    {
        ctx.fillStyle = colors[i];

        var pendulum = pendula[i];
        pendulum.update();
        pendulum.draw();
    }
    
    ctx.restore();
});
});
})(jQuery);