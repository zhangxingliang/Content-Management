
window.golbalSetting = {
  //"CMAPI" : "", //nginx
  "CMAPI": "http://hive.sobey.com:9023",

  "CMAPIWIN": "http://hive.sobey.com:9037",
  //"CM": "/CM",//nginx
  //"CM": "http://localhost:16006/",
  "CM": "http://hive.sobey.com:9021",

  //"TMSERVICE" : "/TMSERVICE",//nginx
  "TMSERVICE": "http://hive.sobey.com:9047",

  UPLOADPATH: '\\\\172.16.168.202\\hivefiles\\sobeyhive\\bucket-z',

  //"FL" : "/FL",//nginx
  "FL": "http://hive.sobey.com:9033",

  //"JOVE" : "/JOVE", //nginx for link
  "JOVE": "http://hive.sobey.com:9027/",

  //"TMWEB" : "/TMWEB"//nginx   for link
  "TMWEB": "http://hive.sobey.com:9049/",

  "uploadPath": '/ext_file_root/bucket-z/u20002/cmupload',

  "FAVSWITCH": false

};

var _pageTitle = 'Web Quick Editing';
var _siteRoot = '/';
var _userToken = '4130b39375361486bb31d753d284e09e';
var _resourceUrl = 'http://172.16.168.205:86/bucket-';
var _rootPath = 'global_sobey_defaultclass';
var _curLang = 'en' || 'en';
var _language = {};
var _previewUrl = 'http://hive.sobey.com:9021/ModulePage/webpreview.html';
var _userCode = 'MDZkYmE0NGY4ZTg4NDBiZWIwNGE5ZTFjODExMWI0YmE=';
var _tkUrl = 'http://172.16.168.205:9049/';
var _installedFontCollection = 'Aharoni;Andalus;Angsana New;AngsanaUPC;Aparajita;Arabic Typesetting;Arial;Arial Black;Batang;BatangChe;Browallia New;BrowalliaUPC;Calibri;Cambria;Cambria Math;Candara;Comic Sans MS;Consolas;Constantia;Corbel;Cordia New;CordiaUPC;Courier New;DaunPenh;David;DFKai-SB;DilleniaUPC;DokChampa;Dotum;DotumChe;Ebrima;Estrangelo Edessa;EucrosiaUPC;Euphemia;FangSong;Franklin Gothic Medium;FrankRuehl;FreesiaUPC;Gabriola;Gautami;Georgia;Gisha;Gulim;GulimChe;Gungsuh;GungsuhChe;Impact;IrisUPC;Iskoola Pota;JasmineUPC;KaiTi;Kalinga;Kartika;Khmer UI;KodchiangUPC;Kokila;Lao UI;Latha;Leelawadee;Levenim MT;LilyUPC;Lucida Console;Lucida Sans Unicode;Malgun Gothic;Mangal;Marlett;Meiryo;Meiryo UI;Microsoft Himalaya;Microsoft JhengHei;Microsoft New Tai Lue;Microsoft PhagsPa;Microsoft Sans Serif;Microsoft Tai Le;Microsoft Uighur;Microsoft YaHei;Microsoft Yi Baiti;MingLiU;MingLiU-ExtB;MingLiU_HKSCS;MingLiU_HKSCS-ExtB;Miriam;Miriam Fixed;Mongolian Baiti;MoolBoran;MS Gothic;MS Mincho;MS PGothic;MS PMincho;MS UI Gothic;MV Boli;Narkisim;NSimSun;Nyala;Palatino Linotype;Plantagenet Cherokee;PMingLiU;PMingLiU-ExtB;Raavi;Rod;Sakkal Majalla;Segoe Print;Segoe Script;Segoe UI;Segoe UI Light;Segoe UI Semibold;Segoe UI Symbol;Shonar Bangla;Shruti;SimHei;Simplified Arabic;Simplified Arabic Fixed;SimSun;SimSun-ExtB;Sylfaen;Symbol;Tahoma;Times New Roman;Traditional Arabic;Trebuchet MS;Tunga;Utsaah;Vani;Verdana;Vijaya;Vrinda;Webdings;Wingdings;Yle Bd;Yle Bl;Yle Condensed Bd;Yle Condensed Bl;Yle Condensed Li;Yle Condensed Md;Yle Condensed Rg;Yle Condensed Th;Yle Li;Yle Md;Yle Rg;Yle Th';
var _transCodeTemplate = '';
var _folderPath = 'U2VhcmNoIFJlc3VsdC9QdWJsaWM=';
var _siteCode = '';
var _preSNSPublishPath = '';
var _snsTransCodeType = '';
var _autoPackageTemp = '7accfbea77cd4fd590d2d26e2b0049b2';
var _autoPackagePath = 'global_sobey_defaultclass/MaterialList/Public Material/AutoPackege';

