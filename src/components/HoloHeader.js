import React from 'react'

class HoloHeader extends React.Component {


  componentDidMount () {
     let getBgUrl = (el) => {
        var bg = "";
        if (el.currentStyle) { // IE
            bg = el.currentStyle.backgroundImage;
        } else if (document.defaultView && document.defaultView.getComputedStyle) { // Firefox
            bg = document.defaultView.getComputedStyle(el, "").backgroundImage;
        } else { // try and get inline style
            bg = el.style.backgroundImage;
        }
        return bg.replace(/url\(['"]?(.*?)['"]?\)/i, "$1");
    }
    console.log('test');
    var holoImages = [];
    var holoLoaded = [];
    var holoElements = ['layer-01','layer-03','layer-04','layer-05','layer-06','layer-07','scanlines','holospinner-header'];
    var numHoloElements = holoElements.length;
    for (var i = 0; i < numHoloElements; i++) {
        holoImages[i] = document.createElement('img');
        holoImages[i].src = getBgUrl(document.querySelector("."+holoElements[i]));
        holoImages[i].onload = function() {
          holoLoaded.push(holoElements[i]);
          if (holoLoaded.length == holoElements.length) {

            document.querySelector('.js-loading').classList.remove('js-loading');
            setTimeout(function(){
              let element = document.getElementById('ky-load');
              element.parentNode.removeChild(element);
              console.log('test2');
            },1000)
          }
        }
    }
  }

  render() {
    return (
      <section className="holospinner-header js-loading">
        <div className="hh-content">
          <h1>Need A Developer?</h1>
          <div id="ky-load" className="loading-screen"><div className="holo-load"><div></div><div></div></div></div>
          <div className="holospinner-wrapper">
            <div className="holospinner">
              <div className="layer layer-01">&nbsp;</div>
              <div className="layer layer-02">&nbsp;</div>
              <div className="layer layer-03">&nbsp;</div>
              <div className="layer layer-04">&nbsp;</div>
              <div className="layer layer-05">&nbsp;</div>
              <div className="layer layer-06">&nbsp;</div>
              <div className="layer layer-07">
                <div className="scanlines">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default HoloHeader
