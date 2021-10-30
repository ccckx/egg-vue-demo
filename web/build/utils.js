const fs = require('fs')
const path = require('path')
const portfinder = require('portfinder')

const getProList = ({rl, name}) => {
  const list = fs.readdirSync(path.resolve(__dirname, '../pro'))
  if (list.length) {
    let option = list.map((item, index) => {
      return index + 1 + '.' + item
    }).join('\n')
    selectProStr = option + '\n选择启动的项目是：'
    return {
      list,
      selectProStr
    }
  } else {
    console.log(`没有可${name}的项目`)
    rl.close();
  }
}

const getConfig = ({pro}) => {
  const hasProConfig = fs.existsSync(path.resolve(__dirname, '../../.elscms/proConfig.json'))
  if (hasProConfig) {
    const proConfigBuffer = fs.readFileSync(path.resolve(__dirname, '../../.elscms/proConfig.json'))
    const proConfig = JSON.parse(proConfigBuffer.toString())
    proConfig[pro] = proConfig[pro] || {}
    return proConfig
  } else {
    return {
      [pro]: {}
    }
  }
}

const copy = ({oldPath, newPath, params}) => {
  createFile(newPath)
  const files = fs.readdirSync(oldPath)
  files.map(item => {
    const filesBuffer = fs.readFileSync(oldPath + '\\' + item)
    let fileString = filesBuffer.toString()
    if (item === 'main.js') {
      fileString = fileString.replace(/\$\{pro\}/g, params.pro)
    } else if (item === 'router.js') {
      fileString = fileString.replace(/\$\{pro\}/g, params.pro)
    }
    fs.writeFileSync(newPath + '\\' + item, fileString)
  })
}

const mergeConfig = (a, b) => {
  Object.keys(a).forEach(item => {
    if (Array.isArray(a[item])) {
      if (b[item]) {
        b[item] = [...new Set( b[item].concat(a[item]) )]
      } else {
        b[item] = a[item]
      }
    } else if (Object.prototype.toString.call(a[item]) === '[object Object]') {
      if (b[item]) {
        b[item] = { ...a[item], ...b[item]}
      } else {
        b[item] = { ...a[item] }
      }
    } else if (typeof(a[item]) === 'function') {
      if (b[item]) {
        b[item] = mergeFunction(b[item], a[item])
      } else {
        b[item] = a[item]
      }
    } else {
      if (!b[item]) {
        b[item] = a[item]
      }
    }
  })
  return b
}

const mergeFunction = function(f,g) {
  return function(x) {
    return f(g(x));
  };
};

const getPort = (port) => {
  return new Promise((resolve, reject) => {
    portfinder.getPort({port,stopPort: 9999 }, (err, port) => {
      if (port){
        console.log('项目运行端口：' + port)
        resolve(port);
      }else{
        reject(false)
      }
    })
  })
}

const createFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
  }
}

const updateDefaultConfig = ({fileName, defaultPort, pro}) => {
  let defaultConfigBuffer = fs.readFileSync(path.resolve(__dirname, fileName))
  return defaultConfigBuffer.toString()
  .replace(/\$\{port\}/g, defaultPort)
  .replace(/\$\{pro\}/g, pro)
}

module.exports = {
  getProList,
  getConfig,
  copy,
  mergeConfig,
  getPort,
  createFile,
  updateDefaultConfig
}