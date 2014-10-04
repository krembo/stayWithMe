(function ( $ ) {
 
    $.fn.stayWithMe = function( options ) {
		var sWM = this, origWidth = sWM.width(), origHeight = sWM.height();
		var settings = $.extend(true, {
			screen: false,
			screenStyle: {
				background: '#fff',
				opacity: 0.8,
				zIndex: 10
			},
            style: {
                color: "#fff",
                backgroundColor: "#4679bd",
                borderRadius: 10,
                padding: '20px 15px',
                width: origWidth,
                height: origHeight,
				minWidth: 200,
				minHeight: 100,
                position: 'absolute',
				zIndex: 11
            }
        }, options );
		$('body').append(sWM);
		if(settings.screen){
			$('body').append('<div id="swm-screen" style="width:'+$('html').width()+'px;height:'+$('html').height()+'px;position:absolute;background:'+
				settings.screenStyle.background+';opacity:'+settings.screenStyle.opacity+';z-index:'
				+settings.screenStyle.zIndex+';display:none;top:0;left:0;"></div>');
		}
        this.hide()
            .css(settings.style)
            .append('<span class="swm-close" style="position: absolute; top: 5px; right: 10px; cursor: pointer;">close</span>');
        $('.swm-close').click(function(){
                sWM.crouch(); 
            });
		$('body').mouseleave(function(e){
			if( e.offsetY <= 0 || e.clientY <= 0 ){
                sWM.jump();
                var top = 10, left = 10, height = sWM.height(), width = sWM.width(), 
					paddingTop = parseInt(sWM.css('padding-top')), paddingLeft = parseInt(sWM.css('padding-left')); 
				if(e.view.innerHeight > (height + 2*paddingTop)){
					top = Math.floor((e.view.innerHeight - height - 2*paddingTop)/2) + pageYOffset;
				} else {
					height = e.view.innerHeight-20-2*paddingTop;
				}
				if(e.view.innerWidth > (width + 2*paddingLeft)){
					left = Math.floor((e.view.innerWidth - width - 2*paddingLeft)/2) + pageXOffset;
				} else {
					width = e.view.innerWidth-20-2*paddingLeft;
				}
                sWM.css({top: top, left: left, width: width, height: height});
			}
		});		
		this.jump = function(){
			this.show().data('show', true);
			$('#swm-screen').show();
		};
        this.crouch = function(){
			this.hide().data('show', false);
			$('#swm-screen').hide();
		};
        return this;	
    };
	
}( jQuery ));