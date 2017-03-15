const user_tree_ctrl = {
  template: "#user_tree_ctrl",
  props: {
    data: Object,
    callback: Function
  },
  name: "user-tree-ctrl",
  methods: {
    click(data) {
      this.callback(data)
    },
  },
  computed: {},
  mounted() {}
}
