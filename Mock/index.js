const Mock = require('mockjs');
const data = Mock.mock({
  'list|1-1000': [{
    id: '@id',
    type: "common",
    content: '@name',
    url: 'https://www.baidu.com',
    Icon: Mock.Random.image(),
    className: 'odration'
  }]
})

export default data