stayWithMe
==========

Small compact jQuery plugin for showing pop-ups when user tries to left the page.

Usage
=====

The usage is pretty simple. Add to page 'div' element you want to be showed to customers when they living.
And then just use stayWithMe() function on that 'div'.

Example
=======

Let's say you've added a div like this one:
```HTML
<div id="myDiv">Why on the earth do you want to leave my gorgeous site???</div>
```

Then you just need to call stayWithMe function in following way and you good.
```JavaScript
$('#myDiv').stayWithme();
```

You can also provide additional options (style only at this moment).
```JavaScript
$('#myDiv').stayWithme({style: {width: 500, height: 200, backgroundColor: 'black'} });
```

Generally all that works with jQuery .css() function can be passed. 
Just don't change the position parameter, it'll break the positioning ;)
