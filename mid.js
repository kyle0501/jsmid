function reset(){
  window.location.reload(true);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('get','https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery',true);
  xhr.send();
  xhr.onload = function(){
    var data = JSON.parse(xhr.responseText);
    var str = ''; 
    var status = document.getElementById('status');
    var area = document.getElementById('area');
    var statusTotal = {}; 
    var areaTotal = {};
    var option;
    
   
    
    for(var i = 0; i < data.length; i++){
      var statusContent = data[i].InformDesc_;
      var areaContent = data[i].ZipName_;
      
      if(statusTotal[statusContent] == undefined){
        statusTotal[statusContent] = 1;
        option = document.createElement('option');
        option.value = data[i].InformDesc_;
        option.text = data[i].InformDesc_;
        status.add(option);
      }else{
        statusTotal[statusContent] += 1;
      }
      
      if(areaTotal[areaContent] == undefined){
        areaTotal[areaContent] = 1;
        option = document.createElement('option');
        option.value = data[i].ZipName_;
        option.text = data[i].ZipName_;
        area.add(option);
      }else{
        areaTotal[areaContent] += 1;
      }
    }
    
    status.addEventListener('change',function(e){
    
      var statusValue = status.value;
      var count=0;
      var areaValue = area.value;
        for(var i = 0; i < data.length; i++){  
      
        if(data[i].ZipName_ == areaValue && data[i].InformDesc_ == statusValue){
          count+=1;
          str+= '<li>'+data[i].address_+"-"+data[i].BeforeDesc_+'</li>';
        }
      }
      document.querySelector('.list').innerHTML = str;
      document.querySelector('.total').textContent = areaValue + '有 ' + count + ' 筆資料';
         })
   
      area.addEventListener('change',function(e){
        var areaValue = area.value;
        var count=0;
        for(var i = 0; i < data.length; i++){  
        
        if(data[i].ZipName_ == areaValue && data[i].InformDesc_ == statusValue){
          count+=1;
          str+= '<li>'+'地點'+data[i].address+"----"+data[i].BeforeDesc_+'<li>';  
        }
      }
      document.querySelector('.list').innerHTML = str;
      document.querySelector('.total').textContent = areaValue + '有 ' + count + ' 筆資料';
         }) 
    
  };   
  
  