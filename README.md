# react-server-context

## Will this help me?

Do you use react-router 4?

Do you use server side rendering?

Using react-rails or react-on-rails?

Can your server react environment not use fetch? (e.g. mini_racer, therubyracer)

Do your components expect server context from different places?

## Example scenario
```
[[ Rails server ]]
  -> @my_context = {blogPost: BlogPost.first}
  -> react_component("App", {serverContext: @my_context}, {prerender: true})
  -> [[ Rails JS environment, e.g. mini_racer, therubyracer ]]
    -> @my_context given to react-router staticContext
    -> set @my_context on window.serverContext
    -> render with staticContext data
    -> [[ Browser environment ]]
      -> look for context on window.serverContext
      -> render with serverContext from window
```

This component allows you to deal with server context in your component with one variable, `serverContext`

## but I have a situation where I resolve data in the browser between routes?
Not to worry, just wrap that component or HOC with this component, and have that component expect a `alreadyResolved` prop so it doesn't do extra work. Just have it function normally if `alreadyResolved == false`.

e.g.
```typescript
interface MyResolveOrLoaderComponentProps {
  alreadyResolved: boolean;
}
```

## how to use

Function description
```tsx
  const ComponentWithContext = withContext<MyServerContextInterface, MyComponentRouterParamsInterface>(myKeyOfServerContext, myKeyOfServerContextObject)(MyComponent)
```

Full example

```tsx
export interface BlogPost {
  title: string;
  body: string;
}
export interface ServerContext {
  blogPost?: BlogPost;
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
```
