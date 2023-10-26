// 调整盒子大小
function resize(e) {
  e.style.width = document.documentElement.clientWidth  + 'px';
  e.style.height = document.documentElement.clientHeight  + 'px';
  // console.log(e.style.width)
  // console.log(e.style.height)
}


// 监听页面大小发生变化
window.addEventListener('resize', function() {
  let visualization=document.querySelector('.visualization')
  resize(visualization)
  let worldMap=document.querySelector('.worldMap')
  resize(worldMap)
  
})


// 对读取的json数据进行操作
function ReadJsonData(file_path){
  let jsonData=[];
  $.ajax({
    url: file_path,
    type: "GET",
    dataType: "json",
    async: false,  //设置为同步
    success: function (data) {
      jsonData=data
      // console.log(data)
    },
    //请求失败，包含具体的错误信息
    error : function(e){
      console.log(e.status);
      // console.log(e.responseText);
    }

  });
  return jsonData
}

let allData=ReadJsonData("../static/allData.json")
// console.log(allData[0])
// console.log(allData[9])
// for(let i=0;i<allData[9].value.length;i++){
//   if(allData[9].value[i].value[9]=='CHN'){
//     console.log(allData[9].value[i])
//   }
// }


// console.log('这是坐标号码')
// console.log(allData[0].value[0].name)
// console.log('依次是纬度，经度，样本为该坐标的第几个，坐标样本总数，样本的年代跨度，样本编号，早年，晚年，洞名，所在国家，DOI号')
// console.log(allData[0].value[0].value)


//旭日图准备数据集
let sunburstData=[
  {
    name:'Quaternary',
    // value:allData[9]['value'].length,
    value:16.5,
    Time:'present-2.58',
    itemStyle:{color:'#FFF79A'},
    children:[
      {name:'Holocene',
      value:7.5,
      Time:'present-0.0117',
      // value:allData[7]['value'].length,
      itemStyle:{color:'#FEE5CA'},
      children:[
        {
          name:'Meghalayan',
          value:2,
          Time:'present-0.0042',
          // value:allData[0]['value'].length,
          itemStyle:{color:'#FDE8E7'},
        },
        {
          name:'Northgrippian',
          value:2.5,
          Time:'0.0042-0.0082',
          // value:allData[1]['value'].length,
          itemStyle:{color:'#FDE7DC'},
        },
        {
          name:'Greenlandian',
          value:3,
          Time:'0.0082-0.0117',
          // value:allData[2]['value'].length,
          itemStyle:{color:'#FEE6D3'},
        }
      ]
      },
     {
      name:'Pleistocene',
      value:9,
      Time:'0.0117-2.58',
      // value:allData[8]['value'].length,
      itemStyle:{color:'#FFEDA9'},
      children:[
        {
          name:'Upper',
          value:1,
          Time:'0.0117-0.129',
          // value:allData[3]['value'].length,
          itemStyle:{color:'#FEF1D9'},
        },
        {
          name:'Chibanian',
          value:2,
          Time:'0.129-0.774',
          // value:allData[4]['value'].length,
          itemStyle:{color:'#FEF0D0'},
        },
        {
          name:'Calabrian',
          value:3,
          Time:'0.774-1.80',
          // value:allData[5]['value'].length,
          itemStyle:{color:'#FEF0C6'},
        },
        {
          name:'Gelasian',
          value:3,
          Time:'1.80-2.58',
          // value:allData[6]['value'].length,
          itemStyle:{color:'#FEEFBC'},
        }
      ]
    }]
}]

// 旭日图开始画图 sunburstMap
var sunburstMap=echarts.init(document.querySelector('.sunburstContent'))

var drawSunburst={
  series: {
    type: 'sunburst',
    data: sunburstData,
    radius: [0, '95%'],
    // sort: undefined,
    emphasis: {
      focus: 'ancestor'
    },
    
    levels: [
      {},
      {
        r0: '0',
        r: '25%',
        itemStyle: {
          borderWidth: 2
        },
        label: {
          rotate: 'tangential',
          padding: 3,
          // silent:true
        }
      },
      {
        r0: '25%',
        r: '50%',
        label: {
          padding: 3,
          // position: 'inside',
          // align: 'right'
          rotate: 'tangential'
        }
      },
      {
        r0: '50%',
        r: '90%',
        label: {
          // position: 'inside',
          padding: 3,
          // silent: false
          rotate: 'tangential'
        },
        itemStyle: {
          borderWidth: 3
        }
      }
    ]
  },
  tooltip: {
    // trigger: 'item',
    
    formatter: function(params) {
      let tip=params.name +'<br>'+'Time : '+params.data.Time+'<br>';
      return tip;
    },
    backgroundColor:'lightgrey',

  },

}
sunburstMap.setOption(drawSunburst)


