
  var showCoinList_ID = [1120,1136,678,698,691,682,680,6007,2230,18182]; //french pre ww1
  //var showCoinList_ID = [5501,12806,4721,4412,13209,13210,7248,19488,23652,23736,5760] //vicky early
  //var showCoinList_ID = [853,2557,1916,1915,4715,2340,22640,3412,7935,3643,26642,11814,4714,32033,21444,21445]

  var diameterMultiplier = 8

  function showTheseImages(){
    diameterMultiplier = parseInt(document.getElementById("textBoxSize").value)

    id_list = document.getElementById("textboxID").value
    id_list = id_list.replace(/\s/g, '');
    id_list = id_list.split(",")
    showCoinList_ID = id_list

    var c = document.getElementById('myCanvas')
    ctx = document.getElementById('myCanvas').getContext('2d');

    var d = document.getElementById('myCanvas2')
    dtx = document.getElementById('myCanvas2').getContext('2d');

    ctx.clearRect(0, 0, c.width, c.height);
    dtx.clearRect(0, 0, d.width, d.height);
    show()
  }

  function show() {
    var showCoinList = showCoinList_ID
    for(i=0;i<coin_image.length;i++){
      for(j=0;j<showCoinList_ID.length;j++){
        if(parseInt(coin_image[i][0])==parseInt(showCoinList_ID[j])){
          showCoinList[j] = coin_image[i]
        }
      }
    }
    var c = document.getElementById('myCanvas')
    ctx = document.getElementById('myCanvas').getContext('2d');
    drawCoins(showCoinList,0,0,0,false,c,ctx)
    dtx = document.getElementById('myCanvas2').getContext('2d');
    var d = document.getElementById('myCanvas2')
    drawCoins(showCoinList,0,0,0,true,d,dtx)
  }

  function drawCoins(showCoinList,count,last_x,last_diamm,obverse,c,ctx){
    function roundedImage(ctx,x,y,width,height,radius){
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }    
    if(count < showCoinList.length){

        var x = last_x+last_diamm/2;
        if(count==0){x = 0}
        
        var diamm = parseInt(showCoinList[count][3])*diameterMultiplier;
        var y = c.height - diamm;

        var img = new Image(i.toString);
        if(obverse)
          img.src = 'https://en.numista.com/catalogue/photos/' + showCoinList[count][1];
        else{
          img.src = 'https://en.numista.com/catalogue/photos/' + showCoinList[count][2];
        }
        img.onload = function(){

          ctx.save();
          roundedImage(ctx,x, y, diamm, diamm, diamm/1.7);
          ctx.clip();
          ctx.drawImage(img, x, y, diamm, diamm)
          drawCoins(showCoinList,count+1,x,diamm,obverse,c,ctx)
          ctx.restore();
        }
    }
  }
 


