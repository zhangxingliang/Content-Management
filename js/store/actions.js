const actions = {
  [types.GET_MATERIALS](context, payload) {
    if (payload.source.children.length > 0 && !context.state.alwaysGet) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    } else {
      var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/getchildobjects', {
        siteCode: _siteCode,
        usertoken: _userToken,
        pathtype: 'http',
        path: (payload.source.path)
      })
      return new Promise((resolve, reject) => {
        axios.get(URL).then(res => {
          if (res.data) {
            context.commit({
              type: types.SET_MATERIALS,
              target: payload.source,
              data: util.parseData(res.data.ext, payload.source)
            })
            resolve()
          } else {
            util.Notice.success(_language[_curLang].tip, _language[_curLang].getClipListFailed, 1000);
          }
        })
      })
    }
  },
  [types.GET_MATERIALS2](context, payload) {
    if (payload.source.children.length > 0) {
      return new Promise((resolve, reject) => {
        resolve()
      })
    } else {
      var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/getchildobjects', {
        siteCode: _siteCode,
        usertoken: _userToken,
        pathtype: 'http',
        path: (payload.source.path)
      })
      return new Promise((resolve, reject) => {
        axios.get(URL).then(res => {
          if (res.data) {
            context.commit({
              type: types.SET_MATERIALS,
              target: payload.source,
              data: util.parseData(res.data.ext, payload.source)
            })
            resolve()
          } else {
            util.Notice.success(_language[_curLang].tip, _language[_curLang].getClipListFailed, 1000);
          }
        })
      })
    }
  },
  [types.TOGGLE_FOLDER](context, payload) {
    if (payload.source.guid === 1) {
      context.dispatch({
        type: types.GET_SEARCHMODEL,
        source: payload.source
      }).then(() => {
        context.commit({
          type: types.TOGGLE_FOLDER,
          target: payload.source
        })
      })
    } else if (payload.source.guid === 2) {

    } else if (payload.source.guid === -1) {

    } else {
      context.dispatch({
        type: types.GET_MATERIALS,
        source: payload.source
      }).then(() => {
        context.commit({
          type: types.TOGGLE_FOLDER,
          target: payload.source
        })
      })
    }
  },
  [types.EXPAND_FOLDER](context, payload) {
    if (payload.source.guid === 1) {
      context.dispatch({
        type: types.GET_SEARCHMODEL,
        source: payload.source
      }).then(() => {
        context.commit({
          type: types.EXPAND_FOLDER,
          target: payload.source
        })
      })
    } else {
      context.dispatch({
        type: types.GET_MATERIALS,
        source: payload.source
      }).then(() => {
        context.commit({
          type: types.EXPAND_FOLDER,
          target: payload.source
        })
      })
    }
  },
  [types.UPLOAD_FILES](context, payload) {
    var URL1 = golbalSetting.CM + '/Handler/WebLargeFileUploadService.aspx'
    var URL2 = golbalSetting.CM + '/Handler/WebUploadSevice.aspx'

    var files = payload.data.files;
    var father = payload.source || context.getters.currentNode;
    var uploadPath = golbalSetting.uploadPath + '/' + new Date().format("yyyy-MM-dd");

    [].forEach.call(files, item => {
      var material = util.initData(item, father)
      var index = 0
      var symbol = Symbol()
      context.commit({
        type: types.PUSH_EVENT,
        data: {
          type: types.UPLOAD_FILES,
          target: material
        },
        symbol: symbol
      })
      util.cellUpload(URL1, uploadPath, material.file, (data) => {
        index++
        material.percent = Math.round(index / data.total * 100, 2)
        if (index === data.total) {
          context.dispatch({
            type: types.SAVE_OBJECTINFO,
            data: {
              name: material.name,
              folderPath: father.path,
              filePath: uploadPath + '/' + data.name,
              fileType: material.file.type,
            }
          }).then((res) => {
            material.guid = res.data.ext.contentid
            material.uploading = false
            // 获取信息
            util.updateMaterial(father.children, {
              guid: material.guid
            }, context)
            //删除事件
            context.commit({
              type: types.DELETE_EVENT,
              symbol: symbol
            })
          }).catch((res) => {
            // 提示上传失败 是否删除material？ 或者支持重新上传或者入库
            context.commit({
              type: types.RECOVERY_EVENT,
              symbol: symbol
            })
          })
        }
      //更新进度
      //此处应push event  失败再回退，成功则更新material
      //入库
      }, () => {
        //上传失败
      })
      material.uploading = true
      father.children.push(material)
    });
  /*
      [].forEach.call(files, item => {
        var material = util.initData(item, father)
        util.upload(URL2, '/ext_file_root/bucket-z/cmupload', material.file, (data) => {
          material.percent = Math.round(data.loaded / data.total * 100, 2)
          if (data.loaded === data.total) {
            context.dispatch({
              type: types.SAVE_OBJECTINFO,
              data: {
                name: data.name,
                folderPath: father.path,
                filePath: uploadPath,
                fileType: material.file.type,
              }
            }).then((res) => {
              //根据guid更新material 未实现
              util.updateMaterial(father, {}, context)
            })
          }
        //更新进度
        //入库
        }, () => {
          //上传失败
        })
      })*/
  },
  [types.BACK_UP](context, payload) {
    context.commit({
      type: types.BACK_UP
    })
  },
  [types.LOGIN](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/basic/account/getcurrentuserinfo', {
      usertoken: _userToken,
      siteCode: _siteCode
    })
    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code === '0') {
          context.commit({
            type: types.SET_USERINFO,
            data: res.data.ext
          })
          resolve()
        } else {
          reject()
        }
      })
    })
  },
  [types.GET_OBJECT_INFO](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/getobjectinfo', {
      usertoken: _userToken,
      contentid: payload.data.contentid,
      pathtype: payload.data.pathtype,
      objecttype: payload.data.type,
      siteCode: _siteCode
    })
    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GET_FORMATE_INFO](context, payload) {
    var URL = util.getUrl('/GetClipInfo', {
      usertoken: _userToken,
      contentid: payload.data.clipid,
      objecttype: payload.data.sourceid,
      pathtype: 'http',
      isFormat: true,
      siteCode: _siteCode
    })
    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        resolve(res)
      })
    })
  },
  [types.GET_SEARCHMODEL](context, payload) {
    var URL = util.getUrl(golbalSetting.CM + "/Handler/MaterialList.ashx")
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: URL,
        data: {
          OperationType: "GetSearchResult",
          usertoken: _userToken,
          loginname: context.state.userInfo.loginName
        },
        dataType: "json",
        async: true,
        complete: function() {},
        success: function(data) {
          if (data.R) {
            context.commit({
              type: types.GET_SEARCHMODEL,
              target: payload.source,
              data: data.R
            })
            resolve()
          }
        }
      })
    })
  },
  [types.GET_SEARCHRESULT](context, payload) {
    var URL = util.getUrl(golbalSetting.CM + "/Handler/MaterialList.ashx")
    var model = JSON.parse(decodeURIComponent($.base64.decode(payload.source.data)));
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: URL,
        data: model,
        dataType: "json",
        async: true,
        complete: function() {},
        success: function(data) {
          if (data.R) {
            var data = JSON.parse(data.R);
            if (data.code == '0') {
              context.commit({
                type: types.SET_MATERIALS,
                target: payload.source,
                data: util.parseData(data.ext, payload.source, model.searchType)
              })
              resolve()
            } else {
              util.Notice.success(_language[_curLang].tip, _language[_curLang].getClipListFailed, 1000);
            }
          }
        }
      })
    })
  },
  [types.REFRESH_MATERIAL](context, payload) {
    payload.source = payload.source || context.getters.currentNode
    if (payload.source.guid === 1) {

    } else if (payload.source.guid === 2) {
      return new Promise((resolve, reject) => {
        context.dispatch({
          type: types.GET_SEARCHRESULT,
          source: payload.source
        }).then(() => {
          resolve()
        })
      })
    } else if (payload.source.guid === -1) {
      return new Promise((resolve, reject) => {
        context.dispatch({
          type: types.GET_FAVORITERESULT,
          source: payload.source
        }).then(() => {
          resolve()
        })
      })
    } else {
      var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/getchildobjects', {
        siteCode: _siteCode,
        usertoken: _userToken,
        pathtype: 'http',
        path: (payload.source.path)
      })

      return new Promise((resolve, reject) => {
        axios.get(URL).then(res => {
          context.commit({
            type: types.SET_MATERIALS,
            target: payload.source,
            data: util.parseData(res.data.ext, payload.source)
          })
          resolve()
        })
      })
    }
  },
  [types.UPDATE_MATERIALS](context, payload) {
    var tarr = payload.data.type.split('.')
    if (tarr[0] === 'TREE' || tarr[0] === 'RESOURCE') {
      if (tarr[2] === 'UPDATE') {
        util.updateMaterial(context.state.nodes, payload.data, context)
      } else if (tarr[2] == 'CREATE' || tarr[2] == 'RECOVERED') {
        util.getMaterialFoder(context.state.nodes, payload.data).then(res => {
          context.dispatch({
            type: types.REFRESH_MATERIAL,
            source: res
          })
        })
      } else if (tarr[2] == 'RECYCLED' || tarr[2] == 'MOVED') {
        util.deleteMaterial(context.state.nodes, payload.data)
      }
    } else {
      util.updateMaterial(context.state.nodes, payload.data, context)
    }
  },
  [types.GET_FAVORITERESULT](context, payload) {
    var URL = util.getUrl('Cm/GetFavoriteObject', {
      usertoken: _userToken,
      usercode: context.state.userInfo.userCode,
      siteCode: _siteCode
    })
    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        context.commit({
          type: types.SET_MATERIALS,
          target: payload.source,
          data: util.parseData(res.data, payload.source)
        })
        resolve()
      })
    })
  },
  //重命名
  [types.RENAME](context, payload) {
    var URL
    if (payload.source.type === 'folder') {
      URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/folder/renamefolder', {
        usertoken: _userToken,
        srcpath: payload.source.path,
        name: payload.data
      })
    } else {
      URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/renameobject', {
        usertoken: _userToken,
        contentid: payload.source.guid,
        newobjectname: payload.data
      })
    }

    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  //触发Rename
  [types.DISPATCH_RENAME](context, payload) {
    var node = context.state.selectedMaterials[0]
    node.renaming = true
    Vue.nextTick(() => {
      document.querySelector('.rename_input').focus()
    })

  },
  //触发Rename
  [types.DISPATCH_ADD_FOLDER](context, payload) {
    var node
    if (payload.target && payload.target.length) {
      if (payload.target[0].selecting) { //左侧树
        node = payload.target[0]
        context.dispatch({
          type: types.GET_MATERIALS,
          source: node
        }).then(() => {
          context.commit({
            type: types.GET_NAVPATH,
            target: node,
            data: []
          })
          util.newFolder(context, node)
        })
      } else {
        return
      }
    } else {
      node = context.getters.currentNode
      util.newFolder(context, node)
    }
  },
  //新建文件夹
  [types.ADD_FOLDER](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/folder/createfolder', {
      usertoken: _userToken,
      parentpath: payload.source.path,
      name: payload.data
    })

    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  //删除素材到回收站
  [types.RECYCLE](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/deleteobjects', {
      usertoken: _userToken,
    })
    var contentids = []
    if (payload.target && payload.target.length) {
      if (payload.target[0].father.guid == 0) {
        context.dispatch({
          type: types.DELETE,
          target: payload.target
        })
        return
      }
      payload.target.forEach(item => {
        contentids.push(item.guid)
        item.father.children.remove(item)
      })
    }

    var body = contentids.join(',')
    //body  contentid Arr
    var symbol = Symbol()
    context.commit({
      type: types.PUSH_EVENT,
      data: {
        type: types.RECYCLE,
        from: payload.target[0].father,
        data: payload.target
      },
      symbol: symbol
    })
    return new Promise((resolve, reject) => {
      axios.post(URL, JSON.stringify(body)).then(res => {
        if (res.data.code == '0') {
          context.commit({
            type: types.DELETE_EVENT,
            symbol: symbol
          })
          util.Notice.success('recycle to trash success!', '', 100)
          resolve(res)
        } else {
          context.commit({
            type: types.RECOVERY_EVENT,
            symbol: symbol
          })
          util.Notice.warning('recycle to trash failed!', '', 100)
          reject(res)
        }
      })
    })
  },
  // 彻底删除素材
  [types.DELETE](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/purgeobjects', {
      usertoken: _userToken,
    })
    var contentids = []
    payload.target.forEach(item => {
      contentids.push(item.guid)
      item.father.children.remove(item)
    })

    var body = contentids.join(',')
    //body  contentid Arr
    var symbol = Symbol()
    context.commit({
      type: types.PUSH_EVENT,
      data: {
        type: types.DELETE,
        data: payload.target
      },
      symbol: symbol
    })
    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, JSON.stringify(body)).then(res => {
        if (res.data.code == '0') {
          context.commit({
            type: types.DELETE_EVENT,
            symbol: symbol
          })
          resolve(res)
        } else {
          context.commit({
            type: types.RECOVERY_EVENT,
            symbol: symbol
          })
          reject(res)
        }
      })
    })
  },
  [types.RESTORE_ALL](context, payload) {
    return context.dispatch({
      type: types.RESTORE,
      target: context.getters.currentNode.children
    })
  },
  // 从回收站还原素材
  [types.RESTORE](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/restoreobjectsfromrecycle', {
      usertoken: _userToken,
    })
    var contentids = []
    payload.target.forEach(item => {
      contentids.push(item.guid)
      item.father.children.remove(item)
    })

    var body = contentids.join(',')
    //body  contentid Arr
    var symbol = Symbol()
    context.commit({
      type: types.PUSH_EVENT,
      data: {
        type: types.RESTORE,
        data: payload.target
      },
      symbol: symbol
    })
    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, JSON.stringify(body)).then(res => {
        if (res.data.code == '0') {
          context.commit({
            type: types.DELETE_EVENT,
            symbol: symbol
          })
          resolve(res)
        } else {
          context.commit({
            type: types.RECOVERY_EVENT,
            symbol: symbol
          })
          reject(res)
        }
      })
    })
  },
  //剪贴
  [types.CUT](context, payload) {
    //push to clipbord
    context.commit({
      type: types.CLEAR_CLIPBOARD
    })
    context.commit({
      type: types.SET_CLIPBOARDSTATUS,
      data: true
    })
    var materials = context.state.selectedMaterials
    materials.forEach(item => {
      item.cutting = true
      context.commit({
        type: types.ADD_CLIPBOARD,
        data: item
      })
    })
  },
  //复制
  [types.COPY](context, payload) {
    //push to clipbord
    context.commit({
      type: types.CLEAR_CLIPBOARD
    })
    context.commit({
      type: types.SET_CLIPBOARDSTATUS,
      data: false
    })
    var materials = context.state.selectedMaterials
    materials.forEach(item => {
      item.copping = true
      context.commit({
        type: types.ADD_CLIPBOARD,
        data: item
      })
    })
  },
  [types.MOVE_MATERIALS](context, payload) {
    var arr = payload.data,
      target = payload.target;
    if (arr.length) {
      if (arr[0].father.guid == target.guid) {
        //notice can not paste same folder
        util.Notice.warning('can not paste in this folder')
      } else if (arr.some(item => {
          util.getAllFather(target).indexOf(item) //要粘贴的目录是剪贴板某目录的子目录
        })) {
        util.Notice.warning('can not paste in this folder')
      } else {
        //此处直接移动元素  pushevent
        //event Arr push
        var symbol = Symbol()
        context.commit({
          type: types.PUSH_EVENT,
          data: {
            type: types.MOVE_OBJECTS,
            from: arr[0].father,
            to: target,
            data: arr.map(item => item.guid)
          },
          symbol: symbol
        })
        arr.forEach(item => {
          item.father.children.remove(item)
          item.father = target
          if (item.type == 'folder') {
            item.path = target.path + '/' + item.name
          }
          item.folderpath = target.path
          target.children.push(item)
        })
        var arrs = [];
        arr.forEach(item => {
          arrs.push(item.guid)
        })
        context.dispatch({
          type: types.MOVE_OBJECTS,
          data: {
            path: target.path,
            contentids: arrs.join(',')
          }
        }).then(res => {
          //删除事件
          context.commit({
            type: types.DELETE_EVENT,
            symbol: symbol
          })
          util.Notice.warning(res.data.msg)
        }).catch(res => {
          //还原事件
          context.commit({
            type: types.RECOVERY_EVENT,
            symbol: symbol
          })
          util.Notice.warning(res.data.msg)
        })
      //util.Notice.info('paste success')
      }
    }
  },
  [types.COPY_MATERIALS](context, payload) {
    var arr = payload.data,
      target = payload.target;
    if (arr.length) {
      /*if (arr[0].father.guid == target.guid) {
        //notice can not paste same folder
        util.Notice.warning('can not paste in this folder')
      } else*/
      if (arr.some(item => {
          util.getAllFather(target).indexOf(item) //要粘贴的目录是剪贴板某目录的子目录
        })) {
        util.Notice.warning('can not paste in this folder')
      } else {
        context.dispatch({
          type: types.COPY_OBJECTS,
          data: {
            target: target,
            materials: arr
          }
        }).then(res => {
          util.Notice.warning(res.data.msg)
        }).catch(res => {
          util.Notice.warning(res.data.msg)
        })
      }
    }
  },
  //粘贴
  [types.PASTE](context, payload) {
    //paste
    var node = (payload.target && payload.target.length) ? payload.target[0] : context.getters.currentNode
    if (context.state.clipBoardSymbol) {
      //粘贴
      context.dispatch({
        type: types.MOVE_MATERIALS,
        data: context.state.clipBoard,
        target: node
      })
    } else {
      //复制
      context.dispatch({
        type: types.COPY_MATERIALS,
        data: context.state.clipBoard,
        target: node
      })
    }
  },
  //粘贴
  [types.DOWNLOAD](context, payload) {
    //push to clipbord
    if (payload.target && payload.target.length) {
      payload.target.forEach(item => {
        context.dispatch({
          type: types.GET_OBJECT_INFO,
          data: {
            contentid: item.guid,
            pathtype: 'http',
            type: item.typeid
          }
        }).then(res => {
          var url = util.getDownloadUrl(res.data.ext)
          var ele = document.createElement('a')
          ele.setAttribute('href', url)
          ele.setAttribute('download', item.name)
          document.body.appendChild(ele)
          ele.click()
          document.body.removeChild(ele)
        })
      })
    }
  },
  //获取导出站点列表
  [types.GET_EXPORTSITES](context, payload) {
    //push to clipbord
  },
  //导出到三方站点
  [types.EXPORT](context, payload) {
    //push to clipbord
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/database/getjsonbysql', {
      usertoken: _userToken,
    })
    var body = '\"SELECT DISTINCT * FROM ET_COMMONGWSITE WHERE SITETYPE=1 AND SITEID IN(SELECT SITEID FROM ET_COMMONGWSITE_DATA WHERE (USERID={0} AND USERTYPE=1) OR ({1}USERTYPE=2))\"'
  },
  //AUTO_PACKEGE
  [types.AUTO_PACKEGE](context, payload) {
    //push to clipbord
    var pomiseArr = []
    if (payload.target && payload.length) {
      payload.target.forEach(item => {
        var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/program/autoPackege', {
          userToken: _userToken,
          clipGuid: item.guid,
          edlGuid: _autoPackageTemp,
          entityName: 'AutoPackege-' + item.name,
          folderPath: _autoPackagePath,
          siteCode: _siteCode
        })
        promiseArr.push(new Promise((resolve, reject) => {
          axios.get(URL).then(res => {
            if (res.data.code == '0') {
              resolve(res)
            } else {
              reject(res)
            }
          })
        }))
      })
      return Promise.all(pomiseArr)
    }

  },
  //16:9
  [types.SD169](context, payload) {
    //push to clipbord
    if (payload.target && payload.target.length) {
      payload.target.forEach(item => {
        context.dispatch({
          type: types.GET_OBJECT_INFO,
          data: {
            contentid: item.guid,
            pathtype: 'http',
            type: item.typeid
          }
        }).then(res => {
          var json = res.data.ext
          var subType = json.entity.subtype
          if (payload.data.type == '64') {
            subType = '64'
          }
          if (json.entity && json.entity.item) {
            json.entity.item.imagetype = 2
          } else {
            util.Notice.warning('16:9 shiabi', item.name, 1000)
          }
          context.dispatch({
            type: types.SAVE_OBJECT_INFO,
            data: {
              object: json,
              version: 1,
              type: GetEntityType(json.entity.type, subType)
            }
          }).then(res => {
            util.Notice.success('16:9 success', item.name, 1000)
          }).catch(res => {
            util.Notice.warning('16:9 shiabi', item.name, 1000)
          })
        })
      })
    }
  },
  //入库
  [types.SAVE_OBJECTINFO](context, payload) {
    return new Promise((resolve, reject) => {
      var filepath = payload.data.filePath.replace('/ext_file_root/bucket-z', golbalSetting.UPLOADPATH),
        fileType = payload.data.fileType,
        logicPath = payload.data.folderPath,
        name = payload.data.name;

      var type = 'biz_sobey_video',
        subType = ClipSubType.ET_CLIPTYPE_UNKNOW,
        cliptype = ObjectType.ET_ObjType_Clip,
        createDate = new Date().format('yyyy-MM-dd hh:mm:ss');
      fileSuffix = filepath.substring(filepath.lastIndexOf('.') + 1).toLowerCase();

      if (fileType.indexOf('image') > -1) {
        type = "biz_sobey_picture";
        subType = ClipSubType.ET_CLIPTYPE_IMAGE;
      } else if (['bmp', 'dip', 'jpg', 'jpeg', 'jpe', 'jfif', 'jif', 'tif', 'tiff', 'png', 'tga'].indexOf(fileSuffix) > -1) {
        type = "biz_sobey_picture";
        subType = ClipSubType.ET_CLIPTYPE_IMAGE;
      } else if (fileType.indexOf('video') > -1) {
        type = "biz_sobey_video";
        subType = ClipSubType.ET_CLIPTYPE_AV;
      } else if (['avi', 'mxf', 'mov', 'mp4', 'mpg', 'rmvb', '3g2', 'm2p', 'vob', 'f4v', 'mkv', 'flv', 'm2v', 'ps', 'ts', 'es', 'rm', 'gxf'].indexOf(fileSuffix) > -1) {
        type = "biz_sobey_video";
        subType = ClipSubType.ET_CLIPTYPE_AV;
      } else if (fileType.indexOf('audio') > -1) {
        type = "biz_sobey_audio";
        subType = ClipSubType.ET_CLIPTYPE_A;
      } else if (fileType.indexOf("pdf") > -1) { //pdf
        type = "biz_sobey_document";
        subType = ClipSubType.ET_CLIPTYPE_PDF;
      } else if (['doc', 'docx'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_WORD;
        type = "biz_sobey_document";
      } else if (['xls', 'xlsx'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_EXCEL;
        type = "biz_sobey_document";
      } else if (['ppt', 'pptx'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_PPT;
        type = "biz_sobey_document";
      } else if (['pdf'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_PDF;
        type = "biz_sobey_document";
      } else if (['txt'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_TXT;
        type = "biz_sobey_document";
      }
      //else if (fileSuffix == "csv")//TODO
      //{
      //    subType = ClipSubType.ET_CLIPTYPE_WORD;
      //    type = "biz_sobey_document";
      //}
      //else if (fileSuffix == "rtf")//TODO
      //{
      //    subType = ClipSubType.ET_CLIPTYPE_WORD;
      //    type = "biz_sobey_document";
      //}
      else if (fileType.indexOf("officedocument") > -1) { //office
        type = "biz_sobey_document";
        if (['doc', 'docx'].indexOf(fileSuffix) > -1) {
          subType = ClipSubType.ET_CLIPTYPE_WORD;
        } else if (['xls', 'xlsx'].indexOf(fileSuffix) > -1) {
          subType = ClipSubType.ET_CLIPTYPE_EXCEL;
        } else if (['ppt', 'pptx'].indexOf(fileSuffix) > -1) {
          subType = ClipSubType.ET_CLIPTYPE_PPT;
        } else if (['pdf'].indexOf(fileSuffix) > -1) {
          subType = ClipSubType.ET_CLIPTYPE_PDF;
        }
      } else if (['zip', 'rar', '7z', 'cab', 'tar', 'dmg', 'ace', 'lzh'].indexOf(fileSuffix) > -1) {
        subType = ClipSubType.ET_CLIPTYPE_ZIP;
        type = "biz_sobey_other";
      } else {
        type = "biz_sobey_other";
        subType = ClipSubType.ET_CLIPTYPE_OTHER;
      }

      var json = {
        type: type,
        version: 1,
        object: {
          entity: {
            folderpath: logicPath,
            guid: Guid.NewGuid().ToString("N"),
            modifyterminal: context.state.userInfo.ip,
            name: name,
            status: 0,
            subtype: subType,
            type: cliptype,
            usedflag: 0
          }
        }
      }
      if (subType == ClipSubType.ET_CLIPTYPE_IMAGE) {
        json.object.entity.item = {
          capturestatus: 0,
          videostandard: 16,
          trimin: 0,
          trimout: 40000000,
          length: 863999600000,
          clipfile: [
            {
              qualitytype: 0,
              filestatus: 0,
              clipclass: 1,
              filename: filepath,
              mediachannel: 1
            }
          ]
        }
      } else {
        json.object.entity.item = {
          capturestatus: 0,
          clipfile: [
            {
              qualitytype: 0,
              filestatus: 0,
              clipclass: 1,
              filename: filepath,
              mediachannel: 1
            }
          ]
        }
      }
      if (type == "biz_sobey_audio" || type == "biz_sobey_video") {
        context.dispatch({
          type: types.GET_IMPORT_INFO,
          data: json
        }).then(res => {
          var resJson = res.data.ext
          if (resJson && resJson.object && resJson.object.entity && resJson.object.entity.item) {
            var videostandard = resJson.object.entity.item.videostandard
            if (ET_VideoStandardIsHD(videostandard)) {
              resJson.object.entity.item.imagetype = 0
            } else {
              resJson.object.entity.item.imagetype = 4
            }
            context.dispatch({
              type: types.SAVE_OBJECT_INFO,
              data: resJson
            }).then(res => {
              //获取低质量  入taskmonitor  更新素材
              context.dispatch({
                type: types.GENERATING_LOW_BITRATE,
                data: res.data.ext.contentid
              }).then(res => {
                util.Notice.info(res.data.msg, '', 1000)
              }).catch(res => {
                util.Notice.warning(res.data.msg, '')
              })
              //入taskmonitor
              context.dispatch({
                type: types.ADD_TASK,
                data: {
                  contentid: res.data.ext.contentid,
                  messageid: res.data.ext.messageid,
                  type: 1,
                  name: name
                }
              })
              resolve(res)
              util.Notice.success(res.data.msg, '', 1000)
            }).catch(res => {
              reject(res)
              util.Notice.warning(res.data.msg, '', 1000)
            })
          }
        }).catch(res => {
          util.Notice.warning(res.data.msg, '', 1000)
        })
      } else {
        context.dispatch({
          type: types.SAVE_OBJECT_INFO,
          data: json
        }).then(res => {
          //入taskmonitor
          context.dispatch({
            type: types.ADD_TASK,
            data: {
              contentid: res.data.ext.contentid,
              messageid: res.data.ext.messageid,
              type: 1,
              name: name
            }
          })
          resolve(res)
          util.Notice.success(res.data.msg, '', 1000)
        }).catch(res => {
          reject(res)
          util.Notice.warning(res.data.msg, '')
        })
      }
    })
  },
  [types.GET_IMPORT_INFO](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPIWIN + '/CMApi/api/entity/entityrest/getImportInfo', {
      userToken: _userToken,
    })
    var body = payload.data

    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, body).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GENERATING_LOW_BITRATE](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPIWIN + '/CMApi/api/entity/entityrest/generatinglowbitrate', {
      usertoken: _userToken,
      contentid: payload.data
    })

    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.ADD_TASK](context, payload) {
    var URL = util.getUrl(golbalSetting.TMSERVICE + '/sobey/plat/cmd', {
      userToken: _userToken,
    })
    var body = {
      TaskRquest: {
        TaskGuid: Guid.NewGuid().ToString("N"),
        RefTaskGuid: payload.data.contentid,
        StudioID: null,
        MessageID: payload.data.messageid,
        TaskName: payload.data.name,
        TaskType: payload.data.type,
        CreateTime: new Date().format('yyyy-MM-dd hh:mm:ss'),
        CreateUserCode: context.state.userInfo.userCode,
        CreateUserName: context.state.userInfo.userName,
        AttributeItems: null
      },
      RequestID: "00000000-0000-0000-0000-000000000000",
      IsMultiple: false,
      IsCompleted: true,
      CommandName: "TaskMonitorPlugin.AddTaskRequest"
    }

    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, body).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.MULTI_SELECTITEMS](context, payload) {
    var start = Math.max(Math.min(context.state.signIndex, payload.data), 0)
    var end = Math.min(Math.max(context.state.signIndex, payload.data), context.getters.currentNode.children.length - 1)

    for (var i = start; i <= end; i++) {
      var material = context.getters.currentNode.children[i]
      material.selected = true
      context.commit({
        type: types.ADD_SELECTEDITEM,
        data: material
      })
    }
  },
  [types.MOVE_OBJECTS](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/moveobjects', {
      usertoken: _userToken,
      desfolderpath: payload.data.path
    })

    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, JSON.stringify(payload.data.contentids)).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.COPY_OBJECTS](context, payload) {
    var promiseArr = [],
      materials = payload.data.materials,
      target = payload.data.target;

    materials.forEach(item => {
      if (item.type != 'folder') {
        promiseArr.push(util.copyObject(context, item, target))
      } else {
        promiseArr.push(util.copyFolder(context, item, target))
      }
    })
    return new Promise((resolve, reject) => {
      Promise.all(promiseArr).then(res => {
        resolve(res)
      }).catch(res => {
        reject(res)
      })
    })
  },
  [types.SAVE_OBJECT_INFO](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/saveobjectinfo', {
        usertoken: _userToken,
      }),
      body = payload.data

    //body  contentid Arr
    return new Promise((resolve, reject) => {
      axios.post(URL, body).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GET_TRASHCAN_OBJECTS](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/recycleresourcesearch', {
        usertoken: _userToken,
      }),
      body = {
        name: '',
        orderBy: '',
        page: 1,
        size: 10000,
        sort: ''
    }

    return new Promise((resolve, reject) => {
      axios.post(URL, body).then(res => {
        if (res.data.code == '0') {
          context.commit({
            type: types.SET_MATERIALS,
            target: payload.source,
            data: util.parseTrashCanData(res.data.ext.resultList, payload.source)
          })
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.CLEAR_TRASHCAN_OBJECTS](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/entity/object/clearrecovery', {
      usertoken: _userToken,
    })

    return new Promise((resolve, reject) => {
      axios.post(URL, null).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GET_ALLDEPT](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/basic/account/getalldeptinfo', {
      usertoken: _userToken,
    })

    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GET_ALLUSER](context, payload) {
    var URL = util.getUrl(golbalSetting.CMAPI + '/CMApi/api/basic/account/getalluser', {
      usertoken: _userToken,
    })

    return new Promise((resolve, reject) => {
      axios.get(URL).then(res => {
        if (res.data.code == '0') {
          resolve(res)
        } else {
          reject(res)
        }
      })
    })
  },
  [types.GET_USERTREE](context, payload) {
    return new Promise((resolve, reject) => {
      Promise.all([context.dispatch({
        type: types.GET_ALLUSER
      }),
        context.dispatch({
          type: types.GET_ALLDEPT
        })]).then(res => {
        var deptArr = res[1].data.ext
        var userArr = res[0].data.ext
        context.state.userDept = util.getDptUserTree(deptArr, userArr, payload.data)
      }).catch(res => {
        reject(res)
      })
    })
  },
  [types.OPEN_FOLDER](context, payload) {
    if (payload.target && payload.target.length)
      util.locateFolder(context, payload.target[0].path.split('/').slice(1), {
        children: context.getters.folderTree
      })
  },
  [types.SET_SORTTYPE](context, payload) {
    switch (payload.data) {
      case context.state.dict.title + '  ↑':
        context.state.sortType = 'title'
        context.state.sortSymbol = true
        break;
      case context.state.dict.title + '  ↓':
        context.state.sortType = 'title'
        context.state.sortSymbol = false
        break;
      case context.state.dict.createTime + '  ↑':
        context.state.sortType = 'createTime'
        context.state.sortSymbol = true
        break;
      case context.state.dict.createTime + '  ↓':
        context.state.sortType = 'createTime'
        context.state.sortSymbol = false
        break;
      case context.state.dict.type:
        context.state.sortType = 'type'
        context.state.typeSymbol = !context.state.typeSymbol
        break;
      default:

    }
    context.commit({
      type: types.SET_SIGNMATERIAL,
      data: 0
    })
  },
  [types.SELECT_MATERIAL](context, payload) {
    var index = payload.data < 0 ? 0 : payload.data
    index = index < context.getters.currentNode.children.length - 1 ? index : context.getters.currentNode.children.length - 1

    if (index > -1 && index < context.getters.currentNode.children.length) {
      context.commit({
        type: types.CLEAR_SELECTEEDITEMS
      })
      context.getters.currentNode.children[index].selected = true
      context.commit({
        type: types.ADD_SELECTEDITEM,
        data: context.getters.currentNode.children[index]
      })
      context.commit({
        type: types.SET_SIGNMATERIAL,
        data: index
      })
    }
  },
  [types.DISPATCH_UPLOAD](context, payload) {
    $('.upload_input').click()
  }
}
