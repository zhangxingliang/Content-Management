const menu_ctrl = {
  template: "#menu_ctrl",
  data: function() {
    var dict = this.$store.state.dict
    return {
      baseOpts: [{
        name: "Refresh",
        action: types.REFRESH_MATERIAL,
      }, {
        name: "Order By",
        action: "OrderBy",
        subOperations: [
          {
            name: dict.title + '  ↑',
            action: types.SET_SORTTYPE,
            checked: false,
          },
          {
            name: dict.title + '  ↓',
            action: types.SET_SORTTYPE,
            checked: false,
          },
          {
            name: dict.createTime + '  ↑',
            action: types.SET_SORTTYPE,
            checked: false,
          },
          {
            name: dict.createTime + '  ↓',
            action: types.SET_SORTTYPE,
            checked: false,
          },
          {
            name: dict.type,
            action: types.SET_SORTTYPE,
            checked: false,
          }
        ]
      }, {
        name: "Archive Status",
        action: "itemDblClick",
        subOperations: [
          {
            name: "Online",
            action: "NewFolder",
            checked: false,
          },
          {
            name: "Archive",
            action: "NewFolder",
            checked: false,
          }
        ]
      }],
      opts: [
        {
          name: "Open",
          action: types.OPEN_FOLDER
        },
        {
          name: "Delete",
          action: types.RECYCLE,
        },
        {
          name: "Rename",
          action: types.DISPATCH_RENAME,
        },
        {
          name: "Cut",
          action: types.CUT,
        },
        {
          name: "Copy",
          action: types.COPY,
        },
        {
          name: "Create New",
          action: types.DISPATCH_ADD_FOLDER,
        },
        {
          name: "Paste",
          action: types.PASTE,
        },
        {
          name: "Property",
          action: "Property",
        },
        {
          name: "16:9",
          action: types.SD169
        },
        {
          name: "Export",
          action: "itemDblClick"
        },
        {
          name: "Download",
          action: types.DOWNLOAD
        },
        {
          name: "Register to OA",
          action: "itemDblClick"
        },
        {
          name: "Publish to SNS",
          action: "itemDblClick"
        },
        {
          name: "Auto Package",
          action: types.AUTO_PACKEGE
        },
        {
          name: "Detail View",
          action: "itemDblClick"
        },
        {
          name: "Restore",
          action: types.RESTORE
        },
        {
          name: "Upload",
          action: types.DISPATCH_UPLOAD
        },
        {
          name: "Restore All Materials",
          action: types.RESTORE_ALL
        },
        {
          name: "Empty Trash Can",
          action: types.CLEAR_TRASHCAN_OBJECTS
        }
      ]
    }
  },
  methods: {
    apply: function(operation) {
      var _this = this
      _this.$store.dispatch({
        type: operation.action,
        target: this.data,
        data: operation.name
      });
    }
  },
  computed: {
    dict() {
      return this.$store.state.dict
    },
    data() {
      return this.$store.state.selectedMaterials
    },
    position() {
      var p = Object.assign({
        active: this.$store.state.menuStatus,
      }, this.$store.state.mousePosition);
      //如果超出则自动适应根据
      if (p.x + 200 > document.body.clientWidth) {
        p.x -= 200;
      }
      if (p.y + 800 > document.body.clienHeight) {
        p.y -= 800;
      }
      return p;
    },
    operations() {
      //根据当前可操作的素材过滤操作
      var _this = this;
      if (this.data.length > 0) {
        var opts = this.opts.filter(item => _this.data.every(i => i.operations.indexOf(item.name) > -1))
        if (_this.data.length > 1 || !_this.data[0].selecting) {
          opts = opts.filter(item => item.name != "Create New")
        }
        return opts
      } else {
        var opts = _this.baseOpts.concat(this.opts.filter(item => _this.$store.getters.currentNode.operations.indexOf(item.name) > -1 && ['Cut', 'Copy', 'Open', 'Delete', 'Rename'].indexOf(item.name) < 0))
        return opts
      }
    }
  }
}