//旭日图弹窗
function popBox(){
  let sunburstChoose=document.querySelector('.sunburstChoose')
  sunburstChoose.style.cssText+=
  "background:rgb(241,243,244,0.5);width:80%;height:80%;position:fixed;top:0;right:0;left:0;bottom:0;margin:auto;border-radius:0;"

  let p=document.querySelector('.visualization .showChooser .sunburstChoose img')
  p.style.display='block'

  let sunburstContent=document.querySelector('.sunburstContent')
  sunburstContent.style.width=sunburstChoose.clientHeight - 20 + 'px'
  sunburstContent.style.height=sunburstChoose.clientHeight - 20 + 'px'
  sunburstContent.style.cssText+="top:0;bottom:0;left:0;right:0;margin:auto;"
  sunburstMap.resize({
    width:sunburstChoose.clientHeight-20,
    height:sunburstChoose.clientHeight-20
  })

  let popPlayer=document.querySelector('.popPlayer')
  popPlayer.style.display='none'
}

//关闭弹窗
function popClose(){
  let sunburstChoose=document.querySelector('.sunburstChoose')
  sunburstChoose.style.cssText=
  "width:300px;height:300px;border-radius: 150px;position:relative;"

  let p=document.querySelector('.visualization .showChooser .sunburstChoose img')
  p.style.display='none'

  let sunburstContent=document.querySelector('.sunburstContent')
  // console.log(sunburstContent.style.cssText)
  sunburstContent.style.cssText=
  "width:300px;height:300px;position:absolute;"
  // console.log(sunburstContent.style.cssText)
  sunburstMap.resize({
    width:sunburstChoose.clientHeight-20,
    height:sunburstChoose.clientHeight-20
  })

  let popPlayer=document.querySelector('.popPlayer')
  popPlayer.style.display='flex'

}

//隐藏旭日图选择器
function popHide(){
  let sunburstChoose=document.querySelector('.sunburstChoose')
  let popPlayer=document.querySelector('.popPlayer')
  sunburstChoose.style.display='none'
  popPlayer.style.display='none'
}

//散点地图开始画图
var worldMap=echarts.init(document.querySelector('.worldMap'))

var drawWorld={
  tooltip: {
    // trigger: 'item',
    formatter: function(params) {
      caveName=params.value[8]
      locationGeo='['+params.value[0]+','+params.value[1]+']'
      tip=caveName +'<br>'+locationGeo+'<br>';
      return tip;
    },
    backgroundColor:function(params){
      // console.log(params)
    }
  
  },
  bmap: {
    center: [104.114129, 37.550339],
    zoom: 2,
    roam: true,
    mapStyle: {
      styleJson: [
        {
          featureType: 'water',
          elementType: 'all',
          stylers: {
            // color: '#d1d1d1'
            color:'#A3CCFF'
          }
        },
        {
          featureType: 'land',
          elementType: 'all',
          stylers: {
            // color: '#f3f3f3'
            color:'#FCF9F2'
          }
        },
        {
          featureType: 'railway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'highway',
          elementType: 'all',
          stylers: {
            color: '#fdfdfd'
          }
        },
        {
          featureType: 'highway',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry',
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'geometry.fill',
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'green',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'subway',
          elementType: 'all',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'manmade',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'local',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'arterial',
          elementType: 'labels',
          stylers: {
            visibility: 'off'
          }
        },
        {
          featureType: 'boundary',
          elementType: 'all',  //geometry.fill all
          stylers: {
            color: '#fefefe'
          }
        },
        {
          featureType: 'building',
          elementType: 'all',
          stylers: {
            color: '#d1d1d1'
          }
        },
        {
          featureType: 'label',
          elementType: 'labels.text.fill',
          stylers: {
            color: '#999999'
          }
        }
      ]
    }
  },
  series: [
    {
      // name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'bmap',
      color:'royalblue',
      data: allData[9]['value'],
      symbolSize: function (val) {
        return val[3] * 5;
      },
      encode: {
        value: 2
      },
      label: {
        formatter: '{b}',
        position: 'right',
        show: false,
      },
      emphasis: {
        label: {
          show: false
        }
      },
    },
    
  ]
}
worldMap.setOption(drawWorld)

