
const ModelWindow = function(options) {
  var layout = '<div  class="h5 window">\
                  <div class="window-caption">\
                      <span class="window-caption-icon">\
                          <span></span>\
                      </span>\
                      <span class="window-caption-title">\
                          <span></span>\
                      </span>\
                      <span class="btn-close"></span>\
  \
                  </div>\
                  <div class="window-content" ></div>\
              </div>'
  var model = '<div class="windowModalDiv" style="width:100%;height:100%;background-color:#000;position:absolute;top:0;left:0;z-index:10049;opacity:0;"/>';

  var _this = this,
    _options = options || {},
    _element = $(layout)[0],
    _captionElement = _element.querySelector(".window-caption"),
    _iconElement = _element.querySelector(".window-caption-icon"),
    _titleElement = _element.querySelector(".window-caption-title"),
    _closeElement = _element.querySelector(".btn-close"),
    _contentElement = _element.querySelector(".window-content"),
    _modalDiv = $(model)[0];
  if (_options.content) {
    _contentElement.appendChild(_options.content);
  }

  if (_options.closeCss) {
    _closeElement.classList.add(_options.closeCss);
  }

  if (!_options.icon) {
    _iconElement.classList.add("hidden");
  }
  if (_options.iconCss) {
    _iconElement.querySelector("span").classList.add(_options.iconCss);
  }
  if (_options.title) {
    _titleElement.querySelector("span").innerText = _options.title;
  }
  if (_options.captionCss) {
    _captionElement.classList.add(_options.captionCss);
  }
  _this.updateContent = function(newContent) {
    _contentElement = "";
    _contentElement = _element.querySelector(".window-content");
    _contentElement.appendChild(newContent);
  }

  _this.show = function() {
    document.body.appendChild(_element);
    document.body.appendChild(_modalDiv);
    var w = $(_element).width(),
      h = $(_element).height(),
      bw = $(window).width(),
      bh = $(window).height();

    $(_element).css({
      left: (bw - w) / 2 + 'px',
      top: (bh - h) / 2 + 'px'
    });
    _translate = [0, 0];
    _element.style['transform'] = "translate(" + _translate[0] + "px, " + _translate[1] + "px)";
  };

  _this.hide = function() {
    document.body.removeChild(_element);
    document.body.removeChild(_modalDiv);
  }

  _closeElement.addEventListener("click", function() {
    _this.hide();
  });


  _captionElement.addEventListener("mousedown", onCaptionMouseDown);

  var _mousedown = false,
    _downposition = [0, 0],
    _translate = [0, 0],
    _lastDiff = [0, 0],
    _oldSelectStartProc = null;


  function onSelectStart(e) {
    return false;
  }

  function onCaptionMouseDown(e) {
    _mousedown = true;
    _downposition = [e.pageX, e.pageY];
    _lastDiff = [0, 0];
    _captionElement.removeEventListener("mousedown", onCaptionMouseDown);
    window.addEventListener("mousemove", onCaptionMouseMove);
    window.addEventListener("mouseup", onCaptionMouseup);
    _oldSelectStartProc = document.onselectstart;
    document.onselectstart = onSelectStart;
  }
  function onCaptionMouseMove(e) {
    _lastDiff = [e.pageX - _downposition[0], e.pageY - _downposition[1]];
    _element.style['transform'] = "translate(" + (_translate[0] + _lastDiff[0]) + "px, " + (_translate[1] + _lastDiff[1]) + "px)";
  }

  function onCaptionMouseup(e) {
    _mousedown = false;
    _translate[0] = _translate[0] + _lastDiff[0];
    _translate[1] = _translate[1] + _lastDiff[1];
    _captionElement.addEventListener("mousedown", onCaptionMouseDown);
    window.removeEventListener("mousemove", onCaptionMouseMove);
    window.removeEventListener("mouseup", onCaptionMouseup);
    document.onselectstart = _oldSelectStartProc;
  }
}
