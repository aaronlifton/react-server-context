import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
export interface WithContextProps extends RouteComponentProps<any> {
}
declare function withContext<S, P>(contextKey: keyof S, routeKey: keyof P & keyof S[keyof S]): (WrappedComp: React.ComponentType<any>) => React.ComponentType<WithContextProps>;
export default withContext;