//散点信息表弹窗
function showScatterMessage(collectedData){
  let detailMes=document.querySelector('.visualization .detailMes')
  let tcontent=document.querySelector('.visualization .detailMes .tcontent')

  //将列表数据集整理成html格式
  var str=''
  for(var i=0;i<collectedData.length;i++){
    str+='<tr>'
    //第一个单元格是序号
    str+=`<td>${i+1}</td>`
    // for(var j=5;j<collectedData[i].value.length;j++){
    //   str+=`<td>${collectedData[i].value[j]}</td>`
    // }
    // 对最后一列DOI修改,a标签
    for(var j=5;j<collectedData[i].value.length-1;j++){
      str+=`<td>${collectedData[i].value[j]}</td>`
    }
    str+=`<td><a href="https://dx.doi.org/${collectedData[i].value[j]}">${collectedData[i].value[j]}</a></td>`
    str+=`<td><img class="openButton" src="../images/img_chart.svg" alt="图表" data-id="${collectedData[i].value[5]}"></td>` // 添加查看图表按钮，并为按钮添加data-id属性保存ID值
    str+='</tr>'
  }
  tcontent.innerHTML=str
  detailMes.style.display='block'

  // 获取按钮和弹窗元素
  var openButton = document.querySelectorAll('.openButton');
  var chartContainer = document.getElementById('chartContainer');
  var closeButton = document.getElementById('closeButton');


  // 绑定按钮点击事件
  openButton.forEach(btn => {
    btn.addEventListener('click', function(){
      var id = this.getAttribute('data-id');
      var csvUrl = '../chartDatas/' + id + '.csv';
      
      $.ajax({
          url: csvUrl,
          dataType: 'text',
          success: function(csvData) {
              var parsedData = Papa.parse(csvData, { header: true });
              var xTitle = parsedData.meta.fields[0];
              var yTitles = Object.keys(parsedData.data[0]).slice(1);
              var data_X = parsedData.data.map(row => row[xTitle]);
              var data_Y = {};
   
              yTitles.forEach(title => {
                data_Y[title] = parsedData.data.map(row => Number(row[title]));
              });
              chartContainer.style.display = 'block';
              renderChart(data_X, data_Y, xTitle, yTitles);

          },
          error: function() {
            alert("暂无数据")
          }
      });
    });
  });

  // 绑定关闭按钮点击事件
  closeButton.addEventListener('click', () => {
    chartContainer.style.display = 'none';
  });

}



function renderChart(data_X, data_Y, xTitle, yTitles) {
  var chartDom = document.getElementById('chart');
  var myChart = echarts.init(chartDom);
  myChart.clear();

  var option = {
     title: {
       text: 'LineChart',
     },
     tooltip: {
       trigger: 'axis'
     },
     toolbox: {
      feature: {
        saveAsImage: {}, //导出图片
        dataView:{}, //数据视图
        dataZoom: {}, //区域缩放
      }


     },
     legend: {
       data: yTitles,
       type: 'scroll',
       selected: yTitles.reduce((obj, title, index) => {
        obj[title] = index === 0; // 将第一个曲线设置为选中状态
        return obj;
      }, {})
     },
     xAxis: {
       type: 'category',
       data: data_X,
       name: xTitle,// 设置x轴标签
       nameRotate: '90', 
       nameTextStyle:{
        fontSize:12,// 字体大小
        fontWeight: 400, // 字体粗细
       }
     },
     yAxis: {
       type: 'value',
     },
     series: yTitles.map(title => ({
       name: title,
       data: data_Y[title],
       type: 'line'
     }))
  };
  myChart.setOption(option);
  myChart.resize();

  // 监听窗口大小变化事件
  window.addEventListener("resize", function() {
    myChart.resize();
  });
}




//关闭散点信息表
function closeScatterMessage(){
  let detailMes=document.querySelector('.visualization .detailMes')
  detailMes.style.display='none'
}

//按照地理坐标编号整理数据集,返回数据集中所有此地理坐标的样本集合
function ToGeoSet(GeoID,BigSet){
  let SmallSet=[]
  for(let i=0;i<BigSet.length;i++){
    if (BigSet[i].name==GeoID){
      SmallSet.push(BigSet[i])
    }
  }
  return SmallSet
}