const ClipSubType = {
  // 素材子类型
  ET_CLIPTYPE_UNKNOW: 0x000000, // 未知素材
  ET_CLIPTYPE_AV: 0x000001, // 普通视音频素材
  ET_CLIPTYPE_V: 0x000002, // 普通视频素材
  ET_CLIPTYPE_A: 0x000004, // 普通音频素材
  ET_CLIPTYPE_XDCAM: 0x000008, // 蓝光素材
  ET_CLIPTYPE_TGA: 0x000010, // TGA素材
  ET_CLIPTYPE_IMAGE: 0x000020, // 图片
  ET_CLIPTYPE_P2: 0x000040, // P2素材
  ET_CLIPTYPE_SGCLIP: 0x000080, // SG素材，彩条素材
  ET_CLIPTYPE_HIDE: 0x000100, // 隐藏素材
  ET_CLIPTYPE_OA_EMPTYCLIP: 0x000200, //OA FOLDER中的空素材
  ET_CLIPTYPE_XDCAM_LIST: 0x000400, //蓝光素材表现方式，为了和ET_CLIPTYPE_XDCAM，单个区分开
  ET_CLIPTYPE_P2_LIST: 0x000800, //和XDCAM 方式一样
  ET_CLIPTYPE_INFINITY: 0x001000, //Infinity clip
  ET_CLIPTYPE_TXT: 0x002000, //txt文件
  ET_CLIPTYPE_WORD: 0x004000, //word 文件
  ET_CLIPTYPE_PPT: 0x008000, //ppt 文件
  ET_CLIPTYPE_EXCEL: 0x010000, //excel 文件
  ET_CLIPTYPE_PROJECT: 0x020000, //project 文件
  ET_CLIPTYPE_PDF: 0x040000, //pdf 文件
  ET_CLIPTYPE_MFEDL: 0x080000, //多格式EDL素材子类型 add by wcj 2010 -5 -5
  ET_CLIPTYPE_E2: 0x100000, //E2素材
  ET_CLIPTYPE_E2_LIST: 0x200000, //
  ET_CLIPTYPE_DVD: 0x400000,
  ET_CLIPTYPE_OTHER: 0x8000000,
  ET_CLIPTYPE_ZIP: 0x10000000,
  ET_CLIPTYPE_DOCUMENT: (this.ET_CLIPTYPE_TXT | this.ET_CLIPTYPE_WORD | this.ET_CLIPTYPE_PPT | this.ET_CLIPTYPE_EXCEL | this.ET_CLIPTYPE_PROJECT | this.ET_CLIPTYPE_PDF),
}
const ObjectType = {
  ET_ObjType_Unknow: 0x00, //Invalid
  ET_ObjType_SysTemplate: 0x001, //系统模版
  ET_ObjType_PublicTemplate: 0x002, //公共模版
  ET_ObjType_PrivateTemplate: 0x004, //私有模版
  ET_ObjType_Folder: 0x010, //文件夹
  ET_ObjType_Clip: 0x020, //素材
  ET_ObjType_Pgm: 0x040, //节目
  ET_ObjType_Template: 0x080, //模板
  ET_ObjType_EDL: 0x100, //EDL
  ET_ObjType_CD: 0x200, //光盘
  ET_ObjType_Event: 0x400, //EventData（解析时临时使用）
  ET_ObjType_Plan: 0x800, //增加planType 用于新建plan
  ET_ObjType_LKEvent: 0x1000, //场记事件
  ET_ObjType_Doc: 0x2000, //文稿
  ET_ObjType_SenceMark: 0x8000, //Mark Point
  ET_ObjType_File: 0xA000, //windows file

}
const HiveEntityType = {
  ET_ENTITY_TYPE_PGM: "biz_sobey_program",
  ET_ENTITY_TYPE_OTHER: "biz_sobey_other",
  ET_ENTITY_TYPE_DOCUMENT: "biz_sobey_document",
  ET_ENTITY_TYPE_PIC: "biz_sobey_picture",
  ET_ENTITY_TYPE_AUDIO: "biz_sobey_audio",
  ET_ENTITY_TYPE_VIDEO: "biz_sobey_video",
  ET_ENTITY_TYPE_FOLDER: "folder",
}
function GetEntityType(type, subtype) {
  if (type == ObjectType.ET_ObjType_Clip) {
    if (subtype == ClipSubType.ET_CLIPTYPE_AV || subtype == ClipSubType.ET_CLIPTYPE_V) {
      return HiveEntityType.ET_ENTITY_TYPE_VIDEO;
    } else if (subtype == ClipSubType.ET_CLIPTYPE_A) {
      return HiveEntityType.ET_ENTITY_TYPE_AUDIO;
    } else if (subtype == ClipSubType.ET_CLIPTYPE_PPT || subtype == ClipSubType.ET_CLIPTYPE_TXT ||
      subtype == ClipSubType.ET_CLIPTYPE_WORD || subtype == ClipSubType.ET_CLIPTYPE_PPT || subtype == ClipSubType.ET_CLIPTYPE_EXCEL ||
      subtype == ClipSubType.ET_CLIPTYPE_PROJECT || subtype == ClipSubType.ET_CLIPTYPE_PDF) {
      return HiveEntityType.ET_ENTITY_TYPE_DOCUMENT;
    } else if (subtype == ClipSubType.ET_CLIPTYPE_IMAGE) {
      return HiveEntityType.ET_ENTITY_TYPE_PIC;
    } else if (subtype == ClipSubType.ET_CLIPTYPE_XDCAM_LIST || subtype == ClipSubType.ET_CLIPTYPE_P2_LIST) { //P2和fileimport经来的素材，都是音视频的。
      return HiveEntityType.ET_ENTITY_TYPE_VIDEO;
    } else if (subtype == ClipSubType.ET_CLIPTYPE_ZIP || subtype == ClipSubType.ET_CLIPTYPE_OTHER) {
      return HiveEntityType.ET_ENTITY_TYPE_OTHER;
    } else {
      return HiveEntityType.ET_ENTITY_TYPE_VIDEO;
    }
  } else if (type == ObjectType.ET_ObjType_Pgm) {
    return HiveEntityType.ET_ENTITY_TYPE_PGM;
  } else if (type == ObjectType.ET_ObjType_Folder) {
    return HiveEntityType.ET_ENTITY_TYPE_FOLDER;
  } else {
    return HiveEntityType.ET_ENTITY_TYPE_OTHER;
  }
  return null;
}

