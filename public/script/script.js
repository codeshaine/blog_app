function triggerSubmission(clicked) {
  const confirmation=window.confirm("Are you sure you want to delete this blog?")
  let form = clicked.closest("form");
if(confirmation)
  form.submit();
}




