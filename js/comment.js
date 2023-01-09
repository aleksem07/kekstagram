const removeCommentItem = () => {
  const bigPictureCommentList = document.querySelector('.social__comments');
  bigPictureCommentList.replaceChildren();
};

// ввод комментариев
const commentList = document.querySelector('.social__comments');
const commentItemTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createComment = (comment) => {
  const commentAdd = commentItemTemplate.cloneNode(true);

  commentAdd.querySelector('.social__picture').src = comment.avatar;
  commentAdd.querySelector('.social__picture').alt = comment.name;
  commentAdd.querySelector('.social__text').textContent = comment.message;

  return commentAdd;
};

const renderComments = (comments) => {
  let commentListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentListFragment.appendChild(createComment(comment));
  });

  commentList.appendChild(commentListFragment);
};

export { renderComments, removeCommentItem };
