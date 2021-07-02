//Создание карты 2
var map02=L.map("map-02",{
    //crs: L.CRS.Simple,
    minZoom:-2,
    maxZoom:20,
    //maxBounds: [[-20,-20],[2832,5019]],
    //boxZoom:false,
});
var cartodbAttribution = '';
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: cartodbAttribution
}).addTo(map02);
//map02.setView([55.53251670538912,37.30442047119141], 10);//
map02.setView([59.894996, 29.717031], 16);//
map02.setZoom(16);

function getPopup(number){
    let info=gardenPlotInfo[number];
    let s='';
    switch(info.state){
        case "Продан":
        case "Забронирован":
        case "Свободен":
            s+="<h1 class='map-popup__header'>Участок №"+number+"</h1>"
            if(info.path2Image){
                s+="<img class='map-popup__image' src='"+info.path2Image+"'>"
            }
            s+="<p class='map-popup__state'>Статус: "+info.state+"</p>"+
            "<p class='map-popup__area'>Площадь (в сотках): "+info.area+"</p>"+
            "<p class='map-popup__desc'>Описание: "+info.description+"</p>";
            if((info.state!="Продан")&&(info.state!="Забронирован")&&(info.state!="Удален")&&(info.state!="Нет данных")){
                s+="<p class='map-popup__price'>Цена: "+info.price+"</p>"+
                "<button class='map-popup__get-book'>забронировать</button>";
            }
            break
        case "Не продаётся":
            s+="<h1 class='map-popup__header'>Вспомогательная территория</h1>"+
            "<p class='map-popup__desc'>Описание: "+info.description+"</p>";
            break
        case "Неизвестен":
            s+="<h1 class='map-popup__header'>Сторонняя территория</h1>"
            break
        case "Дорога":
            s+="<h1 class='map-popup__header'>Внутренняя дорога</h1>"
            break
        default:
            s+="<h1 class='map-popup__header'>Нет данных</h1>"
            break
    }
    return s;
};

$(function(){
    function geometryRender(geos){
        let latlng,polygon;
        //geoLayer.clearLayers();
        for(let geo in geos){
            let curGeo=geos[geo];
            let classN="garden-plot";
            latlng=curGeo.latlng;

            switch(curGeo.state){
                case "Свободен":
                	console.log('#'+geo);
    				var p=$('#'+geo)[0];
                	console.log(p);
                	$('#'+geo).addClass('garden-plot_free');
                	//document.querySelector('#'+geo).addClass('garden-plot_free');
                    polygon=L.polygon(latlng,{className:'garden-plot_free'}).addTo(map02);
                    break
                case "Забронирован":
                    polygon=L.polygon(latlng,{className:'garden-plot_booked'}).addTo(map02);
                    break
                case "Продан":
                    polygon=L.polygon(latlng,{className:'garden-plot_bought'}).addTo(map02);
                    break
                case "Не продаётся":
                    polygon=L.polygon(latlng,{className:'garden-plot_no-sale'}).addTo(map02);
                    break
                case "Неизвестен":
                    polygon=L.polygon(latlng,{className:'garden-plot_unknown'}).addTo(map02);
                    break
                case "Дорога":
                    polygon=L.polygon(latlng,{className:'garden-plot_road'}).addTo(map02);
                    break
                default:
                    //polygon=L.polygon(latlng,{className:'garden-plot'}).addTo(map01);
                    break
            }
            polygon.bindTooltip(getPopup(geo));
        }
    };

    geometryRender(gardenPlotInfo);

});

