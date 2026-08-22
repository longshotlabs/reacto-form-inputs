// This file is loaded from the jest.setupFiles config in package.json

require('core-js/stable')
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })
