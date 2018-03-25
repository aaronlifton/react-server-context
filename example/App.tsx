import * as React from 'react';
import { BrowserRouter, StaticRouter, Route } from 'react-router-dom';
import { BlogPostWithContext, BlogPost } from './BlogPost'

interface AppProps {
  serverContext: ServerContext;
}


export interface ServerContext {
  blogPost?: BlogPost;
}

declare global {
  interface Window { serverContext: ServerContext; }
}

class App extends React.Component<AppProps, {}> {
  render() {
    const Router = (props: any) =>
      (typeof window !== 'undefined')
        ? <BrowserRouter {...props} />
        : <StaticRouter {...props} />;

    const routerProps = (typeof window !== 'undefined')
      ? {}
      : {context: this.props.serverContext};

    return (
      <div className="exampleApp">
        <script dangerouslySetInnerHTML={{
          __html: 'window.serverContext=' + JSON.stringify(this.props.serverContext)
        }} />
        <Router {...routerProps} >
          <Route exact path="/" component={BlogPostWithContext}/>
        </Router>
      </div>
    );
  }
}