import axios from "axios";
import { message } from 'antd';
import qs from "qs"; 

//取消请求token
let source = axios.CancelToken.source();

// 创建axios实例
const instance = axios.create({
  baseURL:'api',        
  timeout: 15000
});

/**
 * 处理get时候的参数
 * @param config
 * @returns {{params}|*}
 */
const processGetParams = (config) => {
  console.log('config',config)
  let url = config.url
  // get参数编码
  if (config.method === 'get' && config.params) {
    url += '?'
    let keys = Object.keys(config.params)
    for (let key of keys) {
      url += `${key}=${encodeURIComponent(config.params[key])}&`
    }
    url = url.substring(0, url.length - 1)
    config.params = {}
  }
  config.url = url
  return config;
}

/**
 * 处理正常请求
 * @returns {Promise<void>}
 */
const handleRequest = config => { 
  //添加请求头
  config.headers["Authorization"] = ''
   return processGetParams(config);
}

/**
 * 处理错误请求
 * @returns {Promise<void>}
 */
const handleRequestError = error => {
  return Promise.reject(error);
}

/**
 * 处理正常响应
 * @returns {Promise<void>}
 */
const handleResponse = async response => {
  let {config, data} = response; 
   
  //token过期会响应200，且msgCode===-2
  if (data.msgCode === -2) {
    //没有登陆，为了防止多个弹框，取消当前全部的请求
    source.cancel();
    source = axios.CancelToken.source()

    alert('登录过期，请重新登录');
   // let _redirect = encodeURIComponent(window.location.href);
    //跳转至登录   
  //  await router.replace('/login?_redirect=' + _redirect)
 
  } else if (data.msgCode !== 0) {
    //全局错误提示错误
    alert(data.state);
  }
  //正常请求及data.msgCode===0
  return data;
}

/**
 * 处理错误响应
 *  {(function(*=): (Promise<never>))|*}
 */
const handleResponseError = (error) => {
   if (error instanceof Error) {
    if (error.toString().toLowerCase().includes("network")) {
    //  alert(" 网络连接失败！");
      message.error('网络连接失败！');
      return Promise.reject(error);
    }
  }

  //当是取消请求是，会直接调用错误回调
  if (error && error.__proto__.__CANCEL__) {
    return Promise.reject(error);
  }
 
  alert('服务器出错，请稍后再试！！！')
  /*
    // 以下是细化的错误提示可以参考
   const {code, message, response} = error;
  //对于平台在错误的情况下，也会响应错误数据，这个时候先判断有没有响应错误数据
  let data = response ? (response.data || {}) : {};
  if (data && data.hasOwnProperty('msgCode')) {
    alert(data.msg || "请求失败");
  } else if (code === "ECONNABORTED" && message.indexOf("timeout") != -1) {
    alert(`请求超时，将在15秒后重试`);
  } else if (message.indexOf("500") != -1) {
    alert("500，服务器链接失败！");
  } else if (message.indexOf("404") != -1 ||//考虑没网的情况
    (typeof message == "string" && message.indexOf("Network Error")) !== -1) {
      alert(code ? code : '' + " 网络连接失败！");
  } else {
    alert("服务器出错，请稍后再试！！！");
  }
  */
  return Promise.reject(error);
}


// 添加请求拦截器
instance.interceptors.request.use(handleRequest, handleRequestError);

// 添加响应拦截器
instance.interceptors.response.use(handleResponse, handleResponseError);


//普通表单post请求
const post = (url, data, config) => {
  return instance.post(url, qs.stringify(data), {...config, cancelToken: source.token});
};

//json主体post请求
const postJSON = (url, data, config) => {
  return instance.post(url, data, {...config, cancelToken: source.token});
};

//put请求
const put = (url, data, config) => {
  return instance.put(url, data, {...config, cancelToken: source.token});
};

//get请求
const get = (url, params={
}, config) => {
  return instance.get(url, {...config, cancelToken: source.token,params});
};

//删除请求
const del = (url, params, config) => {
  return instance.delete(url, {...config, cancelToken: source.token, params});
};

export {post, postJSON, put, get, del};
export default instance;



