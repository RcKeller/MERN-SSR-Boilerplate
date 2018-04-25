/*
Services include logic that is independent from the component level.
This includes things like authentication, etc.
Logic coupled with a component should be in the respective duck.
In essense, these are "getters" framed in the sense of a feature/service that
isn't coupled with a specific view.
*/
//  REST API
export { default as API } from './api'
//  MICROSERVICES
export { default as authentication } from './authentication'
//  ENVIRONMENT VARIABLES
export { default as environment } from './environment'
export { default as settings } from './settings'
