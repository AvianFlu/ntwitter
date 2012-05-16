var Color = net.brehaut.Color;


// So far doesn't take into account brightness
Beige = (function(){

  // Define key values
  redHue = 0;
  yellowHue = 60;
  hueShift = 0;
  
  // Define square in HSL
  minSaturation = 0.05;
  maxSaturation = 1;
  
  minHue = redHue + hueShift;
  maxHue = yellowHue - hueShift;
  midHue = minHue + (maxHue - minHue / 2);

  withinHueSaturationSquare = function(colour){
    var s = colour.getSaturation();
    var h = colour.getHue();
    
    return s >= minSaturation && s <= maxSaturation &&
           h >= minHue && h <= maxHue;
  };
  
  normalisedHue = function(colour){
    // minHue ... midHue .. maxHue
    // 1 ... 0 ... 1
    var h = colour.getHue();
    // Shift left
    x = h - midHue;
    // Mirror
    x = Math.abs(x);
    // Find gradient
    m = 1 / (maxHue - midHue);
    return m * x;
  };
  
  normalisedSaturation = function(colour){
    // minSaturation .. maxSaturation
    // 1 ... 0
    var s = colour.getSaturation();
    m = -1 / (maxSaturation - minSaturation);
    c = -1 * m * maxSaturation;
    return m * x + c;
  };
  
  // Imagine a bilaterial triangle in HSL space
  // with it's base along the Hue, and length along saturation
  // we can fold the triangle in 2 to get a right angle triangle
  // if we look at the ratio of the hue vs the length we can establish
  // if the values are within the bilaterial triangle
  withinHueSaturationTriangle = function(colour){
    var h = normalisedHue(colour);
    var s = normalisedSaturation(colour);
    
    return h / s <= 1;
  };
  
  return {
    is: function(hex){
      var c = Color(hex);
      console.info("Hue", c.getHue());
      console.info("Saturation", c.getSaturation());
      return withinHueSaturationSquare(c) && withinHueSaturationTriangle(c);
    }
  };
  
})();