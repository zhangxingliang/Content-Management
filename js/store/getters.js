const getters = {
  folderTree: state => {
    return state.nodes
  },
  currentNode: (state, getters) => {
    var cnode
    if (state.navPath.length > 0) {
      cnode = state.navPath[state.navPath.length - 1]
    } else {
      cnode = {
        children: [],
        operations: []
      }
    }
    if (cnode.guid === 1 || cnode.guid === 2) {
      if (state.sortType === 'type') {
        cnode.searchResult = util.sortBy(cnode.searchResult, state.sortType, state.typeSymbol)
      } else {
        cnode.searchResult = util.sortBy(cnode.searchResult, state.sortType, state.sortSymbol)
      }
    } else if (cnode.guid === -1) {
      if (state.sortType === 'type') {
        cnode.favorites = util.sortBy(cnode.favorites, state.sortType, state.typeSymbol)
      } else {
        cnode.favorites = util.sortBy(cnode.favorites, state.sortType, state.sortSymbol)
      }
    } else {
      if (state.sortType === 'type') {
        cnode.children = util.sortBy(cnode.children, state.sortType, state.typeSymbol)
      } else {
        cnode.children = util.sortBy(cnode.children, state.sortType, state.sortSymbol)
      }
    }
    return cnode
  },
  copingBoard: (state, getters) => {
    return getters.currentNode.children.filter(item => item.coping == true)
  },
  searchResult: state => {
    return state.nodes[1]
  },
  savePathTree: state => {
    return state.saveBasePath.children.filter(item => item.type == 'folder').sort(window.SortLikeWin)
  },
  selectedNode: (state, getters) => {
    if (!state.selectedNode) {
      return getters.currentNode
    } else {
      return state.selectedNode
    }
  },
  selectedMaterial: (state, getters) => {
    if (getters.currentNode.children.length) {
      return getters.currentNode.children[state.signIndex]
    } else {
      return null
    }
  }
}