var FileStatus = {
  ET_Obj_FS_Unknow: 0x00000000,
  ET_Obj_FS_HV_ALL: 0x00000001,
  ET_Obj_FS_HV_SEG: 0x00000002,
  ET_Obj_FS_LV_ALL: 0x00000004,
  ET_Obj_FS_LV_SEG: 0x00000008,
  ET_Obj_FS_MV_ALL: 0x00000010,
  ET_Obj_FS_MV_SEG: 0x00000020,
  ET_Obj_FS_HA_ALL: 0x00000040,
  ET_Obj_FS_HA_SEG: 0x00000100,
  ET_Obj_FS_LA_ALL: 0x00000200,
  ET_Obj_FS_LA_SEG: 0x00000400,
  ET_Obj_FS_MA_ALL: 0x00000800,
  ET_Obj_FS_MA_SEG: 0x00001000,
  ET_Obj_FS_EDL: 0x00002000,
  ET_Obj_FS_Pgm: 0x00004000,
  ET_Obj_FS_Delete: 0x00008000,
  ET_Obj_FS_Pgm_ReadOnly: 0x00010000, //只读方式打开节目支持
  ET_Obj_FS_WA: 0x00200000, //表示还可以自动匹配的WA素材
  ET_Obj_FS_TechCensor: 0x01000000, //素材技审标记
  ET_Obj_FS_MFEDL: 0x10000000, //多格式EDL素材子类型
  ET_Obj_FS_H264_Creating: 0x00020000, //表示素材正在生成了H.264文件。
  ET_Obj_FS_H264: 0x00040000 //表示素材已生成了H.264文件
}

