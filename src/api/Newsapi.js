import {
    post as postRequest,
    postJSON as postJSONRequest,
    get as getRequest,
    del as delRequest,
    put as putRequest
} from '../utils/fetch'
//获取供应商
export const postNewssupplier = () => {
    return getRequest('/VueAndHibernate/product.do?action=supplier');
}
//获取数据字典
export const postNewsdictionaries = () => {
    return getRequest('/VueAndHibernate/product.do?action=dictionaries');
}
// query筛选产品
export const postscreensupplier = (save) => {
    return postRequest('/VueAndHibernate/product.do?action=query',save);
}
//获取产品分类
export const postNewscategory = () => {
    return getRequest('/VueAndHibernate/product.do?action=category');
}
//查询所有
export const getNewsChannel = () => {
    return getRequest('/VueAndHibernate/product.do?action=display');
}
//id查询
export const getquerybykeyid = (del) => {
    return postRequest('/VueAndHibernate/product.do?action=querybykeyid', del);
}
//新增
export const SaveNewsChannel = (save) => {
    return postRequest('/VueAndHibernate/product.do?action=addproduct', save);
}
//删除
export const delNewsChannel = (del) => {
    return postRequest('/VueAndHibernate/product.do?action=delproduct', del);
}
export const getNewsByPage = (index, size, searchData = { titlekeyword: '', channelid: '' }) => {
    console.log(searchData.channelid)
    return getRequest('/api/newsmanage/news/', {
        pageIndex: index,
        pageSize: size,
        searchData: `[{name:"like_ newsTitle" ,value:"${searchData.titlekeyword}"}, { name: "newsChannelEntity.id" ,value :"${searchData.channelid}"}]`
    });
}