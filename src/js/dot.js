"use strict";
	function Dot(selector, userOptions){
		var options={
			//canvas 默认宽高
			cW: 1367,
			cH: 500,

			//粒子数目
			numDot: 100,

			//粒子半径
			radDot: 2,

			//粒子颜色
			dotColor: "#FFFFFF",

			//线条长度
			lineDist: 70,

			//线条颜色
			lineColor: "#FFFFFF",

			//透明度
			opacity: 0.6,

			//x方向运动速度
			vxRange: 2,

			//y方向运动速度
			vyRange: 2,

			//是否与边界碰撞检测
			isWallCollisionTest: true,
		};

		/********
		全局变量
		********/
		var oDots = [],
			canvas = null,
			ctx = null,
			oDotA = null,
			oDotB = null,
			W = null, 
			H = null;

		/********
		全局函数
		********/

		//1.参数混合
		function mergeOptions(userOptions, options){
			Object.keys(userOptions).forEach(function(key){
				options[key] = userOptions[key];
			});
		}

		//2.颜色16进制转RGBA
		function colorToRGB(color, alpha){
			if(typeof color === "string" && color[0] === "#"){
				color = window.parseInt(color.slice(1), 16);
			}
			alpha = (alpha === undefined) ? 1 : alpha;

			//解析
			var r = color >> 16 & 0xff,
				g = color >> 8 & 0xff,
				b = color >> 4 & 0xff,
				a = (alpha < 0 ) ? 0 : ((alpha > 1) ? 1 : alpha);

			if (a === 1) {
    			return "rgb("+ r +","+ g +","+ b +")";
  			} else {
    			return "rgba("+ r +","+ g +","+ b +","+ a +")";
  			}
		}


		//5.粒子函数
		function Practicle(color, radius, alpha){
    		this.x = 0;
    		this.y = 0;
    		this.vx = 0;
    		this.vy = 0;
    		this.radius = radius;
    		this.rotation = 0;
    		this.scaleX = 1;
    		this.scaleY = 1;
    		this.name = "";
    		this.color = colorToRGB(color, alpha);
		}
		Practicle.prototype.draw = function(ctx){
			ctx.save();
    		ctx.translate(this.x,this.y);
    		ctx.rotate(this.rotation);
    		ctx.scale(this.scaleX,this.scaleY);
    		ctx.fillStyle = this.color;
    		ctx.strokeStyle = this.color;
    		ctx.beginPath();
    		ctx.arc(0,0,this.radius,0,Math.PI*2,false);
    		ctx.closePath();
    		ctx.fill();
    		ctx.restore();
		}

		//6.make 粒子
		function makeDots(){
			for(var i=0; i<options.numDot; i++){
				var oDot = new Practicle(options.dotColor, options.radDot, options.opacity);
					oDot.x = parseInt((Math.random() * W).toFixed(2));
					oDot.y = parseInt((Math.random() * H).toFixed(2));
					oDot.vx = Math.random()*(options.vxRange) - options.vxRange/2;
					oDot.vy = Math.random()*(options.vyRange) - options.vyRange/2;
					oDots.push(oDot);
				}
		}

		//7. 绘制粒子
		function draw(oDot){
			oDot.draw(ctx);
		}

		//8. 运动函数
		function move(oDot){
			oDot.x += oDot.vx;
			oDot.y += oDot.vy;
			checkWall(oDot);
		}

		//9.墙壁碰撞检测
		function checkWall(oDot){
			if(oDot.x + oDot.radius > W){
				oDot.x = W - oDot.radius;
				oDot.vx *= -1;
			}else if(oDot.x - oDot.radius < 0){
				oDot.x = oDot.radius;
				oDot.vx *= -1;
			}

			if(oDot.y + oDot.radius > H){
				oDot.y = H - oDot.radius;
				oDot.vy *= -1;
			}else if(oDot.y - oDot.radius < 0){
				oDot.y = oDot.radius;
				oDot.vy *= -1;
			}
		}

		//12.连线
		function drawLine(oDot0, oDot1){
			var dx = oDot1.x - oDot0.x,
				dy = oDot1.y - oDot0.y,
				dist = Math.sqrt(dx*dx + dy*dy);

			if(dist < options.lineDist){
			   ctx.save();
			   ctx.strokeStyle = colorToRGB(options.lineColor, (options.opacity-0.4) <= 0 ? 0.1 : options.opacity-0.4);
			   ctx.beginPath();
			   ctx.moveTo(oDot0.x, oDot0.y);
			   ctx.lineTo(oDot1.x, oDot1.y);
			   ctx.closePath();
			   ctx.stroke();
			   ctx.restore();
			}

		}

		//13.执行
		function execute(){
			oDots.forEach(move);

			for(var i=0; i<options.numDot-1; i++){
					oDotA = oDots[i];
					for(var j=i+1; j<options.numDot; j++){
						oDotB = oDots[j];
						drawLine(oDotA, oDotB);
					}
			}

			oDots.forEach(draw);
		}
        
        //14.动画兼容
        if(!window.requestAnimationFrame){
            window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
                                           window.mozRequestAnimationFrame||
                                           window.oRequestAnimationFrame||
                                           window.msRequestAnimationFrame||
                                           function(callback){
                                                return window.setTimeout(callback,1000/60); 
                                           });
        }


		/********
		初始化
		********/

		function initDot(selector, userOptions){

			//混合参数
			mergeOptions(userOptions, options);

			canvas = document.getElementById(selector),
			ctx = canvas.getContext('2d');
            
            W = options.cW;
			H = options.cH;
				
			canvas.width = W;
			canvas.height = H;

			//渲染粒子
			makeDots();

			(function drawFrame(){
				ctx.clearRect(0, 0, W, H);
				execute();
                window.requestAnimationFrame(drawFrame);
			}())

		}

		initDot(selector, userOptions);

	}