var ImageType = {
  ET_CLIP_IMAGETYPE_ORIGINAL: 0x00000000, //0：为素材原始比例
  ET_CLIP_IMAGETYPE_4_3: 0x00000001, //1、图像为4:3的方式
  ET_CLIP_IMAGETYPE_16_9SD: 0x00000002, //2：图像为16:9的方式
  ET_CLIP_IMAGETYPE_16_9HD: 0x00000004 //4：图像为16:9的方式，16:9HD
}
var CLIPTYPE = {
  // 素材子类型
  ET_CLIPTYPE_UNKNOW: 0x000000, // 未知素材
  ET_CLIPTYPE_AV: 0x000001, // 普通视音频素材
  ET_CLIPTYPE_V: 0x000002, // 普通视频素材
  ET_CLIPTYPE_A: 0x000004, // 普通音频素材
  ET_CLIPTYPE_XDCAM: 0x000008, // 蓝光素材
  ET_CLIPTYPE_TGA: 0x000010, // TGA素材
  ET_CLIPTYPE_IMAGE: 0x000020, // 图片
  ET_CLIPTYPE_P2: 0x000040, // P2素材
  ET_CLIPTYPE_SGCLIP: 0x000080, // SG素材，彩条素材
  ET_CLIPTYPE_HIDE: 0x000100, // 隐藏素材
  ET_CLIPTYPE_OA_EMPTYCLIP: 0x000200, //OA FOLDER中的空素材
  ET_CLIPTYPE_XDCAM_LIST: 0x000400, //蓝光素材表现方式，为了和ET_CLIPTYPE_XDCAM，单个区分开
  ET_CLIPTYPE_P2_LIST: 0x000800, //和XDCAM 方式一样
  ET_CLIPTYPE_INFINITY: 0x001000, //Infinity clip
  ET_CLIPTYPE_XDS: 0x800000, //XDS素材0x002000
  ET_CLIPTYPE_CANON: 0x1000000, //Canon素材0x004000
  ET_CLIPTYPE_XDSFLAG: 0x2000000, //0x008000
  ET_CLIPTYPE_EX: 0x4000000 //EX素材0x400
}
var ClipStatus = {
  ET_CLIP_CAPTURESTATUS_NORMAL: 0x00000000, //为正常状态
  ET_CLIP_CAPTURESTATUS_CAPTURE: 0x00000001, //为正在采集状态
  ET_CLIP_CAPTURESTATUS_LOOPCAPTURE: 0x00000002, //为循环采集状态
  ET_CLIP_CAPTURESTATUS_CREATELOW: 0x00000010, //为素材生成低码率状态
  ET_CLIP_CAPTURESTATUS_CLIPTRIM: 0x00000020, //为素材TRIM过程中的状态
  ET_CLIP_CAPTURESTATUS_RENDERING: 0x00000040, //为节目合成状态
  ET_CLIP_CAPTURESTATUS_TRANSCODEING: 0x00000080, //为素材转码状态
  ET_CLIP_CAPTURESTATUS_XDCAMUPLOW: 0x00000100, //为蓝光上载完低码率状态
  ET_CLIP_CAPTURESTATUS_XDCAMUPHIGHT: 0x00000200, //为蓝光上载完高码率状态
  ET_CLIP_CAPTURESTATUS_XDCAMCREATELOW: 0x00000400, //为蓝光上载完高码率音频转码MP3完成状态
  ET_CLIP_CAPTURESTATUS_COPYING: 0x00000800, //复制中的素材
  ET_CLIP_CAPTURESTATUS_RENDERPGMTOOA: 0x00001000, //新建的空素材，用于非编MASTERVIEW拖拽到此素材上合成节目
  ET_CLIP_CAPTURESTATUS_FROM3RD: 0x00002000, //正在从第三方导入素材
  ET_CLIP_CAPTURESTATUS_TRANSMITTING: 0x00004000, //正在从其它系统传输
  ET_CLIP_CAPTURESTATUS_TRANSMIT_FINISHED: 0x00008000, //素材传输完成
  ET_CLIP_CAPTURESTATUS_NLE_CAPTURE: 0x00010000, //非编正在采集
  ET_CLIP_CAPTURESTATUS_ASK_LOCAL2CENTRE: 0x00020000, //请求从本地上传至中心
  ET_CLIP_CAPTURESTATUS_LOCAL2CENTRE: 0x00040000, //正在从本地上传至中心...
  ET_CLIP_CAPTURESTATUS_NLE_RENDERING: 0x00080000, //非编本地Render的素材,正在Render时,Clip Status为NLE Rendering  0x00010000
  ET_CLIP_CAPTURESTATUS_FAILEDFROM3RD: 0x00100000 //从第三方导入素材失败，此状态素材的操作和ET_CLIP_CAPTURESTATUS_FROM3RD一样 0x00020000
}
var Video_HS = {
  ET_VIDEO_HS_UNKNOWN: 0,
  ET_VIDEO_HS_SD: 1,
  ET_VIDEO_HS_HD720p: 2,
  ET_VIDEO_HS_HD1080i: 3,
  ET_VIDEO_HS_HD1080p: 4,
  ET_VIDEO_HS_HD1440i: 5,
  ET_VIDEO_HS_4K: 6,

  ET_3D_HS_SD: 7,
  ET_3D_HS_HD720p: 8,
  ET_3D_HS_HD1080i: 9,
  ET_3D_HS_HD1080p: 10,
  ET_3D_HS_HD1440i: 11,
  ET_3D_HS_4K: 12
}
var FrameRateEnum = {
  FR_25: 1,
  FR_2997: 2,
  FR_50: 3,
  FR_5997: 4,
  FR_5994: 5,
  FR_30: 6
};
function GetClipStatus(status) {
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_NORMAL) {
    return "Normal";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_CAPTURE) {
    return "Capture";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_LOOPCAPTURE) {
    return "Loop Capture";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_CREATELOW) {
    return "Create Low";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_CLIPTRIM) {
    return "cliptrim";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_RENDERING) {
    return "Rendering";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_TRANSCODEING) {
    return "Transcoding";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_XDCAMUPLOW) {
    return "xdcamuplow";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_XDCAMUPHIGHT) {
    return "xdcamuphight";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_XDCAMCREATELOW) {
    return "xdcamcreatelow";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_COPYING) {
    return "copying";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_RENDERPGMTOOA) {
    return "renderpgmtooa";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_FROM3RD) {
    return "  Importing From 3rd";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_TRANSMITTING) {
    return "transmitting";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_TRANSMIT_FINISHED) {
    return "transmit_finished";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_NLE_CAPTURE) {
    return "NLE Capture";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_ASK_LOCAL2CENTRE) {
    return "ask_local2centre";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_LOCAL2CENTRE) {
    return "local2centre";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_NLE_RENDERING) {
    return "NLE Rendering";
  }
  if (status == ClipStatus.ET_CLIP_CAPTURESTATUS_FAILEDFROM3RD) {
    return "failedfrom3rd";
  }
}
var _svFlag = false;
var _socketServer = 'ws://172.16.134.20:3130';
var version = '?v=1.0.0.1';

