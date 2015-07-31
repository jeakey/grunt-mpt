# grunt-mpt v0.1.0

> mpt debug

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mpt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mpt');
```

## The "mpt" task

### Overview
In your project's Gruntfile, add a section named `mpt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mpt: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.urlrandom
Type: `bool`
Default value: `false`

如果设置为true，将为目标url加上随机字符串，保证url的保密性。

#### options.id
Type: `String`
Default value: `(random string)`

用来映射本地文件的服务器目录。


### Usage Examples

#### Default Options

```js
grunt.initConfig({
  mpt: {
    options: {
      id:"gamecenter"
    },
    files: [{
      expand: true,
      cwd: 'test',
      src: ['**']
    }],
  },
})
```

#### 给url带上随机字符串

```js
grunt.initConfig({
  mpt: {
    options: {
      id:"gamecenter",
      urlrandom:true
    },
    files: [{
      expand: true,
      cwd: 'test',
      src: ['**']
    }],
  },
})
```
#### 增量更新

```js
grunt.initConfig({
  mpt: {
    options: {
      id:"gamecenter"
    },
    single:{
      options:{
        action:"changed"
      },
      src:["test/index.html"]
      
    }
  }
  watch:{
      main: {
          files: [
             'test/**'
          ],
          tasks:["mpt:single"]
      }
  }
})
grunt.event.on('watch',function(action,filepath,target){
    var filepath=filepath.replace("\\","/");
    grunt.config('mpt.single.src',[filepath]);
    
 });

```
