import miniVueBarrage from './barrage/index.vue';
const version = '1.0.0';
const components = [
  miniVueBarrage
]


const install = (Vue) => {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}


export {
  miniVueBarrage
};

export default {
  install, version
}