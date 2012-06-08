var Color = net.brehaut.Color;

// So far doesn't take into account brightness
Beige = (function(){

  var validLightness = function(c){
    var minLightness = 0.3;
    var maxLightness = 0.96;
    
    var l = c.getLightness();
    
    return l > minLightness && l < maxLightness;
  };
  
  var withinHueRange = function(c){
    var maxHue = function(colour){
      var x = colour.getLightness();
      var m = 50;
      var c = 15;
      
      return m*x+c;
    };
    var minHue = function(colour){ 
      var x = colour.getLightness();
      var m = -50;
      var c = 45;
      
      return m*x+c;
    };
    
    var hue = c.getHue();
    
    return hue > minHue(c) && hue < maxHue(c);
  };
  
  var withinSaturationRange = function(c){
    var maxSaturation = function(colour){
      var x = colour.getLightness();
      var m = 1.1666;
      var c = -0.05;
      
      return m*x+c;
    };
    
    var minSaturation = function(colour){
      var x = colour.getLightness();
      var m = -0.3333;
      var c = 0.63333;
      
      return m*x+c;
    };
    
    var sat = c.getSaturation();
    
    return sat > minSaturation(c) && sat < maxSaturation(c);
  };


  return {
    is: function(hex){
      var c = Color(hex);
      return validLightness(c) &&
        withinHueRange(c) &&
        withinSaturationRange(c);
    }
  };
  
})();
