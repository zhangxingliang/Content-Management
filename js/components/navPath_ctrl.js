const nav_path_ctrl = {
  template: "#nav_path_ctrl",
  computed: {
    navPath() {
      return this.$store.state.navPath
    }
  },
  methods: {
    click: function(node) {
      if (node.guid === 1) {
        this.$store.commit({
          type: types.GET_NAVPATH,
          target: node,
          data: []
        })
      } else if (node.guid === 2) {
        this.$store.dispatch({
          type: types.GET_SEARCHRESULT,
          source: node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: node,
            data: []
          })
        })
      } else if (node.guid === -1) {
        this.$store.dispatch({
          type: types.GET_FAVORITERESULT,
          source: node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: node,
            data: []
          })
        })
      } else {
        // normal folder
        this.$store.dispatch({
          type: types.GET_MATERIALS,
          source: node
        }).then(() => {
          this.$store.commit({
            type: types.GET_NAVPATH,
            target: node,
            data: []
          })
        })
      }
    /*this.$store.dispatch({
      type : types.GET_MATERIALS,
      source : node
    })*/
    },
    backUp: function() {
      this.$store.commit({
        type: types.BACK_UP
      });
    }
  }
};
