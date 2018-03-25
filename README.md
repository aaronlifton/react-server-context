# react-server-context

## Requirements

react-router v4

## Will this help me?

Do you use react-router v4?

Do you use server side rendering?

Using react-rails or react-on-rails?

Can your server react environment not use fetch? (e.g. mini_racer, therubyracer)

Do your components expect server context from different places?

## Example scenario

This component wraps the logic behind this scenario:

```
[[ Rails server ]]
  -> @my_context = {blogPost: BlogPost.first}
  -> react_component("App", {serverContext: @my_context}, {prerender: true})
  -> [[ Rails JS environment, e.g. mini_racer, therubyracer ]]
    -> @my_context given to react-router staticContext via context prop
    -> assign @my_context to window.serverContext
    -> render with staticContext data
    -> [[ Browser environment ]]
      -> no staticContext, so look for context on window.serverContext
      -> render with serverContext from window
```

So, this component allows you to deal with server context in your component with one variable, `serverContext`.

## but I have a situation where I resolve data in the browser between routes?
Not to worry, just wrap that component or HOC with this component, and have that component expect a `alreadyResolved` prop so it doesn't do extra work. Just have it function normally if `alreadyResolved == false`.

e.g.
```typescript
interface MyResolveOrLoaderComponentProps {
  alreadyResolved: boolean;
}
```

## how to use

Function signature

```tsx
  function withContext<S,P>(contextKey: keyof S, routeKey: keyof P & keyof S[keyof S])
```

Function description
```tsx
  const ComponentWithContext = withContext<MyServerContextInterface, MyComponentRouterParamsInterface>(myKeyOfServerContext, myKeyOfServerContextObject)(MyComponent)
```

1. Define server context interface for the object that will be passed into router context prop
2. Define params interface for your component's `props.match.params`
3. Have your component pull the context into its state
    * `this.state = {blogPost: this.props.serverContext.blogPost};`
4. Wrap your component with this component

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
```

## Todo

:ballot_box_with_check: move logic out of render()

:ballot_box_with_check: support generic router interface
