(function ( $ ) {
 
    $.fn.stayWithMe = function( options ) {
		var sWM = this;
        var settings = $.extend(true, {
            style: {
                color: "#fff",
                backgroundColor: "#4679bd",
                borderRadius: 10,
                padding: '20px 15px',
                width: 200,
                height: 100,
                position: 'absolute'
            }
        }, options );
        this.hide()
            .css(settings.style)
            .append('<span class="swm-close" style="position: absolute; top: 5px; right: 10px; cursor: pointer;">close</span>');
        $('.swm-close').click(function(){
                sWM.unjump(); 
            });
		$('body').mouseleave(function(e){
			if( e.offsetY <= 0 || e.clientY <= 0 ){
                sWM.jump();
                console.log(e.view);
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
			this.show();
		};
        this.unjump = function(){
			this.hide();
		};
        return this;	
    };
	
}( jQuery ));