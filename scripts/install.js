const fs = require('fs');
const path = require('path');
const exec = require('shelljs.exec');
const ln = require('symlink-dir')

const PKGDIR = './packages';
const TPLDIR = './template';

// 1. Do `npm i` in template.
npm('install',TPLDIR);

// 2. Do `npm i` in all packages and symlinking it in template.

fs.readdirSync(PKGDIR).forEach(pkg => {
    if(fs.existsSync( path.join(PKGDIR,pkg,'package.json')) ){
        npm('install',path.join(PKGDIR,pkg));
        ln(path.join(PKGDIR,pkg),path.join(TPLDIR,'node_modules',pkg));
    }
})



function npm(command,dir){
    if(dir)
        exec(`npm --prefix ${dir} ${command}`);
    else
        exec(`npm ${command}`);
}
