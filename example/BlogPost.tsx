import * as React from 'react';
// import withContext from 'react-server-context';
import withContext from '../withContext';

import { ServerContext } from './App';

export interface BlogPost {
  title: string;
  body: string;
}

interface BlogPostParams {
  title: string;
}
interface BlogPostProps {
  blogPost: BlogPost;
}
class BlogPostComponent extends React.Component<BlogPostProps> {
  render() {
    return <div className="blog-post">
      <h1>{this.props.blogPost.title}</h1>
      <p>{this.props.blogPost.body}</p>
    </div>
  }
}

export const BlogPostWithContext = withContext<ServerContext, BlogPostParams>(
    'blogPost', 'title'
  )(BlogPostComponent)