import axios from '@/libs/api.request'
import qs from 'qs'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const getJobList = () => {
  return axios.request({
    url: 'schedule/list',
    method: 'get'
  })
}

export const saveJob = (jobForm) => {
  return axios.request({
    url: 'schedule/add',
    data: jobForm,
    method: 'post'
  })
}

export const updateJob = (jobForm) => {
  return axios.request({
    url: 'schedule/update',
    data: jobForm,
    method: 'post'
  })
}

export const getJobById = (id) => {
  return axios.request({
    url: 'schedule/getJobById',
    params: {id},
    method: 'get'
  })
}

export const removeJobById = (id) => {
  return axios.request({
    url: 'schedule/remove/'+id,
    method: 'post'
  })
}

export const pause = (id) => {
  return axios.request({
    url: 'schedule/pause/'+id,
    method: 'post'
  })
}

export const resume = (id) => {
  return axios.request({
    url: 'schedule/resume/'+id,
    method: 'post'
  })
}


export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const loadConstants = typeList => {
  return axios.request({
    url: 'data/load_constants',
    params: {
      typeList
    },
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
    method: 'get'
  })
}
