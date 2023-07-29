const Mock = require('mockjs');
const data = Mock.mock({
  'list|1-100': [{
    id: '@id',
    type: "common",
    content: '@name',
    url: 'https://www.baidu.com',
    imgLink: Mock.Random.image()
  }]
})

export default data