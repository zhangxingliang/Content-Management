const app = new Vue({
  store,
  data: {
    folderBlockStatus: true,
    infoBlockStatus: true,
    userOperationStatus: false,
    sortByStatus: false,
    listSymbol: false,
    taskMonitorUrl: '',
    taskMonitorWindow: null,
    dragData: {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    },
    mousePosition: {
      x: 0,
      y: 0
    },
    userDept: [],
    isFocusTree: true,
    tempIndex: 0,
  },
  components: {
    'rdText': rdUI.rdText,
    'menu-ctrl': menu_ctrl,
    'tree-ctrl': tree_ctrl,
    'material-ctrl': material_ctrl,
    'nav-path-ctrl': nav_path_ctrl,
    'vue-nice-scrollbar': vueNiceScrollbar,
    'marker-ctrl': marker_ctrl,
    'tree-ctrl2': tree_ctrl2,
    'list-material-header-ctrl': list_material_header_ctrl,
    'list-material-ctrl': list_material_ctrl,
    'sv-marker-ctrl': sv_marker_ctrl,
    'user-tree-ctrl': user_tree_ctrl,
  },
  computed: {
    previewUrl() {
      return this.$store.state.previewUrl
    },
    propertyUrl() {
      return this.$store.state.propertyUrl
    },
    dragSymbol: {
      get() {
        return this.$store.state.dragSymbol
      },
      set(val) {
        this.$store.state.dragSymbol = val
      }
    },
    sortType: {
      get() {
        return this.$store.state.sortType
      },
      set(val) {
        this.$store.state.sortType = val
      }
    },
    sortSymbol: {
      get() {
        return this.$store.state.sortSymbol
      },
      set(val) {
        this.$store.state.sortSymbol = val
      }
    },
    typeSymbol: {
      get() {
        return this.$store.state.typeSymbol
      },
      set(val) {
        this.$store.state.typeSymbol = val
      }
    },
    selectedNode() {
      return this.$store.getters.selectedNode
    },
    selectedMaterial() {
      return this.$store.getters.selectedMaterial
    },
    dict() {
      return this.$store.state.dict
    },
    currentCtrl() {
      if (this.materials.length > 0 && this.materials[0].type === 'marker') {
        this.listSymbol = false;
        return 'marker-ctrl'
      } else if (this.listSymbol) {
        return 'list-material-ctrl'
      }
      return 'material-ctrl'
    },
    nodes() {
      return this.$store.getters.folderTree;
    },
    _materials() {
      var arr = (this.listSymbol ? this.listMaterials : this.materials).slice()
      /*arr.push({
        readyUpload: true,
        name: 123
      })*/
      return arr
    },
    materials() {
      return this.$store.getters.currentNode.children
      if (this.$store.getters.currentNode.guid === 1 || this.$store.getters.currentNode.guid === 2) {
        if (this.sortType === 'type') {
          return util.sortBy(this.$store.getters.currentNode.searchResult, this.sortType, this.typeSymbol)
        } else {
          return util.sortBy(this.$store.getters.currentNode.searchResult, this.sortType, this.sortSymbol)
        }
      } else if (this.$store.getters.currentNode.guid === -1) {
        if (this.sortType === 'type') {
          return util.sortBy(this.$store.getters.currentNode.favorites, this.sortType, this.typeSymbol)
        } else {
          return util.sortBy(this.$store.getters.currentNode.favorites, this.sortType, this.sortSymbol)
        }
      } else {
        if (this.sortType === 'type') {
          return util.sortBy(this.$store.getters.currentNode.children, this.sortType, this.typeSymbol)
        } else {
          return util.sortBy(this.$store.getters.currentNode.children, this.sortType, this.sortSymbol)
        }
      }
    },
    listMaterials() {
      if (this.$store.getters.currentNode.guid === 1 || this.$store.getters.currentNode.guid === 2) {
        return util.sortBy(this.$store.getters.currentNode.searchResult, this.$store.state.listOrder.type, this.$store.state.listOrder.symbol)
      } else if (this.$store.getters.currentNode.guid === -1) {
        return util.sortBy(this.$store.getters.currentNode.favorites, this.$store.state.listOrder.type, this.$store.state.listOrder.symbol)
      } else {
        return util.sortBy(this.$store.getters.currentNode.children, this.$store.state.listOrder.type, this.$store.state.listOrder.symbol)
      }
    },
    materialsCount() {
      return this.materials.length
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    resourceBlockStatus() {
      return this.$store.state.resourceBlockStatus
    },
    thumbPadding() {
      if (this.currentCtrl == 'material-ctrl') {
        return this.$store.state.thumbPadding
      } else {
        return 0
      }
    },
  },
  methods: {
    mlKeydown(event) {
      console.log(event);
    },
    switchListThumb(symbol) {
      if (this.materials.length > 0 && this.materials[0].type === 'marker') {
      } else {
        var _this = this
        this.listSymbol = symbol
      }
    },
    hideMenu() {
      this.userOperationStatus = this.sortByStatus = false
      this.$store.commit({
        type: types.SET_MENUSTATUS,
        data: {
          event: event,
          status: false
        }
      })
    },
    orderBy(type, symbol) {
      this.sortType = type
      if (symbol !== undefined) {
        this.sortSymbol = symbol
      } else {
        this.typeSymbol = !this.typeSymbol
      }
      this.$store.commit({
        type: types.SET_SIGNMATERIAL,
        data: 0
      })
    },
    logout() {
      this.userOperationStatus = false
      open(location, '_self').close()
    },
    refreshMaterial() {
      this.$store.dispatch({
        type: types.REFRESH_MATERIAL,
        source: this.$store.getters.currentNode
      }).then(() => {

      })
    },
    toggleFolderBlock() {
      this.folderBlockStatus = !this.folderBlockStatus
      Vue.nextTick(() => {
        this.$store.commit({
          type: types.SET_THUMBPADDING
        })
      })
    },
    dragStart(event) {
      if (event.which == 1) {
        this.mousePosition.x = event.x;
        this.mousePosition.y = event.y;
        this.mousePosition.scrollOffsetY = event.offsetY - event.y + 91 < 0 ? 0 : event.offsetY - event.y + 91
        this.dragSymbol = true;
      }
    },
    dragging: util.throttle(50, function(event) {
      if (this.dragSymbol) {
        var leftPadding = this.folderBlockStatus ? 200 : 0 //右侧还未处理
        var x = Math.max(leftPadding, event.x);
        var y = Math.max(91, event.y);
        var left,
          top,
          width,
          height;
        left = Math.max(Math.min(this.mousePosition.x, x), leftPadding);
        top = Math.max(Math.min(this.mousePosition.y, y), 91);
        width = Math.abs(Math.max(x, leftPadding) - this.mousePosition.x);
        height = Math.abs(Math.max(y, 91) - this.mousePosition.y);
        this.dragData = {
          left: left + 'px',
          top: top + 'px',
          width: width + 'px',
          height: height + 'px'
        }
        var rect = document.querySelector('.material_box').getBoundingClientRect()
        var arr = util.getCanSelectedItems(this.$store, {
          left: left,
          top: top,
          width: width,
          height: height
        }, rect.width, rect.height, leftPadding, this.mousePosition.scrollOffsetY)
      }
    }),
    dragEnd(event) {
      this.dragSymbol = false
      this.mousePosition = {
        x: 0,
        y: 0
      }
      this.dragData = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    },
    upload(event) {
      var files = event.target.files;
      if (files && files.length) {
        this.$store.dispatch({
          type: types.UPLOAD_FILES,
          data: {
            files: files
          }
        })
      }
    },
    onDrop(event) {
      var files = event.dataTransfer.files;
      if (files && files.length) {
        this.$store.dispatch({
          type: types.UPLOAD_FILES,
          data: {
            files: files
          }
        })
      } else {
        if (event.ctrlKey) {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.COPY_MATERIALS,
            data: arr,
            target: this.$store.getters.currentNode
          })
        } else {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.MOVE_MATERIALS,
            data: arr,
            target: this.$store.getters.currentNode
          })
        }
      }
    },
    dragover(event) {
      if (event.ctrlKey) {
        event.dataTransfer.effectAllowed = "copy";
      } else {
        event.dataTransfer.effectAllowed = "move";
      }
    },
    contextMenu(event) {
      this.$store.commit({
        type: types.CLEAR_SELECTEEDITEMS
      })
      this.$store.commit({
        type: types.SET_MENUSTATUS,
        data: {
          event: event,
          status: true,
        }
      })
    }
  },
  created() {
    // init
    var _this = this;
    var headerArr = JSON.parse(util.getCookie('item_headers'))
    if (util.isArray(headerArr)) {
      this.$store.commit({
        type: types.SET_HEADERS,
        data: headerArr
      })
    }
    var user = document.createElement("script")
    user.setAttribute("src", golbalSetting.CM + "/js/common/user.js" + version)
    document.querySelector('html').appendChild(user)
    var userdep = document.createElement("script")
    userdep.setAttribute("src", golbalSetting.CM + "/js/plugins/getUserAndDepartment.js" + version)
    document.querySelector('html').appendChild(userdep)
    var format = document.createElement("script")
    format.setAttribute("src", golbalSetting.CM + "/js/common/format.js" + version)
    document.querySelector('html').appendChild(format)
  },
  mounted() {
    var _this = this
    util.Notice = {}
    util.Model = {}
    Object.assign(util.Model, this.$Modal)
    Object.assign(util.Notice, this.$Notification)
    var resizeCallback = util.throttle(100, function(e) {
      _this.$store.commit({
        type: types.SET_THUMBPADDING,
      })
    }, true)
    window.addEventListener('load', function() {
      $('.loading_div').css({
        filter: 'opacity(0)',
        zIndex: -1,
      })
    })
    window.addEventListener('resize', resizeCallback)
    window.addEventListener("keydown", function(event) {
      var keycode = event.keyCode;
      var targetTag = event.target.tagName.toUpperCase();
      if (targetTag != 'INPUT' && targetTag != 'TEXTAREA') {
        event.preventDefault()
        event.stopPropagation()
        if (_this.isFocusTree) { // 左侧树
          if (keycode == 38) { //up
            _this.$store.commit({
              type: types.PREV_ITEM,
              source: _this.selectedNode
            })
          } else if (keycode == 40) { //down
            _this.$store.commit({
              type: types.NEXT_ITEM,
              source: _this.selectedNode
            })
          } else if (keycode == 39) { //right
            _this.$store.dispatch({
              type: types.EXPAND_FOLDER,
              source: _this.selectedNode
            });
          } else if (keycode == 37) { //left
            _this.$store.commit({
              type: types.CLOSE_FOLDER,
              target: _this.selectedNode
            })
          } else if (keycode == 13) { //enter
            if (_this.selectedNode.guid === 1) {
              _this.$store.commit({
                type: types.GET_NAVPATH,
                target: _this.selectedNode,
                data: []
              })
            } else if (_this.selectedNode.guid === 2) {
              _this.$store.dispatch({
                type: types.GET_SEARCHRESULT,
                source: _this.selectedNode
              }).then(() => {
                _this.$store.commit({
                  type: types.GET_NAVPATH,
                  target: _this.selectedNode,
                  data: []
                })
              })
            } else if (_this.selectedNode.guid === -1) {
              _this.$store.dispatch({
                type: types.GET_FAVORITERESULT,
                source: _this.selectedNode
              }).then(() => {
                _this.$store.commit({
                  type: types.GET_NAVPATH,
                  target: _this.selectedNode,
                  data: []
                })
              })
            } else if (_this.selectedNode.guid === 0) {
              _this.$store.dispatch({
                type: types.GET_TRASHCAN_OBJECTS,
                source: _this.selectedNode
              }).then(() => {
                _this.$store.commit({
                  type: types.GET_NAVPATH,
                  target: _this.selectedNode,
                  data: []
                })
              })
            } else {
              // normal folder
              _this.$store.dispatch({
                type: types.GET_MATERIALS,
                source: _this.selectedNode
              }).then(() => {
                _this.$store.commit({
                  type: types.GET_NAVPATH,
                  target: _this.selectedNode,
                  data: []
                })
              })
            }
          }
        } else { // 右侧列表
          var rect = document.querySelector('.material_box').getBoundingClientRect();
          var itemWidth = 150 + 2 * _this.$store.state.thumbPadding;
          var rowCount = Math.floor((rect.width - 2 * _this.$store.state.thumbPadding) / itemWidth);
          if (_this.listSymbol) {
            rowCount = 1
          }
          if (event.shiftKey) {
            var selectedMaterials = _this.$store.state.selectedMaterials
            if (selectedMaterials.length) {
              _this.tempIndex = _this.$store.getters.currentNode.children.indexOf(selectedMaterials[selectedMaterials.length - 1])
            } else {
              _this.tempIndex = _this.$store.state.signIndex
            }
          }
          if (keycode == 38) { //up
            if (event.ctrlKey && event.shiftKey) {
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex - rowCount
              })
            } else if (!event.ctrlKey && event.shiftKey) {
              _this.$store.commit({
                type: types.CLEAR_SELECTEEDITEMS
              })
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex - rowCount
              })
            } else {
              _this.$store.dispatch({
                type: types.SELECT_MATERIAL,
                data: _this.$store.state.signIndex - rowCount
              })
            }

          } else if (keycode == 40) { //down
            if (event.ctrlKey && event.shiftKey) {
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex + rowCount
              })
            } else if (!event.ctrlKey && event.shiftKey) {
              _this.$store.commit({
                type: types.CLEAR_SELECTEEDITEMS
              })
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex + rowCount
              })
            } else {
              _this.$store.dispatch({
                type: types.SELECT_MATERIAL,
                data: _this.$store.state.signIndex + rowCount
              })
            }
          } else if (keycode == 39) { //right
            if (event.ctrlKey && event.shiftKey) {
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex + 1
              })
            } else if (!event.ctrlKey && event.shiftKey) {
              _this.$store.commit({
                type: types.CLEAR_SELECTEEDITEMS
              })
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex + 1
              })
            } else {
              _this.$store.dispatch({
                type: types.SELECT_MATERIAL,
                data: _this.$store.state.signIndex + 1
              })
            }
          } else if (keycode == 37) { //left
            if (event.ctrlKey && event.shiftKey) {
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex - 1
              })
            } else if (!event.ctrlKey && event.shiftKey) {
              _this.$store.commit({
                type: types.CLEAR_SELECTEEDITEMS
              })
              _this.$store.dispatch({
                type: types.MULTI_SELECTITEMS,
                data: _this.tempIndex - 1
              })
            } else {
              _this.$store.dispatch({
                type: types.SELECT_MATERIAL,
                data: _this.$store.state.signIndex - 1
              })
            }
          } else if (keycode == 13) { //enter
            types.OPEN_FOLDER
            _this.$store.dispatch({
              type: types.OPEN_FOLDER,
              target: _this.$store.state.selectedMaterials,
            });
          } else if (keycode == 8) {
            _this.$store.commit({
              type: types.BACK_UP
            })
          } else if (keycode == 88 && event.ctrlKey) {
            //X 剪贴
            _this.$store.dispatch({
              type: types.CUT
            });
          } else if (keycode == 86 && event.ctrlKey) {
            //V
            _this.$store.dispatch({
              type: types.PASTE
            });
          } else if (keycode == 65 && event.ctrlKey) {
            //A
            _this.$store.commit({
              type: types.CLEAR_SELECTEEDITEMS
            })
            _this.materials.forEach(item => {
              item.selected = true
              _this.$store.commit({
                type: types.ADD_SELECTEDITEM,
                data: item
              })
            })
          } else if (keycode == 67 && event.ctrlKey) {
            _this.$store.dispatch({
              type: types.COPY,
              target: _this.$store.state.selectedMaterials
            });
          }
        }

        if (keycode == 9) { //Tab切换焦点
          _this.isFocusTree = !_this.isFocusTree
          if (!_this.isFocusTree) {
            _this.$store.dispatch({
              type: types.SELECT_MATERIAL,
              data: _this.$store.state.signIndex
            })
          } else {
            _this.$store.commit({
              type: types.CLEAR_SELECTEEDITEMS
            })
          }
        }
      }
    });

    this.$store.dispatch({
      type: types.LOGIN,
      data: _userToken
    }).then(() => {
      var _this = this;

      this.$store.dispatch({
        type: types.GET_USERTREE,
        data: -1
      }).then((res) => {
      })
    })
  }
}).$mount('#app')
