import { Dimensions, Platform, PixelRatio } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { FontSize } from './fontSize';
import { RNFS } from 'react-native-fs';
let { width, height } = Dimensions.get('window');
let pixelRatio = PixelRatio.get();
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(width);
let basePx = 1920;

// 像素转dp
let Px2Dp = function px2dp(px) {
  var scaleWidth = (px * screenPxW * 2) / basePx;
  size = Math.round(scaleWidth / pixelRatio + 0.5);
  return size;
};

const getFileType = name => {
  // 获取文件类型
  if (!name) return false;
  var imgType = ['gif', 'jpeg', 'jpg', 'bmp', 'png'];
  var videoType = [
    'avi',
    'wmv',
    'mkv',
    'mp4',
    'mov',
    'rm',
    '3gp',
    'flv',
    'mpg',
    'rmvb',
  ];
  if (RegExp('.(' + imgType.join('|') + ')$', 'i').test(name.toLowerCase())) {
    return 'image';
  } else if (
    RegExp('.(' + videoType.join('|') + ')$', 'i').test(name.toLowerCase())
  ) {
    return 'video';
  } else {
    return false;
  }
};

const storeStringData = async (key, value) => {
  // 存储字符串数据
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // 存储失败
    console.log('storeStringData失败');
  }
};
const getFileName = name => {
  // 获取文件名
  const FILE = Platform.OS === 'ios' ? '' : 'file://';
  return FILE + RNFS.DocumentDirectoryPath + '/' + name + '.png';
};

const compareVersion = (curent, recommend) => {
  // 比较版本号
  let a = curent.split('.');
  let b = recommend.split('.');
  for (var i = 0; i < Math.max(a.length, b.length); i++) {
    if (i >= a.length) {
      a[i] = 0;
    }
    if (i >= b.length) {
      b[i] = 0;
    }
    if (parseInt(a[i]) < parseInt(b[i])) {
      return -1;
    } else if (parseInt(a[i]) > parseInt(b[i])) {
      return 1;
    }
  }
  return 0;
};

const downloadAndGetImageUrl = (name, source_url) => {
  // 下载并获取图片URL
  let fileName = getFileName(name);
  return RNFS.exists(fileName)
    .then(response => {
      if (response) {
        return { uri: fileName };
      } else {
        let destination_path = '/' + name + '.jpg';
        return RNFS.downloadFile({
          fromUrl: source_url,
          toFile: RNFS.DocumentDirectoryPath + destination_path,
        })
          .promise.then(response => {
            return { uri: fileName };
          })
          .catch(error => {
            return { uri: source_url };
          });
      }
    })
    .catch(error => {
      return { uri: source_url };
    });
};

//判断类型
const judgeType = data => {
  // 判断数据类型
  return Object.prototype.toString.call(data);
};

const storeObjData = async (key, value) => {
  // 存储对象数据
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // 存储失败
    console.log('storeObjData失败');
  }
};

const getStringData = async key => {
  // 获取字符串数据
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // 已存储值
      return value;
    }
  } catch (e) {
    // 读取失败
    console.log('getStringData失败');
  }
};

const isEmpty = data => {
  // 判断数据是否为空
  switch (typeof data) {
    case 'undefined':
      return true;
    case 'string':
      if (data.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0)
        return true;
      break;
    case 'boolean':
      if (!data) return true;
      break;
    case 'number':
      if (0 === data || isNaN(data)) return true;
      break;
    case 'object':
      if (null === data || data.length === 0) return true;
      for (var i in data) {
        return false;
      }
      return true;
  }
  return false;
};

const getObjData = async key => {
  // 获取对象数据
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // 读取失败
    console.log('getObjData失败');
  }
};

const clearStorage = async (key) => {
  // 清除存储
  try {
    key ? await AsyncStorage.removeItem(key) : await AsyncStorage.clear();

  } catch (e) {
    // 清除失败
    console.log('clearStorage失败');
  }
}


export default {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  iOS: Platform.OS === 'ios',
  Android: Platform.OS === 'android',
  Px2Dp,
  FontSize,
  getFileType,
  storeStringData,
  storeObjData,
  getStringData,
  getObjData,
  clearStorage,
  downloadAndGetImageUrl,
  compareVersion,
  judgeType,
  isEmpty,
};
