const material_ctrl = {
  template: "#material_ctrl",
  props: {
    data: Object,
  },
  components: {
    'rd-progress-circle': rdUI.rdProgressCircle,
  },
  data: function() {
    return {
      intervalId: -1,
      top: 0,
      left: 0,
    }
  },
  methods: {
    drop(event) {
      if (this.material.type === 'folder') {
        this.material.dragOvering = false;
        if (event.dataTransfer.files.length > 0) {
          this.$store.dispatch({
            type: types.GET_MATERIALS,
            source: this.material
          })
          this.$store.dispatch({
            type: types.UPLOAD_FILES,
            data: {
              files: event.dataTransfer.files
            },
            source: this.material
          })
        } else if (event.ctrlKey) {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.COPY_MATERIALS,
            data: arr,
            target: this.material
          })
        } else {
          var arr = this.$store.state.selectedMaterials
          this.$store.dispatch({
            type: types.MOVE_MATERIALS,
            data: arr,
            target: this.material
          })
        }
      }
    },
    mouseup(event) {
      if (event.button != 0 || this.dragSymbol) {
        return
      }
      if (!event.ctrlKey && !event.shiftKey) {
        if (this.$store.state.selectedMaterials.length > 1) {
          this.$store.commit({
            type: types.CLEAR_SELECTEEDITEMS
          })
          this.material.selected = true
          this.$store.commit({
            type: types.ADD_SELECTEDITEM,
            data: this.material
          })
          this.$store.commit({
            type: types.SET_SIGNMATERIAL,
            data: this.$store.getters.currentNode.children.indexOf(this.material)
          })
        }
      // ctrl shilft都没按下  先清空选中的
      } else if (event.ctrlKey && !event.shiftKey) {
        //按下ctrl  没按shilft   取消选中  选中未选中
        this.material.selected = !this.material.selected
        if (this.material.selected) {
          this.$store.commit({
            type: types.ADD_SELECTEDITEM,
            data: this.material
          })
          this.$store.commit({
            type: types.SET_SIGNMATERIAL,
            data: this.$store.getters.currentNode.children.indexOf(this.material)
          })
        } else {
          this.$store.commit({
            type: types.REMOVE_SELECTEDITEM,
            data: this.material
          })
        }
      } else if (event.ctrlKey && event.shiftKey) {
        // 按下ctrl  并按下shilft  多选
        this.$store.dispatch({
          type: types.MULTI_SELECTITEMS,
          data: this.$store.getters.currentNode.children.indexOf(this.material)
        })
      } else {
        // 只按下shilft
        this.$store.commit({
          type: types.CLEAR_SELECTEEDITEMS
        })
        this.$store.dispatch({
          type: types.MULTI_SELECTITEMS,
          data: this.$store.getters.currentNode.children.indexOf(this.material)
        })
      }
    },
    mousedown(event) {
      if (event.button != 0) {
        return
      }
      if (!event.ctrlKey && !event.shiftKey && this.$store.state.selectedMaterials.length < 2) {
        // ctrl shilft都没按下  先清空选中的
        this.$store.commit({
          type: types.CLEAR_SELECTEEDITEMS
        })
        this.material.selected = true
        this.$store.commit({
          type: types.ADD_SELECTEDITEM,
          data: this.material
        })
        this.$store.commit({
          type: types.SET_SIGNMATERIAL,
          data: this.$store.getters.currentNode.children.indexOf(this.material)
        })
      }
    },
    activeInput: function(event) {
      this.material.renaming = true
      this.$nextTick(() => {
        this.$el.querySelector('.rename_input').focus()
      })
    },
    dblclick: function(event) {
      if (this.material.type === 'folder') {
        util.locateFolder(this.$store, this.material.path.split('/').slice(1), {
          children: this.$store.getters.folderTree
        })
      /*this.$store.commit({
        type : types.EXPAND_FOLDER,
        target : this.material
      })
      this.$store.dispatch({
        type : types.GET_MATERIALS,
        source : this.material
      }).then(()=>{
        this.$store.commit({
          type : types.GET_NAVPATH,
          target :  this.material,
          data : []
        })
        Vue.nextTick(()=>{
          editor.initDrag()
        })
      })*/
      } else if (this.material.type === 'h5pgm') {

      } else if (this.material.type === 'marker') {
        this.$store.dispatch({
          type: types.GET_OBJECT_INFO,
          data: {
            clipid: this.material.objectguid,
            sourceid: '32'
          }
        }).then(res => {
          var pathList = res.data.ext.entity.folderpath.split('/')
          util.locateFolder(this.$store, pathList.slice(1), {
            children: this.$store.getters.folderTree
          })
        })
      } else {
        /*if (!this.$store.resourceBlockStatus) {
          this.$store.commit({
            type: types.MOVE_SVPLAYER
          })
        }*/
      }
    },
    mousemove(event) {
      var x1 = event.x
      var x2 = $(event.currentTarget).offset().left
      var offset = Math.floor((x1 - x2) / 15)
      this.left = x1 - x2
      this.top = -125 * offset
    },
    upload(event) {
      this.$store.dispatch({
        type: types.UPLOAD_FILES,
        data: {
          files: event.target.files
        }
      })
    },
    dragover(event) {
      if (this.material.type == 'folder') {
        this.material.dragOvering = true;
        if (event.ctrlKey) {
          event.dataTransfer.effectAllowed = "all";
        } else {
          event.dataTransfer.effectAllowed = "all";
        }
      }
    },
    dragenter(event) {
      if (this.material.type == 'folder')
        this.material.dragOvering = true;
    },
    dragleave(event) {
      if (this.material.type == 'folder')
        this.material.dragOvering = false;
    },
    dragStart(event) {
      this.material.selected = true
      this.$store.commit({
        type: types.ADD_SELECTEDITEM,
        data: this.material
      })
      this.$store.commit({
        type: types.SET_SIGNMATERIAL,
        data: this.$store.getters.currentNode.children.indexOf(this.material)
      })
      var dragEle = this.$el.querySelector('.drag_icon');
      event.dataTransfer.setDragImage(dragEle, dragEle.clientWidth / 2, dragEle.clientHeight / 2);
      if (event.ctrlKey) {
        event.dataTransfer.dropEffect = "copy";
        event.dataTransfer.effectAllowed = "copy";
      } else {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.effectAllowed = "move";
      }
    },
    dragEnd(event) {},
    rename(event) {
      //验证名字  未验证特殊字符
      if (this.material.father.children.some(item => item.name === event.target.value && item.guid !== this.material.guid)) {
        util.Model.confirm(
          'Rename Folder',
          'has same name,',
          () => {
            //ok
          },
          () => {
            //cancel
          })
      } else if (this.material.name === event.target.value) {
        this.material.renaming = false
      //do nothing
      } else {
        //event Arr push
        var symbol = Symbol()
        this.$store.commit({
          type: types.PUSH_EVENT,
          data: {
            type: types.RENAME,
            oldValue: this.material.name,
            newValue: event.target.value,
            target: this.material
          },
          symbol: symbol
        })
        this.$store.dispatch({
          type: types.RENAME,
          source: this.material,
          data: event.target.value
        }).then(res => {
          //success
          this.$store.commit({
            type: types.DELETE_EVENT,
            symbol: symbol
          })
          this.material.name = event.target.value
          this.material.renaming = false
          this.$Notification.success('rename success', 'msg', 1000)
        }).catch(res => {
          this.$store.commit({
            type: types.RECOVERY_EVENT,
            symbol: symbol
          })
          this.$Notification.failed('rename failed', 'msg', 1000)
        })
      }
    },
    contextMenu(event) {
      if (!this.material.selected) {
        this.$store.commit({
          type: types.CLEAR_SELECTEEDITEMS
        })
        this.material.selected = true
        this.$store.commit({
          type: types.ADD_SELECTEDITEM,
          data: this.material
        })
        this.$store.commit({
          type: types.SET_SIGNMATERIAL,
          data: this.$store.getters.currentNode.children.indexOf(this.material)
        })
      }
      this.$store.commit({
        type: types.SET_MENUSTATUS,
        data: {
          event: event,
          status: true,
        }
      })
    },
  },
  computed: {
    dragSymbol() {
      return this.$store.state.dragSymbol
    },
    material() {
      return this.data
    },
    progressData() {
      return {
        percent: this.material.percent,
        options: {
          color: '#2db7f5',
          size: 'small',
          state: 'loading',
          format: function(percent) {
            return percent + '%'
          }
        }
      }
    },
    editor() {
      return this.$store.state.editor
    },
    thumbPadding() {
      return this.$store.state.thumbPadding
    }
  }
}
