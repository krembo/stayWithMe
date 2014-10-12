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
				zIndex: 11,
				display: 'none'
            },
			moveOnScroll: false
        };
		var setStyle = function(elem, style){ for (var prop in style) {elem.style[prop] = style[prop];} };
		var mergeObjects = function(primary, changes){
			for(s in changes){
				if(changes[s].constructor == Object){
					for(j in changes[s]){
						primary[s][j] = changes[s][j];
					}
				} else {
					primary[s] = changes[s];
				}
			}
			return primary;
		};
		settings = mergeObjects(settings, options);
		
		document.body.appendChild(sWM);
		if(settings.screen){
			swmScreen = document.createElement('div');
			swmScreen.id = 'swm-screen';
			setStyle( swmScreen, mergeObjects({
				width: document.documentElement.offsetWidth+'px',
				height: document.documentElement.offsetHeight+'px',
				position: 'absolute', display: 'none', 
				top: 0, left: 0}, 
					settings.screenStyle) 
			);
			document.body.appendChild(swmScreen);
		}
		setStyle(sWM, settings.style);
		
        swmScreenClose = document.createElement('span');
		swmScreenClose.classes += 'swm-close';
		setStyle(swmScreenClose, 
				{ position: 'absolute',  top: '5px', 	right: '10px',	cursor: 'pointer' }); 
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
			setStyle(sWM, {
				top: top+'px', left: left+'px', 
				width: (width-(2*paddingLeft))+'px', height: (height-(2*paddingTop))+'px'}
			);
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