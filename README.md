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

#### options.prefix
Type: `String`
Default value: ``

本地目录前缀，同步服务器的目录会将前缀去掉

#### options.dir
Type: `String`
Default value: ``

服务器存放当前项目的目录

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
      urlrandom:true,
      dir:"test",
      prefix:"test"
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
        id:"gamecenter",
        urlrandom:false,
        prefix:dir,
        dir:"test"
      },
      single:{
        options:{
          action:"changed"
        },
        src:"<%= currentPath %>"
        
      }
    },
    watch:{
      main: {
        options: {
          spawn: false,
         
      },
        files: [
           'test/**'
        ]
      }

    }
})
grunt.event.on('watch',function(action,filepath,target){
    grunt.config('currentPath',filepath);
    grunt.task.run("mpt:single");
});

```
