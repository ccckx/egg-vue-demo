const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec
const utils = require('./utils')
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const mfs = new MemoryFS();
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pro, 
    selectProStr,
    proDetail,
    hasConfig,
    proList = [],
    defaultPort = 8080,
    isStart = false

const build = () => {
	const proInfo = utils.getProList({rl, name: '打包'})
	if (proInfo) {
		selectProStr = proInfo.selectProStr
		proList = proInfo.list

    rl.question(selectProStr, (index) => {
      pro = proList[index - 1]
      proDetail = utils.getConfig({pro})
      if (proDetail[pro] && proDetail[pro].isSsr) {
        checkSsr()
      } else {
        rl.question('1.true\n2.false\n是否ssr项目:', (ssr) => {
          if (ssr === '2') {
            proDetail[pro].isSsr = 'false'
          } else {
            proDetail[pro].isSsr = 'true'
          }
          checkSsr()
        })
      }
    })
	}

  const checkSsr = () => {
    if (proDetail[pro].isSsr === 'false') {
      spaBeforeBuild()
    } else {
      ssrBeforeBuild()
    }
  }

  const ssrBeforeBuild = () => {
    utils.copy({
      oldPath: path.resolve(__dirname, './setting'), 
      newPath: path.resolve(__dirname, `../../.elscms/${pro}web`),
      params: {
        pro
      }
    })

    let importStr = ''
    let defaultConfig = utils.updateDefaultConfig({
      fileName: './client.config.js',
      defaultPort,
      pro
    })
    if (hasConfig) {
      importStr = `const hasMainConfig = true \nconst mainConfig = require('./pro/${pro}/vue.config.js')\n`
    } else {
      importStr = `const hasMainConfig = false \n`
    }
    fs.writeFileSync(path.resolve(__dirname, `../vue.config.js`), importStr + defaultConfig) 

    rl.close();
    const clientWorkerProcess = exec(`npm run build`, {stdio: 'inherit', encoding: 'utf8'}, (err, std, stderr) => {
      console.log(err)
      console.log(std)
      console.log(stderr)
    })
    clientWorkerProcess.stdout.on('data', (data) => {
      console.log(data)
      if (data.indexOf('Compiled successfully in') >= 0) {
        let bundle
        let defaultConfigString = utils.updateDefaultConfig({
          fileName: './server.config.js',
          defaultPort,
          pro
        })
        fs.writeFileSync(path.resolve(__dirname, `../vue.config.js`), defaultConfigString)
        const webpackConfig = require('@vue/cli-service/webpack.config');
        const serverCompiler = webpack(webpackConfig);
        serverCompiler.outputFileSystem = mfs;
        serverCompiler.watch({}, (err, stats) => {
          if (err) {
            throw err;
          }
          stats = stats.toJson();
          stats.errors.forEach(error => console.error(error));
          stats.warnings.forEach(warn => console.warn(warn));
          const bundlePath = path.join(
            webpackConfig.output.path,
            'vue-ssr-server-bundle.json',
          );
          bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
          fs.writeFileSync(
            path.resolve(__dirname, `../../app/web/${pro}web/vue-ssr-server-bundle.json`),
            JSON.stringify(bundle)
          )
          fs.writeFileSync(
            path.resolve(__dirname, `../../app/web/${pro}web/ssr.html`),
            fs.readFileSync(path.resolve(__dirname, `../pro/${pro}/ssr.html`))
          )
          console.log('Startup complete')
          process.exit()
        })
      }
    })
  }

  const spaBeforeBuild = () => {
    fs.writeFileSync(path.resolve(__dirname, '../../.elscms/proConfig.json'), JSON.stringify(proDetail, null, 2))

    let importStr = ''
    let defaultConfig = utils.updateDefaultConfig({
      fileName: './vue.config.js',
      defaultPort,
      pro
    })
    if (hasConfig) {
      importStr = `const hasMainConfig = true \nconst mainConfig = require('./pro/${pro}/vue.config.js')\n`
    } else {
      importStr = `const hasMainConfig = false \n`
    }
    fs.writeFileSync(path.resolve(__dirname, `../vue.config.js`), importStr + defaultConfig)

    const clientWorkerProcess = exec(`npm run build`, {stdio: 'inherit', encoding: 'utf8'}, (err, std, stderr) => {
      console.log(err)
      console.log(std)
      console.log(stderr)
    })

    clientWorkerProcess.stdout.on('data', (data) => {
      console.log(data)
      if (data.indexOf('Compiled successfully in') >= 0) {
        process.exit()
      }
    })
  }
}

build()