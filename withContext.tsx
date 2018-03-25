import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface WithContextProps extends RouteComponentProps<any> {}

function withContext<S,P>(contextKey: keyof S, routeKey: keyof P & keyof S[keyof S]) {
  return (WrappedComp) => {
    class WithContext extends React.Component<WithContextProps,{}> {
      constructor(props: WithContextProps) {
        super(props);
      }
      static displayName = 'WithContext';

      shouldComponentUpdate(newProps: WithContextProps) {
        if (this.props.location.pathname == newProps.location.pathname) {
          return false;
        }
        return true;
      }

      render() {
        let newProps;
        let alreadyResolved;

        if (this.props.staticContext) {
          alreadyResolved = true;
          newProps = {...this.props, serverContext: this.props.staticContext, alreadyResolved};
        } else {
          // window should be defined if no staticContext from react-router
          interface WindowT extends Window {
            serverContext: {
              [A in keyof S]: {
                [B in keyof P]: any
              }
            }
          };
          let context = (window as WindowT).serverContext[contextKey];

          const params: P = this.props.match.params;
          const routeParam = params[routeKey];

          const staleObj = context && context[routeKey] != routeParam;
          alreadyResolved = staleObj == false;

          if (staleObj) context = null;
          newProps = {...this.props, serverContext: (window as WindowT).serverContext, alreadyResolved};
        }

        return <WrappedComp {...newProps} />
      }
    }
    return WithContext;
  }
}

export default withContext;