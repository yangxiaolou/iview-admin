import axios from '@/libs/api.request'
import qs from 'qs'

export const registered = (userForm) => {
  const data = userForm
  return axios.request({
    url: 'user/registered',
    data,
    method: 'post'
  })
}

export const modify = (userForm) => {
  const data = userForm
  return axios.request({
    url: 'user/modify',
    data,
    method: 'post'
  })
}

export const handleDispatch = () => {
  return axios.request({
    url: 'handleDispatch',
    method: 'get'
  })
}

export const getUserById = (id) => {
  return axios.request({
    url: 'user/get_user_by_id',
    params: {id},
    method: 'get'
  })
}

export const removeUserById = (id) => {
  return axios.request({
    url: 'user/remove_user_by_id',
    params: {id},
    method: 'get'
  })
}

export const getUserList = () => {
  return axios.request({
    url: 'user/get_user_list',
    method: 'get'
  })
}

export const login = ({ userName, password }) => {
  const data = {
    "name":userName,
    password
  }
  return axios.request({
    url: 'user/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'user/get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'user/logout',
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'get',
    params: {
      msg_id
    }
  })
}
