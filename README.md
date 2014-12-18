hellaLightbox.js
===================

A hella lightweight lightbox jQuery plugin that centers and displays any element – and children of that element – that you pass to it as a jQuery selector.


**Accepted parameters:**

````
<div class="lightbox"><!-- stuff --></div>
$('.lightbox').hellaLightbox(trigger[, options])
````
>**trigger** (default: 400)  
>Type: Number or String  
>Either a jQuery selector delineating the element(s) that, when clicked, will trigger the lightbox or, if number, the amount of time (in milliseconds) to wait before launching lightbox on page load  
>
>**options**  
>Type: Object  
>A map of additional options to pass to the plugin  
>>**hideOnBgClick** (default: true)  
>>Type: Boolean  
>>Determins if clicking outside the lightbox should hide the lightbox  
>>
>>**triggerEvent** (default: 'click')  
>>Type: String  
>>If the trigger is not a number, defines what type of event to bind to the trigger to show the lightbox  
>>
>>**xOut** (default: 'X')  
>>Type: String  
>>The content to place within the x-out button  


**Examples:**

Fire lightbox 1.5 seconds after page load:
````
<div class="myLightbox">
  <span>Bunch o' stuff</span>
</div>
<script src="hellaLightbox.min.js"></script>
<script>
  $(function () {
    $('.myLightbox').hellaLightbox(2000);
  });
</script>
````

Fire lightbox on link click, change x-out text and don't exit hide lightbox when user clicks outside of it:
````
<a href="#" class="showLightbox">Click here to see my awesome photo!</a>
<div class="lightbox">
  <img src="awesome-photo.jpg">
</div>
<a href="#" class="showLightbox">Or click here!</a>

<script src="hellaLightbox.min.js"></script>
<script>
  $(function () {
    $('.lighbox').hellaLightbox('a.showLightbox', {
      xOut: 'Click to Exit',
      hideOnBgClick: false
    });
  });
</script>
````

A live example can [be seen here](http://lukeallanwhyte.com/tightrope/liteboxin/example.html).