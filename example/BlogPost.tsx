import * as React from 'react';
// import withContext from 'react-server-context';
import withContext from '../src/withContext';

import { ServerContext } from './App';

export interface BlogPost {
  title: string;
  body: string;
}

interface BlogPostParams {
  title: string;
}
interface BlogPostProps {
  serverContext: ServerContext;
  blogPost: BlogPost;
}
interface BlogPostState {
  blogPost: BlogPost;
}

class BlogPostComponent extends React.Component<BlogPostProps, BlogPostState> {
  constructor(props: BlogPostProps) {
    super(props);
    this.state = {blogPost: this.props.serverContext.blogPost};
  }

  componentWillMount() {
    // handle browser side navigation to blog posts
    if (!this.props.serverContext.blogPost) {
      this.getBlogPost();
    }
  }

  getBlogPost() {
    console.log('performing an ajax call and setting state here...');
  }

  render() {
    return <div className="blog-post">
      <h1>{this.state.blogPost.title}</h1>
      <p>{this.state.blogPost.body}</p>
    </div>
  }
}

export const BlogPostWithContext = withContext<ServerContext, BlogPostParams>(
    'blogPost', 'title'
  )(BlogPostComponent)