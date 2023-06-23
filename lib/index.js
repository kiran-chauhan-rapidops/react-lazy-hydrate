"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _react=_interopRequireWildcard(require("react"));var _propTypes=_interopRequireDefault(require("prop-types"));var _isBrowser=_interopRequireDefault(require("./utils/isBrowser"));function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _getRequireWildcardCache(){if(typeof WeakMap!=="function")return null;var cache=new WeakMap();_getRequireWildcardCache=function _getRequireWildcardCache(){return cache;};return cache;}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}if(obj===null||typeof obj!=="object"&&typeof obj!=="function"){return{default:obj};}var cache=_getRequireWildcardCache();if(cache&&cache.has(obj)){return cache.get(obj);}var newObj={};var hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;if(desc&&(desc.get||desc.set)){Object.defineProperty(newObj,key,desc);}else{newObj[key]=obj[key];}}}newObj.default=obj;if(cache){cache.set(obj,newObj);}return newObj;}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);if(enumerableOnly)symbols=symbols.filter(function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable;});keys.push.apply(keys,symbols);}return keys;}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=arguments[i]!=null?arguments[i]:{};if(i%2){ownKeys(Object(source),true).forEach(function(key){_defineProperty(target,key,source[key]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(target,Object.getOwnPropertyDescriptors(source));}else{ownKeys(Object(source)).forEach(function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key));});}}return target;}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg);var value=info.value;}catch(error){reject(error);return;}if(info.done){resolve(value);}else{Promise.resolve(value).then(_next,_throw);}}function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value);}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err);}_next(undefined);});};}// No bg, borders or paddings from wrapper
var wrapperStyle={display:'contents'};var isOnBrowser=(0,_isBrowser.default)();var LazyHydrate=(_ref)=>{var{children,isStatic,wrapperComponent,wrapperComponentProps,onHydrationRender}=_ref;var ref=(0,_react.useRef)(null);var[shouldRender,setShouldRender]=(0,_react.useState)(!isOnBrowser// Should render if SSR
);(0,_react.useEffect)(()=>{var currentRef=ref.current;if(isStatic&&currentRef&&currentRef.innerHTML!==''){return()=>{};}// Should only render the component if cpu on idle or the user is on view, whatever comes first
var handleIdleCallback;var iObs;// Render on idle
if(window.requestIdleCallback){handleIdleCallback=window.requestIdleCallback(()=>{if(shouldRender){// already rendered by intersection observer
window.cancelIdleCallback(handleIdleCallback);return;}if(iObs&&currentRef){iObs.unobserve(currentRef);}setShouldRender(true);});}else{console.warn('react-lazy-hydrate: "requestIdleCallback" polyfill missing');}// Render if urgent (user in view)
if(window.IntersectionObserver){iObs=new window.IntersectionObserver(/*#__PURE__*/function(){var _ref3=_asyncToGenerator(function*(_ref2,obs){var[entry]=_ref2;if(!entry.isIntersecting&&!shouldRender){return;}obs.unobserve(currentRef);if(shouldRender){// Already rendered by request idle callback
return;}if(handleIdleCallback&&window.cancelIdleCallback){window.cancelIdleCallback(handleIdleCallback);}// Its urgent, going to render
setShouldRender(true);});return function(_x,_x2){return _ref3.apply(this,arguments);};}());}else{console.warn('react-lazy-hydrate: "IntersectionObserver" polyfill missing');}if(currentRef&&iObs){iObs.observe(currentRef);}return()=>{if(iObs&&currentRef){iObs.unobserve(currentRef);}if(handleIdleCallback&&window.cancelIdleCallback){window.cancelIdleCallback(handleIdleCallback);}};},[shouldRender,isStatic]);// if we're in the server or a spa navigation, just render it
if(shouldRender){if(onHydrationRender&&isOnBrowser){onHydrationRender();}return/*#__PURE__*/_react.default.createElement(wrapperComponent,_objectSpread({style:wrapperStyle},wrapperComponentProps),children);}// avoid re-render on the client
// eslint-disable-next-line react/no-danger
return/*#__PURE__*/_react.default.createElement(wrapperComponent,_objectSpread({style:wrapperStyle,ref,suppressHydrationWarning:true,dangerouslySetInnerHTML:{__html:''}},wrapperComponentProps));};LazyHydrate.propTypes={children:_propTypes.default.node.isRequired,isStatic:_propTypes.default.bool,wrapperComponent:_propTypes.default.oneOfType([_propTypes.default.node,_propTypes.default.string]),wrapperComponentProps:_propTypes.default.object,onHydrationRender:_propTypes.default.func};LazyHydrate.defaultProps={isStatic:false,wrapperComponent:'section',wrapperComponentProps:{}};var _default=LazyHydrate;exports.default=_default;