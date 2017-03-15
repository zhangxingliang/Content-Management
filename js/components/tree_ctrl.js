const tree_ctrl = {
  template: "#tree_ctrl",
  props: {
    data: Object
  },
  name: "tree-ctrl",
  data: function() {
    return {
      intervalId: -1,
      dragOvering: false
    };
  },
  methods: {
    click: function() {
      if (this.node.guid === 1) {
        this.$store.commit({
          type: types.GET_NAVPATH,
          target: this.node,
          data: []
        })
      } else if (this.node.guid === 2) {
        this.$store.dispatch({
          type: types.GET_SEARCHRESULT,
          source: this.node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: this.node,
            data: []
          })
        })
      } else if (this.node.guid === -1) {
        this.$store.dispatch({
          type: types.GET_FAVORITERESULT,
          source: this.node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: this.node,
            data: []
          })
        })
      } else if (this.node.guid === 0) {
        this.$store.dispatch({
          type: types.GET_TRASHCAN_OBJECTS,
          source: this.node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: this.node,
            data: []
          })
        })
      } else {
        // normal folder
        this.$store.dispatch({
          type: types.GET_MATERIALS,
          source: this.node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: this.node,
            data: []
          })
        })
      }
    },
    dblclick: function(node) {
      this.$store.dispatch({
        type: types.TOGGLE_FOLDER,
        source: this.node
      })
    },
    nodeToggle: function(node) {
      this.$store.dispatch({
        type: types.TOGGLE_FOLDER,
        source: this.node
      })
    },
    dragOver: function(event) {
      //sethover effect
      this.dragOvering = true

      event.dataTransfer.effectAllowed = "move"
      //event.dataTransfer.setDragImage(event.target, 0, 0);
      if (!this.node.openned && this.intervalId == -1) {
        this.intervalId = setTimeout(() => {
          this.$store.dispatch({
            type: types.EXPAND_FOLDER,
            source: this.node
          })
        }, 1000)
      }
    },
    dragLeave: function(event) {
      // clear hover effct
      clearTimeout(this.intervalId)
      this.intervalId = -1
      this.dragOvering = false
    },
    drop: function(event) {
      clearTimeout(this.intervalId)
      this.intervalId = -1
      this.dragOvering = false
      if (event.dataTransfer.files.length > 0) {
        this.$store.dispatch({
          type: types.GET_MATERIALS,
          source: this.node
        })
        this.$store.dispatch({
          type: types.UPLOAD_FILES,
          data: {
            files: event.dataTransfer.files
          },
          source: this.node
        })
      } else {
        if (event.ctrlKey) {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.COPY_MATERIALS,
            data: arr,
            target: this.node
          })
        } else {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.MOVE_MATERIALS,
            data: arr,
            target: this.node
          })
        }
      }
    },
    contextMenu(event) {
      this.$store.commit({
        type: types.CLEAR_SELECTEEDITEMS
      })
      this.node.selecting = true
      this.$store.commit({
        type: types.ADD_SELECTEDITEM,
        data: this.node
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
  computed: {
    node() {
      // Special folder transfer
      return this.data
    },
    selectedNode() {
      return this.$store.state.currentNode
    },
    sortFunc() {
      return window.SortLikeWin
    }
  }
}

const tree_ctrl2 = {
  template: "#tree_ctrl2",
  props: {
    data: Object,
    callback: Function,
  },
  name: "tree-ctrl2",
  methods: {
    click: function() {
      this.callback(this.node)
    },
    dblclick: function(node) {
      this.$store.dispatch({
        type: types.GET_MATERIALS,
        source: this.node
      }).then(() => {
        this.$store.dispatch({
          type: types.TOGGLE_FOLDER,
          source: this.node
        })
      })
    },
    nodeToggle: function(node) {
      this.$store.dispatch({
        type: types.TOGGLE_FOLDER,
        source: this.node
      })
    }
  },
  computed: {
    node() {
      return this.data
    },
    selectedNode() {
      return this.$store.state.currentNode
    },
    sortFunc() {
      return window.SortLikeWin
    }
  }
}