//给旭日图添加点击事件，控制散点图形成变化
sunburstMap.on('click',function(params){

  // console.log(params.data)
  for(let i of allData){
    if(params.data.name==i.name){
      drawWorld.series[0].data=i.value
      if (params.data.name=='Quaternary'){
        drawWorld.series[0].color='#FFF79A'
      }
      if (params.data.name=='Holocene'){
        drawWorld.series[0].color='#FEE5CA'
      }
      if (params.data.name=='Meghalayan'){
        drawWorld.series[0].color='#FDE8E7'
      }
      if (params.data.name=='Northgrippian'){
        drawWorld.series[0].color='#FDE7DC'
      }
      if (params.data.name=='Greenlandian'){
        drawWorld.series[0].color='#FEE6D3'
      }
      if (params.data.name=='Pleistocene'){
        drawWorld.series[0].color='#FFEDA9'
      }
      if (params.data.name=='Upper'){
        drawWorld.series[0].color='#FEF1D9'
      }
      if (params.data.name=='Chibanian'){
        drawWorld.series[0].color='#FEF0D0'
      }
      if (params.data.name=='Calabrian'){
        drawWorld.series[0].color='#FEF0C6'
      }
      if (params.data.name=='Gelasian'){
        drawWorld.series[0].color='#FEEFBC'
      }

      break
    }
  }
  //在旭日图的控制下重新画散点图

  worldMap.setOption(drawWorld)
})



worldMap.on('click',function(params){
  let geoid=params.name
  let bigset=allData[9].value
  collectedset=ToGeoSet(geoid,bigset)
  showScatterMessage(collectedset)
})




//旭日图弹窗点击事件
let showPOP=document.querySelector('.visualization .showChooser .popPlayer .show')
let closePOP=document.querySelector('.visualization .showChooser .popPlayer .close')
let p=document.querySelector('.visualization .showChooser .sunburstChoose img')

showPOP.addEventListener('click',popBox)
closePOP.addEventListener('click',popHide)
p.addEventListener('click',popClose)


//详细信息弹窗点击事件
let closePopMes=document.querySelector('.visualization .detailMes .mesHead img')

closePopMes.addEventListener('click',closeScatterMessage)


// detailMes可随鼠标拖动
var detailMes = document.querySelector('.detailMes');
var mesHead = document.querySelector('.mesHead');

var mouseStartX = 0;
var mouseStartY = 0;

// 绑定mousedown事件，当按下鼠标时触发
mesHead.addEventListener('mousedown', function(e) {

  //计算出鼠标的位置与元素位置的差值。
  mouseStartX = e.clientX - detailMes.offsetLeft;
  mouseStartY = e.clientY - detailMes.offsetTop;

  // 绑定mousemove事件，当鼠标移动时触发
  document.addEventListener('mousemove', dragElement);
});

// 绑定mouseup事件，当释放鼠标按钮时触发
document.addEventListener('mouseup', function() {
  // 解除鼠标移动事件绑定
  document.removeEventListener('mousemove', dragElement);
  document.removeEventListener('mousemove', dragElement_1);
});

// 鼠标拖动函数
function dragElement(e) {
  // 计算鼠标现在的位置
  var deltaX = e.clientX - mouseStartX;
  var deltaY = e.clientY - mouseStartY;

  // 更新detailMes位置
  detailMes.style.left = deltaX + 'px';
  detailMes.style.top = deltaY + 'px';
}



//chartContainer可随鼠标拖动
var chartContainer = document.getElementById('chartContainer');
var chartHeader = document.getElementById('chartHeader');

var mouseStartX = 0;
var mouseStartY = 0;

// 绑定mousedown事件，当按下鼠标时触发
chartHeader.addEventListener('mousedown', function(e) {

  //计算出鼠标的位置与元素位置的差值。
  mouseStartX = e.clientX - chartContainer.offsetLeft;
  mouseStartY = e.clientY - chartContainer.offsetTop;

  // 绑定mousemove事件，当鼠标移动时触发
  document.addEventListener('mousemove', dragElement_1);
});


// 鼠标拖动函数
function dragElement_1(e) {
  // 计算鼠标现在的位置
  var deltaX = e.clientX - mouseStartX;
  var deltaY = e.clientY - mouseStartY;

  // 更新chartContainer位置
  chartContainer.style.left = deltaX + 'px';
  chartContainer.style.top = deltaY + 'px';
}
