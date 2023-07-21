const Mock = require('mockjs');
const data = Mock.mock({
  'list|1-100' : [{
    id : '@id',
    type : "common",
    content : '@name',
    url : Mock.Random.url(),
  }]
})

export default data