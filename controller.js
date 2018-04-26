
    var app=angular.module('firstApplication',['ngMaterial','ngAnimate']);
  app.controller('control',function($scope,$http) {
      $scope.showme=false;
      $scope.isCollapsed=false;
      $scope.favItems=[];
     
      $scope.symbol="";$scope.last="";$scope.change="";$scope.time="";$scope.open="";$scope.close="";$scope.range="";$scope.volume="";
      $scope.SMA="";$scope.Price="";$scope.EMA="";$scope.STOCH="";$scope.RSI="";$scope.CCI="";$scope.ADX="";$scope.BBANDS="";$scope.MACD="";
      var self=this;
      var ch=0;
      localStorage.setItem("itemArray",JSON.stringify([]));
      $scope.favSymbol=[];$scope.favPrice=[];$scope.favChange=[];$scope.favVolume=[];
      $scope.clear=function(text){
       //document.getElementById("autoform").value="";
       //$scope.ctrl.searchText="";
       $scope.showme=false;
      }
     
      $scope.display = function(text) {
        $scope.processComplete=false;
        $scope.charts=false;
       // alert($scope.charts);
          if(text==""||text==null)
          {
              document.getElementById("error").innerHTML="Please enter a stock Ticker Symbol";
          }
          else{
            document.getElementById("error").innerHTML="";
              var temp=[];
              var favItems=JSON.parse(localStorage.getItem("itemArray"));
          for(var i=0;i<favItems.length;i++)
          temp.push(favItems[i][0]);
          if(temp.indexOf(text)==-1){ $scope.isCollapsed=false; document.getElementById("favcol").style.color="black";}
          else $scope.isCollapsed=true;
          console.log(text);
          $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/'+text).success(function(response){
          var myData = (response);
          $scope.Price=myData;
          console.log(myData);
          var img=document.getElementById("arrow");
          var keys=Object.keys(myData);
          if(keys.length==0)
          {
            var cstock=document.getElementById("cstock");
            var hstock=document.getElementById("hstock");
            var feed=document.getElementById("feed");
            var price=document.getElementById("Price");
            $scope.processComplete=true;
            $scope.charts=true;
            cstock.innerHTML="<div class='panel panel-danger'><div class='panel-heading'>Error Failed to get currentstock data</div></div>";
            hstock.innerHTML="<div class='panel panel-danger'><div class='panel-heading'>Error Failed to get history stock data</div></div>";
            feed.innerHTML="<div class='panel panel-danger'><div class='panel-heading'>Error Failed to get feed data</div></div>";
           price.innerHTML="<div class='panel panel-danger'><div class='panel-heading'>Error Failed to get price data</div></div>";
          }
          else{
          console.log(keys);
          console.log(myData[keys[0]]);
          var metakeys=Object.keys(myData[keys[0]]);
          console.log(metakeys);
          console.log(myData[keys[0]][metakeys[1]]);
          var timekeys=Object.keys(myData[keys[1]]);
          var lastdata=myData[keys[1]][timekeys[0]];
          var date=new Date(timekeys[0]);
           ch=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[3]]-myData[keys[1]][timekeys[1]][Object.keys(lastdata)[3]];
          var chper=ch*100/(myData[keys[1]][timekeys[0]][Object.keys(lastdata)[3]]);
          if(ch>0)
          {
           img.src="http://cs-server.usc.edu:45678/hw/hw8/images/Up.png";
           document.getElementById("per").style.color="green";
          }
          else{
            img.src="http://cs-server.usc.edu:45678/hw/hw8/images/Down.png";
            document.getElementById("per").style.color="red";
          }
          console.log(myData[keys[1]][timekeys[0]][Object.keys(lastdata)[3]]);
          $scope.symbol=myData[keys[0]][metakeys[1]].toUpperCase();
          $scope.last=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[3]];
          $scope.change=ch.toFixed(2)+"("+chper.toFixed(2)+")";
          $scope.open=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[0]];
          $scope.close=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[3]];
          $scope.range=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[2]]+"-"+myData[keys[1]][timekeys[0]][Object.keys(lastdata)[1]];
          $scope.time=timekeys[0];
          $scope.volume=myData[keys[1]][timekeys[0]][Object.keys(lastdata)[4]];
          $scope.showme=true;
          $scope.processComplete=true;
        }
        });
        $scope.showme=true;
        $scope.price(text);$scope.sma(text);$scope.ema(text);$scope.stoch(text);$scope.rsi(text);$scope.adx(text);$scope.cci(text);$scope.bbands(text);$scope.macd(text);
        //console.log( $scope.charts);
      }};
        $scope.sortTable=function(items,i,order){
          if(order=="asc"){
          items.sort(sortFunction);
              function sortFunction(a, b) {
                  if (a[0] === b[0]) {
                      return 0;
                  }
                  else {
                      return (a[0] < b[0]) ? -1 : 1;
                  }
              }
          }
          if(order=="dsc") 
          {
              items.sort(sortFunction);
              function sortFunction(a, b) {
                  if (a[i] === b[i]) {
                      return 0;
                  }
                  else {
                      return (a[i] > b[i]) ? -1 : 1;
                  }
              }
          }
          console.log(items);
          var table=document.getElementById("favTable").getElementsByTagName("tbody")[0];
          var rows=table.rows;
          var old_tbody=table;
          var new_tbody = document.createElement('tbody');
          for(var i=0;i<rows.length;i++)
          table.deleteRow(i);
          console.log(items.length);
          for(var i=0;i<items.length;i++)
          {
             var row=new_tbody.insertRow(i);
             var cell1=row.insertCell(0);
             var cell2=row.insertCell(1);
              var cell3=row.insertCell(2);
             var cell4=row.insertCell(3);
              var cell5=row.insertCell(4);
             cell1.innerHTML="<a>"+items[i][0]+"</a>";
             cell2.innerHTML=items[i][1];
             var ch=parseFloat(items[i][2].split("(")[0]);
             if(ch>0)
             cell3.innerHTML="<p style='color:green'>"+items[i][2]+"<img src='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png' height=10px width=10px></p>"
             else
              cell3.innerHTML="<p style='color:red'>"+items[i][2]+"<img src='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' height=10px width=10px></p>"
              cell4.innerHTML=items[i][3];
              var id="a"+i+1;
              cell5.innerHTML="<button class='favo'><span class='glyphicon glyphicon-trash'></span></button>";
              cell5.addEventListener("click",function(){
                 
                  items.splice(items.indexOf($scope.symbol),1);
                
                  if(i==1||i==0)
                  new_tbody.deleteRow(0);
              else
              new_tbody.deleteRow(i-1);
              localStorage.setItem("itemArray",JSON.stringify(items));
              $scope.isCollapsed=false;
              document.getElementById("favcol").style.color="black";
              });
          }
         
       old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
        }
         $scope.sort=function(){
          var sortby=document.getElementById("sortby");
          console.log(sortby.options[sortby.selectedIndex].text);
          var order=document.getElementById("order");
          var orderele=order.options[order.selectedIndex].text;
          var sortele=sortby.options[sortby.selectedIndex].text;
          console.log(order.options[order.selectedIndex].text);
          var table=document.getElementById("favTable").getElementsByTagName("tbody")[0];
          var rows=table.rows;
          var items=JSON.parse(localStorage.getItem("itemArray"));
          if(sortele=="Symbol"){
              if(orderele="Ascending")
              $scope.sortTable(items,0,"asc");
              if(orderele="Descending")
              $scope.sortTable(items,0,"dsc");
          }
          if(sortele=="Price"){
              if(orderele="Ascending")
              $scope.sortTable(items,1,"asc");
              if(orderele="Descending")
              $scope.sortTable(items,1,"dsc");
          }
          if(sortele=="Volume"){
              if(orderele="Ascending")
              $scope.sortTable(items,3,"asc");
              if(orderele="Descending")
              $scope.sortTable(items,3,"dsc");
          }
          if(sortele=="Change")
          {
              for(var i=0;i<items.length;i++)
              items[i][2]=parseFloat(items[i][2].split("(")[0]);
              if(orderele="Ascending")
              $scope.sortTable(items,2,"asc");
              if(orderele="Descending")
              $scope.sortTable(items,2,"dsc");
          }
          if(sortele=="Change Percent")
          {
              for(var i=0;i<items.length;i++)
              items[i][2]=parseFloat(items[i][2].split("(")[1].split(")")[0]);
              if(orderele="Ascending")
              $scope.sortTable(items,2,"asc");
              if(orderele="Descending")
              $scope.sortTable(items,2,"dsc");
          }
  
      };
         $scope.fav=function()
         {
          var favItems=JSON.parse(localStorage.getItem("itemArray"));
          var arr=[];
          if($scope.isCollapsed!=true){
          $scope.isCollapsed=true;
          document.getElementById("favcol").style.color="gold";
          arr.push($scope.symbol);
          arr.push($scope.last);
          arr.push($scope.change);
          arr.push($scope.volume);
          console.log(arr);
          favItems.push(arr);
          localStorage.setItem("itemArray",JSON.stringify(favItems));
          favItems=[];
          var table=document.getElementById("favTable").getElementsByTagName("tbody")[0];
          favItems=JSON.parse(localStorage.getItem("itemArray"));
          var i=favItems.length;
          var row=table.insertRow(i-1);
         var cell1=row.insertCell(0);
         var cell2=row.insertCell(1);
         var cell3=row.insertCell(2);
         var cell4=row.insertCell(3);
         var cell5=row.insertCell(4);
         cell1.innerHTML="<a onclick='this.display(this.symbol)'>"+arr[0]+"</a>";
         cell2.innerHTML=arr[1];
         if(ch>0)
         cell3.innerHTML="<p style='color:green'>"+arr[2]+"<img src='http://cs-server.usc.edu:45678/hw/hw8/images/Up.png' height=10px width=10px></p>"
         else
         cell3.innerHTML="<p style='color:red'>"+arr[2]+"<img src='http://cs-server.usc.edu:45678/hw/hw8/images/Down.png' height=10px width=10px></p>"
         cell4.innerHTML=arr[3];
         cell5.innerHTML="<button id='favo"+i+1+"'><span class='glyphicon glyphicon-trash'></span></button>";
         document.getElementById("favo"+i+1).addEventListener("click",function(){
             //delete favItems[favItems[favItems.indexOf($scope.symbol)]];
             favItems.splice(favItems.indexOf($scope.symbol),1);
              if(i==0)
              table.deleteRow(0);
              else
              table.deleteRow(i-1);
              localStorage.setItem("itemArray",JSON.stringify(favItems));
              $scope.isCollapsed=false;
              document.getElementById("favcol").style.color="black";
         });
            
            }
            else{
            $scope.isCollapsed=false;
            var table=document.getElementById("favTable").getElementsByTagName("tbody")[0];
            document.getElementById("favcol").style.color="black";
            favItems=JSON.parse(localStorage.getItem("itemArray"));
            favItems.splice(favItems.indexOf($scope.symbol),1);
            table.deleteRow(i-1);
              localStorage.setItem("itemArray",JSON.stringify(favItems));
            }
            console.log($scope.isCollapsed);
         }
      $scope.news=function(text){
          $http.get("http://surya-env.us-east-2.elasticbeanstalk.com/news/"+text).success(function(response){
           var myData=(response);
           var channel=myData["rss"]["channel"];
           var items=channel.item;
           var feed=[];
           var ncount=0,i=0;
           var newslink="https://seekingalpha.com/symbol/"+text+"/news?source=feed_symbol_"+text;
           while(ncount<5)
           {
             if(items[i].link==newslink)
               i++;
             else{
                 feed.push(items[i]);
                 ncount++;
                 i++;
             }
           }
            keys=Object.keys(feed[0]);
              document.getElementById("ph1").innerHTML="<a href='"+feed[0].link+"' target='_blank' style='text-decoration:none'><h5 style='color:blue'>"+feed[0].title+"</h5></a>";
              document.getElementById("ph2").innerHTML="<a href='"+feed[1].link+"' target='_blank' style='text-decoration:none'><h5 style='color:blue'>"+feed[1].title+"</h5></a>";
              document.getElementById("ph3").innerHTML="<a href='"+feed[2].link+"' target='_blank' style='text-decoration:none'><h5 style='color:blue'>"+feed[2].title+"</h5></a>";
              document.getElementById("ph4").innerHTML="<a href='"+feed[3].link+"' target='_blank' style='text-decoration:none'><h5 style='color:blue'>"+feed[3].title+"</h5></a>";
              document.getElementById("ph5").innerHTML="<a href='"+feed[4].link+"' target='_blank' style='text-decoration:none'><h5 style='color:blue'>"+feed[4].title+"</h5></a>";
              document.getElementById("pb1").innerHTML="<p><b>Author:"+feed[0][keys[4]]+"<br>Date:"+feed[0][keys[3]]+"</b></p>";
              document.getElementById("pb2").innerHTML="<p><b>Author:"+feed[1][keys[4]]+"<br>Date:"+feed[0][keys[3]]+"</b></p>";
              document.getElementById("pb3").innerHTML="<p><b>Author:"+feed[2][keys[4]]+"<br>Date:"+feed[0][keys[3]]+"</b></p>";
              document.getElementById("pb4").innerHTML="<p><b>Author:"+feed[3][keys[4]]+"<br>Date:"+feed[0][keys[3]]+"</b></p>";
              document.getElementById("pb5").innerHTML="<p><b>Author:"+feed[4][keys[4]]+"<br>Date:"+feed[0][keys[3]]+"</b></p>";
           console.log(feed);
           console.log(channel.item);
           console.log(myData);
          });
      };
      $scope.historical=function(text){
      var myData=$scope.Price;
      var close=[];
      var data=[];
      var dates=[];
      var y,m,t;
      var keys=Object.keys(myData);
          console.log(keys);
          var timekeys=Object.keys(myData[keys[1]]);
          var datakeys=Object.keys(myData[keys[1]][timekeys[0]]);
          angular.forEach(myData[keys[1]],function(series){
           close.push(parseFloat(series[datakeys[3]]));
          });
          var arr=timekeys[0].split("-");
          y=arr[0];m=arr[1];d=arr[2];
          angular.forEach(timekeys,function(data){
           ymt=data.split("-");
           dates.push(Date.UTC(ymt[0],ymt[1]-1,ymt[2]));
          });
          console.log(dates);
          console.log(close);
          for(var i=0;i<dates.length;i++)
          {
              var temp=[];
              temp.push(dates[i]);
              temp.push(close[i]);
              data.push(temp);
              temp=[];
          }
          console.log(data);
          data.sort(function(a,b){
          return a[0] - b[0];
         });
         console.log("Stock charts");
         var chart = Highcharts.stockChart('hstock', {
  
          chart: {
              height: 400
          },
  
          title: {
              text: text+' '+'Stock Value'
          },
  
          subtitle: {
              text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank" >Source:Alpha Vantage</a>'
          },
  
          rangeSelector: {
               buttons: [{
          type: 'week',
          count: 1,
          text: '1w',
        },{
          type: 'month',
          count: 1,
          text: '1m',
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        }, {
          type: 'ytd',
          text: 'YTD'
        }, {
          type: 'year',
          count: 1,
          text: '1y'
        }, {
          type: 'all',
          text: 'All'
        }],
              selected: 0
          },
  
          series: [{
              name: text+'Stock Price',
              data: data,
              type: 'area',
              threshold: null,
              tooltip: {
                  valueDecimals: 2
              }
          }],
  
          responsive: {
              rules: [{
                  condition: {
                      maxWidth: 500
                  },
                  chartOptions: {
                      chart: {
                          height: 300
                      },
                      subtitle: {
                          text: null
                      },
                      navigator: {
                          enabled: false
                      }
                  }
              }]
          }
      });
  
      };
      $scope.price = function(text) {
        console.log(text+".price");
         
          $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/'+text).success(function(response){
              var dates=[];
          var y,m,t;
          var close=[];
          var volume=[];
          var data=[];
          var data2=[];
          var myData=response;
          var keys=Object.keys(myData);
          console.log(keys);
          var timekeys=Object.keys(myData[keys[1]]);
          var datakeys=Object.keys(myData[keys[1]][timekeys[0]]);
          angular.forEach(myData[keys[1]],function(series){
           close.push(parseFloat(series[datakeys[3]]));
           volume.push(parseFloat(series[datakeys[4]]));
          });
          var arr=timekeys[0].split("-");
          y=arr[0];m=arr[1];d=arr[2];
          angular.forEach(timekeys,function(data){
           ymt=data.split("-");
           dates.push(Date.UTC(ymt[0],ymt[1]-1,ymt[2]));
          });
          console.log(dates);
          console.log(close);
          for(var i=0;i<120;i++)
          {
              var temp=[];
              var temp2=[];
              temp.push(dates[i]);
              temp.push(close[i]);
              temp2.push(dates[i]);
              temp2.push(volume[i]);
              data.push(temp);
              data2.push(temp2);
              temp=[];
          }
          console.log(data);
          console.log(data2);
   var name2=text+" Volume";
   var date="Stock Price("+y+"-"+m+"-"+d+")";
  data2.sort(function(a,b){
      return a[0] - b[0];
  });
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  var min = Math.min.apply(null,close),
   max = Math.max.apply(null, close);
  var minV=Math.min.apply(null,volume),
   maxV = Math.max.apply(null, volume);
   Highcharts.chart('Price', {
          chart: {
        type:'line',
        zoomType: 'x'
          },
          title: {
              text: date
          },
          subtitle: {
              text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank" >Source:Alpha Vantage</a>'
          },
          xAxis: {
        
              type: 'datetime',
        "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
          },
          yAxis: [{
              title: {
                  text: 'Stock Price'
              },
        tickInterval:5,
        min:min-10,
        max:max+10
          },
      {
              title: {
                  text: 'Volume'
              },
        tickInterval:20000000,
        opposite:true
        
          }],
         legend: {
          itemDistance:50
       },
          plotOptions: {
              area: {
                  fillColor: {
                      linearGradient: {
                          x1: 0,
                          y1: 0,
                          x2: 0,
                          y2: 0
                      },
                      stops: [
                          [0, 'rgb(132, 112, 255)'],
                          [1, 'rgb(132, 112, 255)']
                      ]
                  },
                  marker: {
                      radius: 3
    
                  },
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 1
                      }
                  },
                  threshold: null
              },
         column: {
          pointWidth:1.5,
                  pointPadding: 1,
                  borderWidth: 0,
                  stacking: "normal",
              }
          },
  
          series: [{
        yAxis:0,
              type: 'area',
        color:'#0000FF',
        marker:{radius:1},
        lineColor:'#0000FF',
        name: text,
              data: data
          },{
        yAxis:1,
              type: 'column',
              name: name2,
              data: data2,
        color:'red'
          }]
      
      });
      $scope.charts=true;
     });
      };
      
      $scope.sma = function(text) {
       
        $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/SMA/'+text).success(function(response){
          var myData = (response);
          console.log(myData);
      var keys=(Object.keys(myData));
  console.log(Object.keys(myData[keys[1]]));
  var temp=myData[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(myData[keys[1]][dates[i]].SMA);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  
  data=date.zip(values);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('SMA', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text:'Simple Moving Average(SMA)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'SMA'
          }
      },
    legend: {
          itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text,
      type:'line',
          data: data,
      marker:{radius:1}
      }]
   });
     
      });
      
  }
  
    $scope.ema = function(text) {
        $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/EMA/'+text).success(function(response){
          var myData = (response);
          console.log(myData);
      var keys=(Object.keys(myData));
  console.log(Object.keys(myData[keys[1]]));
  var temp=myData[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(myData[keys[1]][dates[i]].EMA);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  
  data=date.zip(values);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('EMA', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text:'Exponential Moving Average(EMA)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'EMA'
          }
      },
    legend: {
          itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text,
      type:'line',
          data: data,
      marker:{radius:1}
      }]
   });
     
      });
    };
    $scope.stoch = function(text) {
      $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/STOCH/'+text).success(function(response){
        jsonObj = response;
      var keys=(Object.keys(jsonObj));
  console.log(Object.keys(jsonObj[keys[1]]));
  var temp=jsonObj[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var values2=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(jsonObj[keys[1]][dates[i]].SlowK);
  values2[i]=parseFloat(jsonObj[keys[1]][dates[i]].SlowD);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  data=date.zip(values);data2=date.zip(values2);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  data2.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('STOCH', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text: 'Stochastic Oscillator(STOCH)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'STOCH'
          }
      },
    legend: {
         itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text+'SlowK',
      type:'line',
      marker:{radius:1},
          data: data
      },{
          name: text+'SlowD',
      type:'line',
      color:'red',
      marker:{radius:1},
          data: data2
      }]
   });
   }); 
   };
   $scope.rsi = function(text) {
        $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/RSI/'+text).success(function(response){
          var myData = (response);
          console.log(myData);
      var keys=(Object.keys(myData));
  console.log(Object.keys(myData[keys[1]]));
  var temp=myData[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(myData[keys[1]][dates[i]].RSI);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  
  data=date.zip(values);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('RSI', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text:'Relative Strength Index(RSI)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'RSI'
          }
      },
    legend: {
          itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text,
      type:'line',
          data: data,
      marker:{radius:1}
      }]
   });
     
      });
    };
    $scope.adx = function(text) {
        $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/ADX/'+text).success(function(response){
          var myData = (response);
          console.log(myData);
      var keys=(Object.keys(myData));
  console.log(Object.keys(myData[keys[1]]));
  var temp=myData[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(myData[keys[1]][dates[i]].ADX);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  
  data=date.zip(values);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('ADX', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text:'Average Directional Movement Index (ADX)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'ADX',
              zoomtype: 'x'
          }
      },
    legend: {
          itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text,
      type:'line',
          data: data,
      marker:{radius:1}
      }]
   });
     
      });
    };
    $scope.cci = function(text) {
        $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/CCI/'+text).success(function(response){
          var myData = (response);
          console.log(myData);
      var keys=(Object.keys(myData));
  console.log(Object.keys(myData[keys[1]]));
  var temp=myData[keys[1]];
  var dates=Object.keys(temp);
  var values=[];
  var date=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(myData[keys[1]][dates[i]].CCI);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  
  data=date.zip(values);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('CCI', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text:'Commodity Channel Index (CCI)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'CCI'
          }
      },
    legend: {
          itemDistance:50
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text,
      type:'line',
          data: data,
      marker:{radius:1}
      }]
   });
     
      });
    };
    $scope.bbands = function(text) {
      $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/BBANDS/'+text).success(function(response){
        jsonObj =  response;
      var keys=(Object.keys(jsonObj));
       
    var date=[];  
  console.log(Object.keys(jsonObj[keys[1]]));
  var temp=jsonObj[keys[1]];
  var dates=Object.keys(temp);
  var keyval=Array();
  keyval=(Object.keys(jsonObj[keys[1]][dates[0]]));
  console.log(jsonObj[keys[1]][dates[0]]);
  var values=[];
  var values2=[];
  var values3=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[0]]);
  values2[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[1]]);
  values3[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[2]]);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  data=date.zip(values);data2=date.zip(values2);data3=date.zip(values3);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  data2.sort(function(a,b){
      return a[0] - b[0];
  });
  data3.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('BBANDS', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text: 'Bollinger Bands(BBANDS)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'BBANDS'
          }
      },
    legend: {
          itemDistance:50
  
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text+keyval[0],
      type:'line',
      marker:{radius:1},
          data: data
      },{
          name: text+keyval[1],
      type:'line',
      color:'red',
      marker:{radius:1},
          data: data2
      },{
          name: text+keyval[2],
      type:'line',
      color:'green',
      marker:{radius:1},
          data: data3
      }]
   });
  });
   };
    $scope.macd = function(text) {
      $http.get('http://surya-env.us-east-2.elasticbeanstalk.com/MACD/'+text).success(function(response){
        jsonObj =  response;
      var keys=(Object.keys(jsonObj));
       
    var date=[];  
  console.log(Object.keys(jsonObj[keys[1]]));
  var temp=jsonObj[keys[1]];
  var dates=Object.keys(temp);
  var keyval=Array();
  keyval=(Object.keys(jsonObj[keys[1]][dates[0]]));
  console.log(jsonObj[keys[1]][dates[0]]);
  var values=[];
  var values2=[];
  var values3=[];
  for( i=0;i<=120;i++){
  values[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[0]]);
  values2[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[1]]);
  values3[i]=parseFloat(jsonObj[keys[1]][dates[i]][keyval[2]]);
  date[i]=dates[i];
  }
  console.log(values);
  console.log(values.length+""+dates.length);
  for( i=0;i<=120;i++)
  {
  var t=new Date(date[i]);
  date[i]=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());	
  }
  Array.prototype.zip = function (arr) {
      return this.map(function (e, i) {
          return [e, arr[i]];
      })
  };
  data=date.zip(values);data2=date.zip(values2);data3=date.zip(values3);
  data.sort(function(a,b){
      return a[0] - b[0];
  });
  data2.sort(function(a,b){
      return a[0] - b[0];
  });
  data3.sort(function(a,b){
      return a[0] - b[0];
  });
  console.log(data);
  
  Highcharts.chart('MACD', {
      chart: {
          type: 'line',
          zoomType: 'x'
      },
      title: {
          text: 'Moving Average Convergence/Divergence(MACD)'
      },
      subtitle: {
          text: '<a href="https://www.alphavantage.co/" style="color:blue;" target="_blank">Source:Alpha Vantage</a>'
      },
      xAxis: {
          type: 'datetime',
      "dateTimeLabelFormats": {
          "millisecond": "%H:%M:%S.%L",
          "second": "%H:%M:%S",
          "minute": "%H:%M",
          "hour": "%H:%M",
          "day": "%Y-%m-%d",
          "week": "%m/%d",
          "month": "%Y/%m",
          "year": "%Y"
        },
        tickInterval:24*3600*1000
      },
      yAxis: {
          title: {
              text: 'MACD'
          }
      },
    legend: {
          itemDistance:50
  
       },
      plotOptions: {
        line: {
                  lineWidth: 3,
                  states: {
                      hover: {
                          lineWidth: 3
                      }
                  },
                  threshold: null
              }
      },
      series: [{
          name: text+keyval[0],
      type:'line',
      marker:{radius:1},
          data: data
      },{
          name: text+keyval[1],
      type:'line',
      color:'red',
      marker:{radius:1},
          data: data2
      },{
          name: text+keyval[2],
      type:'line',
      color:'green',
      marker:{radius:1},
          data: data3
      }]
   });
  });
   };
   //$scope.charts=true;
  //end
  });
  app.controller('autoCompleteController', autoCompleteController);
    function autoCompleteController ( $log,$http){
       var self = this;
       self.simulateQuery = false;
       self.isDisabled    = false;
       var allStates="";
       self.querySearch   = querySearch;
       self.selectedItemChange = selectedItemChange;
       self.searchTextChange   = searchTextChange;
       self.symbol=symbol;
       //self.display=display;
       function querySearch (query) {
         var list=[];
         var url="";
        if(this.searchText==null)
        url='';
        else
        url='http://surya-env.us-east-2.elasticbeanstalk.com/auto/'+this.searchText;
        $http.get(url).success(function(response){
           myData = (response);
          console.log(myData);
          angular.forEach (myData, function(data){
             //$scope.countryList.push();
             list.push(data/*+"-"+data.Name+"("+data.Exchange+")"*/);
            });
            console.log(list);
            
          });
          return list;
       }
       function searchTextChange(text) {
          $log.info('Text changed to ' + text);
       }
       function selectedItemChange(item) {
          $log.info('Item changed to ' + JSON.stringify(item));
       }
       function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
             return (state.value.indexOf(lowercaseQuery) === 0);
          };
       }
       function symbol(){
           self.searchText="";
       }
       
  } 
  
