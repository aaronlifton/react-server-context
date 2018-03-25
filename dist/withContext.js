var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
function withContext(contextKey, routeKey) {
    return function (WrappedComp) {
        var WithContext = /** @class */ (function (_super) {
            __extends(WithContext, _super);
            function WithContext(props) {
                return _super.call(this, props) || this;
            }
            WithContext.prototype.shouldComponentUpdate = function (newProps) {
                if (this.props.location.pathname == newProps.location.pathname) {
                    return false;
                }
                return true;
            };
            WithContext.prototype.render = function () {
                var newProps;
                var alreadyResolved;
                if (this.props.staticContext) {
                    alreadyResolved = true;
                    newProps = __assign({}, this.props, { serverContext: this.props.staticContext, alreadyResolved: alreadyResolved });
                }
                else {
                    ;
                    var context = window.serverContext[contextKey];
                    var params = this.props.match.params;
                    var routeParam = params[routeKey];
                    var staleObj = context && context[routeKey] != routeParam;
                    alreadyResolved = staleObj == false;
                    if (staleObj)
                        context = null;
                    newProps = __assign({}, this.props, { serverContext: window.serverContext, alreadyResolved: alreadyResolved });
                }
                return React.createElement(WrappedComp, __assign({}, newProps));
            };
            WithContext.displayName = 'WithContext';
            return WithContext;
        }(React.Component));
        return WithContext;
    };
}
export default withContext;
