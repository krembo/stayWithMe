var stayWithMe = function(elem, options){
	var sWM = elem, origWidth = sWM.offsetWidth, origHeight = sWM.offsetHeight,
		swmScreen, swmScreenClose, s, j, i;
		var settings = {
			screen: false,
			screenStyle: {
				background: '#fff',
				opacity: 0.8,
				zIndex: 10
			},
            style: {
                color: "#fff",
                backgroundColor: "#4679bd",
                borderRadius: '10px',
                padding: '20px 15px',
                width: origWidth+'px',
                height: origHeight+'px',
				minWidth: '200px',
				minHeight: '100px',
                position: 'absolute',
				zIndex: 11
            },
			moveOnScroll: false
        };
		for(s in options){
			if(options[s].constructor == Object){
				for(j in options[s]){
					settings[s][j] = options[s][j];
				}
			} else {
				settings[s] = options[s];
			}
		}
   
		document.body.appendChild(sWM);
		if(settings.screen){
			swmScreen = document.createElement('div');
			swmScreen.id = 'swm-screen';
			swmScreen.style.width = document.documentElement.offsetWidth+'px';
			swmScreen.style.height = document.documentElement.offsetHeight+'px';
			swmScreen.style.position = 'absolute';
			swmScreen.style.display = 'none'; 
			swmScreen.style.top = 0;
			swmScreen.style.left = 0;
			for(i in settings.screenStyle){
				swmScreen.style[i] = settings.screenStyle[i];
			}
			document.body.appendChild(swmScreen);
		}
		sWM.style.display = 'none';
		for(i in settings.style){
			sWM.style[i] = settings.style[i];
		}
        swmScreenClose = document.createElement('span');
		swmScreenClose.classes += 'swm-close';
		swmScreenClose.style.position = 'absolute';
		swmScreenClose.style.top = '5px';
		swmScreenClose.style.right = '10px';
		swmScreenClose.style.cursor = 'pointer';
		swmScreenClose.textContent = 'close';
		swmScreenClose.innerText = 'close';
		sWM.appendChild(swmScreenClose);  
		swmScreenClose.addEventListener('click', function(){sWM.crouch();});
		sWM.recalculate = function(){
			var top = 10, left = 10, height = sWM.offsetHeight, width = sWM.offsetWidth, paddingTop = parseInt(sWM.style.paddingTop), paddingLeft = parseInt(sWM.style.paddingLeft); 
			if(window.innerHeight > height){
				top = Math.floor((window.innerHeight - height)/2) + pageYOffset;
			} else {
				height = window.innerHeight-20;
			}
			if(window.innerWidth > width){
				left = Math.floor((window.innerWidth - width)/2) + pageXOffset;
			} else {
				width = window.innerWidth-20;
			}
            sWM.style.top = top+'px';
			sWM.style.left = left+'px';
			sWM.style.width = (width-(2*paddingLeft))+'px';
			sWM.style.height = (height-(2*paddingTop))+'px';
		};
		document.body.addEventListener('mouseleave',function(e){
			if( e.offsetY <= 0 || e.clientY <= 0 ){
                sWM.jump();
                sWM.recalculate();
			}
		});
		if(settings.moveOnScroll){
			document.addEventListener('scroll',function(e){
                if(sWM.swmShow){
					sWM.recalculate();
				}
			});		
		}
		sWM.jump = function(){
			sWM.style.display = 'block';
			sWM.swmShow = true;
			if(swmScreen) swmScreen.style.display = 'block';
		};
        sWM.crouch = function(){
			sWM.style.display = 'none';
			sWM.swmShow = false;
			if(swmScreen) swmScreen.style.display = 'none';
		};
};