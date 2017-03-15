const mutations = {
  [types.SET_MATERIALS](state, payload) {
    if (payload.target.guid === 1 || payload.target.guid === 2) {
      payload.target.searchResult = payload.data
    } else if (payload.target.guid === -1) {
      payload.target.favorites = payload.data
    } else {
      payload.target.children = payload.data
    }
  },
  [types.TOGGLE_FOLDER](state, payload) {
    payload.target.open = !payload.target.open
  },
  [types.EXPAND_FOLDER](state, payload) {
    payload.target.open = true
  },
  [types.CLOSE_FOLDER](state, payload) {
    payload.target.open = false
  },
  [types.MOVE_MATERIALS](state, payload) {
    payload.data.forEach(item => {
      item.floor = payload.target.floor + 1
      item.father.children.remove(item)
      item.father = payload.target
      item.checked = false
      payload.target.children.push(item)
    })
  },
  [types.BACK_UP](state, payload) {
    var l = state.navPath.length
    if (l > 1) {
      var lastNode = state.navPath.splice(-1, 1)[0]
      lastNode.selected = false
      lastNode.checked = false
    }
    if (state.selectedNode) {
      state.selectedNode.checked = false
      state.selectedNode.selected = false
    }
    state.navPath[state.navPath.length - 1].checked = true
    state.selectedNode = state.navPath[state.navPath.length - 1]
  },
  [types.GET_NAVPATH](state, payload) {
    state.signIndex = 0
    state.selectedMaterials.forEach(item => {
      item.selected = false
      item.selecting = false
    })
    state.selectedMaterials = []
    if (state.navPath.length) {
      state.navPath[state.navPath.length - 1].selected = false
      state.navPath[state.navPath.length - 1].checked = false
    }
    if (state.selectedNode) {
      state.selectedNode.checked = false
      state.selectedNode.selected = false
    }
    payload.target.selected = true;
    payload.target.checked = true;
    state.selectedNode = payload.target
    state.navPath.length = 0 ;
    util.getHistories(payload.target, state.navPath);
    var currentNode = state.navPath[state.navPath.length - 1]
    var width = $('#resourceList').width()
    var len = 0
    if (currentNode.guid !== 1 && currentNode.guid !== 2) {
      if (currentNode.guid === -1) {
        len = currentNode.favorites.length
      } else {
        len = currentNode.children.length
      }
    } else {
      len = currentNode.searchResult.length
    }
    state.thumbPadding = util.getPadding(width, 150, len)
    if ([1, 2, -1].indexOf(currentNode.guid) > -1) {
      $(".advance_search").attr("disabled", "disabled").css("background-color", "#3e3e3e").addClass("transparentHover");
      $("#fullSearch").attr("disabled", "disabled").css("background-color", "#3e3e3e");
      $("#div_fullTextSearch").css("background-color", "#3e3e3e");
      $("#searchBtn").attr("disabled", "disabled");;
      $("#filterBtn").hide();
    } else {
      $(".advance_search").removeAttr("disabled").css("background-color", "#292929").removeClass("transparentHover");
      $("#fullSearch").removeAttr("disabled").css("background-color", "#292929");
      $("#div_fullTextSearch").css("background-color", "#292929");
      $("#searchBtn").removeAttr("disabled");
      $("#filterBtn").show();
    }
  },
  [types.SET_USERINFO](state, payload) {
    state.userInfo = payload.data
  },
  [types.GET_SEARCHMODEL](state, payload) {
    var newArr = []
    payload.data.forEach(item => {
      item.guid = 2
      item.searchResult = []
      item.floor = payload.target.floor + 1
      item.father = payload.target
      item.type = 'folder'
      item.selected = false
      item.children = []
      newArr.push(item)
    })
    payload.target.children = newArr
  },
  [types.SET_ALWAYSGET](state, payload) {
    state.alwaysGet = payload.data
  },
  [types.SET_ORDERTYPE](state, payload) {
    state.listOrder = payload.data
  },
  [types.SET_HEADERFILTER](state, payload) {
    state.headers.forEach((item, index) => {
      if (payload.data.indexOf(index) > -1) {
        item.checked = true
      } else {
        item.checked = false
      }
    })
    util.setCookie('item_headers', JSON.stringify(state.headers))
  },
  [types.SWAP_HEADERITEMS](state, payload) {
    state.headers.remove(payload.data.item)
    state.headers.splice(payload.data.index, 0, payload.data.item)
  },
  [types.SET_HEADERS](state, payload) {
    state.headers = payload.data
  },
  [types.ADD_FAVORITE](state, payload) {
    state.nodes.push({
      name: _language[_curLang].fav,
      selected: false,
      checked: false,
      open: false,
      selecting: false,
      operations: ['Property'],
      guid: -1,
      path: _rootPath + '/' + _language[_curLang].fav,
      floor: 1,
      type: "folder",
      children: [],
      favorites: []
    })
  },
  [types.SET_SVMARKERS](state, payload) {
    state.svMarkerList = payload.data
  },
  [types.SET_THUMBPADDING](state, payload) {
    setTimeout(() => {
      var width = $('#resourceList').width()
      var currentNode = state.navPath[state.navPath.length - 1]
      var len = 0
      if (currentNode.guid !== 1 && currentNode.guid !== 2) {
        if (currentNode.guid === -1) {
          len = currentNode.favorites.length
        } else {
          len = currentNode.children.length
        }
      } else {
        len = currentNode.searchResult.length
      }
      state.thumbPadding = util.getPadding(width, 150, len)
    }, 300)
  },
  [types.NEXT_ITEM](state, payload) {
    var node = util.getNextItem(payload.source)
    if (state.selectedNode) {
      state.selectedNode.checked = false
    } else {
      state.navPath[state.navPath.length - 1].checked = false
    }
    if (node) {
      state.selectedNode = node
    } else {
      var index = state.nodes.indexOf(util.getTopFather(state.selectedNode))
      state.selectedNode = state.nodes[Math.min(index + 1, state.nodes.length - 1)]
    }

    /*else if (payload.source.guid === 1 && state.nodes.length > 2) {
      state.selectedNode = state.nodes[2]
    } else if (payload.source.guid !== -1) {
      state.selectedNode = state.nodes[1]
    }*/
    if (state.selectedNode) {
      state.selectedNode.checked = true
    }

  },
  [types.PREV_ITEM](state, payload) {
    var node = util.getPrevItem(payload.source)
    if (state.selectedNode) {
      state.selectedNode.checked = false
    } else {
      state.navPath[state.navPath.length - 1].checked = false
    }
    if (node) {
      state.selectedNode = node
    } else {
      var index = state.nodes.indexOf(util.getTopFather(state.selectedNode))
      if (index > 0) {
        state.selectedNode = util.getBottomChild(state.nodes[index - 1])
      } else {
        state.selectedNode = state.nodes[0]
      }
    }
    /*else if (payload.source.guid === -1) {
     state.selectedNode = util.getLastItem(state.nodes[1])
    } else if (payload.source.guid === 1) {
     state.selectedNode = util.getLastItem(state.nodes[0])
    }*/
    if (state.selectedNode) {
      state.selectedNode.checked = true
    }
  },
  [types.SET_MENUSTATUS](state, payload) {
    state.menuStatus = payload.data.status
    state.mousePosition.x = payload.data.event.clientX;
    state.mousePosition.y = payload.data.event.clientY;
  },
  [types.PUSH_EVENT](state, payload) {
    state.eventArray[payload.symbol] = payload.data
  },
  [types.DELETE_EVENT](state, payload) {
    delete state.eventArray[payload.symbol]
  },
  [types.RECOVERY_EVENT](state, payload) {
    var event = state.eventArray[payload.symbol]
  },
  [types.ADD_SELECTEDITEM](state, payload) {
    if (state.selectedMaterials.indexOf(payload.data) < 0)
      state.selectedMaterials.push(payload.data)
  },
  [types.CLEAR_SELECTEEDITEMS](state, payload) {
    state.selectedMaterials.forEach(item => {
      item.selected = false
      item.selecting = false
    })
    state.selectedMaterials = []
  },
  [types.REMOVE_SELECTEDITEM](state, payload) {
    state.selectedMaterials.remove(payload.data)
  },
  [types.SET_SIGNMATERIAL](state, payload) {
    state.signIndex = payload.data
  },
  [types.ADD_CLIPBOARD](state, payload) {
    if (state.clipBoard.indexOf(payload.data) < 0)
      state.clipBoard.push(payload.data)
  },
  [types.CLEAR_CLIPBOARD](state, payload) {
    state.clipBoard.forEach(item => {
      item.cutting = false
    })
    state.clipBoard = []
  },
  [types.SET_CLIPBOARDSTATUS](state, payload) {
    state.clipBoardSymbol = payload.data
  }
}
