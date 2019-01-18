$(document).ready(function() {
  $.ajax({
    url: "http://localhost:3000/assistant"
  }).then(function(data) {
    $(".todo-Name").append(data.TaskTitle);
    $(".todo-Desc").append(data.TaskDesc);
  });
});
