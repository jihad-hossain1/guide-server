







### update a review 
```graphql
mutation {
  updateReview(reviewId: "", newContent: "Updated content gose here...") {
    id
    content
  }
}
```

### update a review 
```graphql
mutation {
  updateReply(replyId: "", newContent: "Updated Reply Text") {
    id
   content
  }
}
```




### Add a review 
```graphql
mutation {
  addReviewReply(
    tourSpotId: ""
    email: ""
    title: ""
    content: ""
    img: ""
    name: ""
    rating: 0,
  ) {
    id
    content
  }
}
```


### Add a reply 
```graphql
mutation {
  addReply(reviewId: "", email: ""
    title: ""
    content: ""
    img: ""
    name: "") {    
        id
        content
  }
}
```

### Delete review with reply
```graphql
mutation {
  deleteReviewWithReply(reviewId: "") {
    content
  }
}
```


### Delete a reply
```graphql
mutation {
  deleteReply(replyId: "")
}
```