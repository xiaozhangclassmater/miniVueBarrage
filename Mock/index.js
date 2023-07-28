const Mock = require('mockjs');
const data = Mock.mock({
  'list|1-100': [{
    id: '@id',
    type: "common",
    content: '@name',
    url: Mock.Random.url(),
    imgLink: Mock.Random.image()
  }]
})

export default data