window._language = {
  "en": {
    "content": "Content",
    "effect": "Effect",
    "pageTitle": "Web Quick Editing",
    "baseClass": "Base class must override the name method, return the plugin name.",
    "plugin": "Plugin: ",
    "repeat": " repeat",
    "trackBelongOthers": "There are other media on the track, please remove it first.",
    "trackNotExist": "The track does not exist.",
    "empty": "Empty",
    "buffering": "Buffering...",
    "errorOfNetwork": "Error: network error",
    "errorOfMedia": "Error: media format error, unable to decode",
    "errorOfResource": "Error: unable to access media resources",
    "error": "error",
    "projectInfo": "Project information",
    "name": "Name",
    "unnamed": "Unnamed",
    "frameRate": "Frame rate",
    "breadth": "Breadth",
    "video": "Video",
    "audio": "Audio",
    "subtitle": "Subtitle",
    "picture": "Image",
    "trackBelongOtherLayer": "The track item has already belonged to a layer, please remove the binding first.",
    "adjustInOutPoint": "Adjust in/out point",
    "addItemL": "Add item[",
    "addItemR": "]",
    "insertItem": "Insert item",
    "adjustItemLoc": "Adjust item location",
    "moveItem": "Move item",
    "deleteItem": "Delete item",
    "wrongStart": "Wrong Start Time",
    "wrongEnd": "Wrong End Time",
    "startTimeGreater": "Start time is greater than the end time",
    "subclassMustType": "Subclasses must override the PopcornPlugin type",
    "subclassMustName": "Subclasses must override the name",
    "operation": "Operation",
    "colorUpdateError": "Color update error",
    "colorValueError": "Color value error",
    "theEditorL": "The Editor \"",
    "theEditorR": "\" does not exist.",
    "editorLayoutWrong": "The layout of editor is wrong",
    "MSYH": "Microsoft YaHei",
    "song": "SimSun",
    "startTimeError": "Start time error, has adjusted automatically",
    "endTimeError": "End time error, has adjusted automatically",
    "default": "Set as default",
    "second": "Second",
    "noMetadata": "With no metadata",
    "fade": "Fade-in/Fade-out",
    "flashBlack": "Flash Black",
    "flashWhite": "Flash White",
    "markPointM": "Add Marker(M)",
    "tip": "Tip",
    "markPointEmpty": "The Mark point remark can't be empty",
    "markPoint": "Mark List",
    "property": "Property",
    "displayPropertyInfo": "Display the Property Information of active object",
    "modifyE": "Modify program information(E)",
    "newN": "New(Ctrl+E)",
    "timelineEmpty": "The timeline is not empty, do you want to save it first?",
    "clearTimeline": "Are you sure to clear out the timeline?",
    "saveS": "Save(S)",
    "revokeZ": "Undo(Ctrl+Z)",
    "redoR": "Redo(Ctrl+Y)",
    "addSubtitleT": "Add Subtitle(T)",
    "subtitleExisted": "The current area has already existed the subtitle, please add the caption in the blank area.",
    "tobegin": "To the beginning(Home)",
    "lastFrame": "Last frame(←)",
    "playOrPause": "Play/Pause(Space)",
    "nextFrame": "Next frame(→)",
    "toEnd": "To the end(End)",
    "inL": "In([)",
    "outR": "Out(])",
    "cut": "Split(P)",
    "delete": "Delete(Delete)",
    "yes": "Yes",
    "no": "No",
    "confirm": "Confirm",
    "cancel": "Cancel",
    "inOrOutPoint": "In/Out point",
    "in": "In",
    "out": "Out",
    "markInGreater": "Mark In time is greater than Mark Out time.",
    "markoutLess": "Mark Out time is less than Mark In time.",
    "remarkEmpty": "The Mark point remark can't be empty.",
    "selectMarkPoint": "Please select the mark point!",
    "welcomeToUse": "Welcome to use the artDialog dialog components!",
    "welcome": "Welcome ",
    "description": "Comments",
    "buffer": "Buffering",
    "dragToChange": "Drag to change the current time.",
    "clickOrDblclick": "Click the lock / unlock, double click to lock the other tracks(Except the current track)",
    "createTime": "Create time",
    "markPointRemark": "Mark point remark:",
    "edit": "Video",
    "programInfo": "Program Information",
    "textEditor": "Text editor",
    "basic": "Basic",
    "advanced": "Advanced",
    "warning": "Warning:",
    "pressEnter": "Press Enter to Confirm",
    "mediaElement": "Media Element",
    "start": "Start",
    "end": "End",
    "active": "Active",
    "showOrHide": "Show / hide",
    "wrongTimeFormat": "Wrong time format",
    "create": "Create",
    "timelineEmptyNotSave": "The timeline is empty, can't be saved!",
    "success": "Success",
    "saveSuccess": "Save success!",
    "saveFailed": "Save failed!\n",
    "errorUp": "Error",
    "notSetSaveMethod": "Didn't set the save method, can't save the timeline.",
    "initializeFirst": "Please initialize first",
    "signatureTimeout": "Signature timeout, please regenerate a new signature.",
    "generateSignature": "Generate signature:",
    "preload": "Pre-load the next material...",
    "notSupportL": "Can't support the ",
    "notSupportR": " TrackEvent",
    "text": "Text",
    "customize": "Customize",
    "center": "Center",
    "bottom": "Bottom",
    "top": "Top",
    "textPosition": "Text position",
    "left": "Left",
    "right": "Right",
    "alignment": "Alignment",
    "finish": "Finish",
    "font": "Font",
    "fontSize": "Font Size",
    "fontColor": "Font Color",
    "shadow": "Shadow",
    "shadowColor": "Shadow",
    "background": "Background",
    "backgroundColor": "Background",
    "boldface": "&nbsp;&nbsp;&nbsp;&nbsp;Boldface",
    "italic": "&nbsp;&nbsp;&nbsp;&nbsp;Italic",
    "leftMargin": "Left Margin",
    "topMargin": "Top Margin",
    "width": "Width",
    "address": "Address",
    "height": "Height",
    "color": "Color",
    "sum": "Sum",
    "subtract": "Subtract",
    "multiply": "Multiply",
    "normal": "Normal",
    "renderMethod": "Render method",
    "transition": "Transition",
    "sendToRender": "Send to render",
    "ok": "OK",
    "startAt": "Start at",
    "target": "Target",
    "addSubtitle": "Double click to add subtitle.",
    "search": "search",
    "directory": "Directory",
    "title": "Title",
    "saveAsEdl": "Save As New EDL",
    "saveAsClip": "Save As Clip",
    "clearOut": "Clear out(\\)",
    "confirmFlag": "Confirm",
    "share": "Share",
    "export": "Export to 3rd Party",
    "register": "Register to OA",
    "renderSuccess": "Save as clip success!",
    "saveTileLineSuccess": "Save timeline success!",
    "saveTileLineFailed": "Save timeline Failed!",
    "notGetStream": "Can not get clip stream info!",
    "notGetFormat": "Can not find format info!",
    "getClipInfoFailed": "Get clip info failed!",
    "loadTimelineFailed": "Load Timeline failed",
    "emptyFolderList": "Empty folder list!",
    "getFolderListFailed": "Get folder list failed!",
    "openFolderFailed": "Open folder failed!",
    "getClipListFailed": "Get clip list failed!",
    "emptyResult": "Empty result!",
    "logout": "Close",
    "help": "Help",
    "sort": "Sort",
    "advancesearch": "Advance Search",
    "time": "Create Time",
    "type": "Type",
    "mv": "MV",
    "sv": "SV",
    "saveEdl": "Update the EDL",
    "timeLineEmpty": "Timeline is empty!",
    "renderFailed": "Save as clip failed!",
    "updateSuccessfully": "EDL update successfully!",
    "updatefailed": "EDL update failed!",
    "selectPath": "Save path can not be empty!",
    "noLengthInfo": "Can't get the length info!",
    "taskmonitor": "Task Monitor",
    "timeLineIsEmpty": "The timeline is empty, can't be saved!",
    "canNotAdd": "Can not add to timeline!",
    "errorWord": " Can't contain the illegal characters!",
    "pos": "POS",
    "emark": "Essence Mark",
    "smark": "Scene Mark",
    "cmark": "Change Mark",
    "fav": "Favorite",
    "linkTrack": "Group V/A(=)",
    "isShowVideoStandard": false,
    "isShowSizes": false,
    "items": "Items",
    "columnFilter": "Column Filter",
    "toggleSVMV": "Toggle SV/MV",
    "toggleInfo": "Toggle MV Info Page",
    "toggleFolder": "Toggle Folder Page",
    "archived": "The high-res of material is archived. Do you want to continue with low-res?",
    "searchResult": "Search Result",
    "public": "Public",
    "stamp": "Stamp",
    "ha": "HA",
    "inPoint": "In Point",
    "storageStatus": "Storage Status",
    "hv": "HV",
    "la": "LA",
    "lv": "LV",
    "modifiedBy": "Modified By",
    "modificationDate": "Modification Date",
    "clipStatus": "Clip Status",
    "creationDate": "Creation Date",
    "toBeDel": "To be Deleted",
    "totalDuration": "Total Duration",
    "length": "Length",
    "creator": "Creator",
    "hdsd": "HD/SD",
    "outPoint": "Out Point",
    "sd": "16:9 SD",
    "rights": "Rights",
    "DURATION": "DURATION",
    "POSITION": "POSITION",
    "all": "All",
    "listMode": "List Mode",
    "thumbnailMode": "Thumbnail Mode",
    "publicCloud": "Public Cloud",
    "xdcAir": "XDCAM Air",
    "inhouse": "In-House"
  },
  "zh": {
    "content": "内容",
    "effect": "影响",
    "pageTitle": "快编",
    "baseClass": "基类必须重写命名方法，并返回插件名",
    "plugin": "插件: ",
    "repeat": " 循环播放",
    "trackBelongOthers": "时间线上有素材，请先保存",
    "trackNotExist": "时间线不存在",
    "empty": "空",
    "buffering": "缓冲中...",
    "errorOfNetwork": "错误：网络错误",
    "errorOfMedia": "错误：媒体格式错误，无法解码",
    "errorOfResource": "错误：获取素材失败",
    "error": "错误",
    "projectInfo": "工程文件信息",
    "name": "标题",
    "unnamed": "未命名",
    "frameRate": "帧率",
    "breadth": "Breadth",
    "video": "视频",
    "audio": "音频",
    "subtitle": "字幕",
    "picture": "图片",
    "trackBelongOtherLayer": "轨道上已有一个项目，请先删除.",
    "adjustInOutPoint": "调整入出点",
    "addItemL": "添加像[",
    "addItemR": "]",
    "insertItem": "插入项",
    "adjustItemLoc": "调整项目位置",
    "moveItem": "移动项",
    "deleteItem": "删除项",
    "wrongStart": "错误的开始时间",
    "wrongEnd": "错误的结束时间",
    "startTimeGreater": "开始时间大于结束时间",
    "subclassMustType": "子类必须覆盖PopcornPlugin类型",
    "subclassMustName": "子类必须重写名称",
    "operation": "操作",
    "colorUpdateError": "颜色更新错误",
    "colorValueError": "颜色值错误",
    "theEditorL": "错误 \"",
    "theEditorR": "\" 不存在",
    "editorLayoutWrong": "编辑布局错误",
    "MSYH": "微软雅黑",
    "song": "SimSun",
    "startTimeError": "开始时间错误，已自动调整",
    "endTimeError": "结束时间错误，已自动调整",
    "default": "默认值",
    "second": "秒",
    "noMetadata": "没有元数据",
    "fade": "淡入淡出",
    "flashBlack": "闪黑",
    "flashWhite": "闪白",
    "markPointM": "标记点(M)",
    "tip": "提示",
    "markPointEmpty": "标记点备注不能为空",
    "markPoint": "标记点",
    "property": "属性",
    "displayPropertyInfo": "显示对象属性信息",
    "modifyE": "修改项目信息(E)",
    "newN": "新建(Ctrl+E)",
    "timelineEmpty": "时间线不为空，是否需要先保存?",
    "clearTimeline": "确定清空时间线?",
    "saveS": "保存(S)",
    "revokeZ": "撤销(Ctrl+Z)",
    "redoR": "重做(Ctrl+Y)",
    "addSubtitleT": "添加字幕(T)",
    "subtitleExisted": "当前区域已存在字幕，请在空白区域添加标题",
    "tobegin": "到起始位置(Home)",
    "lastFrame": "前一帧(←)",
    "playOrPause": "播放/暂停(Space)",
    "nextFrame": "后一帧(→)",
    "toEnd": "到结束位置(End)",
    "inL": "入点([)",
    "outR": "出点(])",
    "cut": "剪切(P)",
    "delete": "删除(Delete)",
    "yes": "是",
    "no": "否",
    "confirm": "确定",
    "cancel": "取消",
    "inOrOutPoint": "入\\出点",
    "in": "入",
    "out": "出",
    "markInGreater": "入点大于出点",
    "markoutLess": "出点大于入点.",
    "remarkEmpty": "标记点备注不能为空.",
    "selectMarkPoint": "请选择标记点!",
    "welcomeToUse": "欢迎使用artDialog对话框组件!",
    "welcome": "欢迎你 ",
    "description": "注释",
    "buffer": "缓冲",
    "dragToChange": "拖动更改当前时间.",
    "clickOrDblclick": "点击锁定 / 解锁, 双击锁定其他轨道(除了当前轨道)",
    "createTime": "创建时间",
    "markPointRemark": "标记备注:",
    "edit": "编辑",
    "programInfo": "项目信息",
    "textEditor": "文本编辑器",
    "basic": "基础",
    "advanced": "高级",
    "warning": "警告:",
    "pressEnter": "Enter键确认",
    "mediaElement": "媒体素材",
    "start": "开始",
    "end": "结束",
    "active": "活动",
    "showOrHide": "显示 / 隐藏",
    "wrongTimeFormat": "错误的时间格式",
    "create": "创建",
    "timelineEmptyNotSave": "时间线为空，不能保存!",
    "success": "成功",
    "saveSuccess": "保存成功!",
    "saveFailed": "保存失败!\n",
    "errorUp": "错误",
    "notSetSaveMethod": "没有设置保存方式，无法保存时间线.",
    "initializeFirst": "请先初始化",
    "signatureTimeout": "签名超时，请重新生成签名.",
    "generateSignature": "生成签名:",
    "preload": "预加载下一个素材...",
    "notSupportL": "不支持L ",
    "notSupportR": " TrackEvent",
    "text": "文本",
    "customize": "自定义",
    "center": "居中",
    "bottom": "底部",
    "top": "顶部",
    "textPosition": "文本位置",
    "left": "左对齐",
    "right": "右对齐",
    "alignment": "对齐方式",
    "finish": "完成",
    "font": "字体",
    "fontSize": "字体大小",
    "fontColor": "字体颜色",
    "shadow": "阴影",
    "shadowColor": "阴影颜色",
    "background": "背景",
    "backgroundColor": "背景颜色",
    "boldface": "&nbsp;&nbsp;&nbsp;&nbsp;加粗",
    "italic": "&nbsp;&nbsp;&nbsp;&nbsp;斜体",
    "leftMargin": "左边距",
    "topMargin": "上边距",
    "width": "宽度",
    "address": "地址",
    "height": "高度",
    "color": "颜色",
    "sum": "加",
    "subtract": "减",
    "multiply": "加倍",
    "normal": "标准",
    "renderMethod": "合成方式",
    "transition": "转场",
    "sendToRender": "发送到合成",
    "ok": "OK",
    "startAt": "开始于",
    "target": "目标",
    "addSubtitle": "双击添加字幕.",
    "search": "搜索",
    "directory": "目录",
    "title": "标题",
    "saveAsEdl": "另存时间线",
    "saveAsClip": "保存为素材",
    "clearOut": "清空(\\)",
    "confirmFlag": "确认",
    "share": "分享",
    "export": "导出到第三方系统",
    "register": "注册OA",
    "renderSuccess": "保存素材成功!",
    "saveTileLineSuccess": "保存时间线成功!",
    "saveTileLineFailed": "保存时间线失败!",
    "notGetStream": "未获取到视音频流信息!",
    "notGetFormat": "未获取到视音频格式信息!",
    "getClipInfoFailed": "获取素材信息失败!",
    "loadTimelineFailed": "加载时间线失败",
    "emptyFolderList": "未获取到目录树!",
    "getFolderListFailed": "获取目录树失败!",
    "openFolderFailed": "打开文件夹失败!",
    "getClipListFailed": "获取素材列表失败!",
    "emptyResult": "未检索到结果!",
    "logout": "退出",
    "help": "帮助",
    "sort": "排序",
    "advancesearch": "高级搜索",
    "time": "创建时间线",
    "type": "类型",
    "mv": "MV",
    "sv": "SV",
    "saveEdl": "保存时间线",
    "timeLineEmpty": "时间线为空!",
    "renderFailed": "保存素材失败!",
    "updateSuccessfully": "时间线更新成功!",
    "updatefailed": "时间线更新失败!",
    "selectPath": "保存路径不能为空!",
    "noLengthInfo": "长度信息获取失败!",
    "taskmonitor": "任务监听",
    "timeLineIsEmpty": "时间线为空，不能保存!",
    "canNotAdd": "添加到时间线失败!",
    "errorWord": "不能包含非法字符!",
    "pos": "位置",
    "emark": "Essence标记",
    "smark": "场景标记",
    "cmark": "转场标记",
    "isShowVideoStandard": false,
    "isShowSizes": false,
    "fav": "收藏夹",
    "linkTrack": "素材成组(=)",
    "items": "项",
    "columnFilter": "筛选列",
    "toggleSVMV": "切换SV/MV",
    "toggleInfo": "切换MV信息",
    "toggleFolder": "切换文件夹",
    "archived": "下列素材高质量离线，是否回迁高质量后再合成？",
    "searchResult": "搜索结果",
    "public": "公共",
    "stamp": "首帧图",
    "ha": "HA",
    "inPoint": "入点",
    "storageStatus": "存储状态",
    "hv": "HV",
    "la": "LA",
    "lv": "LV",
    "modifiedBy": "修改者",
    "modificationDate": "修改日期",
    "clipStatus": "素材状态",
    "creationDate": "创建日期",
    "toBeDel": "删除",
    "totalDuration": "总长度",
    "length": "长度",
    "creator": "创建者",
    "hdsd": "HD/SD",
    "outPoint": "出点",
    "sd": "16:9 SD",
    "rights": "权限",
    "DURATION": "总长度",
    "POSITION": "当前位置",
    "all": "全部",
    "listMode": "列表模式",
    "thumbnailMode": "缩略图模式",
    "publicCloud": "Public Cloud",
    "xdcAir": "XDCAM Air",
    "inhouse": "In-House"
  }
}
