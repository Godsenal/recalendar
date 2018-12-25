export const imports = {
  'docz/index.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docz-index" */ 'docz/index.mdx'),
  'docz/helper/rcPortal.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docz-helper-rc-portal" */ 'docz/helper/rcPortal.mdx'),
  'docz/picker/base.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docz-picker-base" */ 'docz/picker/base.mdx'),
  'docz/picker/rcPicker.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docz-picker-rc-picker" */ 'docz/picker/rcPicker.mdx'),
  'docz/picker/rcRangePicker.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docz-picker-rc-range-picker" */ 'docz/picker/rcRangePicker.mdx'),
}
